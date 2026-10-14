#!/usr/bin/env bash
# Build with the repository sub-path as base and push dist/ to the gh-pages branch.
set -euo pipefail
cd "$(dirname "$0")/.."

REMOTE_URL=$(git remote get-url origin)
REPO_NAME=$(basename -s .git "$REMOTE_URL")
export VITE_BASE="/${REPO_NAME}/"

npm run build
touch dist/.nojekyll

cd dist
git init -q -b gh-pages
git add -A
git -c user.name="deploy" -c user.email="deploy@local" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -f "$REMOTE_URL" gh-pages:gh-pages
cd ..
rm -rf dist/.git
echo "Deployed with base ${VITE_BASE}"
