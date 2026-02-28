"""
Social Agent — The Broadcaster
Generates platform-specific social media content for Instagram, TikTok, Twitter/X, and YouTube.
"""

import json
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"


class SocialAgent:
    """Generates social media content for all platforms."""

    def __init__(self):
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def run(self, prayer_data=None, code_data=None, scripture_data=None, campaign_topic=None):
        if not prayer_data or not code_data:
            return {"error": "Missing data"}

        code = code_data.get("prayer_code", "000000")
        cat_name = prayer_data.get("category_name", "Prayer")
        steps = prayer_data.get("steps", [])
        verse = scripture_data.get("daily_verse", {}) if scripture_data else {}
        verse_text = verse.get("text", "")
        verse_ref = verse.get("ref", "")
        analysis = code_data.get("analysis", {})
        root = analysis.get("root_number", 0)
        total = code_data.get("gematria_total", 0)
        hashtags = " ".join(self.soul.get("hashtags", ["#PrayerCodes"])[:6])
        site = self.soul.get("website", "prayer.quantummerlin.com")
        topic_tag = ""
        if campaign_topic:
            topic_tag = f" #{campaign_topic.replace(' ', '').title()}"

        # Extract a powerful one-liner from the prayer
        one_liner = steps[0]["text"].split(".")[0] + "." if steps else ""
        closing = steps[-1]["text"].split(".")[0] + "." if steps else ""

        platforms = {
            "instagram": {
                "caption": (
                    f"Today's Prayer Code: {code}\n\n"
                    f"&quot;{verse_text}&quot;\n— {verse_ref} (KJV)\n\n"
                    f"{one_liner}\n\n"
                    f"This code was generated through structured biblical prayer, "
                    f"encoded using English Gematria.\n\n"
                    f"Gematria Value: {total} | Root Number: {root}\n\n"
                    f"Build your own prayer code at {site}\n\n"
                    f"{hashtags}{topic_tag}"
                ),
                "story_text": f"Prayer Code: {code}\n\n&quot;{verse_text}&quot;\n— {verse_ref}",
                "alt_text": f"Prayer code {code} for {cat_name} prayer with scripture {verse_ref}",
                "content_type": "carousel",
                "slides": [
                    f"&quot;{verse_text}&quot;\n— {verse_ref} (KJV)",
                    one_liner,
                    f"Prayer Code: {code}",
                    f"Build yours at {site}",
                ],
            },
            "tiktok": {
                "caption": (
                    f"Prayer Code {code} — {cat_name}\n\n"
                    f"&quot;{verse_text}&quot; — {verse_ref}\n\n"
                    f"{one_liner}\n\n"
                    f"Your prayer encoded through Gematria.\n"
                    f"{hashtags}{topic_tag} #FaithTok #ChristianTikTok"
                ),
                "hook": f"Your prayer has a code. Here's today's: {code}",
                "script": (
                    f"[HOOK] Did you know your prayer has a numeric code?\n\n"
                    f"[VERSE] &quot;{verse_text}&quot; — {verse_ref}\n\n"
                    f"[PRAYER] {one_liner}\n\n"
                    f"[REVEAL] When we encode this prayer through English Gematria, "
                    f"the code is {code}.\n\n"
                    f"[CTA] Build your own prayer code — link in bio."
                ),
                "sounds": ["ambient worship", "creation frequency 37-73", "soft piano"],
            },
            "twitter": {
                "thread": [
                    f"Today's Prayer Code: {code}\n\n&quot;{verse_text}&quot; — {verse_ref} (KJV)\n\n{hashtags}",
                    f"{one_liner}\n\n{closing}",
                    f"Gematria Value: {total} | Root: {root}\n\nEvery word carries frequency. Your prayer has been encoded.\n\nBuild yours: {site}",
                ],
                "single_tweet": (
                    f"Prayer Code: {code}\n\n"
                    f"&quot;{verse_text}&quot; — {verse_ref}\n\n"
                    f"Build your own: {site}\n\n"
                    f"{hashtags}"
                ),
            },
            "youtube": {
                "title": f"Prayer Code {code} — {cat_name} Prayer | The Quantum Zip",
                "description": (
                    f"Today's structured prayer for {cat_name.lower()}, encoded through English Gematria.\n\n"
                    f"Prayer Code: {code}\n"
                    f"Gematria Value: {total}\n\n"
                    f"Scripture: &quot;{verse_text}&quot; — {verse_ref} (KJV)\n\n"
                    f"Build your own prayer code at {site}\n\n"
                    f"--- PRAYER ---\n"
                    + "\n\n".join(s["text"] for s in steps) + "\n\n"
                    f"--- END ---\n\n"
                    f"{hashtags}"
                ),
                "tags": self.soul.get("hashtags", []) + [cat_name, "KJV", "structured prayer"],
                "shorts_script": (
                    f"[TEXT ON SCREEN] Prayer Code: {code}\n"
                    f"[VOICEOVER] &quot;{verse_text}&quot;\n"
                    f"[TEXT] {one_liner}\n"
                    f"[REVEAL] Code: {code}\n"
                    f"[CTA] Build yours — link in description"
                ),
            },
        }

        result = {
            "agent": "social",
            "timestamp": datetime.now().isoformat(),
            "prayer_code": code,
            "category": cat_name,
            "campaign_topic": campaign_topic,
            "platforms": platforms,
        }

        print(f"  Social content generated for: {', '.join(platforms.keys())}")
        return result


if __name__ == "__main__":
    agent = SocialAgent()
    print("Social Agent ready.")