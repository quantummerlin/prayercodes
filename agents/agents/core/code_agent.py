"""
Code Agent — The Encoder
Generates gematria codes from prayer text using Simple English Gematria.
A=1, B=2, ... Z=26. Digits add face value. Code = total mod 1000000, zero-padded to 6 digits.
"""

import json
from datetime import datetime
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"


def simple_english_gematria(text):
    """Calculate Simple English Gematria value of text.
    A=1, B=2, ... Z=26. Digits add their face value.
    All other characters are ignored.
    """
    total = 0
    for ch in text.upper():
        if 'A' <= ch <= 'Z':
            total += ord(ch) - 64  # A=1, B=2, ... Z=26
        elif '0' <= ch <= '9':
            total += int(ch)
    return total


def generate_code(text, length=6):
    """Generate a prayer code from text using gematria."""
    total = simple_english_gematria(text)
    code = str(total % (10 ** length)).zfill(length)
    return code, total


def reduce_to_single(n):
    """Reduce a number to a single digit (numerological reduction)."""
    while n > 9:
        n = sum(int(d) for d in str(n))
    return n


def analyze_code(code, total):
    """Provide spiritual analysis of the code."""
    # Check for significant patterns
    patterns = []

    # Check for 37/73 connection (creation frequency)
    if total % 37 == 0:
        patterns.append("Your code resonates with 37 — the creation frequency woven into the fabric of reality.")
    if total % 73 == 0:
        patterns.append("Your code aligns with 73 — the mirror of creation, the frequency of divine order.")
    if "37" in code or "73" in code:
        patterns.append("The creation frequency 37-73 appears within your code — a sign of deep alignment with the Creator's design.")

    # Check for repeating digits
    for d in "0123456789":
        if d * 3 in code:
            patterns.append(f"Triple {d} appears in your code — a mark of emphasis and divine attention.")

    # Check for palindrome
    if code == code[::-1]:
        patterns.append("Your code is a palindrome — reading the same forwards and backwards, a symbol of divine symmetry.")

    # Single digit reduction
    root = reduce_to_single(total)
    root_meanings = {
        1: "Unity — the oneness of God. 'Hear, O Israel: The LORD our God is one LORD.' (Deuteronomy 6:4)",
        2: "Witness — 'For where two or three are gathered together in my name, there am I.' (Matthew 18:20)",
        3: "Divine completeness — Father, Son, and Holy Spirit. The fullness of the Godhead.",
        4: "Creation — the four corners of the earth, the four seasons. God's creative order.",
        5: "Grace — the five books of Moses, the five wounds of Christ. God's unmerited favour.",
        6: "Man — created on the sixth day. The number of human effort and responsibility.",
        7: "Spiritual perfection — God rested on the seventh day. Completion and divine rest.",
        8: "New beginnings — circumcision on the eighth day. Resurrection and renewal.",
        9: "Divine finality — the fruit of the Spirit is ninefold. Completeness of God's purpose.",
    }

    return {
        "gematria_total": total,
        "code": code,
        "root_number": root,
        "root_meaning": root_meanings.get(root, ""),
        "patterns": patterns,
        "creation_frequency_connection": total % 37 == 0 or total % 73 == 0 or "37" in code or "73" in code,
    }


class CodeAgent:
    """Generates and analyzes gematria prayer codes."""

    def __init__(self):
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def generate(self, prayer_text):
        """Generate a prayer code from prayer text."""
        code, total = generate_code(prayer_text)
        analysis = analyze_code(code, total)

        return {
            "agent": "code",
            "timestamp": datetime.now().isoformat(),
            "prayer_code": code,
            "gematria_total": total,
            "analysis": analysis,
        }

    def run(self, prayer_data=None, prayer_text=None):
        """Main entry point — generates code from prayer agent output."""
        if prayer_data:
            text = prayer_data.get("full_prayer", "")
        elif prayer_text:
            text = prayer_text
        else:
            text = ""

        if not text.strip():
            return {"agent": "code", "error": "No prayer text provided"}

        result = self.generate(text)

        # Attach prayer metadata if available
        if prayer_data:
            result["category"] = prayer_data.get("category")
            result["category_name"] = prayer_data.get("category_name")

        return result

    def batch_generate(self, texts):
        """Generate codes for multiple prayer texts."""
        results = []
        for text in texts:
            results.append(self.generate(text))
        return results


if __name__ == "__main__":
    agent = CodeAgent()

    # Test with a sample prayer
    sample = (
        "Heavenly Father, You are holy and sovereign over all things. "
        "I honour Your name above every name. Your will be done in my life. "
        "I trust You for my provision this day. Forgive me as I forgive others. "
        "Deliver me from evil. For Yours is the kingdom, and the power, "
        "and the glory, for ever. Amen."
    )

    result = agent.run(prayer_text=sample)
    print(json.dumps(result, indent=2))