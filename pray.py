#!/usr/bin/env python3
"""
pray.py — Root launcher for The Quantum Zip agent system.

Place this file at the project root for convenience.
Delegates to agents/agents/pray.py with proper path setup.

Usage:
    python pray.py daily                         # Full daily content pipeline
    python pray.py campaign healing              # Topic-focused campaign
    python pray.py campaign "financial breakthrough"
    python pray.py card protection               # Single prayer card
    python pray.py social                        # Social media posts only
    python pray.py blog "power of prayer"        # Blog post only
    python pray.py email                         # Email newsletter
    python pray.py deploy                        # Deploy to prayer_site/
"""

import sys
import os

# Point to the agents package
AGENTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "agents", "agents")
sys.path.insert(0, AGENTS_DIR)

from core.master_agent import MasterAgent


def main():
    if len(sys.argv) < 2:
        print("""
╔══════════════════════════════════════════════════════════╗
║           THE QUANTUM ZIP — Agent System                 ║
║     Structured Prayer. Sacred Code. Divine Connection.   ║
╚══════════════════════════════════════════════════════════╝

Usage:
    python pray.py <command> [args]

Commands:
    daily                          Full daily content pipeline
    campaign <topic>               Topic-focused campaign
    card [category]                Single prayer card
    social                         Social media posts only
    blog <topic>                   SEO blog post
    email                          Email newsletter
    deploy                         Deploy to prayer_site/

Categories:
    model_prayer, protection, thanksgiving,
    petition, guidance, healing, justice

Examples:
    python pray.py daily
    python pray.py campaign healing
    python pray.py campaign "financial breakthrough"
    python pray.py card protection
    python pray.py blog "the power of structured prayer"
        """)
        return

    command = sys.argv[1].lower()
    args = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else None

    master = MasterAgent()
    result = master.route(command, args)

    if result and not result.get("error"):
        print("\n  Pipeline completed successfully.")
    elif result and result.get("error"):
        print(f"\n  Error: {result['error']}")


if __name__ == "__main__":
    main()
