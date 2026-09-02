# Deploying PathPilot

PathPilot runs as a small, self-contained Docker stack on your Windows host,
published securely at **https://pathpilot.meetiqpro.ai** via a Cloudflare
Tunnel, and gated to approved emails with **Cloudflare Access**.

It is designed to sit **next to the tv-tracker stack** on the same machine with
no conflicts — separate container/volume names, its own tunnel, and host ports
(`8080`) that don't overlap tv-tracker (`4000`, `5432`).

```
Browser ── HTTPS ──> Cloudflare (Access login) ──> Tunnel ──> cloudflared
                                                                  │
                                                          web (nginx :80)
                                                         /              \
                                                 static SPA         /api ─> api (:4100)
                                                                              │
                                                                     SQLite (volume)
```

## Components

| Container              | Role                                                        | Host port |
| ---------------------- | ----------------------------------------------------------- | --------- |
| `pathpilot_web`        | nginx — serves the built SPA, proxies `/api` to the backend | `8080`    |
| `pathpilot_api`        | Node/Express + SQLite — per-user state sync                 | internal  |
| `pathpilot_cloudflared`| Cloudflare Tunnel to `pathpilot.meetiqpro.ai`               | —         |

Data lives in the `pathpilot_data` Docker volume (the SQLite database).

---

## 1. Prerequisites

- Docker Desktop (or Docker Engine) running on the Windows host.
- The `meetiqpro.ai` zone in your Cloudflare account.
- A Cloudflare **Zero Trust** team (free plan is fine).

---

## 2. Create the Cloudflare Tunnel

1. Cloudflare dashboard → **Zero Trust** → **Networks** → **Tunnels** → **Create a tunnel**.
2. Type **Cloudflared**, name it e.g. `pathpilot`.
3. Copy the **tunnel token** it shows (a long string) — this goes in `.env`.
4. Under the tunnel's **Public Hostnames**, add:
   - **Subdomain:** `pathpilot`  **Domain:** `meetiqpro.ai`
   - **Service:** `HTTP`  →  `web:80`
     > `web` is the container name on the compose network; the tunnel runs in
     > the same stack, so it reaches nginx directly.
5. Save. Cloudflare creates the `pathpilot.meetiqpro.ai` DNS record automatically.

---

## 3. Lock it down with Cloudflare Access

1. **Zero Trust** → **Access** → **Applications** → **Add an application** → **Self-hosted**.
2. **Application domain:** `pathpilot.meetiqpro.ai`.
3. Add a **policy**:
   - Action: **Allow**
   - Include → **Emails** → list the family member emails that may sign in.
4. Save. On the application's **Overview** page, copy the
   **Application Audience (AUD) Tag** — this is `CF_ACCESS_AUD`.
5. Your team domain (e.g. `yourteam.cloudflareaccess.com`) is `CF_ACCESS_TEAM_DOMAIN`
   (Zero Trust → Settings → Custom Pages / team domain).

The backend verifies the signed Access JWT on every request and keys each
user's data to their verified email — so no passwords are stored anywhere.

---

## 4. Configure `.env`

On the host, in the project folder:

```bash
cp .env.example .env
```

Fill in:

```env
CLOUDFLARE_TUNNEL_TOKEN="<token from step 2>"
CF_ACCESS_TEAM_DOMAIN="yourteam.cloudflareaccess.com"
CF_ACCESS_AUD="<AUD tag from step 3>"
```

---

## 5. Launch

```bash
# Build and start everything, including the tunnel
docker compose --profile cloudflare up -d --build
```

Then:

- Public: **https://pathpilot.meetiqpro.ai** (prompts Cloudflare Access login).
- On the LAN (no Access gate): **http://<windows-host-ip>:8080**.
- API health: `curl http://localhost:8080/api/health` → `{"ok":true,...}`.

> Omit `--profile cloudflare` to run only `web` + `api` locally (LAN-only, no
> public URL). In that mode the API has no Access in front, so it uses the
> single `dev@local` identity.

---

## 6. Updating after code changes

```bash
git pull
docker compose --profile cloudflare up -d --build
```

The `pathpilot_data` volume (everyone's saved portfolios) persists across
rebuilds.

---

## 7. Backups

The whole database is the `pathpilot_data` volume. To snapshot it:

```bash
docker run --rm -v pathpilot_data:/data -v "$PWD":/backup alpine \
  tar czf /backup/pathpilot-db-backup.tar.gz -C /data .
```

Users can also self-export their own data any time via the in-app
**Backup & Restore** button (JSON download/restore).

---

## 8. Running alongside tv-tracker

Nothing to change on the tv-tracker side. The two stacks share only the Docker
engine:

- Distinct container names (`pathpilot_*` vs `tvtracker_*`) and volumes.
- PathPilot publishes host port **8080**; tv-tracker uses **4000** / **5432**.
- Each stack has its **own** Cloudflare Tunnel and token.

Manage them independently with `docker compose` from their respective folders.
