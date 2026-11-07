# YT-Downloader backend

Node.js 22.5+ / Express API with SQLite analytics.

## Local setup

1. Install Node.js 22.5 or newer.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env`.
4. Set `ADMIN_TOKEN` to a long random secret (at least 32 characters). Never commit `.env`.
5. Run `npm start`.

## Endpoints

- `GET /health`
- `POST /api/analytics/page-view` with JSON `{"path":"/","referrer":""}`
- `POST /api/downloads/track` with JSON `{"version":"1.0.0"}`
- `GET /api/downloads/latest`
- `POST /api/downloader/prepare` with JSON `{"url":"https://..."}` (integration placeholder)
- `GET /api/admin/stats` with header `Authorization: Bearer YOUR_ADMIN_TOKEN`

The analytics records page visits, visitor IDs, and download-button clicks. A click is not proof that a file finished downloading.

## Deployment

GitHub Pages cannot run Node.js. Deploy this folder to a Node.js host and configure the environment variables there. SQLite requires persistent disk storage; use a host with a persistent volume or migrate to a managed database.

The downloader endpoint is intentionally a placeholder until the desktop app source and authorized content sources are available. It does not bypass platform restrictions or download third-party media.
