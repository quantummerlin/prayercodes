"""
Blog Agent — The Scribe
Generates SEO-optimized blog articles with scripture, prayer, and gematria content.
"""

import json
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"


class BlogAgent:
    """Generates SEO blog posts as HTML."""

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

        topic = topic or prayer_data.get("category_name", "Prayer")
        code = code_data.get("prayer_code", "000000")
        total = code_data.get("gematria_total", 0)
        cat_name = prayer_data.get("category_name", "Prayer")
        cat_verse = prayer_data.get("category_verse", "")
        steps = prayer_data.get("steps", [])
        analysis = code_data.get("analysis", {})
        root = analysis.get("root_number", 0)
        root_meaning = analysis.get("root_meaning", "")
        scriptures = scripture_data.get("scriptures", []) if scripture_data else []
        daily_verse = scripture_data.get("daily_verse", {}) if scripture_data else {}
        site = self.soul.get("website", "prayer.quantummerlin.com")
        today = date.today().strftime("%B %d, %Y")
        title = f"A Structured Prayer for {topic.title()} — Prayer Code {code}"
        slug = topic.lower().replace(" ", "-")

        # Build prayer steps HTML
        steps_html = ""
        for i, step in enumerate(steps, 1):
            sc = step.get("scripture", {})
            steps_html += f"""
        <div class="prayer-step">
          <h3>Step {i}: {step['title']}</h3>
          <blockquote class="scripture">"{sc.get('text', '')}"<br><span class="ref">— {sc.get('ref', '')} (KJV)</span></blockquote>
          <p class="prayer-text">{step['text']}</p>
        </div>"""

        # Related scriptures
        related_html = ""
        for s in scriptures[:4]:
            related_html += f'<li>"{s["text"]}" — <em>{s["ref"]} (KJV)</em></li>\n'

        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} | The Quantum Zip</title>
