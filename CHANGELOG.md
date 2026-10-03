# Changelog

Release history is tracked here rather than in the application's visible branding.
No public release version has been assigned yet. When publishing a release, replace
the Unreleased heading with the chosen version and release date, and use the same
version for its repository tag.

## Unreleased

### Added

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
