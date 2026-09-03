#!/usr/bin/env bash
#
# Nightly Postgres backup for RoundsAhead.
# Runs pg_dump inside the postgres container, gzips to ./backups on the host,
# verifies the dump is non-empty, and prunes backups older than RETENTION_DAYS.
#
# Usage:  scripts/backup-db.sh          (run from anywhere; it cd's to repo root)
# Cron:   0 3 * * * cd /home/jeremy/pathpilot && ./scripts/backup-db.sh >> ./backups/backup.log 2>&1
set -euo pipefail

# cron runs with a minimal PATH; make sure docker is found.
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:${PATH:-}"

cd "$(dirname "$0")/.."

BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
DB_USER="${DB_USER:-roundsahead}"
DB_NAME="${DB_NAME:-roundsahead}"

mkdir -p "$BACKUP_DIR"
TS="$(date +%Y%m%d_%H%M%S)"
FILE="$BACKUP_DIR/roundsahead_${TS}.sql.gz"

echo "[$(date -Is)] Starting backup -> $FILE"

# -T disables the pseudo-TTY so the piped output stays clean.
docker compose exec -T postgres pg_dump -U "$DB_USER" -d "$DB_NAME" --clean --if-exists \
  | gzip > "$FILE"

# Sanity check: the gzip must decompress to something that looks like a dump.
if [ ! -s "$FILE" ] || ! gzip -dc "$FILE" | head -n 20 | grep -q "PostgreSQL database dump"; then
  echo "[$(date -Is)] ERROR: backup looks invalid, removing $FILE" >&2
  rm -f "$FILE"
  exit 1
fi

# Prune old backups.
find "$BACKUP_DIR" -name 'roundsahead_*.sql.gz' -type f -mtime +"$RETENTION_DAYS" -delete

echo "[$(date -Is)] Backup OK: $FILE ($(du -h "$FILE" | cut -f1)); kept $(ls -1 "$BACKUP_DIR"/roundsahead_*.sql.gz 2>/dev/null | wc -l) file(s)"

# ── Optional off-host copy (recommended: protects against total VM loss) ──
# If rclone is configured with a remote named "$RCLONE_REMOTE", push a copy.
if [ -n "${RCLONE_REMOTE:-}" ] && command -v rclone >/dev/null 2>&1; then
  rclone copy "$FILE" "$RCLONE_REMOTE" && echo "[$(date -Is)] Off-host copy -> $RCLONE_REMOTE"
fi
