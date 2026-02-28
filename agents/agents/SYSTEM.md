# The Quantum Zip — Sub-Agent System

## Overview
A multi-agent content pipeline that generates daily prayer content, social media posts,
blog articles, shareable cards, and website updates — all triggered by simple commands.

## Agent Roster

| Agent | Module | Role |
|-------|--------|------|
| **Master** | `core/master_agent.py` | Orchestrator — routes triggers to sub-agents |
| **Scripture** | `core/scripture_agent.py` | Selects daily/topical KJV scriptures |
| **Prayer** | `core/prayer_agent.py` | Builds structured prayers from category flows |
| **Code** | `core/code_agent.py` | Generates gematria codes from prayer text |
| **Card** | `content/card_agent.py` | Creates shareable prayer card images |
| **Social** | `content/social_agent.py` | Generates platform-specific social posts |
| **Blog** | `content/blog_agent.py` | Writes SEO-optimized blog articles |
| **Email** | `content/email_agent.py` | Creates email newsletter content |
| **HTML** | `distribution/html_agent.py` | Generates/updates web pages |
| **Deploy** | `distribution/deploy_agent.py` | Handles site deployment |

## Trigger Words

| Command | Pipeline | Description |
|---------|----------|-------------|
| `daily` | Scripture → Prayer → Code → Card → Social → HTML | Full daily content generation |
| `campaign <topic>` | Scripture(topic) → Prayer(topic) → Code → Card → Social → Blog → Email | Topic-focused campaign |
| `card <category>` | Scripture → Prayer → Code → Card | Single prayer card |
| `social` | Scripture → Social | Social media posts only |
| `blog <topic>` | Scripture(topic) → Blog | Blog post only |
| `email` | Scripture → Prayer → Code → Email | Newsletter content |
| `deploy` | Deploy | Deploy latest site updates |

## Pipeline Flow

### Daily Pipeline
```
1. Scripture Agent → picks daily verse + category-matched scriptures
2. Prayer Agent   → builds a complete structured prayer for the day's category
3. Code Agent     → generates gematria code from the prayer
4. Card Agent     → creates shareable image card with prayer + code
5. Social Agent   → generates posts for Instagram, TikTok, Twitter, YouTube
6. HTML Agent     → generates a daily prayer page for the website
```

### Campaign Pipeline
```
1. Scripture Agent → finds scriptures matching the campaign topic
2. Prayer Agent   → builds a prayer focused on the topic
3. Code Agent     → generates gematria code
4. Card Agent     → creates campaign-specific card
5. Social Agent   → generates campaign social posts
6. Blog Agent     → writes a full SEO blog post on the topic
7. Email Agent    → creates newsletter featuring the campaign
```

## Output Structure
```
output/
├── daily/
│   └── YYYY-MM-DD/
│       ├── scripture.json
│       ├── prayer.json
│       ├── code.json
│       ├── card.html
│       ├── card.png (if wkhtmltoimage available)
│       ├── social.json
│       └── daily_page.html
├── campaigns/
│   └── <topic>_YYYY-MM-DD/
│       ├── scripture.json
│       ├── prayer.json
│       ├── code.json
│       ├── card.html
│       ├── social.json
│       ├── blog.html
│       └── email.html
├── cards/
├── social/
├── blog/
├── email/
└── html/
```

## Configuration
- `config/soul.json` — Identity, beliefs, tone rules, color palette, hashtags
- All agents load soul.json for consistent voice and branding

## Usage
```bash
# Daily content generation
python pray.py daily

# Campaign on a specific topic
python pray.py campaign healing
python pray.py campaign "financial breakthrough"

# Single prayer card
python pray.py card protection

# Social posts only
python pray.py social

# Blog post
python pray.py blog "power of structured prayer"

# Email newsletter
python pray.py email

# Deploy site
python pray.py deploy
```