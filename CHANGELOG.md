# Changelog

Release history is tracked here rather than in the application's visible branding.
Versions follow semantic versioning and match the VERSION file and Git tags.

## Unreleased

No changes yet.

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
