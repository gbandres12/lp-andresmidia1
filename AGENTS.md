# Working in this repo

Static landing page for Andres Midia (G L Andres Mídia e Tecnologia): plain
`index.html`, `css/styles.css`, `js/config.js`, `js/main.js` and images in `img/`.
There is no build step, no package manifest and no server-side code — the browser
loads the files as they are.

## Sandbox environment

- Run it with `docker compose -f docker-compose.base44.yml up -d` (host port 3000).
- The compose service uses a plain `node:22-alpine` image with the repo bind-mounted
  at `/app` and serves it with `live-server` (live reload, no build). Editing HTML,
  CSS or JS is reflected in the preview without restarting anything.
- There are no environment variables, secrets or external services required. The
  optional Google Apps Script endpoint (`SITE.webhookUrl` in `js/config.js`) is empty
  and the Google/Meta tags in `index.html` are commented out, so nothing is sent out.

## Things to know before editing

- All page copy, prices, WhatsApp number, Instagram URL, CNPJ and testimonials live in
  `js/config.js` (`SITE`). That is the only file to touch for content changes.
- `js/main.js` reads `SITE` and fills prices, testimonials, the FAQ accordion, the
  WhatsApp links and the exit-intent popup. A missing/renamed id or `data-*` attribute
  in `index.html` throws during page init and breaks the whole page, so keep the
  `data-price`, `data-wa` and `data-off` hooks intact.
- Placeholders still in the file: WhatsApp `5593999999999`, CNPJ `00.000.000/0001-00`
  and the example testimonials. They are content, not credentials.

## How to check it works

`curl -s http://localhost:3000/ | head` should return the landing page HTML, and
`docker compose -f docker-compose.base44.yml ps` should show `web` as healthy.