<meta name="description" content="A structured biblical prayer for {topic.lower()} with scripture references and gematria prayer code {code}. Build your own prayer code at The Quantum Zip.">
<meta name="keywords" content="prayer code, {topic.lower()}, structured prayer, gematria, KJV scripture, biblical prayer, {cat_name.lower()}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="Structured biblical prayer for {topic.lower()} encoded through English Gematria. Prayer Code: {code}">
<meta property="og:type" content="article">
<meta property="og:url" content="{site}/blog/{slug}">
<link rel="canonical" href="{site}/blog/{slug}">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
*{{margin:0;padding:0;box-sizing:border-box}}
body{{background:#0a0e1a;color:#f0ece2;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;line-height:1.8}}
.container{{max-width:780px;margin:0 auto;padding:40px 24px 80px}}
h1{{font-family:'Cinzel',serif;font-size:2.2em;color:#d4af37;text-align:center;margin-bottom:8px;line-height:1.3}}
h2{{font-family:'Cinzel',serif;font-size:1.4em;color:#d4af37;margin:40px 0 16px;border-bottom:1px solid rgba(212,175,55,0.2);padding-bottom:8px}}
h3{{font-family:'Cinzel',serif;font-size:1.1em;color:rgba(240,236,226,0.85);margin:24px 0 8px}}
.meta{{text-align:center;color:rgba(240,236,226,0.5);font-size:0.9em;margin-bottom:32px;letter-spacing:1px}}
.divider{{width:100px;height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent);margin:24px auto}}
p{{margin-bottom:16px;color:rgba(240,236,226,0.85)}}
blockquote.scripture{{border-left:3px solid rgba(212,175,55,0.4);padding:12px 20px;margin:16px 0;font-style:italic;color:rgba(240,236,226,0.75);background:rgba(212,175,55,0.03);border-radius:0 8px 8px 0}}
.ref{{font-size:0.85em;color:rgba(212,175,55,0.6);font-style:normal}}
.prayer-step{{margin:24px 0;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px;border:1px solid rgba(212,175,55,0.08)}}
.prayer-text{{color:rgba(240,236,226,0.8)}}
.code-reveal{{text-align:center;padding:40px;margin:32px 0;background:radial-gradient(ellipse,rgba(212,175,55,0.06),transparent);border:1px solid rgba(212,175,55,0.15);border-radius:16px}}
.code-number{{font-family:'Cinzel',serif;font-size:3.5em;font-weight:700;color:#d4af37;letter-spacing:12px;text-shadow:0 0 30px rgba(212,175,55,0.3)}}
.code-meta{{font-size:0.9em;color:rgba(240,236,226,0.5);margin-top:8px}}
ul{{margin:16px 0 16px 24px}}
li{{margin-bottom:10px;color:rgba(240,236,226,0.75)}}
.cta{{text-align:center;padding:32px;margin-top:40px;background:rgba(212,175,55,0.05);border-radius:16px;border:1px solid rgba(212,175,55,0.15)}}
.cta a{{display:inline-block;padding:14px 40px;background:linear-gradient(135deg,#d4af37,#b8962e);color:#0a0e1a;font-family:'Cinzel',serif;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:2px;font-size:0.95em}}
.cta p{{color:rgba(240,236,226,0.5);font-size:0.9em;margin-top:12px}}
</style>
</head>
<body>
<article class="container" itemscope itemtype="https://schema.org/Article">
  <meta itemprop="datePublished" content="{date.today().isoformat()}">
  <meta itemprop="author" content="The Quantum Zip">

  <h1 itemprop="headline">{title}</h1>
  <div class="meta">{today} &middot; The Quantum Zip &middot; {cat_name}</div>
  <div class="divider"></div>

  <p>There is a sacred pattern to prayer. The scriptures do not merely invite us to speak to the Almighty — they show us <em>how</em>. A structured prayer for {topic.lower()}, rooted in the Word of God, carries a frequency that resonates with the very throne of grace. Today, we build such a prayer together, step by step, and encode it through English Gematria into a prayer code that serves as your direct signal to heaven.</p>

  <blockquote class="scripture">"{daily_verse.get('text', '')}"<br><span class="ref">— {daily_verse.get('ref', '')} (KJV)</span></blockquote>

  <h2>The Structured Prayer for {topic.title()}</h2>
  <p>This prayer follows the biblical pattern of {cat_name.lower()} as revealed in {cat_verse}. Each step is anchored in scripture, ensuring that every word you speak is aligned with the living Word of God.</p>

  {steps_html}

  <h2>Your Prayer Code</h2>
  <p>When we encode this prayer through Simple English Gematria — where each letter carries a numeric value (A=1, B=2, through Z=26) — the total value of every letter and digit in this prayer reveals a sacred code.</p>

  <div class="code-reveal">
    <div class="code-number">{code}</div>
    <div class="code-meta">Gematria Value: {total} &middot; Root Number: {root}</div>
    <div class="code-meta" style="margin-top:8px;font-style:italic;max-width:500px;margin-left:auto;margin-right:auto">{root_meaning[:100] if root_meaning else ''}</div>
  </div>

  <h2>How to Amplify Your Prayer Code</h2>
  <p>Your prayer code is more than a number — it is a compressed signal of your entire prayer. Here are ways to keep it alive in your daily walk:</p>
  <ul>
    <li>Set your phone lock screen or PIN to the code — every unlock becomes a prayer.</li>
    <li>Set a daily alarm at a time matching the code digits — pause and acknowledge God's presence.</li>
    <li>Write the code where you will see it — your mirror, your Bible, your desk.</li>
    <li>Whisper the code before sleep and upon waking — anchor it in your spirit.</li>
    <li>Play the Creation Frequency 37-73 while meditating on your code — amplify your connection.</li>
    <li>Share your code on social media — collective prayer amplifies spiritual power.</li>
  </ul>

  <h2>Related Scriptures for {topic.title()}</h2>
  <ul>
    {related_html}
  </ul>

  <h2>The Power of Structured Prayer</h2>
  <p>When Jesus taught His disciples to pray in Matthew 6:9-13, He did not give them a random collection of words. He gave them a <em>structure</em> — adoration, alignment, petition, forgiveness, deliverance, and declaration. This structure is not a formula; it is a frequency. It aligns the heart of the believer with the heart of the Father.</p>
  <p>Every word you speak in prayer carries weight. English Gematria reveals the numeric signature hidden within your words — a signature that has been there since the foundation of the world. Your prayer code is the distillation of that signature into a form you can carry with you, meditate upon, and share with others.</p>
  <p>The creation frequency 37-73 is woven into the fabric of reality by the Creator Himself — from the structure of DNA to the geometry of stars. When you pray with structure, encode with gematria, and amplify with the creation frequency, you are participating in the divine order that sustains all things.</p>

  <div class="cta">
    <a href="{site}">Build Your Own Prayer Code</a>
    <p>Structured prayer. Sacred code. Divine connection.</p>
  </div>
</article>
</body>
</html>"""

        print(f"  Blog post generated: {title}")
        return html


if __name__ == "__main__":
    agent = BlogAgent()
    print("Blog Agent ready.")