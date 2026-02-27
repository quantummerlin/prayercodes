# Prayer Codes

**Connect to the Kingdom of Heaven**

A Progressive Web App (PWA) for creating structured biblical prayers, generating unique Prayer Codes through English Gematria, and amplifying your connection to Heaven with the 37-73 Hz creation frequency.

**Live at [prayer.quantummerlin.com](https://prayer.quantummerlin.com)**

---

## Features

- **Structured Prayer Builder** — Follow biblical prayer patterns (Lord's Prayer, Protection, Thanksgiving, Petition, Guidance, Healing, Justice)
- **Gematria Code Generation** — Each prayer is encoded into a unique numerical Prayer Code using English Gematria (A=1, B=2, ... Z=26)
- **Creation Frequency** — 37-73 Hz audio frequency for prayer meditation
- **Prayer Journal** — Locally stored prayer history with answered prayer tracking
- **Scripture Library** — Searchable KJV scripture database by category
- **Social Sharing** — Share your Prayer Code via WhatsApp, Facebook, Twitter/X
- **Offline Support** — Full PWA with service worker for offline functionality
- **Installable** — Install as a native-like app on any device

## Technology

- Pure HTML5, CSS3, JavaScript (no frameworks, no build step)
- Progressive Web App (PWA) with offline-first service worker
- Local storage for the prayer journal
- Responsive design for all screen sizes

## Deployment

This site is deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

### Custom Domain Setup

The site is configured for `prayer.quantummerlin.com`. DNS should have a CNAME record pointing to `quantummerlin.github.io`.

## Project Structure

```
prayer_site/          ← Deployed to GitHub Pages
├── index.html        ← Single-page application
├── manifest.json     ← PWA manifest
├── service-worker.js ← Offline caching
├── CNAME             ← Custom domain
├── css/style.css     ← Complete stylesheet
├── js/app.js         ← Complete application logic
├── images/           ← Background assets
├── audio/            ← Creation frequency audio
└── icons/            ← PWA icons (all sizes)
```

## License

All rights reserved. Prayer Codes © 2025
