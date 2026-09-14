# SquadCart Migration & Portability Guide 🚀

This document explains how to move SquadCart from one server/provider to another.

## 1. Fast Setup on a New Server

If you move to a new VPS (DigitalOcean, Vultr, AWS, etc.), follow these steps:

1. **Prerequisites:** Install Docker and Docker Compose.
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```
2. **Transfer Files:** Copy `.env`, `docker-compose.prod.yml`, and `nginx/` folder to the new server.
3. **Run:**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

## 2. Moving between AWS Accounts

1. **ECR Migration:** You can either keep images in the old account or create new ECR repos in the new account.
2. **GitHub Secrets:** Update `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `EC2_HOST` in GitHub repository settings.
3. **Image URI:** If ECR changes, update the image names in `docker-compose.prod.yml`.

## 3. Database Migration (PostgreSQL)

To move your data to a new server:

**On the OLD server:**
```bash
docker exec -t squadcart-db-1 pg_dumpall -c -U postgres > dump.sql
```

**On the NEW server:**
1. Start the containers.
2. Restore:
```bash
cat dump.sql | docker exec -i squadcart-db-1 psql -U postgres
```

## 4. IP Whitelisting (Important)

If the server IP changes:
1. Update `EC2_HOST` in GitHub Secrets.
2. Re-obtain SSL certificate (Certbot).
3. Update any 3rd party services (Restel, Airalo, Cloudinary) with the new IP if they use whitelisting.

---
*Portable by Design — Powered by Docker*
