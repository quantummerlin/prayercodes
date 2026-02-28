"""
Scripture Agent — The Foundation
Selects daily and topical KJV scriptures for the pipeline.
Maintains a comprehensive scripture database organized by category.
"""

import json
import random
import os
from datetime import datetime, date
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"

# ─── Comprehensive KJV Scripture Database ───

SCRIPTURE_DB = {
    "model_prayer": [
        {"text": "After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name.", "ref": "Matthew 6:9"},
        {"text": "Thy kingdom come. Thy will be done in earth, as it is in heaven.", "ref": "Matthew 6:10"},
        {"text": "Give us this day our daily bread.", "ref": "Matthew 6:11"},
        {"text": "And forgive us our debts, as we forgive our debtors.", "ref": "Matthew 6:12"},
        {"text": "And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.", "ref": "Matthew 6:13"},
        {"text": "But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret.", "ref": "Matthew 6:6"},
        {"text": "Your Father knoweth what things ye have need of, before ye ask him.", "ref": "Matthew 6:8"},
    ],
    "protection": [
        {"text": "The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust.", "ref": "Psalm 18:2"},
        {"text": "No weapon that is formed against thee shall prosper.", "ref": "Isaiah 54:17"},
        {"text": "The angel of the LORD encampeth round about them that fear him, and delivereth them.", "ref": "Psalm 34:7"},
        {"text": "God is our refuge and strength, a very present help in trouble.", "ref": "Psalm 46:1"},
        {"text": "The LORD shall preserve thee from all evil: he shall preserve thy soul.", "ref": "Psalm 121:7"},
        {"text": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", "ref": "Psalm 91:1"},
        {"text": "When thou passest through the waters, I will be with thee.", "ref": "Isaiah 43:2"},
        {"text": "The LORD is my light and my salvation; whom shall I fear?", "ref": "Psalm 27:1"},
        {"text": "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.", "ref": "Proverbs 18:10"},
        {"text": "A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.", "ref": "Psalm 91:7"},
        {"text": "For he shall give his angels charge over thee, to keep thee in all thy ways.", "ref": "Psalm 91:11"},
        {"text": "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee.", "ref": "Deuteronomy 31:6"},
    ],
    "thanksgiving": [
        {"text": "Enter into his gates with thanksgiving, and into his courts with praise.", "ref": "Psalm 100:4"},
        {"text": "In every thing give thanks: for this is the will of God in Christ Jesus concerning you.", "ref": "1 Thessalonians 5:18"},
        {"text": "By him therefore let us offer the sacrifice of praise to God continually.", "ref": "Hebrews 13:15"},
        {"text": "O give thanks unto the LORD; for he is good: for his mercy endureth for ever.", "ref": "Psalm 136:1"},
        {"text": "I will praise the name of God with a song, and will magnify him with thanksgiving.", "ref": "Psalm 69:30"},
        {"text": "Bless the LORD, O my soul, and forget not all his benefits.", "ref": "Psalm 103:2"},
        {"text": "I will offer to thee the sacrifice of thanksgiving, and will call upon the name of the LORD.", "ref": "Psalm 116:17"},
        {"text": "It is a good thing to give thanks unto the LORD, and to sing praises unto thy name, O most High.", "ref": "Psalm 92:1"},
        {"text": "O give thanks unto the LORD; call upon his name: make known his deeds among the people.", "ref": "Psalm 105:1"},
    ],
    "petition": [
        {"text": "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.", "ref": "Matthew 7:7"},
        {"text": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", "ref": "Philippians 4:6"},
        {"text": "And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.", "ref": "Matthew 21:22"},
        {"text": "Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.", "ref": "Mark 11:24"},
        {"text": "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us.", "ref": "1 John 5:14"},
        {"text": "Delight thyself also in the LORD: and he shall give thee the desires of thine heart.", "ref": "Psalm 37:4"},
        {"text": "The LORD is nigh unto all them that call upon him, to all that call upon him in truth.", "ref": "Psalm 145:18"},
        {"text": "Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.", "ref": "Jeremiah 33:3"},
    ],
    "guidance": [
        {"text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", "ref": "Proverbs 3:5"},
        {"text": "If any of you lack wisdom, let him ask of God, that giveth to all men liberally.", "ref": "James 1:5"},
        {"text": "I will instruct thee and teach thee in the way which thou shalt go.", "ref": "Psalm 32:8"},
        {"text": "The fear of the LORD is the beginning of wisdom.", "ref": "Proverbs 9:10"},
        {"text": "For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.", "ref": "Proverbs 2:6"},
        {"text": "Thy word is a lamp unto my feet, and a light unto my path.", "ref": "Psalm 119:105"},
        {"text": "In all thy ways acknowledge him, and he shall direct thy paths.", "ref": "Proverbs 3:6"},
        {"text": "The steps of a good man are ordered by the LORD.", "ref": "Psalm 37:23"},
        {"text": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", "ref": "Jeremiah 29:11"},
        {"text": "Cast thy burden upon the LORD, and he shall sustain thee.", "ref": "Psalm 55:22"},
    ],
    "healing": [
        {"text": "By whose stripes ye were healed.", "ref": "1 Peter 2:24"},
        {"text": "Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.", "ref": "Psalm 103:2-3"},
        {"text": "And the prayer of faith shall save the sick, and the Lord shall raise him up.", "ref": "James 5:15"},
        {"text": "He healeth the broken in heart, and bindeth up their wounds.", "ref": "Psalm 147:3"},
        {"text": "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.", "ref": "Isaiah 53:5"},
        {"text": "The LORD is nigh unto them that are of a broken heart.", "ref": "Psalm 34:18"},
        {"text": "I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.", "ref": "Jeremiah 30:17"},
        {"text": "He sent his word, and healed them, and delivered them from their destructions.", "ref": "Psalm 107:20"},
        {"text": "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", "ref": "3 John 1:2"},
    ],
    "justice": [
        {"text": "But let judgment run down as waters, and righteousness as a mighty stream.", "ref": "Amos 5:24"},
        {"text": "He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy.", "ref": "Micah 6:8"},
        {"text": "The LORD executeth righteousness and judgment for all that are oppressed.", "ref": "Psalm 103:6"},
        {"text": "For the LORD is righteous, he loveth righteousness.", "ref": "Psalm 11:7"},
        {"text": "For I the LORD love judgment.", "ref": "Isaiah 61:8"},
        {"text": "Vengeance is mine; I will repay, saith the Lord.", "ref": "Romans 12:19"},
        {"text": "The LORD shall judge the people: judge me, O LORD, according to my righteousness.", "ref": "Psalm 7:8"},
    ],
    "faith": [
        {"text": "Now faith is the substance of things hoped for, the evidence of things not seen.", "ref": "Hebrews 11:1"},
        {"text": "So then faith cometh by hearing, and hearing by the word of God.", "ref": "Romans 10:17"},
        {"text": "But without faith it is impossible to please him.", "ref": "Hebrews 11:6"},
        {"text": "For we walk by faith, not by sight.", "ref": "2 Corinthians 5:7"},
        {"text": "I can do all things through Christ which strengtheneth me.", "ref": "Philippians 4:13"},
        {"text": "With God all things are possible.", "ref": "Matthew 19:26"},
        {"text": "If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence to yonder place; and it shall remove.", "ref": "Matthew 17:20"},
    ],
    "peace": [
        {"text": "Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.", "ref": "John 14:27"},
        {"text": "And the peace of God, which passeth all understanding, shall keep your hearts and minds.", "ref": "Philippians 4:7"},
        {"text": "Thou wilt keep him in perfect peace, whose mind is stayed on thee.", "ref": "Isaiah 26:3"},
        {"text": "The LORD will give strength unto his people; the LORD will bless his people with peace.", "ref": "Psalm 29:11"},
        {"text": "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", "ref": "Matthew 11:28"},
        {"text": "Be still, and know that I am God.", "ref": "Psalm 46:10"},
    ],
    "prayer": [
        {"text": "Pray without ceasing.", "ref": "1 Thessalonians 5:17"},
        {"text": "The effectual fervent prayer of a righteous man availeth much.", "ref": "James 5:16"},
        {"text": "Let us therefore come boldly unto the throne of grace.", "ref": "Hebrews 4:16"},
        {"text": "For where two or three are gathered together in my name, there am I in the midst of them.", "ref": "Matthew 18:20"},
        {"text": "Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them.", "ref": "Matthew 18:19"},
        {"text": "The LORD is nigh unto all them that call upon him, to all that call upon him in truth.", "ref": "Psalm 145:18"},
        {"text": "Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD.", "ref": "Psalm 19:14"},
        {"text": "So shall my word be that goeth forth out of my mouth: it shall not return unto me void.", "ref": "Isaiah 55:11"},
    ],
    "provision": [
        {"text": "But my God shall supply all your need according to his riches in glory by Christ Jesus.", "ref": "Philippians 4:19"},
        {"text": "The LORD is my shepherd; I shall not want.", "ref": "Psalm 23:1"},
        {"text": "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.", "ref": "2 Corinthians 9:8"},
        {"text": "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over.", "ref": "Luke 6:38"},
        {"text": "The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing.", "ref": "Psalm 34:10"},
    ],
    "strength": [
        {"text": "The LORD is my strength and my shield; my heart trusted in him, and I am helped.", "ref": "Psalm 28:7"},
        {"text": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", "ref": "Isaiah 40:31"},
        {"text": "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", "ref": "Joshua 1:9"},
        {"text": "The LORD is my strength and song, and he is become my salvation.", "ref": "Exodus 15:2"},
        {"text": "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee.", "ref": "Isaiah 41:10"},
    ],
}

# Daily verses — one for each day of the month (31 entries)
DAILY_VERSES = [
    {"text": "The LORD is my shepherd; I shall not want.", "ref": "Psalm 23:1"},
    {"text": "I can do all things through Christ which strengtheneth me.", "ref": "Philippians 4:13"},
    {"text": "Be still, and know that I am God.", "ref": "Psalm 46:10"},
    {"text": "Trust in the LORD with all thine heart.", "ref": "Proverbs 3:5"},
    {"text": "Ask, and it shall be given you; seek, and ye shall find.", "ref": "Matthew 7:7"},
    {"text": "For God so loved the world, that he gave his only begotten Son.", "ref": "John 3:16"},
    {"text": "The LORD is my light and my salvation; whom shall I fear?", "ref": "Psalm 27:1"},
    {"text": "Fear thou not; for I am with thee.", "ref": "Isaiah 41:10"},
    {"text": "Pray without ceasing.", "ref": "1 Thessalonians 5:17"},
    {"text": "God is our refuge and strength, a very present help in trouble.", "ref": "Psalm 46:1"},
    {"text": "Delight thyself also in the LORD: and he shall give thee the desires of thine heart.", "ref": "Psalm 37:4"},
    {"text": "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", "ref": "Matthew 11:28"},
    {"text": "He healeth the broken in heart, and bindeth up their wounds.", "ref": "Psalm 147:3"},
    {"text": "No weapon that is formed against thee shall prosper.", "ref": "Isaiah 54:17"},
    {"text": "With God all things are possible.", "ref": "Matthew 19:26"},
    {"text": "The peace of God, which passeth all understanding, shall keep your hearts and minds.", "ref": "Philippians 4:7"},
    {"text": "Casting all your care upon him; for he careth for you.", "ref": "1 Peter 5:7"},
    {"text": "Thy word is a lamp unto my feet, and a light unto my path.", "ref": "Psalm 119:105"},
    {"text": "Create in me a clean heart, O God; and renew a right spirit within me.", "ref": "Psalm 51:10"},
    {"text": "The LORD bless thee, and keep thee: The LORD make his face shine upon thee.", "ref": "Numbers 6:24-25"},
    {"text": "For where two or three are gathered together in my name, there am I in the midst of them.", "ref": "Matthew 18:20"},
    {"text": "In every thing give thanks: for this is the will of God.", "ref": "1 Thessalonians 5:18"},
    {"text": "The effectual fervent prayer of a righteous man availeth much.", "ref": "James 5:16"},
    {"text": "And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.", "ref": "Matthew 21:22"},
    {"text": "Now faith is the substance of things hoped for, the evidence of things not seen.", "ref": "Hebrews 11:1"},
    {"text": "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.", "ref": "Proverbs 18:10"},
    {"text": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", "ref": "Psalm 91:1"},
    {"text": "So shall my word be that goeth forth out of my mouth: it shall not return unto me void.", "ref": "Isaiah 55:11"},
    {"text": "Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD.", "ref": "Psalm 19:14"},
    {"text": "The LORD is my strength and my shield; my heart trusted in him, and I am helped.", "ref": "Psalm 28:7"},
    {"text": "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil.", "ref": "Jeremiah 29:11"},
]

# Category rotation for daily pipeline (cycles through the week)
CATEGORY_ROTATION = [
    "model_prayer",   # Sunday
    "protection",     # Monday
    "petition",       # Tuesday
    "guidance",       # Wednesday
    "healing",        # Thursday
    "thanksgiving",   # Friday
    "justice",        # Saturday
]


class ScriptureAgent:
    """Selects scriptures for the pipeline based on context."""

    def __init__(self):
        self.db = SCRIPTURE_DB
        self.daily_verses = DAILY_VERSES
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def get_daily_verse(self, target_date=None):
        """Get the verse of the day based on date."""
        d = target_date or date.today()
        idx = (d.day - 1) % len(self.daily_verses)
        verse = self.daily_verses[idx]
        return {
            "type": "daily_verse",
            "date": d.isoformat(),
            "verse": verse,
        }

    def get_daily_category(self, target_date=None):
        """Get today's prayer category based on day of week."""
        d = target_date or date.today()
        idx = d.weekday()  # 0=Monday ... 6=Sunday
        # Remap: Sunday=0 in our rotation
        rotation_idx = (idx + 1) % 7  # shift so Sunday=0
        return CATEGORY_ROTATION[rotation_idx]

    def get_category_scriptures(self, category, count=3):
        """Get random scriptures for a specific category."""
        cat_key = self._normalize_category(category)
        scriptures = self.db.get(cat_key, self.db.get("prayer", []))
        selected = random.sample(scriptures, min(count, len(scriptures)))
        return selected

    def get_topical_scriptures(self, topic, count=5):
        """Find scriptures matching a topic across all categories."""
        topic_lower = topic.lower().strip()

        # Map common topics to categories
        topic_map = {
            "protection": ["protection", "strength", "faith"],
            "healing": ["healing", "faith", "peace"],
            "health": ["healing", "faith", "peace"],
            "wisdom": ["guidance", "faith"],
            "guidance": ["guidance", "faith"],
            "money": ["provision", "petition", "faith"],
            "financial": ["provision", "petition", "faith"],
            "provision": ["provision", "petition", "thanksgiving"],
            "breakthrough": ["petition", "faith", "strength"],
            "peace": ["peace", "faith", "thanksgiving"],
            "anxiety": ["peace", "faith", "strength"],
            "fear": ["protection", "faith", "strength", "peace"],
            "strength": ["strength", "faith", "protection"],
            "courage": ["strength", "faith", "protection"],
            "forgiveness": ["model_prayer", "healing", "peace"],
            "thanksgiving": ["thanksgiving"],
            "gratitude": ["thanksgiving"],
            "justice": ["justice", "faith"],
            "prayer": ["prayer", "faith"],
            "faith": ["faith", "prayer"],
            "family": ["protection", "petition", "peace"],
            "children": ["protection", "petition", "guidance"],
            "marriage": ["petition", "peace", "guidance"],
            "work": ["provision", "guidance", "petition"],
            "job": ["provision", "guidance", "petition"],
        }

        # Find matching categories
        matched_cats = []
        for key, cats in topic_map.items():
            if key in topic_lower:
                matched_cats.extend(cats)
                break

        if not matched_cats:
            # Search all scriptures for keyword match
            all_scriptures = []
            for cat, verses in self.db.items():
                for v in verses:
                    if topic_lower in v["text"].lower() or topic_lower in v["ref"].lower():
                        all_scriptures.append({**v, "category": cat})
            if all_scriptures:
                return random.sample(all_scriptures, min(count, len(all_scriptures)))
            # Fallback to faith + prayer
            matched_cats = ["faith", "prayer", "petition"]

        # Collect from matched categories
        pool = []
        for cat in set(matched_cats):
            for v in self.db.get(cat, []):
                pool.append({**v, "category": cat})

        return random.sample(pool, min(count, len(pool)))

    def run(self, category=None, topic=None, target_date=None):
        """Main entry point — returns a complete scripture package."""
        d = target_date or date.today()

        if topic:
            cat = self._topic_to_category(topic)
            scriptures = self.get_topical_scriptures(topic, count=5)
        elif category:
            cat = self._normalize_category(category)
            scriptures = self.get_category_scriptures(cat, count=4)
        else:
            cat = self.get_daily_category(d)
            scriptures = self.get_category_scriptures(cat, count=4)

        daily_verse = self.get_daily_verse(d)

        result = {
            "agent": "scripture",
            "timestamp": datetime.now().isoformat(),
            "date": d.isoformat(),
            "category": cat,
            "daily_verse": daily_verse["verse"],
            "scriptures": scriptures,
            "topic": topic,
        }

        return result

    def _normalize_category(self, category):
        """Normalize category name to database key."""
        mapping = {
            "model_prayer": "model_prayer",
            "the lord's prayer": "model_prayer",
            "lords prayer": "model_prayer",
            "protection": "protection",
            "thanksgiving": "thanksgiving",
            "petition": "petition",
            "petition / request": "petition",
            "request": "petition",
            "guidance": "guidance",
            "guidance / wisdom": "guidance",
            "wisdom": "guidance",
            "healing": "healing",
            "healing / health": "healing",
            "health": "healing",
            "justice": "justice",
            "justice / imprecatory": "justice",
        }
        return mapping.get(category.lower().strip(), category.lower().strip())

    def _topic_to_category(self, topic):
        """Map a topic to the best prayer category."""
        topic_lower = topic.lower().strip()
        topic_cat_map = {
            "protection": "protection", "safety": "protection", "fear": "protection",
            "healing": "healing", "health": "healing", "sickness": "healing",
            "wisdom": "guidance", "guidance": "guidance", "direction": "guidance",
            "money": "petition", "financial": "petition", "provision": "petition",
            "job": "petition", "work": "petition", "breakthrough": "petition",
            "thanksgiving": "thanksgiving", "gratitude": "thanksgiving",
            "justice": "justice", "fairness": "justice",
            "peace": "petition", "anxiety": "petition",
            "strength": "protection", "courage": "protection",
            "family": "petition", "marriage": "petition", "children": "petition",
        }
        for key, cat in topic_cat_map.items():
            if key in topic_lower:
                return cat
        return "petition"  # default


if __name__ == "__main__":
    agent = ScriptureAgent()
    result = agent.run()
    print(json.dumps(result, indent=2))