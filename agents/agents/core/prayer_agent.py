"""
Prayer Agent — The Builder
Generates structured prayers following biblical category flows.
Each prayer follows the exact step structure from the prayer bot.
"""

import json
import random
from datetime import datetime
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent / "config" / "soul.json"

# ─── Prayer Category Flows ───
# Each category has a sequence of steps with guidance, scripture, and templates.
# The agent selects from multiple templates per step for variety.

PRAYER_FLOWS = {
    "model_prayer": {
        "name": "The Lord's Prayer",
        "verse": "Matthew 6:9-13",
        "steps": [
            {
                "key": "adoration",
                "title": "Adoration — Honour the Father",
                "guidance": "Begin by honouring the Almighty. Acknowledge His holiness and sovereignty.",
                "scripture": {"text": "Hallowed be thy name.", "ref": "Matthew 6:9"},
                "templates": [
                    "Heavenly Father, You are holy and sovereign over all things. I honour Your name above every name. Your glory fills the heavens and the earth, and I stand in awe of Your majesty.",
                    "Most High God, I come before Your throne with reverence. You are the Alpha and the Omega, the beginning and the end. Your holiness is beyond measure and Your love is everlasting.",
                    "Almighty Father, hallowed be Your name. You are the Creator of all that is seen and unseen. I bow before Your infinite wisdom and Your perfect love.",
                    "Lord God, I honour You this day. You are righteous in all Your ways and gracious in all Your works. Your name is a strong tower and I run into it with praise.",
                ]
            },
            {
                "key": "alignment",
                "title": "Alignment — Thy Will Be Done",
                "guidance": "Surrender your will to the perfect plan of the Most High.",
                "scripture": {"text": "Thy will be done in earth, as it is in heaven.", "ref": "Matthew 6:10"},
                "templates": [
                    "Your will be done in my life, O Lord. I surrender my plans and my desires to Your perfect purpose. Let Your kingdom come in every area of my life, as it is established in heaven.",
                    "I align my heart with Your will, Heavenly Father. Not my will, but Yours be done. I trust that Your plans for me are good, and I submit to Your sovereign direction.",
                    "Thy kingdom come, Thy will be done. I release control and embrace Your divine order. Let every step I take be ordered by Your hand and every decision guided by Your Spirit.",
                    "Lord, I lay down my own understanding and take up Your perfect will. Your ways are higher than my ways. I choose alignment with heaven over the desires of the flesh.",
                ]
            },
            {
                "key": "petition",
                "title": "Petition — Our Daily Bread",
                "guidance": "Bring your daily needs before the Lord with humility.",
                "scripture": {"text": "Give us this day our daily bread.", "ref": "Matthew 6:11"},
                "templates": [
                    "Lord, I trust You for my provision this day. You are my source and my sustainer. Every good and perfect gift comes from above, and I receive Your abundance with gratitude.",
                    "Give me this day my daily bread, O Lord. I look to You alone for my needs. You who feed the sparrows and clothe the lilies shall surely provide for me.",
                    "Heavenly Father, I bring my needs before You. You know what I require before I ask. I trust in Your faithfulness to supply all my needs according to Your riches in glory.",
                    "Lord, You are Jehovah Jireh, my Provider. I ask for Your provision today — not just bread for my body, but nourishment for my soul. Sustain me in every way.",
                ]
            },
            {
                "key": "forgiveness",
                "title": "Forgiveness — Debts and Debtors",
                "guidance": "Confess before the Lord and extend forgiveness to others.",
                "scripture": {"text": "Forgive us our debts, as we forgive our debtors.", "ref": "Matthew 6:12"},
                "templates": [
                    "I confess my transgressions and receive Your mercy, Lord. I choose to forgive as You have forgiven me. Let no root of bitterness remain in my heart.",
                    "Father, forgive me where I have fallen short. Cleanse me from all unrighteousness. And as You have shown me mercy, I extend that same mercy to those who have wronged me.",
                    "Lord, I release every debt and every offence. I forgive freely, as You have freely forgiven me. Let Your grace wash over me and through me to others.",
                    "Heavenly Father, search my heart and reveal anything that separates me from You. I repent and I receive Your forgiveness. I also release forgiveness to every person who has caused me pain.",
                ]
            },
            {
                "key": "protection",
                "title": "Deliverance — From Evil",
                "guidance": "Call upon the Lord's protection against all evil.",
                "scripture": {"text": "Lead us not into temptation, but deliver us from evil.", "ref": "Matthew 6:13"},
                "templates": [
                    "Deliver me from evil, O Lord. Let no temptation overcome me. I stand under Your mighty protection and I resist every scheme of the enemy in Your name.",
                    "Lead me not into temptation, Father. Set a guard over my heart and my mind. I am covered by the blood of the Lamb and no weapon formed against me shall prosper.",
                    "Lord, I ask for Your divine protection this day. Shield me from every snare and every trap. Let Your angels encamp around me and deliver me from all evil.",
                    "Almighty God, deliver me from the evil one. I put on the full armour of God and I stand firm. Your protection is my shield and Your truth is my sword.",
                ]
            },
            {
                "key": "closing",
                "title": "Closing — The Kingdom, Power, and Glory",
                "guidance": "Seal your prayer with a declaration of God's eternal kingdom.",
                "scripture": {"text": "For thine is the kingdom, and the power, and the glory, for ever. Amen.", "ref": "Matthew 6:13"},
                "templates": [
                    "For Yours is the kingdom, and the power, and the glory, for ever and ever. I seal this prayer in faith, knowing that You hear me and You answer. Amen.",
                    "Thine is the kingdom, the power, and the glory, O Lord. Now and for ever. I declare this prayer established in heaven and manifested on earth. Amen.",
                    "All glory, honour, and power belong to You, Almighty God. I seal this prayer with the authority of Your Word and the confidence of Your promises. Amen.",
                    "For the kingdom is Yours, the power is Yours, and the glory is Yours — for ever and ever. I rest in Your sovereignty. It is done. Amen.",
                ]
            },
        ]
    },
    "protection": {
        "name": "Protection",
        "verse": "Psalm 91:1",
        "steps": [
            {
                "key": "address",
                "title": "Address the Almighty",
                "guidance": "Declare your trust in the Lord as your refuge and fortress.",
                "scripture": {"text": "God is our refuge and strength, a very present help in trouble.", "ref": "Psalm 46:1"},
                "templates": [
                    "Almighty God, You are my refuge and my fortress. I place my trust wholly in Your protection. You are the shield around me, the lifter of my head.",
                    "Lord God, I come to You as my strong tower. In You I find safety and shelter. You are my defender and my deliverer, and I trust in Your unfailing protection.",
                    "Heavenly Father, I declare that You are my refuge. I dwell in the secret place of the Most High and I abide under the shadow of the Almighty.",
                    "Most High God, I run to You for protection. You are my rock, my fortress, and my deliverer. In You alone do I place my trust this day.",
                ]
            },
            {
                "key": "need",
                "title": "Present Your Need",
                "guidance": "Lay your specific need for protection before the Lord.",
                "scripture": {"text": "The LORD shall preserve thee from all evil: he shall preserve thy soul.", "ref": "Psalm 121:7"},
                "templates": [
                    "Lord, I bring before You my need for protection over my life, my family, and my household. Cover us with Your wings and keep us from all harm.",
                    "Father, I ask for Your covering over every area of my life. Protect my coming and my going, my resting and my rising. Let no evil come near my dwelling.",
                    "Lord, I present my need for safety and security. Guard my mind from fear, my body from harm, and my spirit from the attacks of the enemy.",
                    "Heavenly Father, I need Your protection today. Shield me from danger seen and unseen. Preserve my soul and keep me in perfect peace.",
                ]
            },
            {
                "key": "appeal",
                "title": "Appeal to His Faithfulness",
                "guidance": "Recall the faithfulness of God throughout scripture.",
                "scripture": {"text": "The name of the LORD is a strong tower: the righteous runneth into it, and is safe.", "ref": "Proverbs 18:10"},
                "templates": [
                    "You have been faithful through all generations. You delivered Daniel from the lions, shielded David from Goliath, and parted the sea for Your people. You are the same yesterday, today, and for ever.",
                    "Lord, Your track record is perfect. You have never failed those who trust in You. You shut the mouths of lions, quenched the violence of fire, and turned back the armies of the enemy.",
                    "I appeal to Your faithfulness, O God. You who protected Noah in the flood, preserved Joseph in prison, and delivered Israel from bondage — You are my protector today.",
                    "Your faithfulness reaches unto the clouds. You have kept Your promises through every generation. I stand on Your Word and I trust in Your unchanging character.",
                ]
            },
            {
                "key": "declare",
                "title": "Declare His Protection",
                "guidance": "Speak protection over yourself with the authority of scripture.",
                "scripture": {"text": "No weapon that is formed against thee shall prosper.", "ref": "Isaiah 54:17"},
                "templates": [
                    "No weapon formed against me shall prosper. I dwell in the secret place of the Most High. A thousand may fall at my side, but it shall not come near me.",
                    "I declare that the Lord is my shield and my buckler. His angels have charge over me to keep me in all my ways. I am protected by the blood of the Lamb.",
                    "I speak protection over my life in the name of the Lord. No evil shall befall me, neither shall any plague come near my dwelling. I am safe in the hands of the Almighty.",
                    "The Lord goes before me and behind me. He is my rear guard and my vanguard. I am surrounded by His favour as with a shield. No harm shall touch me.",
                ]
            },
            {
                "key": "closing",
                "title": "Seal with Praise",
                "guidance": "Close with thanksgiving and unwavering faith.",
                "scripture": {"text": "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.", "ref": "Psalm 91:1"},
                "templates": [
                    "I give You thanks, O Lord, for Your unfailing protection. I rest in Your shadow and I trust in Your deliverance. You are faithful and I am safe. Amen.",
                    "Thank You, Father, for Your mighty hand of protection over my life. I praise You for Your faithfulness. I am secure in You. Amen.",
                    "I seal this prayer with praise and thanksgiving. You are my protector, my defender, and my strong tower. I rest in Your peace. Amen.",
                    "All praise to You, Almighty God, for Your covering over my life. I walk in confidence because You walk with me. It is finished. Amen.",
                ]
            },
        ]
    },
    "thanksgiving": {
        "name": "Thanksgiving",
        "verse": "1 Thessalonians 5:18",
        "steps": [
            {
                "key": "praise",
                "title": "Enter with Praise",
                "guidance": "Enter the Lord's presence with praise and thanksgiving.",
                "scripture": {"text": "Enter into his gates with thanksgiving, and into his courts with praise.", "ref": "Psalm 100:4"},
                "templates": [
                    "Most High God, I enter Your gates with thanksgiving and Your courts with praise. You are good and Your mercy endures for ever. I magnify Your holy name.",
                    "Lord, I come before You with a heart full of praise. You are worthy of all honour and glory. I thank You for who You are before I thank You for what You have done.",
                    "Heavenly Father, I lift my voice in praise to You. Your lovingkindness is better than life. I will bless You at all times and Your praise shall continually be in my mouth.",
                    "Almighty God, I enter Your presence with joy and thanksgiving. You have been so good to me. I praise You with my whole heart.",
                ]
            },
            {
                "key": "specific",
                "title": "Name Your Blessings",
                "guidance": "Be specific in your gratitude. Name the blessings you have received.",
                "scripture": {"text": "Bless the LORD, O my soul, and forget not all his benefits.", "ref": "Psalm 103:2"},
                "templates": [
                    "I thank You for the breath in my lungs, the health in my body, and the love of those around me. I thank You for Your provision, Your protection, and Your peace that surpasses all understanding.",
                    "Lord, I am grateful for every blessing You have poured into my life. For my family, my health, my home, and the opportunities You have placed before me. You have been faithful in every season.",
                    "Father, I count my blessings and I find them without number. Thank You for answered prayers, for open doors, for strength in weakness, and for joy in the morning.",
                    "I thank You, Lord, for the gift of life, for the people You have placed in my path, for the lessons in every trial, and for the victories You have given me.",
                ]
            },
            {
                "key": "gratitude",
                "title": "Declare a Heart of Gratitude",
                "guidance": "Commit to a life of thanksgiving as a daily offering.",
                "scripture": {"text": "In every thing give thanks: for this is the will of God.", "ref": "1 Thessalonians 5:18"},
                "templates": [
                    "I choose gratitude as my daily offering. In all circumstances, I will give thanks unto the Lord. For this is the will of God concerning me.",
                    "Lord, I declare that thanksgiving shall be the posture of my heart. In plenty and in want, in joy and in trial, I will praise Your name.",
                    "I commit to a life of gratitude, Father. Not just when things are good, but in every season. You are worthy of praise at all times.",
                    "My heart overflows with gratitude. I will not forget Your benefits. I will tell of Your goodness and declare Your faithfulness to every generation.",
                ]
            },
            {
                "key": "closing",
                "title": "Seal with Joy",
                "guidance": "Close with joy and praise, sealing your heart in thankfulness.",
                "scripture": {"text": "I will offer to thee the sacrifice of thanksgiving.", "ref": "Psalm 116:17"},
                "templates": [
                    "My heart overflows with gratitude. I offer this sacrifice of thanksgiving unto You, O Lord. You are good and Your mercy endures for ever. Amen.",
                    "I seal this prayer with joy and praise. Thank You, Father, for every good and perfect gift. My soul magnifies the Lord. Amen.",
                    "All thanks and praise to You, Almighty God. I am grateful beyond words. I will carry this thankfulness with me through every moment of this day. Amen.",
                    "I close with a heart full of praise. You have been faithful, You are faithful, and You will always be faithful. Thank You, Lord. Amen.",
                ]
            },
        ]
    },
    "petition": {
        "name": "Petition",
        "verse": "Matthew 7:7",
        "steps": [
            {
                "key": "adoration",
                "title": "Adoration — Honour God First",
                "guidance": "Before presenting your request, honour the Lord.",
                "scripture": {"text": "Great is the LORD, and greatly to be praised.", "ref": "Psalm 145:3"},
                "templates": [
                    "Almighty God, You are great and greatly to be praised. Nothing is impossible for You. I come before Your throne with reverence, knowing that You are able to do exceedingly abundantly above all that I ask or think.",
                    "Lord God, I honour You above all things. You are the Creator of heaven and earth. Before I bring my request, I acknowledge Your greatness and Your sovereignty over all things.",
                    "Most High God, I worship You. You are the King of kings and the Lord of lords. Your power is unlimited and Your love is unfailing. I approach Your throne with boldness and humility.",
                    "Heavenly Father, I adore You. You are worthy of all praise. I come to You not because of my own merit, but because of Your grace and Your invitation to ask.",
                ]
            },
            {
                "key": "confession",
                "title": "Confession — Prepare Your Heart",
                "guidance": "Confess anything that may hinder your prayer.",
                "scripture": {"text": "If we confess our sins, he is faithful and just to forgive us our sins.", "ref": "1 John 1:9"},
                "templates": [
                    "Lord, I confess my shortcomings before You. Cleanse me and prepare my heart to receive. I repent of anything that stands between me and Your perfect will.",
                    "Father, search my heart and reveal anything that hinders my prayers. I confess my sins and I receive Your forgiveness. Make me clean and ready to receive.",
                    "I come with a humble heart, Lord. Forgive me where I have fallen short. Purify my motives and align my desires with Your will.",
                    "Heavenly Father, I lay bare my heart before You. You know my failures and my struggles. I confess them all and I receive Your mercy and Your cleansing.",
                ]
            },
            {
                "key": "thanksgiving",
                "title": "Thanksgiving — Thank Him First",
                "guidance": "Thank the Lord before you see the answer. This is the prayer of faith.",
                "scripture": {"text": "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving.", "ref": "Philippians 4:6"},
                "templates": [
                    "I thank You, Lord, that You hear me. I thank You that the answer is already established in heaven. I give thanks before I see the manifestation, for I walk by faith and not by sight.",
                    "Father, I thank You in advance for Your answer. You are faithful to Your promises. I praise You for what You are about to do.",
                    "Thank You, Lord, that You are already working on my behalf. Before I even speak my request, You know my need and You have prepared the answer.",
                    "I offer thanksgiving before my petition, Lord. For You are good and Your mercy endures for ever. I trust that You will answer according to Your perfect will.",
                ]
            },
            {
                "key": "request",
                "title": "Supplication — Ask Boldly",
                "guidance": "Present your request with boldness and specificity.",
                "scripture": {"text": "Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.", "ref": "Matthew 7:7"},
                "templates": [
                    "Lord, I bring before You my request with boldness and faith. I ask according to Your will and I believe that I receive. Open the doors that no man can shut and make a way where there seems to be no way.",
                    "Father, I present my petition before Your throne. You have invited me to ask, and so I ask with confidence. Let Your will be done and let Your favour rest upon this request.",
                    "Almighty God, I ask boldly because You have told me to ask. I seek because You have promised I will find. I knock because You have assured me the door will open.",
                    "Lord, hear my supplication. I lay my request at Your feet with faith and expectation. You are able to do exceedingly abundantly above all that I ask or think.",
                ]
            },
            {
                "key": "closing",
                "title": "Seal with Faith",
                "guidance": "Declare your faith that the Lord has heard and shall answer.",
                "scripture": {"text": "And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.", "ref": "Matthew 21:22"},
                "templates": [
                    "I believe and I receive according to Your will. It is established in heaven and it shall be manifested on earth. I seal this prayer with faith. Amen.",
                    "I declare this petition answered in the name of the Lord. I stand in faith, I rest in peace, and I wait with expectation. Amen.",
                    "It is done. I have asked in faith and I believe I have received. Thank You, Lord, for Your faithfulness. Amen.",
                    "I seal this prayer with unwavering faith. You have heard me, Lord, and I trust Your answer. Whether yes, no, or wait — Your will is perfect. Amen.",
                ]
            },
        ]
    },
    "guidance": {
        "name": "Guidance",
        "verse": "Proverbs 3:5",
        "steps": [
            {
                "key": "acknowledge",
                "title": "Acknowledge His Wisdom",
                "guidance": "Begin by acknowledging the Lord's infinite wisdom.",
                "scripture": {"text": "For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.", "ref": "Proverbs 2:6"},
                "templates": [
                    "Lord, You are the source of all wisdom. Your understanding is infinite and Your counsel is perfect. I come to You because You alone know the path I should take.",
                    "Almighty God, I acknowledge that Your wisdom surpasses all human understanding. You see the end from the beginning and You know what is best for me.",
                    "Heavenly Father, I recognise that without Your guidance, I walk in darkness. But with You, every step is illuminated. You are the light unto my path.",
                    "Most High God, Your wisdom created the heavens and the earth. I trust that same wisdom to guide my life, my decisions, and my steps.",
                ]
            },
            {
                "key": "situation",
                "title": "Present Your Situation",
                "guidance": "Lay your situation before the Lord with honesty.",
                "scripture": {"text": "Cast thy burden upon the LORD, and he shall sustain thee.", "ref": "Psalm 55:22"},
                "templates": [
                    "Father, I face a crossroads and I need Your clear direction. I cast this burden upon You and I trust You to sustain me. Show me the way I should go.",
                    "Lord, I bring my situation before You. I am uncertain of the path ahead, but I know that You are certain. Guide me through this season of decision.",
                    "Heavenly Father, I lay my confusion at Your feet. Where I see complexity, You see clarity. Where I see obstacles, You see opportunities. Show me Your perspective.",
                    "Lord, I present my need for direction. The choices before me are many, but Your perfect will is one. Help me to discern it clearly.",
                ]
            },
            {
                "key": "ask_wisdom",
                "title": "Ask for Divine Wisdom",
                "guidance": "Ask specifically for wisdom, clarity, and discernment.",
                "scripture": {"text": "If any of you lack wisdom, let him ask of God, that giveth to all men liberally.", "ref": "James 1:5"},
                "templates": [
                    "I ask for Your wisdom now, O Lord. Grant me clarity, discernment, and the peace that confirms Your will. You give liberally to all who ask, and I ask with faith.",
                    "Father, pour out Your wisdom upon me. Let me hear Your voice clearly and follow Your leading without hesitation. Give me discernment to know Your will.",
                    "Lord, I ask for wisdom — not the wisdom of this world, but the wisdom that comes from above. Pure, peaceable, gentle, and full of good fruits.",
                    "Almighty God, I need Your divine insight. Open my eyes to see what You see. Open my ears to hear what You speak. Grant me wisdom for this moment.",
                ]
            },
            {
                "key": "trust",
                "title": "Declare Your Trust",
                "guidance": "Declare that you trust the Lord's leading completely.",
                "scripture": {"text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding.", "ref": "Proverbs 3:5"},
                "templates": [
                    "I trust You with all my heart, O Lord. I lean not on my own understanding but on Your perfect guidance. In all my ways I acknowledge You, and I know You will direct my paths.",
                    "Lord, I choose trust over fear. I choose faith over doubt. I declare that Your plan is better than mine and I submit to Your leading.",
                    "I place my trust entirely in You, Father. Even when I cannot see the full picture, I trust the Artist. Even when I cannot hear the full symphony, I trust the Composer.",
                    "Heavenly Father, I trust Your timing, Your methods, and Your outcomes. You have never failed me and You will not start now. I rest in Your sovereign plan.",
                ]
            },
            {
                "key": "closing",
                "title": "Rest in His Plan",
                "guidance": "Close by resting in the Lord's perfect plan.",
                "scripture": {"text": "I will instruct thee and teach thee in the way which thou shalt go.", "ref": "Psalm 32:8"},
                "templates": [
                    "I rest in Your sovereign plan, Lord. Guide my every step according to Your perfect will. I will follow where You lead. Amen.",
                    "I close this prayer in peace, knowing that You will instruct me and teach me in the way I should go. Your eye is upon me and Your hand guides me. Amen.",
                    "Thank You, Father, for the wisdom You are releasing into my life. I walk forward in faith, trusting Your direction. Amen.",
                    "I seal this prayer with trust. You are my guide, my counsellor, and my way-maker. I follow You with confidence. Amen.",
                ]
            },
        ]
    },
    "healing": {
        "name": "Healing",
        "verse": "Psalm 147:3",
        "steps": [
            {
                "key": "adoration",
                "title": "God the Healer",
                "guidance": "Acknowledge the Lord as Jehovah Rapha — the God who heals.",
                "scripture": {"text": "The LORD is nigh unto them that are of a broken heart.", "ref": "Psalm 34:18"},
                "templates": [
                    "Lord God, You are Jehovah Rapha, the God who heals. You are near to the brokenhearted and You bind up every wound. I come to You as my healer and my restorer.",
                    "Almighty God, You are the Great Physician. There is no sickness You cannot heal, no wound You cannot mend, no brokenness You cannot restore.",
                    "Heavenly Father, I acknowledge You as the source of all healing. By Your stripes I am healed. You sent Your Word and healed them.",
                    "Most High God, You who spoke the universe into existence have the power to speak healing into my body, my mind, and my spirit. I come to You with faith.",
                ]
            },
            {
                "key": "release",
                "title": "Release and Receive",
                "guidance": "Release anything hindering your healing. Receive forgiveness.",
                "scripture": {"text": "Repent ye therefore, and be converted, that your sins may be blotted out.", "ref": "Acts 3:19"},
                "templates": [
                    "I release all bitterness, unforgiveness, and fear. I receive Your cleansing and Your restoration. Let nothing hinder the flow of Your healing power in my life.",
                    "Father, I let go of every weight and every sin that so easily besets me. I receive Your forgiveness and I open my heart fully to Your healing touch.",
                    "Lord, I release every negative thought, every anxious worry, and every spirit of infirmity. I receive Your peace, Your wholeness, and Your restoration.",
                    "I surrender every obstacle to healing, Lord. I forgive those who have hurt me. I release the past and I receive the new thing You are doing in my life.",
                ]
            },
            {
                "key": "thanksgiving",
                "title": "Thank God for Healing",
                "guidance": "Thank the Lord for healing as though it is already accomplished.",
                "scripture": {"text": "By whose stripes ye were healed.", "ref": "1 Peter 2:24"},
                "templates": [
                    "I thank You, Lord, for my healing. By Your stripes I am healed. I declare wholeness over my body, my mind, and my spirit. The work is already done.",
                    "Father, I thank You that healing is my inheritance. You bore my sicknesses and carried my pains. I receive what You have already provided.",
                    "Thank You, Lord, for the healing that is flowing through me right now. I praise You for restoration, for strength, and for renewed vitality.",
                    "I give thanks for my healing, Lord. Not because I can see it yet, but because I believe Your Word. By faith, I am whole.",
                ]
            },
            {
                "key": "request",
                "title": "Request Healing and Restoration",
                "guidance": "Ask specifically for healing in body, mind, or spirit.",
                "scripture": {"text": "He healeth the broken in heart, and bindeth up their wounds.", "ref": "Psalm 147:3"},
                "templates": [
                    "I ask for complete healing in every area of my being. Restore every cell, every organ, every system. Let Your healing power flow from the crown of my head to the soles of my feet.",
                    "Lord, I ask for healing — physical, emotional, and spiritual. Touch every area that needs Your restoration. Make me whole as You intended me to be.",
                    "Father, I ask for Your healing hand upon my life. Where there is pain, bring comfort. Where there is sickness, bring health. Where there is brokenness, bring wholeness.",
                    "Almighty God, I ask for divine healing. Let Your resurrection power flow through me. Restore what the enemy has stolen and renew my strength like the eagle.",
                ]
            },
            {
                "key": "closing",
                "title": "Declare Wholeness",
                "guidance": "Seal your prayer by declaring wholeness and health.",
                "scripture": {"text": "And the prayer of faith shall save the sick, and the Lord shall raise him up.", "ref": "James 5:15"},
                "templates": [
                    "I am whole. I am restored. I am healed by the power of the Most High God. I declare it, I believe it, and I receive it. Amen.",
                    "I seal this prayer with a declaration of wholeness. The Lord is my healer and I am healed. Every sickness must bow to the name above all names. Amen.",
                    "I declare that I am healed, I am whole, and I am restored. The prayer of faith has been prayed and the Lord shall raise me up. Amen.",
                    "By the authority of the Word of God, I declare healing over my life. It is finished. I am well. I am strong. I am whole. Amen.",
                ]
            },
        ]
    },
    "justice": {
        "name": "Justice",
        "verse": "Amos 5:24",
        "steps": [
            {
                "key": "wrong",
                "title": "Present the Injustice",
                "guidance": "Bring the injustice before the Lord, the righteous Judge.",
                "scripture": {"text": "But let judgment run down as waters, and righteousness as a mighty stream.", "ref": "Amos 5:24"},
                "templates": [
                    "Lord, I bring before You the injustice that weighs upon my heart. You see all things and Your judgment is righteous. I lay this matter at Your feet and I trust Your justice.",
                    "Righteous Judge, I present this wrong before Your throne. You who love justice and hate iniquity — hear my cry. You see what has been done and You will make it right.",
                    "Father, I come to You with a burden of injustice. The world may turn a blind eye, but You see everything. I trust You to bring truth to light.",
                    "Almighty God, I bring this situation of injustice before You. You are the defender of the oppressed and the champion of the righteous. I appeal to Your justice.",
                ]
            },
            {
                "key": "appeal",
                "title": "Appeal to the Righteous Judge",
                "guidance": "Call upon the Lord's righteous character.",
                "scripture": {"text": "For I the LORD love judgment.", "ref": "Isaiah 61:8"},
                "templates": [
                    "You are the righteous Judge, O Lord. You love justice and You hate iniquity. I appeal to Your righteous character and I trust in Your perfect judgment.",
                    "Lord, You are just in all Your ways. You do not overlook wrong and You do not forget the cry of the humble. I appeal to Your justice and Your mercy.",
                    "Father, Your justice is like the great deep. You judge with equity and You defend with power. I place my case in Your hands, the hands of the righteous Judge.",
                    "Almighty God, I appeal to Your character. You are faithful and just. You will vindicate Your people and You will bring justice in Your perfect timing.",
                ]
            },
            {
                "key": "declare",
                "title": "Declare His Righteousness",
                "guidance": "Declare your confidence that the Lord shall bring justice.",
                "scripture": {"text": "For the LORD is righteous, he loveth righteousness.", "ref": "Psalm 11:7"},
                "templates": [
                    "I declare that the Lord is righteous and He loves righteousness. Justice shall prevail. Truth shall triumph. The Lord will make all things right in His perfect timing.",
                    "I stand in confidence that God's justice will be done. No wrong shall go unanswered. No injustice shall stand before the throne of the Almighty.",
                    "I declare that the Lord fights for me. He is my advocate, my defender, and my vindicator. His justice shall roll down like waters and His righteousness like a mighty stream.",
                    "The Lord is my judge and my defender. I declare that His justice is sure, His timing is perfect, and His verdict is final. I trust Him completely.",
                ]
            },
            {
                "key": "closing",
                "title": "Rest in His Justice",
                "guidance": "Seal your prayer with trust in God's righteous judgment.",
                "scripture": {"text": "Vengeance is mine; I will repay, saith the Lord.", "ref": "Romans 12:19"},
                "templates": [
                    "I release this matter into Your hands, O Lord. Vengeance is Yours and You will repay. I choose peace over bitterness and faith over fear. Amen.",
                    "I seal this prayer with trust in Your justice, Father. You will make all things right. I rest in Your righteousness and I wait with patience. Amen.",
                    "Lord, I leave this in Your capable hands. You are the righteous Judge and Your verdict is final. I walk in peace, knowing You will bring justice. Amen.",
                    "I close this prayer with confidence in Your justice, Almighty God. You see, You know, and You will act. I trust You. Amen.",
                ]
            },
        ]
    },
}


