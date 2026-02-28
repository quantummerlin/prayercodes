"""
Card Agent — The Artist
Creates beautiful shareable prayer card images as HTML.
Cards can be screenshotted, converted to PNG, or shared directly.
Design follows the celestial/cosmic theme from soul.json.
"""

import json
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"


class CardAgent:
    """Creates shareable prayer card HTML."""

    def __init__(self):
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def run(self, prayer_data=None, code_data=None, scripture_data=None, campaign_topic=None):
        """Generate a prayer card as HTML."""
        if not prayer_data or not code_data:
            return "<p>Error: Missing prayer or code data</p>"

        category_name = prayer_data.get("category_name", "Prayer")
        prayer_code = code_data.get("prayer_code", "000000")
        gematria_total = code_data.get("gematria_total", 0)
        analysis = code_data.get("analysis", {})
        root_number = analysis.get("root_number", 0)
        root_meaning = analysis.get("root_meaning", "")
        patterns = analysis.get("patterns", [])
        daily_verse = scripture_data.get("daily_verse", {}) if scripture_data else {}
        today = date.today()
        date_str = today.strftime("%B %d, %Y")

        # Get first step scripture for the card
        steps = prayer_data.get("steps", [])
        card_scripture = ""
        card_scripture_ref = ""
        if steps:
            card_scripture = steps[0].get("scripture", {}).get("text", "")
            card_scripture_ref = steps[0].get("scripture", {}).get("ref", "")

        # Build condensed prayer (first and last lines)
        prayer_opening = steps[0]["text"][:120] + "..." if steps else ""
        prayer_closing = steps[-1]["text"][:100] if steps else ""

        # Topic line
        topic_line = ""
        if campaign_topic:
            topic_line = f'<div class="card-topic">A Prayer for {campaign_topic.title()}</div>'

        # Pattern badges
        pattern_html = ""
        if patterns:
            pattern_html = '<div class="card-patterns">' + "".join(
                f'<div class="pattern-badge">{p}</div>' for p in patterns[:2]
            ) + '</div>'

        # Creation frequency badge
        freq_badge = ""
        if analysis.get("creation_frequency_connection"):
            freq_badge = '<div class="freq-badge">Creation Frequency Aligned</div>'

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Prayer Code Card — {prayer_code}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0e1a;
  font-family: 'Cormorant Garamond', Georgia, serif;
}}

.card {{
  width: 1080px;
  height: 1080px;
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 30%, #1a237e 0%, #111833 40%, #0a0e1a 100%);
}}

/* Stars background */
.card::before {{
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 50% 10%, rgba(212,175,55,0.5), transparent),
    radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 90% 70%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1.5px 1.5px at 20% 80%, rgba(212,175,55,0.4), transparent),
    radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.5), transparent),
    radial-gradient(1px 1px at 40% 65%, rgba(212,175,55,0.3), transparent),
    radial-gradient(1px 1px at 15% 45%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1.5px 1.5px at 85% 55%, rgba(212,175,55,0.4), transparent),
    radial-gradient(1px 1px at 55% 35%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1px 1px at 25% 95%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 75% 85%, rgba(212,175,55,0.3), transparent),
    radial-gradient(1px 1px at 45% 5%, rgba(255,255,255,0.5), transparent);
  pointer-events: none;
}}

/* Golden glow at center */
.card::after {{
  content: '';
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%);
  pointer-events: none;
}}

.card-inner {{
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  text-align: center;
}}

/* Top border accent */
.card-top-border {{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
}}

.card-bottom-border {{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
}}

/* Brand */
.card-brand {{
  font-family: 'Cinzel', serif;
  font-size: 16px;
  letter-spacing: 6px;
  text-transform: uppercase;
  color: rgba(212,175,55,0.6);
  margin-bottom: 20px;
}}

/* Category */
.card-category {{
  font-family: 'Cinzel', serif;
  font-size: 22px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(240,236,226,0.7);
  margin-bottom: 8px;
}}

.card-topic {{
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-style: italic;
  color: rgba(212,175,55,0.8);
  margin-bottom: 16px;
}}

/* Divider */
.divider {{
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  margin: 20px auto;
}}

.divider-sm {{
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent);
  margin: 16px auto;
}}

