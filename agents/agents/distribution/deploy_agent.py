"""
Deploy Agent — The Herald
Handles deployment of site content. Provides deployment instructions
and can copy files to the prayer_site directory for serving.
"""

import json
import shutil
import os
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"
OUTPUT_BASE = Path(__file__).parent.parent / "output"
# prayer_site lives at the workspace root (two levels above agents/agents/)
SITE_DIR = Path(__file__).parent.parent.parent.parent / "prayer_site"


class DeployAgent:
    """Handles deployment of generated content to the site."""

    def __init__(self):
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def run(self, target_dir=None):
        """Deploy latest content to the site directory."""
        target = Path(target_dir) if target_dir else SITE_DIR
        today = date.today().isoformat()
        daily_dir = OUTPUT_BASE / "daily" / today

        result = {
            "agent": "deploy",
            "timestamp": datetime.now().isoformat(),
            "status": "ready",
            "actions": [],
        }

        # Check if daily content exists
        if daily_dir.exists():
            # Copy daily page to site
            daily_page = daily_dir / "daily_page.html"
            if daily_page.exists():
                dest = target / "daily" 
                os.makedirs(dest, exist_ok=True)
                shutil.copy2(daily_page, dest / f"{today}.html")
                shutil.copy2(daily_page, dest / "latest.html")
                result["actions"].append(f"Copied daily page to {dest}")

            # Copy card
            card = daily_dir / "card.html"
            if card.exists():
                dest = target / "cards"
                os.makedirs(dest, exist_ok=True)
                shutil.copy2(card, dest / f"card_{today}.html")
                result["actions"].append(f"Copied card to {dest}")

            result["status"] = "deployed"
            result["daily_dir"] = str(daily_dir)
            result["target_dir"] = str(target)
        else:
            result["status"] = "no_content"
            result["message"] = f"No daily content found for {today}. Run 'daily' pipeline first."

        # Check for blog content
        blog_dir = OUTPUT_BASE / "blog"
        if blog_dir.exists():
            blog_files = list(blog_dir.glob(f"*{today}*.html"))
            if blog_files:
                dest = target / "blog"
                os.makedirs(dest, exist_ok=True)
                for bf in blog_files:
                    shutil.copy2(bf, dest / bf.name)
                result["actions"].append(f"Copied {len(blog_files)} blog post(s)")

        # Deployment instructions
        result["instructions"] = {
            "local": f"python -m http.server 8080 --directory {target}",
            "static_deploy": "Upload the prayer_site/ directory to your hosting provider (Netlify, Vercel, S3, etc.)",
            "custom_domain": f"Point your domain to the deployed site: {self.soul.get('website', '')}",
        }

        if result["actions"]:
            print(f"  Deployed {len(result['actions'])} item(s) to {target}")
        else:
            print(f"  {result.get('message', 'Nothing to deploy')}")

        return result


if __name__ == "__main__":
    agent = DeployAgent()
    result = agent.run()
    print(json.dumps(result, indent=2))