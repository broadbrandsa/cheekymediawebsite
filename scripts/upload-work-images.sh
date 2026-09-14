#!/bin/bash
cd "/Users/mikeelmira/Desktop/Cheeky Media Website/cheeky-media"
out=/tmp/asset-map.txt
: > "$out"
for f in public/images/work/*.jpg; do
  slug=$(basename "$f" .jpg)
  id=$(npx sanity assets upload --file "$f" --type image 2>/dev/null \
        | grep -oE '"_id": "image-[a-z0-9]+-[0-9]+x[0-9]+-jpg"' \
        | head -1 | sed 's/.*"\(image-[^"]*\)".*/\1/')
  if [ -n "$id" ]; then
    echo "$slug|$id" >> "$out"
    echo "ok   $slug"
  else
    echo "FAIL $slug"
  fi
done
echo "---"
wc -l < "$out"
