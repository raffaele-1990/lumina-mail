#!/usr/bin/env python3
"""
Converts a 1024x1024 RGBA PNG icon into a multi-resolution Windows .ico file
(16x16, 32x32, 48x48, 256x256) using open-source Pillow (HPND license).
"""
import sys
from pathlib import Path
from PIL import Image

SIZES = [(16, 16), (32, 32), (48, 48), (256, 256)]

def main() -> int:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("resources/luminamail_1024.png")
    dst = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("resources/luminamail.ico")

    if not src.exists():
        print(f"Source PNG not found: {src}", file=sys.stderr)
        return 1

    with Image.open(src) as img:
        rgba = img.convert("RGBA")
        dst.parent.mkdir(parents=True, exist_ok=True)
        rgba.save(dst, format="ICO", sizes=SIZES, bitmap_format="bmp")

    print(f"Generated {dst} with sizes: {SIZES}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
