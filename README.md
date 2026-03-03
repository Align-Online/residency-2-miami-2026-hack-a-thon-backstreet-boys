LAB Newsletter Agent
====================

This prototype fetches event pages (Luma), downloads images (converts AVIF→PNG when needed), and renders a Beehiiv-ready HTML draft using a Jinja2 template.

Quick start
-----------

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

2. Run the CLI with one or more event URLs:

```bash
python -m newsletter_agent.cli --urls https://example.com/event/1 https://example.com/event/2
```

3. The command produces `newsletter_draft.html` and downloads images to `output_images` by default.

Notes
-----
- AVIF conversion: Pillow may not support AVIF depending on your environment. If conversion fails the code will attempt to call ImageMagick (`magick` or `convert`). Installing ImageMagick with AVIF delegate is a practical fallback on Windows.
- Template: Edit `templates/beehiiv_template.html` to match your Beehiiv styling.
- Scheduling: You can run the CLI from a scheduler (cron / Task Scheduler) or extend with `APScheduler` to auto-generate weekly drafts.

Next steps
----------
- Add more robust Luma scraping rules for the pages you use.
- Optionally integrate with Beehiiv API to auto-create drafts (requires API key).
