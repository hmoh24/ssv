# Somali Star View — Dev Guide

## 🚀 Quick Start

**Frontend**
* Install deps: `npm install`
* Start dev server: `npm run dev`  
  Runs at http://localhost:8080 with hot reload.
* Build for production: `npm run build`
* Deploy to GitHub Pages: `npm run deploy`

**RSSHub (YouTube feeds)**
* (Windows) ensure WSL2 + Docker Desktop are ready (see Prerequisites)
* Configure API key: set `YOUTUBE_KEY` in `rsshub/.env`
* Start RSSHub:
  ```bash
  cd rsshub
  docker compose pull
  docker compose up -d
  ```
* Healthcheck: http://localhost:1200/healthcheck → `{"status":"ok"}`
* Stop/restart:
  ```bash
  docker compose down
  docker compose up -d
  ```

---

## ✅ Prerequisites

* **Node.js** (LTS) + npm  
* **Docker Desktop**
  * **Windows only:** WSL 2 enabled  
    PowerShell (Admin):
    ```powershell
    wsl --install -d Ubuntu
    ```
    Docker Desktop → **Settings → General**: enable **Use the WSL 2 based engine**  
    Docker Desktop → **Settings → Resources → WSL Integration**: toggle your distro **On**

---

## 🔑 YouTube API 

* **API:** YouTube Data API v3  
* **Credential:** **API Key** (not OAuth)  
* Steps in Google Cloud Console:
  1) Create project  
  2) **Enable** “YouTube Data API v3”  
  3) Create **API key** (add restrictions later: HTTP referrers/IP)
* **Quota (default):** 10,000 units/day per project  
  *Typical costs:* `channels.list` = 1 unit/call → safe for local dev. Poll feeds sensibly (e.g., every 10–15 minutes per channel).

Set the key in `rsshub/.env`:
```
YOUTUBE_KEY=YOUR_YOUTUBE_DATA_API_V3_KEY
```

---

## 🔎 Getting a YouTube Channel ID (UC…)

RSSHub’s route is `/youtube/channel/<UC_ID>`. You need the **UC…** channel ID:

* From a classic channel URL: `https://www.youtube.com/channel/UCabc...` → copy the `UC...`
* From any video by the creator: View Source (`Ctrl+U`) → search **`ownerChannelId`** → copy the `UC...`
* From a handle page (`https://www.youtube.com/@Name`): View Source → search **`"externalId":"UC`** or **`"browseId":"UC`**  
  (Or DevTools → Network → a `browse?` request → look for `"browseId":"UC..."`)

> Note: RSSHub **does not** support `/youtube/handle/<handle>` → use the **UC** channel ID.

---

## ▶️ Using the local feed

* Example feed (replace with a real UC ID):  
  `http://localhost:1200/youtube/channel/UCxxxxxxxxxxxxxxxxx`
* The response is **RSS XML**. Your backend should fetch this, parse items, and upsert into your DB.

Recommended fields to extract per `<item>`:
* `title`, `link` (extract **video_id** from `v=...`), `pubDate` (creator’s publish time)
* `description`, `author`/`dc:creator` (channel title), `media:thumbnail`
* Add known `channel_id` (UC…), and your own `ingested_at` timestamp

**Uniqueness:** use `video_id` as the PK (not `guid`).  
**Ordering:** sort by `published_at` (from `pubDate`) descending.  
**Re-ingest:** upsert by `video_id`; update mutable fields (title/description/thumbnail).

---

## 🧰 Ops & Troubleshooting

* Check env loaded:
  ```bash
  cd rsshub
  docker compose config
  ```
  Ensure `YOUTUBE_KEY` is visible under `environment`.

* Tail logs:
  ```bash
  docker compose logs -f rsshub
  ```

* Port already in use? Change mapping in `docker-compose.yml` to `1201:1200` and use `http://localhost:1201`.

* Caching/polling:
  * Poll each channel every 10–15 min
  * Cache feed responses 5–10 min in your backend
  * Prefer your backend as the consumer (avoid browser CORS + heavy iframes)

---

## 📁 Project Structure

```text
├── dist/                  # Build output (gitignored)
├── src/                   # Source files (JS, CSS, HTML template)
│   ├── index.js
│   └── template.html
├── rsshub/                # Local RSSHub service (Docker)
│   ├── docker-compose.yml
│   └── .env               # set YOUTUBE_KEY here (not committed)
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
├── package.json
├── .gitignore
└── README.md
```

**.gitignore tip**
```
rsshub/.env
```
