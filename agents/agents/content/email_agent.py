"""
Email Agent — The Messenger
Creates email newsletter content with prayer, code, and scripture.
"""

import json
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"


class EmailAgent:
    """Generates email newsletter HTML."""

    def __init__(self):
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def run(self, prayer_data=None, code_data=None, scripture_data=None, topic=None):
        if not prayer_data or not code_data:
            return "<p>Error: Missing data</p>"

        code = code_data.get("prayer_code", "000000")
        total = code_data.get("gematria_total", 0)
        cat_name = prayer_data.get("category_name", "Prayer")
        steps = prayer_data.get("steps", [])
        analysis = code_data.get("analysis", {})
        root = analysis.get("root_number", 0)
        root_meaning = analysis.get("root_meaning", "")
        daily_verse = scripture_data.get("daily_verse", {}) if scripture_data else {}
        site = self.soul.get("website", "prayer.quantummerlin.com")
        today_str = date.today().strftime("%B %d, %Y")
        subject_topic = topic.title() if topic else cat_name

        # Build prayer HTML
        prayer_html = ""
        for step in steps:
            sc = step.get("scripture", {})
            prayer_html += f"""
      <tr><td style="padding:16px 24px;background:rgba(26,35,126,0.15);border-radius:8px;margin-bottom:12px">
        <p style="font-family:'Cinzel',Georgia,serif;font-size:14px;color:#d4af37;margin:0 0 6px;letter-spacing:1px">{step['title']}</p>
        <p style="font-style:italic;color:#999;font-size:14px;margin:0 0 8px">"{sc.get('text','')}" — {sc.get('ref','')} (KJV)</p>
        <p style="color:#e0dcd2;font-size:16px;line-height:1.6;margin:0">{step['text']}</p>
      </td></tr>
      <tr><td style="height:12px"></td></tr>"""

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Prayer Code {code} — {subject_topic} | The Quantum Zip</title>
</head>
<body style="margin:0;padding:0;background:#0a0e1a;font-family:Georgia,'Cormorant Garamond',serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0e1a">
<tr><td align="center" style="padding:20px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

  <!-- Header -->
  <tr><td style="text-align:center;padding:40px 24px 20px">
    <p style="font-family:'Cinzel',Georgia,serif;font-size:12px;letter-spacing:6px;color:rgba(212,175,55,0.6);text-transform:uppercase;margin:0">The Quantum Zip</p>
    <div style="width:80px;height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent);margin:16px auto"></div>
    <h1 style="font-family:'Cinzel',Georgia,serif;font-size:24px;color:#d4af37;margin:0;line-height:1.4">Prayer Code: {code}</h1>
    <p style="color:rgba(240,236,226,0.5);font-size:14px;margin:8px 0 0">{today_str} &middot; {cat_name}</p>
  </td></tr>

  <!-- Daily Verse -->
  <tr><td style="padding:16px 24px">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(212,175,55,0.05);border:1px solid rgba(212,175,55,0.15);border-radius:12px">
    <tr><td style="padding:24px;text-align:center">
      <p style="font-style:italic;color:#f0ece2;font-size:18px;line-height:1.6;margin:0">"{daily_verse.get('text','')}"</p>
      <p style="color:rgba(212,175,55,0.7);font-size:14px;margin:8px 0 0">— {daily_verse.get('ref','')} (KJV)</p>
    </td></tr>
    </table>
  </td></tr>

  <!-- Intro -->
  <tr><td style="padding:16px 24px">
    <p style="color:rgba(240,236,226,0.8);font-size:16px;line-height:1.7">
      Today's prayer follows the biblical pattern of <strong style="color:#d4af37">{cat_name.lower()}</strong>.
      Each step is anchored in scripture, and the complete prayer has been encoded through
      English Gematria into a sacred prayer code. Pray it, meditate on it, and carry it with you.
    </p>
  </td></tr>

  <!-- Prayer Steps -->
  {prayer_html}

  <!-- Code Reveal -->
  <tr><td style="padding:24px;text-align:center">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:radial-gradient(ellipse,rgba(212,175,55,0.08),rgba(10,14,26,0.5));border:1px solid rgba(212,175,55,0.2);border-radius:16px">
    <tr><td style="padding:32px;text-align:center">
      <p style="font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:4px;color:rgba(212,175,55,0.6);text-transform:uppercase;margin:0 0 12px">Your Prayer Code</p>
      <p style="font-family:'Cinzel',Georgia,serif;font-size:48px;font-weight:700;color:#d4af37;letter-spacing:10px;margin:0;text-shadow:0 0 20px rgba(212,175,55,0.3)">{code}</p>
      <p style="color:rgba(240,236,226,0.5);font-size:13px;margin:12px 0 0">Gematria: {total} &middot; Root: {root}</p>
      <p style="color:rgba(212,175,55,0.5);font-size:13px;font-style:italic;margin:8px 0 0;max-width:400px;display:inline-block">{root_meaning[:80] if root_meaning else ''}</p>
    </td></tr>
    </table>
  </td></tr>

  <!-- Amplify -->
  <tr><td style="padding:16px 24px">
    <p style="font-family:'Cinzel',Georgia,serif;font-size:16px;color:#d4af37;margin:0 0 12px">Amplify Your Code</p>
    <p style="color:rgba(240,236,226,0.7);font-size:15px;line-height:1.7;margin:0">
      Set your phone PIN to <strong>{code}</strong>. Write it where you'll see it daily.
      Play the Creation Frequency 37-73 while meditating on your code.
      Share it on social media — collective prayer amplifies spiritual power.
    </p>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:24px;text-align:center">
    <a href="{site}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#d4af37,#b8962e);color:#0a0e1a;font-family:'Cinzel',Georgia,serif;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:2px;font-size:14px">Build Your Own Prayer Code</a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px;text-align:center;border-top:1px solid rgba(212,175,55,0.1)">
    <p style="color:rgba(240,236,226,0.3);font-size:12px;margin:0">The Quantum Zip — Structured Prayer. Sacred Code. Divine Connection.</p>
    <p style="color:rgba(240,236,226,0.2);font-size:11px;margin:8px 0 0">{site}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>"""

        print(f"  Email newsletter generated: Prayer Code {code}")
        return html


if __name__ == "__main__":
    agent = EmailAgent()
    print("Email Agent ready.")