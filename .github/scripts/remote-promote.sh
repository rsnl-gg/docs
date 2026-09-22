set -euo pipefail

: "${DEPLOY_SRC:?}"
: "${DEPLOY_PATH:?}"
: "${ARTIFACT_NAME:?}"
: "${VERSION:?}"
: "${ATTEMPT:?}"
: "${SYSTEMD_UNIT:?}"

ARCHIVE_ROOT="/opt/rsnl/artifacts/${ARTIFACT_NAME}/${VERSION}/_attempt${ATTEMPT}"
mkdir -p "$ARCHIVE_ROOT"

RSYNC_EXCLUDES=(--exclude '.env' --exclude 'node_modules')

echo "Archiving to ${ARCHIVE_ROOT}"
rsync -a --delete "${RSYNC_EXCLUDES[@]}" "${DEPLOY_SRC}/" "${ARCHIVE_ROOT}/"

echo "Promoting to ${DEPLOY_PATH}"
rsync -a --delete "${RSYNC_EXCLUDES[@]}" "${DEPLOY_SRC}/" "${DEPLOY_PATH}/"

if [ -f "${DEPLOY_PATH}/build/server/index.js" ]; then
  sed -i 's|build\\client|build/client|g' "${DEPLOY_PATH}/build/server/index.js" 2>/dev/null || true
  sed -i 's|build\\\\client|build/client|g' "${DEPLOY_PATH}/build/server/index.js" 2>/dev/null || true
fi

cd "$DEPLOY_PATH"
if [ -f package-lock.json ]; then
  rm -rf node_modules
  npm install --omit=dev
fi

echo "Restarting ${SYSTEMD_UNIT}"
sudo systemctl restart "${SYSTEMD_UNIT}"

if [ -n "${HEALTH_URL:-}" ]; then
  for _ in $(seq 1 90); do
    if curl -sf "${HEALTH_URL}" >/dev/null 2>&1; then
      echo "Health check OK"
      exit 0
    fi
    sleep 1
  done
  sudo journalctl -u "${SYSTEMD_UNIT}" -n 50 --no-pager || true
  exit 1
fi

sleep 2
systemctl is-active --quiet "${SYSTEMD_UNIT}"
