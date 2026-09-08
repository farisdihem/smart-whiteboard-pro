# Whiteboard-AI — Phase 1: Smart History Engine

Implemented in `app.js`.

## Changes
- History captures are coalesced for 60 ms so duplicate `saveH()` calls during one UI operation produce one snapshot.
- Added `flushHistory()` before Undo, Redo, page save, and page navigation so pending history is never lost.
- History limit reduced from 10 to 8 full-canvas snapshots to cap memory usage.
- Added a capture-in-progress guard.
- Added revision metadata to history states.
- Initial blank-board history capture is immediate.
- Removed `willReadFrequently: true` from the main write-heavy canvas context.

## Compatibility
- Existing `undo()` / `redo()` APIs remain unchanged.
- Existing calls to `saveH()` remain valid.
- Microsoft Store package identity and Tauri configuration were not modified.

## Validation
- `node --check app.js` passes.
- Full Windows/Tauri build must be run on Windows before producing the next release package.
