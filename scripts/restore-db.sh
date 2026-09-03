#!/usr/bin/env bash
#
# Restore a RoundsAhead Postgres backup produced by backup-db.sh.
#
#   scripts/restore-db.sh backups/roundsahead_YYYYMMDD_HHMMSS.sql.gz            # restore into the live DB
#   scripts/restore-db.sh backups/roundsahead_....sql.gz roundsahead_restore_test  # into a scratch DB
#
# The dump uses --clean --if-exists, so restoring into the live DB drops and
# recreates its objects. Use a scratch DB name (2nd arg) to test a restore
# without touching production.
set -euo pipefail
export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:${PATH:-}"
cd "$(dirname "$0")/.."

FILE="${1:?usage: restore-db.sh <backup.sql.gz> [target_db]}"
TARGET_DB="${2:-roundsahead}"
DB_USER="${DB_USER:-roundsahead}"

[ -f "$FILE" ] || { echo "No such file: $FILE" >&2; exit 1; }

echo "Restoring $FILE -> database '$TARGET_DB' ..."
gzip -dc "$FILE" | docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$TARGET_DB"
echo "Restore into '$TARGET_DB' complete."