class PrayerAgent:
    """Builds structured prayers from category flows."""

    def __init__(self):
        self.flows = PRAYER_FLOWS
        self.soul = self._load_soul()

    def _load_soul(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                return json.load(f)
        except Exception:
            return {}

    def build_prayer(self, category, topic=None):
        """Build a complete structured prayer for a category."""
        cat_key = self._normalize_category(category)
        flow = self.flows.get(cat_key)

        if not flow:
            flow = self.flows["model_prayer"]
            cat_key = "model_prayer"

        # Build each step by selecting a random template
        prayer_parts = []
        step_details = []

        for step in flow["steps"]:
            template = random.choice(step["templates"])

            # If topic provided, try to weave it in for petition/request steps
            if topic and step["key"] in ("petition", "request", "need", "situation", "wrong"):
                template = self._inject_topic(template, topic)

            prayer_parts.append(template)
            step_details.append({
                "key": step["key"],
                "title": step["title"],
                "text": template,
                "scripture": step["scripture"],
            })

        full_prayer = "\n\n".join(prayer_parts)

        return {
            "agent": "prayer",
            "timestamp": datetime.now().isoformat(),
            "category": cat_key,
            "category_name": flow["name"],
            "category_verse": flow["verse"],
            "steps": step_details,
            "full_prayer": full_prayer,
            "topic": topic,
        }

    def run(self, scripture_data=None, topic=None):
        """Main entry point — builds prayer from scripture agent output."""
        category = "model_prayer"
        if scripture_data:
            category = scripture_data.get("category", "model_prayer")
        if topic:
            category = self._topic_to_category(topic)

        result = self.build_prayer(category, topic=topic)

        # Attach scripture data if provided
        if scripture_data:
            result["scripture_data"] = {
                "daily_verse": scripture_data.get("daily_verse"),
                "category_scriptures": scripture_data.get("scriptures"),
            }

        return result

    def _normalize_category(self, category):
        mapping = {
            "model_prayer": "model_prayer",
            "the lord's prayer": "model_prayer",
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
        return mapping.get(category.lower().strip(), "model_prayer")

    def _topic_to_category(self, topic):
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
            "family": "petition", "marriage": "petition",
        }
        for key, cat in topic_cat_map.items():
            if key in topic_lower:
                return cat
        return "petition"

    def _inject_topic(self, template, topic):
        """Inject topic into template where appropriate."""
        placeholders = [
            "[specific need]", "[situation]", "[your specific request]",
            "[specific area]", "my need for protection over my life",
        ]
        for ph in placeholders:
            if ph in template.lower():
                template = template.replace(ph, topic)
                return template

        # If no placeholder, append topic context
        if "I bring before You" in template:
            template = template.replace(
                "I bring before You",
                f"I bring before You my need for {topic}."
            )
        return template


if __name__ == "__main__":
    agent = PrayerAgent()
    result = agent.run()
    print(json.dumps(result, indent=2, default=str))