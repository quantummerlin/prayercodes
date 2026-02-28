"""
Master Agent — The Orchestrator
Routes trigger commands to the appropriate sub-agent pipeline.
Manages output directories and coordinates the full content generation flow.
"""

import json
import os
import sys
from datetime import datetime, date
from pathlib import Path

# Add parent to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.scripture_agent import ScriptureAgent
from core.prayer_agent import PrayerAgent
from core.code_agent import CodeAgent
from content.card_agent import CardAgent
from content.social_agent import SocialAgent
from content.blog_agent import BlogAgent
from content.email_agent import EmailAgent
from distribution.html_agent import HTMLAgent
from distribution.deploy_agent import DeployAgent

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"
OUTPUT_BASE = Path(__file__).parent.parent / "output"


class MasterAgent:
    """Orchestrates the full content pipeline."""

    def __init__(self):
        self.soul = self._load_soul()
        self.scripture = ScriptureAgent()
        self.prayer = PrayerAgent()
        self.code = CodeAgent()
        self.card = CardAgent()
        self.social = SocialAgent()
        self.blog = BlogAgent()
        self.email = EmailAgent()
        self.html = HTMLAgent()
        self.deploy = DeployAgent()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def _ensure_dir(self, path):
        """Create directory if it doesn't exist."""
        os.makedirs(path, exist_ok=True)
        return path

    def _save_json(self, data, filepath):
        """Save data as JSON file."""
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, default=str)
        print(f"  [saved] {filepath}")

    def _save_text(self, text, filepath):
        """Save text to file."""
        with open(filepath, "w") as f:
            f.write(text)
        print(f"  [saved] {filepath}")

    # ─── Pipeline: Daily ───

    def run_daily(self):
        """Full daily content generation pipeline."""
        today = date.today()
        day_str = today.isoformat()
        out_dir = self._ensure_dir(OUTPUT_BASE / "daily" / day_str)

        print(f"\n{'='*60}")
        print(f"  THE QUANTUM ZIP — Daily Pipeline")
        print(f"  Date: {day_str}")
        print(f"{'='*60}\n")

        # Step 1: Scripture
        print("[1/6] Scripture Agent — Selecting daily scriptures...")
        scripture_data = self.scripture.run(target_date=today)
        self._save_json(scripture_data, out_dir / "scripture.json")
        print(f"  Category: {scripture_data['category']}")
        print(f"  Daily Verse: {scripture_data['daily_verse']['ref']}")

        # Step 2: Prayer
        print("\n[2/6] Prayer Agent — Building structured prayer...")
        prayer_data = self.prayer.run(scripture_data=scripture_data)
        self._save_json(prayer_data, out_dir / "prayer.json")
        print(f"  Prayer Category: {prayer_data['category_name']}")
        print(f"  Steps: {len(prayer_data['steps'])}")

        # Step 3: Code
        print("\n[3/6] Code Agent — Generating gematria code...")
        code_data = self.code.run(prayer_data=prayer_data)
        self._save_json(code_data, out_dir / "code.json")
        print(f"  Prayer Code: {code_data['prayer_code']}")
        print(f"  Gematria Total: {code_data['gematria_total']}")
        print(f"  Root Number: {code_data['analysis']['root_number']}")

        # Step 4: Card
        print("\n[4/6] Card Agent — Creating shareable prayer card...")
        card_html = self.card.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data
        )
        self._save_text(card_html, out_dir / "card.html")

        # Step 5: Social
        print("\n[5/6] Social Agent — Generating social media content...")
        social_data = self.social.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data
        )
        self._save_json(social_data, out_dir / "social.json")
        print(f"  Platforms: {', '.join(social_data['platforms'].keys())}")

        # Step 6: HTML Page
        print("\n[6/6] HTML Agent — Generating daily prayer page...")
        html_content = self.html.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            page_type="daily"
        )
        self._save_text(html_content, out_dir / "daily_page.html")

        print(f"\n{'='*60}")
        print(f"  Daily pipeline complete!")
        print(f"  Output: {out_dir}")
        print(f"{'='*60}\n")

        return {
            "pipeline": "daily",
            "date": day_str,
            "output_dir": str(out_dir),
            "scripture": scripture_data,
            "prayer": prayer_data,
            "code": code_data,
            "social": social_data,
        }

    # ─── Pipeline: Campaign ───

    def run_campaign(self, topic):
        """Topic-focused campaign pipeline."""
        today = date.today()
        slug = topic.lower().replace(" ", "_").replace("/", "_")[:30]
        day_str = today.isoformat()
        out_dir = self._ensure_dir(OUTPUT_BASE / "campaigns" / f"{slug}_{day_str}")

        print(f"\n{'='*60}")
        print(f"  THE QUANTUM ZIP — Campaign Pipeline")
        print(f"  Topic: {topic}")
        print(f"  Date: {day_str}")
        print(f"{'='*60}\n")

        # Step 1: Scripture
        print("[1/7] Scripture Agent — Finding topical scriptures...")
        scripture_data = self.scripture.run(topic=topic, target_date=today)
        self._save_json(scripture_data, out_dir / "scripture.json")

        # Step 2: Prayer
        print("\n[2/7] Prayer Agent — Building topical prayer...")
        prayer_data = self.prayer.run(scripture_data=scripture_data, topic=topic)
        self._save_json(prayer_data, out_dir / "prayer.json")

        # Step 3: Code
        print("\n[3/7] Code Agent — Generating gematria code...")
        code_data = self.code.run(prayer_data=prayer_data)
        self._save_json(code_data, out_dir / "code.json")
        print(f"  Prayer Code: {code_data['prayer_code']}")

        # Step 4: Card
        print("\n[4/7] Card Agent — Creating campaign card...")
        card_html = self.card.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            campaign_topic=topic
        )
        self._save_text(card_html, out_dir / "card.html")

        # Step 5: Social
        print("\n[5/7] Social Agent — Generating campaign social posts...")
        social_data = self.social.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            campaign_topic=topic
        )
        self._save_json(social_data, out_dir / "social.json")

        # Step 6: Blog
        print("\n[6/7] Blog Agent — Writing SEO blog post...")
        blog_html = self.blog.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            topic=topic
        )
        self._save_text(blog_html, out_dir / "blog.html")

        # Step 7: Email
        print("\n[7/7] Email Agent — Creating newsletter content...")
        email_html = self.email.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            topic=topic
        )
        self._save_text(email_html, out_dir / "email.html")

        print(f"\n{'='*60}")
        print(f"  Campaign pipeline complete!")
        print(f"  Topic: {topic}")
        print(f"  Output: {out_dir}")
        print(f"{'='*60}\n")

        return {
            "pipeline": "campaign",
            "topic": topic,
            "date": day_str,
            "output_dir": str(out_dir),
        }

    # ─── Pipeline: Card Only ───

    def run_card(self, category=None):
        """Generate a single prayer card."""
        today = date.today()
        out_dir = self._ensure_dir(OUTPUT_BASE / "cards")

        print("\n  Generating prayer card...")

        scripture_data = self.scripture.run(category=category, target_date=today)
        prayer_data = self.prayer.run(scripture_data=scripture_data)
        code_data = self.code.run(prayer_data=prayer_data)

        card_html = self.card.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data
        )

        filename = f"card_{scripture_data['category']}_{today.isoformat()}.html"
        self._save_text(card_html, out_dir / filename)

        print(f"  Prayer Code: {code_data['prayer_code']}")
        print(f"  Card saved: {out_dir / filename}\n")

        return {"pipeline": "card", "file": str(out_dir / filename)}

    # ─── Pipeline: Social Only ───

    def run_social(self):
        """Generate social media posts only."""
        today = date.today()
        out_dir = self._ensure_dir(OUTPUT_BASE / "social")

        print("\n  Generating social media content...")

        scripture_data = self.scripture.run(target_date=today)
        prayer_data = self.prayer.run(scripture_data=scripture_data)
        code_data = self.code.run(prayer_data=prayer_data)

        social_data = self.social.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data
        )

        filename = f"social_{today.isoformat()}.json"
        self._save_json(social_data, out_dir / filename)

        print(f"  Platforms: {', '.join(social_data['platforms'].keys())}")
        print(f"  Saved: {out_dir / filename}\n")

        return {"pipeline": "social", "file": str(out_dir / filename)}

    # ─── Pipeline: Blog Only ───

    def run_blog(self, topic):
        """Generate a blog post only."""
        today = date.today()
        out_dir = self._ensure_dir(OUTPUT_BASE / "blog")

        print(f"\n  Generating blog post: {topic}...")

        scripture_data = self.scripture.run(topic=topic, target_date=today)
        prayer_data = self.prayer.run(scripture_data=scripture_data, topic=topic)
        code_data = self.code.run(prayer_data=prayer_data)

        blog_html = self.blog.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data,
            topic=topic
        )

        slug = topic.lower().replace(" ", "-").replace("/", "-")[:40]
        filename = f"{slug}_{today.isoformat()}.html"
        self._save_text(blog_html, out_dir / filename)

        print(f"  Saved: {out_dir / filename}\n")

        return {"pipeline": "blog", "file": str(out_dir / filename)}

    # ─── Pipeline: Email Only ───

    def run_email(self):
        """Generate email newsletter content."""
        today = date.today()
        out_dir = self._ensure_dir(OUTPUT_BASE / "email")

        print("\n  Generating email newsletter...")

        scripture_data = self.scripture.run(target_date=today)
        prayer_data = self.prayer.run(scripture_data=scripture_data)
        code_data = self.code.run(prayer_data=prayer_data)

        email_html = self.email.run(
            prayer_data=prayer_data,
            code_data=code_data,
            scripture_data=scripture_data
        )

        filename = f"newsletter_{today.isoformat()}.html"
        self._save_text(email_html, out_dir / filename)

        print(f"  Saved: {out_dir / filename}\n")

        return {"pipeline": "email", "file": str(out_dir / filename)}

    # ─── Pipeline: Deploy ───

    def run_deploy(self):
        """Deploy latest site updates."""
        print("\n  Running deployment...")
        result = self.deploy.run()
        print(f"  Deploy result: {result.get('status', 'unknown')}\n")
        return result

    # ─── Router ───

    def route(self, command, args=None):
        """Route a command to the appropriate pipeline."""
        cmd = command.lower().strip()

        if cmd == "daily":
            return self.run_daily()
        elif cmd == "campaign":
            topic = args if args else "prayer"
            return self.run_campaign(topic)
        elif cmd == "card":
            category = args if args else None
            return self.run_card(category)
        elif cmd == "social":
            return self.run_social()
        elif cmd == "blog":
            topic = args if args else "the power of structured prayer"
            return self.run_blog(topic)
        elif cmd == "email":
            return self.run_email()
        elif cmd == "deploy":
            return self.run_deploy()
        else:
            print(f"\n  Unknown command: {cmd}")
            print("  Available: daily, campaign, card, social, blog, email, deploy")
            return {"error": f"Unknown command: {cmd}"}


if __name__ == "__main__":
    master = MasterAgent()
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        args = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else None
        master.route(cmd, args)
    else:
        master.route("daily")