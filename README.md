# YT Downloader

A lightweight Windows downloader landing page with Arabic/English support, light/dark mode, responsive UI, and real streamed download progress.

## Current release

- Version: 2.4.1
- Platform: Windows 10 / 11
- Download filename: `YT Downloader.exe`

## Website features

- Real download progress based on bytes actually received.
- Live download speed and estimated remaining time when the server provides the file size.
- Arabic RTL and English LTR interfaces.
- Persistent language and theme preferences with `localStorage`.
- Responsive layout for desktop, tablet, and mobile.
- Keyboard focus states and an accessible progress bar.
- Reduced-motion support for users who prefer less animation.
- Clear download error state with retry behavior.

## Deployment notes

The website expects `YT Downloader.exe` at the same public path as `index.html`, because the frontend downloads it from `./YT Downloader.exe`.

For the progress percentage to be exact, the server should expose a correct `Content-Length` header for the executable. If that header is unavailable, the interface intentionally does not invent a percentage.

## Repository structure

- `index.html` — page shell and CDN dependencies.
- `App.js` — React UI and download logic.
- `Style.css` — responsive visual system and themes.
- `YT Downloader.exe` — Windows application binary, if included in the deployment source.

## Important

Do not claim the download is virus-free unless the executable has actually been scanned and the claim is backed by a current scan/report.
