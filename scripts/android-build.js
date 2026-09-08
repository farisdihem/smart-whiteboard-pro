#!/usr/bin/env node
/**
 * ══════════════════════════════════════════════════════════════
 * ANDROID GRADLE BUILD HELPER
 * ══════════════════════════════════════════════════════════════
 * This project's folder path contains Arabic characters. On Windows,
 * gradlew.bat resolves its own script directory (%~dp0) through cmd.exe's
 * batch-file parsing, which mangles non-ASCII characters into '?' before
 * Java ever sees the path — so `gradlew.bat assembleDebug` fails with
 * "Unable to access jarfile ..." no matter what JVM encoding flags are set.
 *
 * Node's child_process.spawn uses the OS's native Unicode process-creation
 * API directly (no cmd.exe batch-file parsing involved), so invoking the
 * same org.gradle.wrapper.GradleWrapperMain entry point through Node works
 * reliably regardless of the folder name. This script exists purely as a
 * workaround for that one Windows/cmd.exe limitation; it does nothing
 * gradlew.bat wouldn't do on a plain-ASCII path.
 *
 * Usage: node scripts/android-build.js [gradle task, default: assembleDebug]
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const androidDir = path.join(__dirname, '..', 'android');
const wrapperJar = path.join('gradle', 'wrapper', 'gradle-wrapper.jar');

if (!fs.existsSync(path.join(androidDir, wrapperJar))) {
  console.error('Gradle wrapper not found. Run `npx cap add android` first.');
  process.exit(1);
}

function findJavaExe() {
  const home = process.env.JAVA_HOME;
  if (home) {
    const exe = path.join(home, 'bin', process.platform === 'win32' ? 'java.exe' : 'java');
    if (fs.existsSync(exe)) return exe;
  }
  return 'java'; // fall back to PATH
}

const task = process.argv[2] || 'assembleDebug';
const javaExe = findJavaExe();

const args = [
  '-Dsun.jnu.encoding=UTF-8',
  '-Dfile.encoding=UTF-8',
  '-Dorg.gradle.appname=gradlew',
  '-classpath', wrapperJar,
  'org.gradle.wrapper.GradleWrapperMain',
  task,
  '--console=plain'
];

console.log(`[android-build] ${javaExe} ... ${task} (cwd: ${androidDir})`);

const child = spawn(javaExe, args, { cwd: androidDir, stdio: 'inherit' });
child.on('error', (err) => {
  console.error('Failed to launch Java. Is JDK installed and JAVA_HOME set?', err.message);
  process.exit(1);
});
child.on('exit', (code) => process.exit(code));
