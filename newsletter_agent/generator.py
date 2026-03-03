import os
from jinja2 import Environment, FileSystemLoader


def generate_html(events, template_path: str, output_path: str) -> str:
    env = Environment(loader=FileSystemLoader(os.path.dirname(template_path)))
    tpl = env.get_template(os.path.basename(template_path))
    html = tpl.render(events=events)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    return output_path
