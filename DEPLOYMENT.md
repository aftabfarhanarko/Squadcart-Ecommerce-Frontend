# SquadCart — Deployment Guide 🚀

> এই guide পড়লে একদম beginner-ও SquadCart deploy করতে পারবে।
> প্রতিটা step বাংলায় explain করা আছে।

---

## Table of Contents

1. [Architecture (কিভাবে কাজ করে)](#architecture)
2. [Quick Deploy (১ command এ deploy)](#quick-deploy)
3. [Step-by-Step Guide (ধাপে ধাপে)](#step-by-step-guide)
4. [File Structure (কোন file কি করে)](#file-structure)
5. [Environment Variables](#environment-variables)
6. [Deploy Options (Railway / VPS / Manual)](#deploy-options)
7. [Common Commands](#common-commands)
8. [Troubleshooting](#troubleshooting)
9. [SSL/HTTPS Setup](#ssl-setup)

---

## Architecture

SquadCart Nginx server-কে dynamic reverse proxy হিসেবে ব্যবহার করে এবং multi-tenant backend architecture-এ কাজ করে:

```
                          ┌───────────────────────────┐
                          │          Nginx            │
                          │      (Reverse Proxy)      │
                          └────┬───┬───┬───┬───┬───┬──┘
                               │   │   │   │   │   │
     console.squadcart.com ────┘   │   │   │   │   └──── api-console.squadcart.com (Admin API :8001)
     app.squadcart.com ────────────┘   │   │   └──────── api-app.squadcart.com (Merchant API :8002)
     squadcart.com ────────────────────┘   └──────────── *.squadcart.app (Merchant storefronts :3003)
                                           
                                           
                     ┌───────────────┐               ┌───────────────┐
                     │ Console App   │               │ Merchant App  │
                     │ (Next.js)     │               │ (Next.js)     │
                     │ Port 3001     │               │ Port 3002     │
                     └───────────────┘               └───────────────┘
                             │                               │
                             ▼                               ▼
                     ┌───────────────┐               ┌───────────────┐
                     │  api-console  │               │    api-app    │
                     │  (NestJS API) │               │  (NestJS API) │
                     │   Port 8001   │               │   Port 8002   │
                     └───────┬───────┘               └───────┬───────┘
                             │                               │
                             ▼                               ▼
                         ┌──────────────────────────────────────┐
                         │      PostgreSQL & Redis (Shared)     │
                         └──────────────────────────────────────┘
```

### Apps & Services

| App/Service | Directory | Framework | Domain / URL | Port (Dev/Prod) |
| ----------- | --------- | --------- | ------------ | --------------- |
| **API-Console**| `apps/api-console`| NestJS | `api-console.squadcart.com`| 8001 |
| **API-App**    | `apps/api-app`    | NestJS | `api-app.squadcart.com`    | 8002 |
| **Console**    | `apps/console`    | Next.js | `console.squadcart.com`    | 5173 / 3001 |
| **App**        | `apps/app`        | Next.js | `app.squadcart.com`        | 5174 / 3002 |
| **Landing**    | `apps/landing`    | Next.js | `squadcart.com`            | 3000 / 3000 |
| **Themes**     | `apps/themes`     | Next.js | `*.squadcart.app`          | 3003 / 3000 |

---

## Split Console & App Architecture

SquadCart এখন **Super Admin Panel** (`console.squadcart.com`) এবং **Merchant Panel** (`app.squadcart.com`) আলাদা আলাদা app-এ বিভক্ত করেছে:

- **Super Admins**রা `console.squadcart.com` ব্যবহার করে log in করবেন। এটি `api-console` backend-এর সাথে কানেক্ট হয়।
- **Merchants**রা `app.squadcart.com` ব্যবহার করে log in করবেন। এটি `api-app` backend-এর সাথে কানেক্ট হয়।
- এটি সিকিউরিটি বাড়ায় এবং প্রতিটা পোর্টালে ডেটা আইসোলেশন ও ইন্ডিপেন্ডেন্ট স্কেলিং নিশ্চিত করে।

---

## Quick Deploy

### Prerequisites (আগে এগুলো install করতে হবে)

1. **Docker** — [Install Docker](https://docs.docker.com/get-docker/)
2. **Node.js 20+** — [Install Node.js](https://nodejs.org/)
3. **Git** — [Install Git](https://git-scm.com/)

### ১ Command Deploy

```bash
# Step 1: Clone
git clone git@github.com:SquadLog/squadcart.git
cd squadcart

# Step 2: Environment setup
cp .env.example .env
nano .env  # ← Edit with your real values

# Step 3: Deploy! 🚀
./deploy.sh
```

**ব্যস! এইটুকুই!** 🎉

After deploy:

- Landing Page → `http://squadcart.com`
- Super Admin Panel → `http://console.squadcart.com`
- Merchant Dashboard → `http://app.squadcart.com`
- Super Admin API → `http://api-console.squadcart.com`
- Merchant API → `http://api-app.squadcart.com`
- Storefront Themes → `http://*.squadcart.app`

---

## Step-by-Step Guide

> যদি `./deploy.sh` কাজ না করে বা manually করতে চাও, এই steps follow করো:

### Step 1: Server এ Login করো

```bash
ssh root@your-server-ip
```

### Step 2: Docker Install করো (যদি না থাকে)

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh

# Docker ঠিকমতো চলছে কিনা check করো
docker --version
docker compose version
```

### Step 3: Node.js Install করো (যদি না থাকে)

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Check
node --version  # v20.x.x হওয়া উচিত
npm --version
```

### Step 4: Project Clone করো

```bash
cd /home
git clone git@github.com:SquadLog/squadcart.git
cd squadcart
```

### Step 5: Environment Variables সেট করো

```bash
cp .env.example .env
nano .env
```

**Must change:**

- `POSTGRES_PASSWORD` → Strong password দাও
- `DATABASE_URL` → Same password ব্যবহার করো
- `JWT_SECRET` → Random string দাও
- `JWT_REFRESH_SECRET` → Different random string দাও

> 💡 Random string generate করতে: `openssl rand -hex 32`

### Step 6: Console Build

```bash
# Console dependencies install
cd apps/console
npm ci

# Console build
npm run build
cp -r dist ../../nginx/console

# Go back to root
cd ../..
```

### Step 7: Docker Start

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### Step 8: Check করো সব চলছে কিনা

```bash
docker compose -f docker-compose.prod.yml ps
```

সব service `running` দেখাবে:

```
NAME          STATUS
db            running (healthy)
redis         running (healthy)
api-console   running
api-app       running
console       running
app           running
landing       running
themes        running
nginx         running
```

---

## File Structure

```
squadcart/
│
├── 📄 deploy.sh                    ← One-click deploy script
├── 📄 docker-compose.prod.yml      ← Production Docker setup
├── 📄 docker-compose.yml           ← Development Docker setup
├── 📄 .env.example                 ← Environment variable template
├── 📄 DEPLOYMENT.md                ← This file
│
├── 📁 nginx/                       ← Nginx reverse proxy
│   ├── Dockerfile                  ← Nginx container
│   ├── default.conf                ← Routing config
│   └── console/                    ← (auto-created by deploy.sh)
│
├── 📁 apps/
│   ├── 📁 api-console/             ← Super Admin Backend API
│   │   ├── Dockerfile
│   │   └── src/
│   │
│   ├── 📁 api-app/                 ← Merchant Backend API
│   │   ├── Dockerfile
│   │   └── src/
│   │
│   ├── 📁 console/                 ← Super Admin Dashboard Frontend
│   │   ├── Dockerfile
│   │   └── src/
│   │
│   ├── 📁 app/                     ← Merchant Dashboard Frontend
│   │   ├── Dockerfile
│   │   └── src/
│   │
│   ├── 📁 landing/                 ← Landing Page (Next.js)
│   │   ├── Dockerfile
│   │   └── src/
│   │
│   └── 📁 themes/                  ← Merchant Storefront (Next.js)
│       ├── Dockerfile
│       └── src/
│
├── 📁 packages/
│   └── 📁 database/                ← Shared Prisma database module
│
└── 📄 package.json                 ← Root workspace config
```

---

## Environment Variables

### `.env` file — API এর জন্য

| Variable                | কি করে                 | Example                                      |
| ----------------------- | ---------------------- | -------------------------------------------- |
| `POSTGRES_DB`           | Database name          | `squadcart`                                  |
| `POSTGRES_USER`         | Database user          | `postgres`                                   |
| `POSTGRES_PASSWORD`     | Database password      | `strong_password_123`                        |
| `DATABASE_URL`          | Full DB connection URL | `postgres://postgres:pass@db:5432/squadcart` |
| `JWT_SECRET`            | JWT token signing key  | `openssl rand -hex 32`                       |
| `JWT_REFRESH_SECRET`    | Refresh token key      | `openssl rand -hex 32`                       |
| `PORT`                  | API port               | `8000`                                       |
| `RESEND_API_KEY`        | Email service key      | From resend.com                              |
| `CLOUDINARY_CLOUD_NAME` | Image upload           | From cloudinary.com                          |

### Console app — `apps/console/.env`

| Variable               | কি করে       | Example         |
| ---------------------- | ------------ | --------------- |
| `VITE_API_URL`         | API base URL | `/api`          |
| `VITE_ENV`             | Environment  | `PRODUCTION`    |
| `VITE_APP_BASE_DOMAIN` | Base domain  | `squadcart.app` |

---

## Deploy Options

### Option 1: VPS with Docker ✅ (Recommended)

```bash
./deploy.sh
```

সবচেয়ে সহজ এবং recommended। একটা `$5/month` DigitalOcean Droplet এ চালানো যায়।

### Option 2: Railway ☁️ (Current Production)

Railway তে ৪টা primary service থাকবে:
- `api-console` (Super Admin API)
- `api-app` (Merchant API)
- `console` (Super Admin Frontend)
- `app` (Merchant Frontend)

### Option 3: Manual VPS (No Docker)

```bash
# 1. Build APIs
cd apps/api-console && npm ci && npm run build
pm2 start dist/main.js --name api-console
cd ../api-app && npm ci && npm run build
pm2 start dist/main.js --name api-app

# 2. Build Frontends
cd ../console && npm ci && npm run build
pm2 start .next/standalone/server.js --name console -- -p 3001
cd ../app && npm ci && npm run build
pm2 start .next/standalone/server.js --name app -- -p 3002

# 3. Build Landing
cd ../landing && yarn && yarn build
pm2 start .next/standalone/server.js --name landing

# 4. Build Themes
cd ../themes && npm ci && npm run build
pm2 start .next/standalone/server.js --name themes -- -p 3003

# 5. Copy Nginx config
sudo cp ../../nginx/default.conf /etc/nginx/conf.d/squadcart.conf
sudo nginx -t && sudo systemctl reload nginx
```

---

## Common Commands

```bash
# ── Docker Compose Commands ──

# সব service চালু করো
docker compose -f docker-compose.prod.yml up -d

# সব service বন্ধ করো
docker compose -f docker-compose.prod.yml down

# সব restart করো
docker compose -f docker-compose.prod.yml restart

# restart API
docker compose -f docker-compose.prod.yml restart api-app

# logs API
docker compose -f docker-compose.prod.yml logs -f api-app

# শুধু API logs
docker compose -f docker-compose.prod.yml logs -f api

# Running containers দেখো
docker compose -f docker-compose.prod.yml ps

# Force rebuild all
docker compose -f docker-compose.prod.yml up --build -d

# ── Development Commands ──

# Console dev mode
npm run dev:console

# App dev mode
npm run dev:app

# API-Console dev mode
npm run dev:api-console

# API-App dev mode
npm run dev:api-app

# ── Git Update + Redeploy ──

git pull origin main
./deploy.sh
```

---

## Troubleshooting

### ❌ "Port 80 is already in use"

```bash
# কে ব্যবহার করছে দেখো
sudo lsof -i :80
# Apache/Nginx বন্ধ করো
sudo systemctl stop apache2
sudo systemctl stop nginx
```

### ❌ "Database connection refused"

```bash
# Database container চলছে কিনা দেখো
docker compose -f docker-compose.prod.yml ps db
# Logs check করো
docker compose -f docker-compose.prod.yml logs db
```

### ❌ "Console shows 404"

```bash
# nginx/console/ folder এ files আছে কিনা দেখো
ls -la nginx/console/
# না থাকলে rebuild করো
cd apps/console
npm run build && cp -r dist ../../nginx/console
cd ../..
docker compose -f docker-compose.prod.yml restart nginx
```

### ❌ "API returns 502 Bad Gateway"

```bash
# API container চলছে কিনা দেখো
docker compose -f docker-compose.prod.yml logs api
# Restart করো
docker compose -f docker-compose.prod.yml restart api
```

---

## SSL Setup

Production deploy এ HTTPS mandatory। Certbot দিয়ে free SSL certificate পাবে:

### Step 1: Domain DNS সেট করো

- A Record: `your-domain.com` → `your-server-ip`
- A Record: `*.your-domain.com` → `your-server-ip` (themes subdomain এর জন্য)

### Step 2: Certbot Install করো

```bash
sudo apt install certbot python3-certbot-nginx
```

### Step 3: SSL Certificate নাও

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Step 4: Auto-renewal (automatic)

```bash
# Certbot automatically adds cron job
# Check it:
sudo certbot renew --dry-run
```

---

## 🚀 Auto-Scaling & Performance Optimization

With the integration of **Redis**, the SquadCart API is now fully **stateless**. This allows for horizontal scaling (adding more instances) to handle increased traffic.

### 1. Horizontal Pod Autoscaling (HPA)
If deploying via Kubernetes or Railway, configure your autoscaling settings:
- **CPU Threshold**: 70%
- **Memory Threshold**: 80%
- **Min Instances**: 2 (for high availability)
- **Max Instances**: 10+ (depending on load)

### 2. Redis-Based Usage Tracking
Visitor hits are now tracked in real-time using Redis `INCR`. This offloads high-frequency writes from the main PostgreSQL database, significantly improving response times for storefronts.
- **Sync Interval**: Redis counts are synced to Postgres every 100 hits.
- **Monthly Reset**: Counts are partitioned by month (e.g., `usage:visitors:CID:2026-03`) and reset automatically.

### 3. Database Connection Pooling
Ensure your `DATABASE_URL` uses a connection pooler (like PgBouncer) if scaling beyond 5 API instances to avoid "too many connections" errors.

### 4. Shared State
By using Redis as the global cache store, features like:
- Subdomain resolution caching
- Visitor hit counting
- Session management (upcoming)
are shared across all horizontally scaled API instances.
