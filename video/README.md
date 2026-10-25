# Friday Works video editor

A browser video editor that works on phones as well as computers. It is a modified copy of the classic web app of [OpenCut](https://github.com/OpenCut-app/OpenCut) (`apps/web` at commit `cf5e79e`), released under the MIT License (see `LICENSE`). Friday Works embeds it in the Tools section of [fridayweworks.com](https://fridayweworks.com/vi/tools). OpenCut's name and logos are not used for this build.

## What differs from upstream

- **Static and server-free.** The app is a static export (`output: "export"`) that can be served from any file host under a sub-path (`NEXT_PUBLIC_BASE_PATH`). Accounts, the database, rate limiting, analytics, bot protection and the sound search that needed OpenCut's servers are removed.
- **Nothing kept on the device.** Projects and imported media live in memory for the visit (`src/services/storage/memory-adapter.ts`); nothing is written to IndexedDB or OPFS. Exporting downloads the video.
- **Phone layout.** Narrow screens, and touch screens turned sideways, get a CapCut-style layout (`src/components/editor/mobile/`): the preview on top, the timeline below and the tools along the bottom edge. Asset tabs and clip properties open in a sheet over the timeline. The upstream "desktop only" screen is gone.
- **Touch input.** The timeline, trim handles, playhead, preview handles and colour picker use pointer events. A swipe on an unselected clip scrolls the timeline, a tap selects it, and a selected clip can be dragged. Two fingers zoom the timeline. On touch screens a tap on a media, text or sticker card adds it.
- **Quick import.** "Add" puts picked photos and videos straight onto the timeline one after another, and the frame takes the first clip's size, so vertical phone footage fills the frame.
- **Smaller fixes.** New text is sized to the width of portrait frames, font previews load only when the font picker opens, and blob downloads are released after a delay so iOS Safari keeps them.

## Build

```bash
npm ci
NEXT_PUBLIC_BASE_PATH=/fridayworks-hosted-apps/video npm run build
```

The site is written to `out/`. Leave `NEXT_PUBLIC_BASE_PATH` empty to serve it from the root of a host.

## Licence

The original code is MIT-licensed, Copyright 2025-2026 OpenCut; keep `LICENSE` with every copy of the app, including the built `out/` folder.
