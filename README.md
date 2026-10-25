# Friday Works hosted apps

This repository publishes the official web builds of two open-source apps by the ArtCraft team, unmodified, so that [Friday Works](https://fridayweworks.com/vi/tools) can embed them in its Tools section. Friday Works only hosts them. It did not write or change these apps and is not affiliated with or endorsed by the ArtCraft team.

| Path | App | Version | Upstream release | SHA-256 of the release zip |
|---|---|---|---|---|
| [`/photocraft/`](https://nguyenxvotanminh3.github.io/fridayworks-hosted-apps/photocraft/) | PhotoCraft, image editor | 0.15.1 | [storytold/photocraft v0.15.1](https://github.com/storytold/photocraft/releases/tag/v0.15.1) | `987251cb84c375130fa3624fa1e1dbbea24b062192121b594c9e538d05ea9109` |
| [`/filmcraft/`](https://nguyenxvotanminh3.github.io/fridayworks-hosted-apps/filmcraft/) | FilmCraft, video editor | 0.12.0 | [storytold/filmcraft v0.12.0](https://github.com/storytold/filmcraft/releases/tag/v0.12.0) | `c62658f33781767909e180b464c1875ccf41e18465de3cdd1acd135381b8be74` |

## What each folder holds

- Every file of the release asset `<app>-web-<version>.zip`, byte for byte. The checksums above match the release's `SHA256SUMS.txt`.
- `NOTICE` and `ATTRIBUTION.md` from the upstream repository at the same tag. The release zip does not include them.
- `licenses/`: the third-party licence texts that NOTICE and ATTRIBUTION.md list for material bundled in the app. Their paths mirror the upstream repository.

`.nojekyll` at the root makes GitHub Pages serve every file as it is.

## Licences

PhotoCraft and FilmCraft are dual-licensed under the MIT License or the Apache License 2.0, at your option (`LICENSE-MIT` and `LICENSE-APACHE` in each folder). Copyright (c) 2026 ArtCraft Team and the PhotoCraft or FilmCraft contributors.

Bundled third-party material keeps its own licence. That covers the fonts (SIL Open Font License 1.1), the icons (ISC/MIT, plus one CC BY 3.0 icon), the SCOWL word list and the libfacedetection weights (BSD-3-Clause). See each folder's `NOTICE`, `ATTRIBUTION.md` and `licenses/`.

The ArtCraft name, wordmark and logos are trademarks of the ArtCraft Team and are not covered by these licences. They appear here only inside the unmodified official builds.

## Privacy

Both apps run entirely in the visitor's browser. Files are opened from and saved to the visitor's own device. This site has no server-side code, analytics or cookies.

FilmCraft's optional speech features (transcription and text-to-speech) download model weights from huggingface.co only after the user confirms a dialog that shows the size, source and licence.

## Updating

1. Download `<app>-web-<version>.zip` and `SHA256SUMS.txt` from the upstream GitHub release, then check the zip's SHA-256.
2. Replace the app's folder with the zip's contents.
3. Copy `NOTICE`, `ATTRIBUTION.md` and the licence files from the upstream repository at the same tag.
4. Update the table above, then test opening and exporting a file before pointing the Friday Works pages at the new version.
