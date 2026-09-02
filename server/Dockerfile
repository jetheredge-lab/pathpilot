# --- Builder: compile TS and build the native better-sqlite3 module ---
# Debian slim (not alpine) keeps native module builds painless.
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Toolchain for node-gyp / better-sqlite3
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Drop dev dependencies for the runtime image (keeps the compiled
# better-sqlite3 binary from the install above).
RUN npm prune --omit=dev

# --- Runner ---
FROM node:20-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV DB_PATH=/app/data/pathpilot.db

COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# SQLite file lives on a mounted volume (see docker-compose.yml).
RUN mkdir -p /app/data

EXPOSE 4100
CMD ["node", "dist/index.js"]
