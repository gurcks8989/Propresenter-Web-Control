# Changelog

Release history is tracked here rather than in the application's visible branding.
Versions follow semantic versioning and match the VERSION file and Git tags.

## 0.1.6 — 2026-10-18 (Preview)

- Show already-active media from server state; when only media is active, display its thumbnail in the large upper preview. This is not a composited output feed.
- Reorganize the header into four groups, keep connection names on one line, remove the duplicate clock, and default the inspector to macros.
- Close settings on outside click and improve standard/WebKit fullscreen toggling with a constant button label. The reported local-file fullscreen issue remains unverified on the affected browser.
- Add fullscreen toggle (including Escape exit) and direct connection using saved settings.
- Ignore the previous slide index briefly after a successful cue trigger while waiting for server confirmation; resume authoritative state after confirmation, another state change, or a three-second limit.
- Keep viewport scrolling inside panels and trigger media directly from card clicks, respecting read-only mode.

## 0.1.5 — 2026-10-03 (Preview)

- Rename the standalone file to `propresenter_web_control.html`. Keep the existing settings storage key for compatibility.
- Widen the inspector according to the slide aspect ratio on desktop.
- Add a draggable, keyboard-accessible source-list divider with saved height and double-click reset.
- Localize output labels as 청중 / 스테이지 and use filled circles for enabled outputs.
- Replace the native Looks dropdown with a compact menu opening below the button; close on outside click or Escape.

## 0.1.4 — 2026-10-03 (Preview)

- Respect the current slide's API dimensions (thumbnail dimensions as fallback) without stretching the preview to the clear controls' height.
- Remove the preview caption, separate capture controls into a dialog opened from Live, and align Audience, Stage and Looks toolbar controls.

## 0.1.3 — 2026-10-03 (Preview)

- Add persisted update settings (automatic before connection, notify only, or off), bounded pre-connection checks, manual check/apply, changelog and HTML download. Connected sessions never auto-reload; local HTML requires replacement. Failed checks allow connection, and a one-attempt guard prevents reload loops.

- Preview playlist presentations without triggering their first slide; trigger only the explicitly clicked slide, with playlist item validation before execution.

- Localize synthetic demo library, playlist, media and control names plus preview text to the selected language; real user content remains untouched.

- Localize hosted-page banner labels using the selected UI language instead of showing bilingual text.

- Default to English on first launch across the hosted controller, sample demo and standalone HTML; preserve saved language choices.

- Show persistent media execution progress and verify server activation after triggering; distinguish accepted requests from confirmed activation without claiming visible output verification.

- Use white icons for inactive clear buttons, including Clear All and video input; retain red backgrounds for active layers.

- Make the main hosted URL the real controller, with direct connection settings; move the isolated sample demo to an optional link.

- Read actual layer status every second and highlight active clear buttons in red; clear stale slide previews when the slide layer is inactive.

- Restyle toolbar output toggles as status rings, show the current Look beneath its icon, and replace the Live bullseye with a broadcast-wave icon.

- Unlock demo address and port fields, validate and persist their values, and explain that actual equipment connections require Live mode.

- Extend the Clear All button to the full height of the adjacent layer-clear buttons, with its icon centered.

- Add an opt-in live connection page alongside the isolated demo, with editable connection settings, read-only startup, local-network guidance and a standalone HTML download.

- Match the native clear-layer order, use a camera icon for video input, and add a separate Clear All button connected to an all-layer clear group returned by the server (disabled if none exists).

- Poll slides, playback and output status approximately every second and catalogs every 30 seconds; remove toolbar and media refresh buttons.

- Reversed the slide size slider so moving right enlarges thumbnails; renamed its accessible label to Slide size.

- Reorganized the left header into two rows: branding above search, panel toggle and connection status.

## 0.1.2 — 2026-10-03 (Preview)

- Refreshed the public demo to include the wrapped-help-text translation fix.
- Use an English-only Language field label when English is selected. Language names remain self-identifying.
- Default empty connection fields to `localhost` and example port `1025`, without automatically connecting on first launch. Use the port configured in ProPresenter Network settings; 1025 is not a universal default.
- Show the same defaults in demo settings while retaining its isolated mock transport.

## 0.1.1 — 2026-10-03 (Preview)

- Fixed English translation of wrapped static help text in Settings.
- First downloadable GitHub Release; v0.1.0 is retained as the initial source tag.

## 0.1.0 — 2026-10-03 (Preview)

Initial public prerelease. Not all controls have been verified against live equipment.

### Added

- Isolated GitHub Pages demo with synthetic data and blocked external connections.
- Browser-rendered application screenshot and setup documentation.

- Configurable connection retry limits (0–10), connection preflight checks, and explicit disconnect/reconnect controls.
- Embedded favicon and official control icons, with third-party attribution in the README.

- English and Korean UI selection in one HTML file, with saved language preference.
- Library title search with non-triggering previews.
- Bottom media browser and ProPresenter-style Show Controls layout.
- Slide freshness checks and a heuristic guard for possible Bible/temporary views.
- English setup, safety, and API limitation documentation.

### Changed

- Unified library/playlist navigation and added icon-and-text toolbar controls.
- Preserved media card elements and selection across status refreshes; thumbnail and title clicks select without triggering output.
- Made settings action labels reflect connection state and arranged port/retry inputs in one row.

- Replaced common navigation, view, and Show Controls buttons with inline SVG icons, preserving localized tooltips and accessible names. Critical output action labels remain visible.

- Updated the display name to `ProPresenter Web Control` and embedded the user-specified white ProPresenter SVG in the header.

- Split the connection settings into server-address and port fields, retaining compatibility with previously saved combined addresses.

- Removed the visible `Control V9` header label and version number from the browser title.
- Removed the bundled private server address; fresh configurations start disconnected and read-only.

### Compatibility

- The existing `propresenter_control_v9.html` filename and `ppControlV9` storage key remain unchanged to preserve existing links and saved settings. Their legacy suffix is not a release number.
