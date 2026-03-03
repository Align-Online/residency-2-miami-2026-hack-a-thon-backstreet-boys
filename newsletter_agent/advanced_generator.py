import os
from jinja2 import Environment, FileSystemLoader
from .advanced_image_utils import image_to_data_uri

def generate_html(events, template_path: str, output_path: str, embed_images: bool = True):
    env = Environment(loader=FileSystemLoader(os.path.dirname(template_path)))
    tpl = env.get_template(os.path.basename(template_path))
    # if embedding, replace event.local_image with data URI
    if embed_images:
        for e in events:
            lp = e.get("local_image")
            if lp and os.path.exists(lp):
                try:
                    e["embedded_image"] = image_to_data_uri(lp)
                except Exception:
                    e["embedded_image"] = None
            else:
                e["embedded_image"] = None
    html = tpl.render(events=events)
    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    return output_path
