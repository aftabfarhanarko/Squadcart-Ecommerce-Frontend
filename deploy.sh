#!/bin/bash
# ──────────────────────────────────────────────────────────
# SquadCart — Production Deploy Script
# ──────────────────────────────────────────────────────────
#
# This script does EVERYTHING:
#   1. Builds Console SPA (base: /console/)
#   2. Starts all Docker containers (DB, API, Landing, Themes, Nginx)
#
# Usage:
#   chmod +x deploy.sh      (first time only)
#   ./deploy.sh             (deploy everything)
#   ./deploy.sh --rebuild   (force rebuild all Docker images)
#
# After deploy, access at:
#   Landing:  http://localhost
#   Console:  http://localhost/console/
#   API:      http://localhost/api/
#   Themes:   http://localhost:3001
#
# ──────────────────────────────────────────────────────────

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🚀 SquadCart Production Deploy        ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}"
echo ""

# ── Check prerequisites ──
echo -e "${YELLOW}[1/6]${NC} Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo "   Install from: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "   Install from: https://nodejs.org/"
    exit 1
fi

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Creating from .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}   ⚠️  Please edit .env with your real values before continuing!${NC}"
        echo ""
        read -p "   Press Enter after editing .env, or Ctrl+C to cancel..."
    else
        echo -e "${RED}❌ No .env.example found either. Create a .env file first.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Prerequisites OK${NC}"

# ── Build Docker images ──
echo ""
echo -e "${YELLOW}[2/4]${NC} Building Docker images..."
BUILD_FLAG=""
if [ "$1" == "--rebuild" ]; then
    BUILD_FLAG="--no-cache"
    echo -e "${YELLOW}   ⚠️  Force rebuilding all images (--rebuild flag)${NC}"
fi
docker compose -f docker-compose.prod.yml build $BUILD_FLAG
echo -e "${GREEN}✅ Docker images built${NC}"

# ── Start containers ──
echo ""
echo -e "${YELLOW}[3/4]${NC} Starting containers..."
docker compose -f docker-compose.prod.yml up -d
echo -e "${GREEN}✅ Containers started${NC}"

# ── Health check ──
echo ""
echo -e "${YELLOW}[4/4]${NC} Waiting for services to start..."
sleep 5

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║               ✅ Deploy Complete!                     ║${NC}"
echo -e "${BLUE}╠═══════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║                                                       ║${NC}"
echo -e "${BLUE}║  🔌 Storefront API:     http://localhost:8003          ║${NC}"
echo -e "${BLUE}║  🎨 Storefront/Themes:  http://localhost:3003          ║${NC}"
echo -e "${BLUE}                                                       ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  docker compose -f docker-compose.prod.yml logs -f           # View all logs"
echo "  docker compose -f docker-compose.prod.yml logs api-themes   # View Storefront API logs"
echo "  docker compose -f docker-compose.prod.yml logs themes       # View Themes frontend logs"
echo "  docker compose -f docker-compose.prod.yml down              # Stop everything"
echo "  docker compose -f docker-compose.prod.yml restart           # Restart all"
echo ""
