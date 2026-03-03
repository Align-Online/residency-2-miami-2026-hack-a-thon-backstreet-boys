import argparse
import tempfile
from .scraper import fetch_event
from .image_utils import download_image
from .generator import generate_html


def main():
    parser = argparse.ArgumentParser(description="Generate Beehiiv-ready newsletter HTML from Luma event pages.")
    parser.add_argument("--urls", nargs="+", help="One or more event page URLs", required=True)
    parser.add_argument("--template", default="templates/beehiiv_template.html", help="Path to Jinja2 template")
    parser.add_argument("--output", default="newsletter_draft.html", help="Output HTML file")
    parser.add_argument("--images-dir", default="output_images", help="Directory to save downloaded images")
    args = parser.parse_args()

    events = []
    for u in args.urls:
        try:
            ev = fetch_event(u)
            if ev.get("image"):
                try:
                    img_path = download_image(ev["image"], args.images_dir)
                    ev["local_image"] = img_path
                except Exception as e:
                    ev["local_image"] = None
            events.append(ev)
        except Exception as e:
            print("Failed to fetch", u, e)

    generate_html(events, args.template, args.output)
    print("Generated", args.output)


if __name__ == "__main__":
    main()
