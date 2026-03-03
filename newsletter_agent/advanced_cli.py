import argparse
from .advanced_scraper import fetch_event
from .advanced_image_utils import download_and_convert
from .advanced_generator import generate_html

def main():
    parser = argparse.ArgumentParser(description="Advanced: generate newsletter from Luma pages.")
    parser.add_argument("--urls", nargs="*", help="Event page URLs", default=[])
    parser.add_argument("--urls-file", help="Path to a file with one URL per line")
    parser.add_argument("--template", default="templates/beehiiv_template.html")
    parser.add_argument("--output", default="newsletter_draft.html")
    parser.add_argument("--images-dir", default="output_images")
    args = parser.parse_args()

    urls = list(args.urls or [])
    if args.urls_file:
        with open(args.urls_file, "r", encoding="utf-8") as f:
            for line in f:
                u = line.strip()
                if u:
                    urls.append(u)

    events = []
    for u in urls:
        try:
            ev = fetch_event(u)
            imgs = ev.get("images") or []
            local = None
            if imgs:
                try:
                    local = download_and_convert(imgs[0], args.images_dir)
                except Exception:
                    local = None
            ev["local_image"] = local
            events.append(ev)
        except Exception as exc:
            print("Failed:", u, exc)

    generate_html(events, args.template, args.output, embed_images=True)
    print("Wrote", args.output)

if __name__ == "__main__":
    main()
