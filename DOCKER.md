# SquadCart Themes — Docker Guide 🐳

This repository runs the core merchant themes utilizing Next.js Server Components. It is containerized using an optimized multi-stage build structure.

---

## 👨‍💻 For Developers (Local Setup)

You can spin up the Next.js `squadcart-themes` frontend locally and connect it to your local backend for full e2e development.

### 1. Configure the `.env` file

```bash
cp .env.example .env
```

Ensure `NEXT_PUBLIC_API_URL` is pointing correctly.

### 2. Start the Stack

This spins up the production Next.js server on port `3000`.

```bash
docker compose up -d
```

_(For hot-reloading development, uncomment the `command: npm run dev` block in `docker-compose.yml`)_

### 3. Check Logs

```bash
docker compose logs -f themes
```

### 4. Stop the Stack

```bash
docker compose down
```

---

## 🛠 For DevOps (Production Deployment)

The included `Dockerfile` is highly optimized for size and performance, extracting only the `standalone` build artifacts output by Next.js.

- **Base Image**: `node:22-alpine`
- **Output Port**: `3000`
- **Start Command**: `node server.js`
- **Environment**: Automatically provisions `.next/standalone` folder.

### Build & Run Manually

```bash
docker build -t squadcart/themes:latest .

docker run -d \
  --name squadcart-themes-prod \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL="https://squadcart-backend.up.railway.app" \
  squadcart/themes:latest
```
