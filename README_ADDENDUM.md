Local run & GitHub Actions
--------------------------

To run locally:

```powershell
python -m venv .venv
. .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m newsletter_agent.advanced_cli --urls-file events.txt --output newsletter_draft.html --images-dir output_images
```

To enable weekly automation:
- Add `.github/workflows/generate_newsletter.yml` to the repo (already included here).
- Edit `events.txt` to include the Luma URLs you want.
- Push to GitHub; workflow runs weekly and commits `newsletter_draft.html`.
