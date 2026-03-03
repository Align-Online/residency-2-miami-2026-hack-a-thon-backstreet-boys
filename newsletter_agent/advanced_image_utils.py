import os
import io
import base64
import subprocess
import requests
from PIL import Image


def _safe_write(path: str, content: bytes):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(content)


def download_and_convert(url: str, dest_dir: str) -> str:
    """Download image and convert AVIF -> PNG when needed. Returns local path."""
    os.makedirs(dest_dir, exist_ok=True)
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    content = resp.content
    ct = resp.headers.get("content-type", "").lower()
    lower = url.lower()
    is_avif = "avif" in ct or lower.endswith(".avif")

    # naive filename creation
    basename = os.path.basename(lower.split("?")[0]) or "image"
    name, ext = os.path.splitext(basename)
    if is_avif:
        raw_path = os.path.join(dest_dir, f"{name}.avif")
        _safe_write(raw_path, content)
        png_path = os.path.join(dest_dir, f"{name}.png")
        # try Pillow first
        try:
            img = Image.open(io.BytesIO(content))
            img.convert("RGB").save(png_path, "PNG")
            return png_path
        except Exception:
            # fallback to ImageMagick (magick on Windows)
            for cmd in (["magick", raw_path, png_path], ["convert", raw_path, png_path]):
                try:
                    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    return png_path
                except Exception:
                    continue
            raise RuntimeError("Failed to convert AVIF. Install Pillow with AVIF support or ImageMagick.")
    else:
        ext = ext.lstrip(".") or "img"
        path = os.path.join(dest_dir, f"{name}.{ext}")
        _safe_write(path, content)
        return path


def image_to_data_uri(path: str) -> str:
    """Return image file as data URI for embedding in HTML."""
    mime = "image/png"
    lower = path.lower()
    if lower.endswith(".jpg") or lower.endswith(".jpeg"):
        mime = "image/jpeg"
    elif lower.endswith(".webp"):
        mime = "image/webp"
    elif lower.endswith(".avif"):
        mime = "image/avif"
    elif lower.endswith(".gif"):
        mime = "image/gif"
    with open(path, "rb") as f:
        raw = f.read()
    b64 = base64.b64encode(raw).decode("ascii")
    return f"data:{mime};base64,{b64}"
