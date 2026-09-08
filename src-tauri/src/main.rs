#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::Command;

#[cfg(target_os = "windows")]
use std::os::windows::process::CommandExt;

#[cfg(target_os = "windows")]
const CREATE_NO_WINDOW: u32 = 0x08000000;

/// Returns a unique hardware identifier (UUID / Machine GUID)
/// Windows: reads MachineGuid from Registry or CSProduct UUID from WMIC / PowerShell
/// macOS: reads IOPlatformUUID
/// Linux: reads /etc/machine-id or /var/lib/dbus/machine-id
#[tauri::command]
fn get_hardware_id() -> String {
  #[cfg(target_os = "windows")]
  {
    // Try 1: Fast native REG QUERY for MachineGuid (Hidden window)
    let mut cmd_reg = Command::new("reg");
    cmd_reg.creation_flags(CREATE_NO_WINDOW);
    cmd_reg.args(["query", "HKLM\\SOFTWARE\\Microsoft\\Cryptography", "/v", "MachineGuid"]);
    if let Ok(output) = cmd_reg.output() {
      if output.status.success() {
        let text = String::from_utf8_lossy(&output.stdout);
        for line in text.lines() {
          if line.contains("MachineGuid") {
            let parts: Vec<&str> = line.split_whitespace().collect();
            if let Some(guid) = parts.last() {
              if !guid.is_empty() && guid.len() >= 8 {
                return format!("HW-WIN-{}", guid.trim().to_uppercase());
              }
            }
          }
        }
      }
    }

    // Try 2: PowerShell Get-ItemPropertyValue for MachineGuid (Hidden window)
    let mut cmd_ps = Command::new("powershell");
    cmd_ps.creation_flags(CREATE_NO_WINDOW);
    cmd_ps.args(["-NoProfile", "-NonInteractive", "-Command", "(Get-ItemProperty -Path 'HKLM:\\SOFTWARE\\Microsoft\\Cryptography').MachineGuid"]);
    if let Ok(output) = cmd_ps.output() {
      if output.status.success() {
        let guid = String::from_utf8_lossy(&output.stdout).trim().to_string();
        if !guid.is_empty() && guid.len() >= 8 {
          return format!("HW-WIN-{}", guid.to_uppercase());
        }
      }
    }

    // Try 3: WMIC csproduct get uuid (Hidden window fallback)
    let mut cmd_wmic = Command::new("wmic");
    cmd_wmic.creation_flags(CREATE_NO_WINDOW);
    cmd_wmic.args(["csproduct", "get", "uuid"]);
    if let Ok(output) = cmd_wmic.output() {
      if output.status.success() {
        let lines: Vec<&str> = std::str::from_utf8(&output.stdout)
          .unwrap_or("")
          .lines()
          .map(|s| s.trim())
          .filter(|s| !s.is_empty() && *s != "UUID")
          .collect();
        if let Some(uuid) = lines.first() {
          if !uuid.is_empty() && *uuid != "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF" {
            return format!("HW-WIN-{}", uuid.to_uppercase());
          }
        }
      }
    }
  }

  #[cfg(target_os = "macos")]
  {
    if let Ok(output) = Command::new("ioreg")
      .args(["-rd1", "-c", "IOPlatformExpertDevice"])
      .output()
    {
      if output.status.success() {
        let text = String::from_utf8_lossy(&output.stdout);
        for line in text.lines() {
          if line.contains("IOPlatformUUID") {
            let parts: Vec<&str> = line.split('"').collect();
            if parts.len() >= 4 {
              let uuid = parts[3].trim();
              if !uuid.is_empty() {
                return format!("HW-MAC-{}", uuid.to_uppercase());
              }
            }
          }
        }
      }
    }
  }

  #[cfg(target_os = "linux")]
  {
    if let Ok(content) = std::fs::read_to_string("/etc/machine-id") {
      let id = content.trim();
      if !id.is_empty() {
        return format!("HW-LNX-{}", id.to_uppercase());
      }
    }
    if let Ok(content) = std::fs::read_to_string("/var/lib/dbus/machine-id") {
      let id = content.trim();
      if !id.is_empty() {
        return format!("HW-LNX-{}", id.to_uppercase());
      }
    }
  }

  "HW-GENERIC-FALLBACK".to_string()
}

/// On Windows, Tauri's WebView2 host does not automatically grant microphone
/// or camera permission requests made by the page via getUserMedia(); with no
/// handler registered, WebView2 silently denies them. That is why the lesson
/// recording feature produced videos with no audio at all: the mic permission
/// request from app.js's `navigator.mediaDevices.getUserMedia({ audio: ... })`
/// was rejected before the user ever saw an OS-level prompt, and the app fell
/// back to a video-only recording. This hooks WebView2's PermissionRequested
/// event directly and auto-allows camera/microphone so recording works the
/// same as it does in a regular browser.
#[cfg(target_os = "windows")]
fn grant_media_permissions(window: &tauri::Window) {
  use webview2_com::Microsoft::Web::WebView2::Win32::{
    COREWEBVIEW2_PERMISSION_KIND_CAMERA, COREWEBVIEW2_PERMISSION_KIND_MICROPHONE,
    COREWEBVIEW2_PERMISSION_STATE_ALLOW,
  };
  use webview2_com::PermissionRequestedEventHandler;

  let _ = window.with_webview(|webview| unsafe {
    let controller = webview.controller();
    let core_webview = match controller.CoreWebView2() {
      Ok(cw) => cw,
      Err(_) => return,
    };

    let handler = PermissionRequestedEventHandler::create(Box::new(|_sender, args| {
      if let Some(args) = args {
        let mut kind = Default::default();
        if args.PermissionKind(&mut kind).is_ok()
          && (kind == COREWEBVIEW2_PERMISSION_KIND_CAMERA
            || kind == COREWEBVIEW2_PERMISSION_KIND_MICROPHONE)
        {
          let _ = args.SetState(COREWEBVIEW2_PERMISSION_STATE_ALLOW);
        }
      }
      Ok(())
    }));

    let mut token = std::mem::zeroed();
    let _ = core_webview.add_PermissionRequested(&handler, &mut token);
  });
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_hardware_id])
    .setup(|_app| {
      #[cfg(target_os = "windows")]
      {
        use tauri::Manager;
        if let Some(window) = _app.get_window("main") {
          grant_media_permissions(&window);
        }
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

