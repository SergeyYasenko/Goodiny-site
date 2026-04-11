#!/usr/bin/env bash
# WebM VP9 с альфой для GOODINI GALAXY: вырезает тёмный фон (colorkey) из исходного ролика.
# Исходник по умолчанию — текущий вебм киоска; результат — Galaxy_alpha.webm (путь в productEquipment.ts).
#
# Запуск из корня репозитория:
#   bash scripts/encode-galaxy-alpha-webm.sh
#
# Подбор colorkey: similarity / blend — если «ест» объект или остаётся кайма, уменьшайте similarity.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${ROOT}/public/image/ProjectsPage/videos/Kiosk_2.webm"
DST="${ROOT}/public/image/ProjectsPage/videos/Galaxy_alpha.webm"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg не найден в PATH" >&2
  exit 1
fi

if [[ ! -f "$SRC" ]]; then
  echo "Нет исходника: $SRC" >&2
  exit 1
fi

echo "==> $SRC -> $DST"
ffmpeg -y -i "$SRC" -an \
  -vf "colorkey=black:0.32:0.16,format=yuva420p" \
  -c:v libvpx-vp9 -pix_fmt yuva420p -auto-alt-ref 0 \
  -b:v 0 -crf 28 \
  "$DST"
echo "Готово."
