#!/usr/bin/env bash
# Сжатие фоновых роликов для страницы «Продукт» (H.264, без аудио, быстрый старт воспроизведения).
# Качество: CRF 18 — визуально близко к исходнику; файлы заметно меньше исходных.
# Абсолютно без потери бит в бит только при lossless (огромные файлы) — для веба обычно не нужно.
#
# Установка: положите исходники в public/video/product/raw/ с именами:
#   xl.mp4 (или .mov), digital-desk.mp4, galaxy.mp4, ultra.mp4
# Запуск из корня репозитория:
#   bash scripts/compress-product-videos.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="${ROOT}/public/video/product/raw"
OUT="${ROOT}/public/video/product"

mkdir -p "$RAW" "$OUT"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg не найден в PATH" >&2
  exit 1
fi

reencode() {
  local stem="$1"
  local src=""
  for ext in mp4 mov mkv webm; do
    if [[ -f "${RAW}/${stem}.${ext}" ]]; then
      src="${RAW}/${stem}.${ext}"
      break
    fi
  done
  if [[ -z "$src" ]]; then
    echo "Пропуск: нет файла ${stem}.(mp4|mov|mkv|webm) в ${RAW}"
    return 0
  fi
  local dst="${OUT}/${stem}.mp4"
  echo "==> ${src} -> ${dst}"
  ffmpeg -y -i "$src" \
    -an \
    -c:v libx264 -profile:v high -level 4.1 \
    -pix_fmt yuv420p \
    -crf 18 -preset slow \
    -movflags +faststart \
    "$dst"
}

reencode "xl"
reencode "digital-desk"
reencode "galaxy"
reencode "ultra"

echo "Готово. Файлы: ${OUT}/xl.mp4, digital-desk.mp4, galaxy.mp4, ultra.mp4"
