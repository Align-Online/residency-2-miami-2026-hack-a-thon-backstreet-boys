import os
import io
import tempfile
import subprocess
import requests
from PIL import Image


def download_image(url: str, dest_dir: str) -> str:
    """Download an image and convert AVIF to PNG when necessary.

    Returns path to the local image file (PNG or original format).
    """
    os.makedirs(dest_dir, exist_ok=True)
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    content_type = resp.headers.get("content-type", "")
    lower = url.lower()
    is_avif = "avif" in content_type or lower.endswith(".avif")

    # choose filename
    ext = "avif" if is_avif else (lower.split(".")[-1].split("?")[0] or "img")
    base = os.path.join(dest_dir, "image")
    filename = f"{base}.{ext}"
    with open(filename, "wb") as f:
        f.write(resp.content)

    if is_avif:
        png_path = f"{base}.png"
        try:
            img = Image.open(io.BytesIO(resp.content))
            img.convert("RGB").save(png_path, "PNG")
            return png_path
        except Exception:
            # Fallback: try ImageMagick ('magick' on Windows or 'convert' on other)
            tmp = filename
            cmds = (["magick", tmp, png_path], ["convert", tmp, png_path])
            for cmd in cmds:
                try:
                    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    return png_path
                except Exception:
                    continue
            raise RuntimeError(
                "Failed to convert AVIF to PNG. Install Pillow with AVIF support or ImageMagick with AVIF delegate."
            )
    else:
        return filename