/* Scripture */
.card-scripture {{
  font-size: 24px;
  font-style: italic;
  color: #f0ece2;
  line-height: 1.6;
  max-width: 800px;
  margin-bottom: 6px;
}}

.card-scripture-ref {{
  font-size: 16px;
  color: rgba(212,175,55,0.7);
  letter-spacing: 1px;
  margin-bottom: 24px;
}}

/* Prayer excerpt */
.card-prayer {{
  font-size: 18px;
  color: rgba(240,236,226,0.65);
  line-height: 1.5;
  max-width: 700px;
  margin-bottom: 8px;
}}

/* Code display */
.card-code-label {{
  font-family: 'Cinzel', serif;
  font-size: 14px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(212,175,55,0.6);
  margin-bottom: 12px;
}}

.card-code {{
  font-family: 'Cinzel', serif;
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 16px;
  color: #d4af37;
  text-shadow: 0 0 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15);
  margin-bottom: 8px;
}}

.card-gematria {{
  font-size: 15px;
  color: rgba(240,236,226,0.5);
  letter-spacing: 1px;
  margin-bottom: 6px;
}}

.card-root {{
  font-size: 14px;
  color: rgba(212,175,55,0.5);
  font-style: italic;
  max-width: 600px;
  margin-bottom: 16px;
}}

/* Frequency badge */
.freq-badge {{
  display: inline-block;
  padding: 6px 20px;
  border: 1px solid rgba(212,175,55,0.3);
  border-radius: 20px;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(212,175,55,0.7);
  margin-bottom: 16px;
}}

/* Patterns */
.card-patterns {{
  max-width: 700px;
  margin-bottom: 16px;
}}
.pattern-badge {{
  font-size: 13px;
  color: rgba(240,236,226,0.5);
  font-style: italic;
  margin-bottom: 4px;
}}

/* Date */
.card-date {{
  font-size: 14px;
  color: rgba(240,236,226,0.35);
  letter-spacing: 2px;
  margin-top: 8px;
}}

/* CTA */
.card-cta {{
  font-size: 14px;
  color: rgba(212,175,55,0.5);
  letter-spacing: 2px;
  margin-top: 12px;
}}
</style>
</head>
<body>
<div class="card">
  <div class="card-top-border"></div>
  <div class="card-bottom-border"></div>
  <div class="card-inner">
    <div class="card-brand">The Quantum Zip</div>
    <div class="card-category">{category_name}</div>
    {topic_line}
    <div class="divider"></div>
    <div class="card-scripture">"{card_scripture}"</div>
    <div class="card-scripture-ref">— {card_scripture_ref} (KJV)</div>
    <div class="card-prayer">{prayer_opening}</div>
    <div class="divider-sm"></div>
    <div class="card-code-label">Your Prayer Code</div>
    <div class="card-code">{prayer_code}</div>
    <div class="card-gematria">Gematria Value: {gematria_total} | Root: {root_number}</div>
    <div class="card-root">{root_meaning[:80] if root_meaning else ''}</div>
    {freq_badge}
    {pattern_html}
    <div class="divider-sm"></div>
    <div class="card-date">{date_str}</div>
    <div class="card-cta">prayer.quantummerlin.com</div>
  </div>
</div>
</body>
</html>"""

        print(f"  Card generated: {category_name} — Code {prayer_code}")
        return html


if __name__ == "__main__":
    # Test with sample data
    agent = CardAgent()
    sample_prayer = {
        "category_name": "Protection",
        "steps": [
            {"text": "Almighty God, You are my refuge and my fortress.", "scripture": {"text": "God is our refuge and strength.", "ref": "Psalm 46:1"}},
            {"text": "I am protected. Amen.", "scripture": {"text": "No weapon formed against thee shall prosper.", "ref": "Isaiah 54:17"}},
        ]
    }
    sample_code = {
        "prayer_code": "037421",
        "gematria_total": 3742,
        "analysis": {"root_number": 7, "root_meaning": "Spiritual perfection", "patterns": [], "creation_frequency_connection": False}
    }
    sample_scripture = {"daily_verse": {"text": "Be still and know.", "ref": "Psalm 46:10"}}
    html = agent.run(sample_prayer, sample_code, sample_scripture)
    print(f"Generated {len(html)} chars of HTML")