# Friday Works hosted apps

This repository publishes open-source editors that [Friday Works](https://fridayweworks.com/vi/tools) embeds in its Tools section:

- a Friday Works modified build based on PhotoCraft 0.15.1 by the ArtCraft team, adding automatic hosted-font registration before document imports;
- the official FilmCraft web build, unmodified. Friday Works is not affiliated with or endorsed by the ArtCraft team;
- a video editor that Friday Works adapted for phones from the classic web app of [OpenCut](https://github.com/OpenCut-app/OpenCut) (MIT). Friday Works is not affiliated with or endorsed by OpenCut.

| Path | App | Version | Upstream release | SHA-256 of the release zip |
|---|---|---|---|---|
| [`/photocraft/`](https://nguyenxvotanminh3.github.io/fridayworks-hosted-apps/photocraft/) | PhotoCraft, image editor — Friday Works modified build | 0.15.1 + fw-fonts-20261025-1 | [storytold/photocraft v0.15.1](https://github.com/storytold/photocraft/releases/tag/v0.15.1) | `987251cb84c375130fa3624fa1e1dbbea24b062192121b594c9e538d05ea9109` |
| [`/filmcraft/`](https://nguyenxvotanminh3.github.io/fridayworks-hosted-apps/filmcraft/) | FilmCraft, video editor (no longer linked from the Friday Works site since 25/10/2026) | 0.12.0 | [storytold/filmcraft v0.12.0](https://github.com/storytold/filmcraft/releases/tag/v0.12.0) | `c62658f33781767909e180b464c1875ccf41e18465de3cdd1acd135381b8be74` |
| [`/video/`](https://nguyenxvotanminh3.github.io/fridayworks-hosted-apps/video/) | Video editor for phones and computers, adapted from OpenCut | build of commit `6085997` | [OpenCut-app/OpenCut](https://github.com/OpenCut-app/OpenCut) `apps/web` at `cf5e79e`, modified | not applicable |

## What each folder holds

`photocraft/`:

- `index.html` selects the active isolated build through a relative HTML base URL. JS, WASM parts, fonts and licences share that versioned path, preventing mixed old/new runtime caches.
- `current-build.json` identifies that path; `builds/fw-fonts-20261025-1/` contains the current Friday Works modified build, `BUILDINFO.json`, source patch and complete licences.
- The original 0.15.1 runtime files are retained outside that directory for earlier cached pages and rollback. The release-zip checksum in the table identifies the upstream base, not the modified runtime.

`filmcraft/`:

- Every file of the release asset `<app>-web-<version>.zip`, byte for byte. The checksums above match the release's `SHA256SUMS.txt`.
- `NOTICE` and `ATTRIBUTION.md` from the upstream repository at the same tag. The release zip does not include them.
- `licenses/`: the third-party licence texts that NOTICE and ATTRIBUTION.md list for material bundled in the app. Their paths mirror the upstream repository.

`video/`:

- The static export (`out/`) of Friday Works' modified copy of OpenCut, built with `NEXT_PUBLIC_BASE_PATH=/fridayworks-hosted-apps/video`.
- `LICENSE`: OpenCut's MIT licence and copyright notice.
- `README.md`: what was changed from upstream and how to build it.

`.nojekyll` at the root makes GitHub Pages serve every file as it is, including the `_next/` folder.

## PhotoCraft automatic Be Vietnam Pro loading

The current Friday Works build fetches the hosted manifest and **Be Vietnam Pro Regular** before
making the editor interactive. It registers the actual font bytes in PhotoCraft's Rust font database,
so opening or dropping a PSD that already uses this face does not require selecting the family first.
It does not substitute fonts in a document. Missing Arial or other families still produce warnings.

Each manifest/font request has a ten-second timeout including its body. Failure leaves a usable
editor with a warning; reload to retry before editing. The manifest's SHA-256 Subresource Integrity
remains enforced. This is a modified distribution, not an official ArtCraft release. Loading/About
identify Friday Works and the upstream basis. The small upstream boot module is unchanged.

- Each build's `fonts/manifest.txt` lists family, style, local path, licence, checksum and pinned source.
- `fonts/be-vietnam-pro/BeVietnamPro-Regular.ttf` is the unchanged Google Fonts file at commit
  `c13390277dfb1fcc7415d84ef7ef9cfc1e52f8c1`, SHA-256
  `cd1ef6e9d7db28ad5cdb88a65ccbe693870e60d340b791f349d248342b4fe4c3`.
- `fonts/be-vietnam-pro/OFL.txt` retains SIL Open Font License 1.1 and
  copyright 2021 The Be Vietnam Pro Project Authors.

Only Regular is supplied. Font files load from this host, not Google. Fonts are not automatically
embedded in saved PSDs. When upgrading, retain the font assets and their licences, reapply/review
the documented startup fix and repeat cold-session text edit/save/reopen and failure tests.

## Loading page

`loader.html` and `progress-sw.js` are Friday Works' own files, not part of either app.

The Friday Works PhotoCraft page opens `loader.html?app=photocraft` (`filmcraft` works the same way). It shows how much of the app has downloaded, then shows the selected app build in a frame once the app has started. The video editor does not use the loader: its own page shows a spinner straight away.

`progress-sw.js` is a service worker that passes every request on unchanged. For each app's start-up files (`.wasm`, `.js`, `.part-*`), it counts bytes from a copy of the response, so nothing is downloaded twice. Browsers without service workers get a moving bar instead of a percentage.

## Licences

PhotoCraft and FilmCraft are dual-licensed under the MIT License or the Apache License 2.0, at your option (`LICENSE-MIT` and `LICENSE-APACHE` in each folder). Copyright (c) 2026 ArtCraft Team and the PhotoCraft or FilmCraft contributors.

Bundled third-party material keeps its own licence. That covers the fonts (SIL Open Font License 1.1), the icons (ISC/MIT, plus one CC BY 3.0 icon), the SCOWL word list and the libfacedetection weights (BSD-3-Clause). See each folder's `NOTICE`, `ATTRIBUTION.md` and `licenses/`.

The ArtCraft name, wordmark and logos are trademarks of the ArtCraft Team and are not covered by these licences. No ArtCraft graphic marks are included in the modified PhotoCraft distribution; the team is credited in plain text. The separate PhotoCraft app icon has its own MIT/Apache-2.0 licence. FilmCraft retains its unmodified upstream assets.

The video editor is a modified copy of OpenCut, released under the MIT License, Copyright 2025-2026 OpenCut (`video/LICENSE`). OpenCut's name and logos are not used in the build; the name appears only to credit the original.

## Privacy

All the apps run entirely in the visitor's browser. Files are opened from the visitor's device, and every save or export is a download back to it. This site has no server-side code, analytics or cookies.

Through `loader.html`, nothing else is stored apart from the apps' small settings: PhotoCraft's preferences and brush presets. FilmCraft would normally copy every imported video into this site's browser storage (OPFS) for crash recovery. The loader shows FilmCraft a browser without OPFS (FilmCraft checks before every write) and deletes copies left by earlier visits. In exchange, an unexported FilmCraft project is not recovered after the tab closes.

FilmCraft's optional speech features (transcription and text-to-speech) download model weights from huggingface.co only after the user confirms a dialog that shows the size, source and licence.

The video editor keeps the project and imported media in memory for the visit only: nothing is written to IndexedDB, OPFS, Cache Storage or a service worker, localStorage holds only small interface settings (about 0.6 KB of keyboard shortcuts after a typical session), and exports are downloads. Its automatic captions download a speech model from huggingface.co when the visitor starts them. Font previews and fonts load from this site and from Google Fonts when the visitor opens the font picker or picks a font.

## Updating

For an unmodified upstream build (FilmCraft):

1. Download `<app>-web-<version>.zip` and `SHA256SUMS.txt` from the upstream GitHub release, then check the zip's SHA-256.
2. Replace the app's folder with the zip's contents.
3. Copy `NOTICE`, `ATTRIBUTION.md` and the licence files from the upstream repository at the same tag.
4. Run `node scripts/loader-sizes.mjs` to update the start-up byte totals in `loader.html`.
5. Update the table above, then test opening and exporting a file before pointing the Friday Works pages at the new version.

For PhotoCraft, review the active source patch and BUILDINFO, build the reviewed Rust source with Trunk, package generated glue plus compressed WASM parts with a new immutable build directory, retain full licences/fonts, update current-build.json and the index base URL, then run loader-sizes.mjs and verify both direct/embedded flows before publication. Do not blindly replace the modified build with the upstream zip.

For the video editor, build the Friday Works fork with `NEXT_PUBLIC_BASE_PATH=/fridayworks-hosted-apps/video npm run build`, replace `video/` with `out/` plus the fork's `LICENSE` and `README.md`, and test a phone-sized and a desktop-sized window before publishing.
