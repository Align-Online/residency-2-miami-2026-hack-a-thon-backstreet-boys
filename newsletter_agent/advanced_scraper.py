from typing import Dict, List
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def _parse_json_ld(soup: BeautifulSoup) -> List[dict]:
    docs = []
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string)
            if isinstance(data, list):
                docs.extend(data)
            else:
                docs.append(data)
        except Exception:
            continue
    return docs


def fetch_event(url: str) -> Dict:
    """Fetch a single event page and extract richer Luma-friendly fields.

    Returns keys: title, description, images (list), url, start, end, location, raw_jsonld
    """
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    html = resp.text
    soup = BeautifulSoup(html, "html.parser")

    def meta(name):
        tag = soup.find("meta", property=name) or soup.find("meta", attrs={"name": name})
        return tag.get("content") if tag and tag.get("content") else None

    canonical = meta("og:url") or url

    json_ld = _parse_json_ld(soup)
    event = None
    for doc in json_ld:
        typ = doc.get("@type") if isinstance(doc, dict) else None
        if typ:
            if isinstance(typ, list):
                is_event = any(t.lower() == "event" for t in typ if isinstance(t, str))
            else:
                is_event = str(typ).lower() == "event"
            if is_event:
                event = doc
                break

    title = None
    description = None
    images: List[str] = []
    start = None
    end = None
    location = None

    if event:
        title = event.get("name")
        description = event.get("description")
        start = event.get("startDate")
        end = event.get("endDate")
        loc = event.get("location")
        if isinstance(loc, dict):
            location = loc.get("name") or loc.get("address")
        images_field = event.get("image")
        if isinstance(images_field, list):
            images = images_field
        elif isinstance(images_field, str):
            images = [images_field]

    if not title:
        title = meta("og:title") or (soup.title.string.strip() if soup.title else "")
    if not description:
        description = meta("og:description") or meta("description")
    og_image = meta("og:image")
    if og_image and og_image not in images:
        images.insert(0, og_image)

    if not start:
        for sel in ("time", ".event-date", ".date", ".showtime"):
            t = soup.select_one(sel)
            if t and t.get_text(strip=True):
                start = t.get_text(strip=True)
                break

    resolved_images = [urljoin(canonical, i) for i in images if i]

    return {
        "title": title or "",
        "description": description or "",
        "images": resolved_images,
        "url": canonical,
        "start": start,
        "end": end,
        "location": location,
        "raw_jsonld": json_ld,
    }
from typing import Dict, List
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin


def _parse_json_ld(soup: BeautifulSoup) -> List[dict]:
    docs = []
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string)
            if isinstance(data, list):
                docs.extend(data)
            else:
                docs.append(data)
        except Exception:
            continue
    return docs


def fetch_event(url: str) -> Dict:
    """Fetch a single event page and extract richer Luma-friendly fields.

    Returns keys: title, description, images (list), url, start, end, location, raw_jsonld
    """
    resp = requests.get(url, timeout=20)
    resp.raise_for_status()
    html = resp.text
    soup = BeautifulSoup(html, "html.parser")

    def meta(name):
        tag = soup.find("meta", property=name) or soup.find("meta", attrs={"name": name})
        return tag.get("content") if tag and tag.get("content") else None

    canonical = meta("og:url") or url

    json_ld = _parse_json_ld(soup)
    event = None
    for doc in json_ld:
        typ = doc.get("@type") if isinstance(doc, dict) else None
        if typ:
            if isinstance(typ, list):
                is_event = any(t.lower() == "event" for t in typ if isinstance(t, str))
            else:
                is_event = str(typ).lower() == "event"
            if is_event:
                event = doc
                break

    title = None
    description = None
    images: List[str] = []
    start = None
    end = None
    location = None

    if event:
        title = event.get("name")
        description = event.get("description")
        start = event.get("startDate")
        end = event.get("endDate")
        loc = event.get("location")
        if isinstance(loc, dict):
            location = loc.get("name") or loc.get("address")
        images_field = event.get("image")
        if isinstance(images_field, list):
            images = images_field
        elif isinstance(images_field, str):
            images = [images_field]

    if not title:
        title = meta("og:title") or (soup.title.string.strip() if soup.title else "")
    if not description:
        description = meta("og:description") or meta("description")
    og_image = meta("og:image")
    if og_image and og_image not in images:
        images.insert(0, og_image)

    if not start:
        for sel in ("time", ".event-date", ".date", ".showtime"):
            t = soup.select_one(sel)
            if t and t.get_text(strip=True):
                start = t.get_text(strip=True)
                break

    resolved_images = [urljoin(canonical, i) for i in images if i]

    return {
        "title": title or "",
        "description": description or "",
        "images": resolved_images,
        "url": canonical,
        "start": start,
        "end": end,
        "location": location,
        "raw_jsonld": json_ld,
    }
