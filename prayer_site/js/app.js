/* ============================================================
   PRAYER CODES — Complete Application Logic
   Refined: No emojis, elegant SVG icons, reverent tone
   ============================================================ */
'use strict';

/* ── SVG Icon Library ── */
const ICONS = {
  cross: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="6" y1="8" x2="18" y2="8"/></svg>',
  pray: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C10 6 8 10 8 13c0 2.2 1.8 4 4 4s4-1.8 4-4c0-3-2-7-4-11z"/><path d="M8 13c-2-1-4 0-4 2s2 4 4 3"/><path d="M16 13c2-1 4 0 4 2s-2 4-4 3"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="9" y1="20" x2="15" y2="20"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4a2 2 0 012-2h8.5L20 7.5V20a2 2 0 01-2 2H6a2 2 0 01-2-2v-3"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="14" y2="17"/></svg>',
  dove: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4c-2 0-4 1-5 3-1-2-3-3-5-3C5 4 3 7 3 10c0 4 5 8 9 12 4-4 9-8 9-12 0-3-2-6-3-6z"/><path d="M12 7c0-2 1-4 3-5"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/></svg>',
  scales: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M4 7h16"/><path d="M4 7l2 8h0a3 3 0 006 0h0l-2-8"/><path d="M20 7l-2 8h0a3 3 0 01-6 0h0l2-8"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  bread: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="10" rx="9" ry="6"/><path d="M3 10v4c0 3.31 4.03 6 9 6s9-2.69 9-6v-4"/></svg>',
  flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c4-3 7-6.5 7-10.5C19 7 15.5 2 12 2 8.5 2 5 7 5 11.5 5 15.5 8 19 12 22z"/><path d="M12 22c-1.5-1.5-3-3.5-3-6 0-2.5 1.5-5 3-7 1.5 2 3 4.5 3 7 0 2.5-1.5 4.5-3 6z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  hand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 00-4 0v5"/><path d="M14 10V4a2 2 0 00-4 0v6"/><path d="M10 10.5V6a2 2 0 00-4 0v8"/><path d="M18 8a2 2 0 014 0v6a8 8 0 01-8 8h-2c-2.5 0-4.5-1-6.2-2.8L3 16"/></svg>',
  crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M4 16l2-12 4 5 2-6 2 6 4-5 2 12z"/></svg>',
};

/* ── Helper to wrap icon in a span ── */
function icon(name, cls) {
  return `<span class="icon ${cls || ''}">${ICONS[name] || ''}</span>`;
}

/* ─────────────────────────────────────────────
   1. DATA — Categories, Scriptures, Daily Verses
   ───────────────────────────────────────────── */

const CATEGORIES = [
  {
    id:'model_prayer', icon:'pray', name:'The Lord\'s Prayer', verse:'Matthew 6:9-13',
    steps:[
      { key:'adoration', title:'Adoration — Honour the Father', icon:'crown',
        guidance:'Begin by honouring the Almighty. Acknowledge His holiness, His sovereignty, and His everlasting love.',
        scripture:{text:'Hallowed be thy name. Thy kingdom come.',ref:'Matthew 6:9-10'},
        placeholder:'Heavenly Father, You are holy and sovereign over all things. I honour Your name above every name…'},
      { key:'align', title:'Alignment — Thy Will Be Done', icon:'light',
        guidance:'Surrender your will to the perfect plan of the Most High. Seek His kingdom above all earthly desires.',
        scripture:{text:'Thy will be done in earth, as it is in heaven.',ref:'Matthew 6:10'},
        placeholder:'Your will be done in my life, O Lord. I submit to Your perfect plan and purpose…'},
      { key:'petition', title:'Petition — Our Daily Bread', icon:'bread',
        guidance:'Bring your daily needs before the Lord with humility. He is faithful to provide.',
        scripture:{text:'Give us this day our daily bread.',ref:'Matthew 6:11'},
        placeholder:'Lord, I trust You for my provision this day. You are my source and my sustainer…'},
      { key:'forgive', title:'Forgiveness — Debts and Debtors', icon:'heart',
        guidance:'Confess before the Lord with a contrite heart, and extend forgiveness to those who have wronged you.',
        scripture:{text:'Forgive us our debts, as we forgive our debtors.',ref:'Matthew 6:12'},
        placeholder:'I confess my transgressions and receive Your mercy. I choose to forgive as You have forgiven me…'},
      { key:'protect', title:'Deliverance — From Evil', icon:'shield',
        guidance:'Call upon the Lord\'s protection. He is your shield and your strong tower against all evil.',
        scripture:{text:'Lead us not into temptation, but deliver us from evil.',ref:'Matthew 6:13'},
        placeholder:'Deliver me from evil, O Lord. Let no temptation overcome me. I stand under Your mighty protection…'},
      { key:'closing', title:'Closing — The Kingdom, Power, and Glory', icon:'cross',
        guidance:'Seal your prayer with a declaration of God\'s eternal kingdom, power, and glory.',
        scripture:{text:'For thine is the kingdom, and the power, and the glory, for ever. Amen.',ref:'Matthew 6:13'},
        placeholder:'For Yours is the kingdom, and the power, and the glory, for ever and ever. Amen.'}
    ]
  },
  {
    id:'protection', icon:'shield', name:'Protection', verse:'Psalm 91:1',
    steps:[
      { key:'address', title:'Address the Almighty', icon:'pray',
        guidance:'Begin by declaring your trust in the Lord as your refuge, your fortress, and your deliverer.',
        scripture:{text:'God is our refuge and strength, a very present help in trouble.',ref:'Psalm 46:1'},
        placeholder:'Almighty God, You are my refuge and my fortress. I place my trust wholly in Your protection…'},
      { key:'need', title:'Present Your Need', icon:'scroll',
        guidance:'Lay your specific need for protection before the Lord. He hears every word.',
        scripture:{text:'The LORD shall preserve thee from all evil: he shall preserve thy soul.',ref:'Psalm 121:7'},
        placeholder:'Lord, I bring before You [specific need]. I ask for Your covering over my life and my household…'},
      { key:'appeal', title:'Appeal to His Faithfulness', icon:'star',
        guidance:'Recall the faithfulness of God throughout scripture. He who protected Israel protects you.',
        scripture:{text:'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',ref:'Proverbs 18:10'},
        placeholder:'You have been faithful through all generations. You delivered Daniel, shielded David, and parted the sea…'},
      { key:'declare', title:'Declare His Protection', icon:'bolt',
        guidance:'Speak protection over yourself and those you love with the authority of scripture.',
        scripture:{text:'No weapon that is formed against thee shall prosper.',ref:'Isaiah 54:17'},
        placeholder:'No weapon formed against me shall prosper. I dwell in the secret place of the Most High…'},
      { key:'closing', title:'Seal with Praise', icon:'cross',
        guidance:'Close your prayer with thanksgiving and unwavering faith in the Lord\'s deliverance.',
        scripture:{text:'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',ref:'Psalm 91:1'},
        placeholder:'I give You thanks, O Lord, for Your unfailing protection. I rest in Your shadow. Amen.'}
    ]
  },
  {
    id:'thanksgiving', icon:'heart', name:'Thanksgiving', verse:'1 Thessalonians 5:18',
    steps:[
      { key:'praise', title:'Enter with Praise', icon:'crown',
        guidance:'Enter the Lord\'s presence with praise. Thank Him for who He is before what He has done.',
        scripture:{text:'Enter into his gates with thanksgiving, and into his courts with praise.',ref:'Psalm 100:4'},
        placeholder:'Most High God, I enter Your gates with thanksgiving. You are good and Your mercy endures for ever…'},
      { key:'specific', title:'Name Your Blessings', icon:'light',
        guidance:'Be specific in your gratitude. Name the blessings, the people, and the mercies you have received.',
        scripture:{text:'Bless the LORD, O my soul, and forget not all his benefits.',ref:'Psalm 103:2'},
        placeholder:'I thank You for [specific blessings]. Your faithfulness is evident in every area of my life…'},
      { key:'gratitude', title:'Declare a Heart of Gratitude', icon:'heart',
        guidance:'Commit to a life of thanksgiving. Declare that gratitude shall be the posture of your heart.',
        scripture:{text:'In every thing give thanks: for this is the will of God.',ref:'1 Thessalonians 5:18'},
        placeholder:'I choose gratitude as my daily offering. In all circumstances, I will give thanks unto the Lord…'},
      { key:'closing', title:'Seal with Joy', icon:'cross',
        guidance:'Close your prayer with joy and praise, sealing your heart in the peace of thankfulness.',
        scripture:{text:'I will offer to thee the sacrifice of thanksgiving.',ref:'Psalm 116:17'},
        placeholder:'My heart overflows with gratitude. I offer this sacrifice of thanksgiving unto You, O Lord. Amen.'}
    ]
  },
  {
    id:'petition', icon:'scroll', name:'Petition', verse:'Matthew 7:7',
    steps:[
      { key:'adoration', title:'Adoration — Honour God First', icon:'crown',
        guidance:'Before presenting your request, honour the Lord. Acknowledge His greatness and His sovereignty.',
        scripture:{text:'Great is the LORD, and greatly to be praised.',ref:'Psalm 145:3'},
        placeholder:'Almighty God, You are great and greatly to be praised. Nothing is impossible for You…'},
      { key:'confession', title:'Confession — Prepare Your Heart', icon:'flame',
        guidance:'Confess anything that may hinder your prayer. The Lord is faithful and just to forgive.',
        scripture:{text:'If we confess our sins, he is faithful and just to forgive us our sins.',ref:'1 John 1:9'},
        placeholder:'Lord, I confess my shortcomings before You. Cleanse me and prepare my heart to receive…'},
      { key:'thanks', title:'Thanksgiving — Thank Him First', icon:'heart',
        guidance:'Thank the Lord before you see the answer. This is the prayer of faith — believing before seeing.',
        scripture:{text:'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving.',ref:'Philippians 4:6'},
        placeholder:'I thank You, Lord, that You hear me. I thank You that the answer is already established in heaven…'},
      { key:'request', title:'Supplication — Ask Boldly', icon:'scroll',
        guidance:'Present your request with boldness and specificity. The Lord invites you to ask.',
        scripture:{text:'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.',ref:'Matthew 7:7'},
        placeholder:'Lord, I bring before You [your specific request]. I ask in faith, believing I receive…'},
      { key:'closing', title:'Seal with Faith', icon:'cross',
        guidance:'Close by declaring your faith that the Lord has heard and shall answer according to His will.',
        scripture:{text:'And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.',ref:'Matthew 21:22'},
        placeholder:'I believe and I receive according to Your will. It is established. Amen.'}
    ]
  },
  {
    id:'guidance', icon:'dove', name:'Guidance', verse:'Proverbs 3:5',
    steps:[
      { key:'acknowledge', title:'Acknowledge His Wisdom', icon:'light',
        guidance:'Begin by acknowledging that the Lord is omniscient. His wisdom is perfect and His understanding infinite.',
        scripture:{text:'For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.',ref:'Proverbs 2:6'},
        placeholder:'Lord, You are the source of all wisdom. Your understanding is infinite and Your counsel is perfect…'},
      { key:'situation', title:'Present Your Situation', icon:'scroll',
        guidance:'Lay your situation before the Lord with honesty. He already knows, but speaking it builds faith.',
        scripture:{text:'Cast thy burden upon the LORD, and he shall sustain thee.',ref:'Psalm 55:22'},
        placeholder:'Father, I face a decision regarding [situation]. I need Your clear direction and Your peace…'},
      { key:'ask_wisdom', title:'Ask for Divine Wisdom', icon:'star',
        guidance:'Ask specifically for wisdom, clarity, and discernment. He gives liberally to all who ask.',
        scripture:{text:'If any of you lack wisdom, let him ask of God, that giveth to all men liberally.',ref:'James 1:5'},
        placeholder:'I ask for Your wisdom now, O Lord. Grant me clarity, discernment, and the peace that confirms Your will…'},
      { key:'trust', title:'Declare Your Trust', icon:'shield',
        guidance:'Declare that you trust the Lord\'s leading completely, even when the path is not yet visible.',
        scripture:{text:'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',ref:'Proverbs 3:5'},
        placeholder:'I trust You with all my heart, O Lord. I lean not on my own understanding but on Your perfect guidance…'},
      { key:'closing', title:'Rest in His Plan', icon:'cross',
        guidance:'Close by resting in the Lord\'s perfect plan. He who began a good work shall complete it.',
        scripture:{text:'I will instruct thee and teach thee in the way which thou shalt go.',ref:'Psalm 32:8'},
        placeholder:'I rest in Your sovereign plan. Guide my every step according to Your perfect will. Amen.'}
    ]
  },
  {
    id:'healing', icon:'leaf', name:'Healing', verse:'Psalm 147:3',
    steps:[
      { key:'adoration', title:'God the Healer', icon:'light',
        guidance:'Begin by acknowledging the Lord as Jehovah Rapha — the God who heals. He is near to the brokenhearted.',
        scripture:{text:'The LORD is nigh unto them that are of a broken heart.',ref:'Psalm 34:18'},
        placeholder:'Lord God, You are Jehovah Rapha, the God who heals. You are near to the brokenhearted and You bind up every wound…'},
      { key:'confession', title:'Release and Receive', icon:'flame',
        guidance:'Release anything that may be hindering your healing. Receive the Lord\'s forgiveness and cleansing.',
        scripture:{text:'Repent ye therefore, and be converted, that your sins may be blotted out.',ref:'Acts 3:19'},
        placeholder:'I release all bitterness, unforgiveness, and fear. I receive Your cleansing and Your restoration…'},
      { key:'thanks', title:'Thank God for Healing', icon:'heart',
        guidance:'Thank the Lord for healing as though it is already accomplished. By His stripes, you are healed.',
        scripture:{text:'By whose stripes ye were healed.',ref:'1 Peter 2:24'},
        placeholder:'I thank You, Lord, for my healing. By Your stripes I am healed. I declare wholeness over my body, mind, and spirit…'},
      { key:'request', title:'Request Healing and Restoration', icon:'leaf',
        guidance:'Ask specifically for healing. Name the area of body, mind, or spirit that needs the Lord\'s touch.',
        scripture:{text:'He healeth the broken in heart, and bindeth up their wounds.',ref:'Psalm 147:3'},
        placeholder:'I ask for complete healing in [specific area]. Restore every cell, every organ, every part of my being…'},
      { key:'closing', title:'Declare Wholeness', icon:'cross',
        guidance:'Seal your prayer by declaring wholeness and health over your life in the name of the Lord.',
        scripture:{text:'And the prayer of faith shall save the sick, and the Lord shall raise him up.',ref:'James 5:15'},
        placeholder:'I am whole. I am restored. I am healed by the power of the Most High God. Amen.'}
    ]
  },
  {
    id:'justice', icon:'scales', name:'Justice', verse:'Amos 5:24',
    steps:[
      { key:'wrong', title:'Present the Injustice', icon:'scales',
        guidance:'Bring the injustice before the Lord, the righteous Judge. He sees all things and His judgment is true.',
        scripture:{text:'But let judgment run down as waters, and righteousness as a mighty stream.',ref:'Amos 5:24'},
        placeholder:'Lord, I bring before You the injustice of [situation]. You see all things and Your judgment is righteous…'},
      { key:'appeal', title:'Appeal to the Righteous Judge', icon:'bolt',
        guidance:'Call upon the Lord\'s righteous character. He is the ultimate Judge who loves justice and hates iniquity.',
        scripture:{text:'For I the LORD love judgment.',ref:'Isaiah 61:8'},
        placeholder:'You are the righteous Judge. You love justice and You hate iniquity. I appeal to Your righteous character…'},
      { key:'declare', title:'Declare His Righteousness', icon:'star',
        guidance:'Declare your confidence that the Lord shall bring justice in His perfect timing.',
        scripture:{text:'For the LORD is righteous, he loveth righteousness.',ref:'Psalm 11:7'},
        placeholder:'I declare that Your righteousness shall prevail. Truth shall be revealed and justice shall be established…'},
      { key:'closing', title:'Trust His Timing', icon:'cross',
        guidance:'Seal your prayer by trusting the Lord\'s perfect timing. Vengeance belongs to Him alone.',
        scripture:{text:'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy.',ref:'Micah 6:8'},
        placeholder:'I trust Your timing and Your justice, O Lord. I commit this matter into Your hands. Amen.'}
    ]
  },
  {
    id:'spiritual_warfare', icon:'shield', name:'Spiritual Warfare', verse:'Ephesians 6:11',
    steps:[
      { key:'authority', title:'Declaration of Authority',
        guidance:'Declare the authority you have been given in Christ. You stand in the power of the risen King.',
        scripture:{text:'Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.',ref:'Luke 10:19'},
        placeholder:'In the name of Jesus Christ, I declare that I have been given authority over all the power of the enemy...'},
      { key:'identify', title:'Identify the Battle',
        guidance:'Name the spiritual battle you face. Your struggle is not against flesh and blood.',
        scripture:{text:'For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places.',ref:'Ephesians 6:12'},
        placeholder:'Lord, I recognise that this battle is not of flesh and blood. I identify the work of the enemy...'},
      { key:'armor', title:'Put on the Armor of God',
        guidance:'Deliberately put on each piece of the armor of God \u2014 truth, righteousness, gospel, faith, salvation, the Word.',
        scripture:{text:'Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.',ref:'Ephesians 6:11'},
        placeholder:'I gird my loins with truth. I put on the breastplate of righteousness. I shod my feet with the gospel of peace. I take up the shield of faith...'},
      { key:'sword', title:'Wield the Sword of the Spirit',
        guidance:'The Word of God is your offensive weapon. Speak scripture against every lie and scheme.',
        scripture:{text:'And take the helmet of salvation, and the sword of the Spirit, which is the word of God.',ref:'Ephesians 6:17'},
        placeholder:'It is written: no weapon formed against me shall prosper. It is written: greater is He that is in me than he that is in the world...'},
      { key:'stand', title:'Stand Firm',
        guidance:'Having done all, stand. Refuse to retreat. Plant your feet on the promises of God.',
        scripture:{text:'Wherefore take unto you the whole armour of God, that ye may be able to withstand in the evil day, and having done all, to stand.',ref:'Ephesians 6:13'},
        placeholder:'I have done all that You have asked, O Lord. Now I stand firm. I will not retreat. I will not be moved...'},
      { key:'victory', title:'Victory Declaration',
        guidance:'Declare the victory already won through the blood of Jesus Christ.',
        scripture:{text:'Nay, in all these things we are more than conquerors through him that loved us.',ref:'Romans 8:37'},
        placeholder:'I am more than a conqueror through Christ who loved me. The victory is won. The enemy is defeated. Amen.'}
    ]
  },
  {
    id:'intercession', icon:'hand', name:'Intercession', verse:'1 Timothy 2:1',
    steps:[
      { key:'heart', title:'God\'s Heart for People',
        guidance:'Acknowledge the heart of the Father for all people. He desires that none should perish.',
        scripture:{text:'I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men.',ref:'1 Timothy 2:1'},
        placeholder:'Father, Your heart breaks for Your children. You desire that none should perish. I come before You now with Your heart for others...'},
      { key:'identify_person', title:'Who You Are Praying For',
        guidance:'Name the person or people you are interceding for. Bring them before the throne by name.',
        scripture:{text:'And he saw that there was no man, and wondered that there was no intercessor.',ref:'Isaiah 59:16'},
        placeholder:'Lord, I stand in the gap for those on my heart. I bring them before Your throne of grace by name...'},
      { key:'needs', title:'Lift Their Specific Needs',
        guidance:'Present their needs with faith. Be specific, earnest, and persistent.',
        scripture:{text:'The effectual fervent prayer of a righteous man availeth much.',ref:'James 5:16'},
        placeholder:'Lord, I lift up their needs. Where there is sickness, bring healing. Where there is lack, bring provision. Where there is confusion, bring clarity...'},
      { key:'protect', title:'Pray Protection Over Them',
        guidance:'Cover them with the Lord\'s protection \u2014 their lives, families, minds, and spirits.',
        scripture:{text:'The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.',ref:'Psalm 121:8'},
        placeholder:'I pray a hedge of protection around them. Guard their coming and going. Protect their minds, bodies, and spirits...'},
      { key:'declare', title:'Declare God\'s Promises',
        guidance:'Speak the promises of God over their lives. His Word does not return void.',
        scripture:{text:'So shall my word be that goeth forth out of my mouth: it shall not return unto me void, but it shall accomplish that which I please.',ref:'Isaiah 55:11'},
        placeholder:'I declare over them that You have plans to prosper them and not to harm them. Your Word accomplishes its purpose. Amen.'}
    ]
  },
  {
    id:'forgiveness', icon:'heart', name:'Forgiveness', verse:'Ephesians 4:32',
    steps:[
      { key:'mercy', title:'Acknowledge God\'s Mercy',
        guidance:'Remember the immeasurable mercy God has shown you. Before you forgive others, stand in awe of how much you have been forgiven.',
        scripture:{text:'But God, who is rich in mercy, for his great love wherewith he loved us, Even when we were dead in sins, hath quickened us together with Christ.',ref:'Ephesians 2:4-5'},
        placeholder:'Father, I stand in awe of Your mercy. When I was yet a sinner, You loved me. Your mercy is new every morning...'},
      { key:'identify_person', title:'Who You Need to Forgive',
        guidance:'Bring before the Lord those who have wronged you. Lay it honestly before the Father.',
        scripture:{text:'For if ye forgive men their trespasses, your heavenly Father will also forgive you.',ref:'Matthew 6:14'},
        placeholder:'Lord, I bring before You the hurt that was caused. I do not hide it \u2014 I lay it at Your feet...'},
      { key:'release', title:'Release Bitterness',
        guidance:'Choose by an act of your will to release all bitterness, anger, and resentment. This is a decision of obedience.',
        scripture:{text:'Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice.',ref:'Ephesians 4:31'},
        placeholder:'By an act of my will, I release all bitterness, all anger, and all resentment. I choose to forgive as Christ has forgiven me...'},
      { key:'bless', title:'Pray Blessing Over Them',
        guidance:'Go beyond releasing \u2014 pray blessing over those who wronged you. This is the way of Christ.',
        scripture:{text:'But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you.',ref:'Matthew 5:44'},
        placeholder:'Lord, I pray Your blessing over them. Open their eyes to Your love. Draw them closer to You...'},
      { key:'peace', title:'Receive God\'s Peace',
        guidance:'Having forgiven, receive the peace only God can give. Let His peace flood your heart.',
        scripture:{text:'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you.',ref:'Ephesians 4:32'},
        placeholder:'I receive Your peace now, O Lord. Where there was a wound, pour in Your healing oil. I am free. Amen.'}
    ]
  },
  {
    id:'praise_worship', icon:'crown', name:'Praise & Worship', verse:'Psalm 150:6',
    steps:[
      { key:'nature', title:'Declare God\'s Nature',
        guidance:'Declare who God is \u2014 His holiness, His majesty, His unchanging nature. Worship is about who He is.',
        scripture:{text:'Holy, holy, holy, is the Lord of hosts: the whole earth is full of his glory.',ref:'Isaiah 6:3'},
        placeholder:'Holy, holy, holy are You, Lord God Almighty. You are the Alpha and Omega, the Beginning and the End...'},
      { key:'remember', title:'Remember His Works',
        guidance:'Recall the mighty works of the Lord \u2014 in scripture and in your own life.',
        scripture:{text:'Remember his marvellous works that he hath done; his wonders, and the judgments of his mouth.',ref:'Psalm 105:5'},
        placeholder:'I remember how You parted the Red Sea, how You shut the mouths of lions. And in my own life, Your works are marvellous...'},
      { key:'exalt', title:'Exalt His Name',
        guidance:'Lift the name of the Lord above every other name. Exalt Him with your words.',
        scripture:{text:'Be thou exalted, LORD, in thine own strength: so will we sing and praise thy power.',ref:'Psalm 21:13'},
        placeholder:'I exalt Your name above every name. Above every circumstance, every fear, every trial \u2014 Your name is higher...'},
      { key:'surrender', title:'Surrender in Worship',
        guidance:'Let worship become surrender. Lay down your agenda, your burdens, your pride.',
        scripture:{text:'O come, let us worship and bow down: let us kneel before the LORD our maker.',ref:'Psalm 95:6'},
        placeholder:'I bow before You, my King. I lay down everything. In this moment, I am Yours completely...'},
      { key:'worthy', title:'Declare His Worthiness',
        guidance:'Declare that the Lord alone is worthy of all praise, all honour, and all glory.',
        scripture:{text:'Let every thing that hath breath praise the LORD. Praise ye the LORD.',ref:'Psalm 150:6'},
        placeholder:'You alone are worthy, O Lord. Worthy of all praise, all honour, all glory. I will praise You all the days of my life. Amen.'}
    ]
  },
  {
    id:'peace_anxiety', icon:'dove', name:'Peace & Anxiety', verse:'Philippians 4:6-7',
    steps:[
      { key:'bring', title:'Bring Your Worries to God',
        guidance:'Do not carry the weight alone. Pour out every anxious thought before the Lord.',
        scripture:{text:'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',ref:'Philippians 4:6'},
        placeholder:'Father, my heart is heavy and my mind is restless. I bring before You every anxious thought, every worry, every fear...'},
      { key:'cast', title:'Cast Your Cares',
        guidance:'Release the weight. Transfer the burden from your shoulders to the Lord\'s mighty hands.',
        scripture:{text:'Casting all your care upon him; for he careth for you.',ref:'1 Peter 5:7'},
        placeholder:'Lord, I cast every care upon You now. I release the anxiety. I transfer the weight to Your mighty hands...'},
      { key:'remember', title:'Remember His Faithfulness',
        guidance:'Anchor your soul in the faithfulness of God. He has never failed.',
        scripture:{text:'The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul.',ref:'Psalm 23:1-3'},
        placeholder:'You have never failed me, O Lord. In every trial, You were there. I anchor my soul in Your faithfulness...'},
      { key:'receive', title:'Receive His Peace',
        guidance:'Open your heart to receive the supernatural peace of God \u2014 peace that surpasses understanding.',
        scripture:{text:'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',ref:'Philippians 4:7'},
        placeholder:'I receive Your peace now, Lord. Not the peace the world gives, but Your supernatural peace. Guard my heart. Guard my mind...'},
      { key:'trust', title:'Trust Declaration',
        guidance:'Seal your prayer with a bold declaration of trust. You will not be ruled by fear.',
        scripture:{text:'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',ref:'Isaiah 26:3'},
        placeholder:'I will not be ruled by fear. My mind is stayed on You, O Lord, and You keep me in perfect peace. Amen.'}
    ]
  }

];

const SCRIPTURE_DB = {
  protection:[
    {text:"The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust.",ref:"Psalm 18:2"},
    {text:"No weapon that is formed against thee shall prosper.",ref:"Isaiah 54:17"},
    {text:"The angel of the LORD encampeth round about them that fear him, and delivereth them.",ref:"Psalm 34:7"},
    {text:"God is our refuge and strength, a very present help in trouble.",ref:"Psalm 46:1"},
    {text:"The LORD shall preserve thee from all evil: he shall preserve thy soul.",ref:"Psalm 121:7"},
    {text:"He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",ref:"Psalm 91:1"},
    {text:"When thou passest through the waters, I will be with thee.",ref:"Isaiah 43:2"},
    {text:"The LORD is my light and my salvation; whom shall I fear?",ref:"Psalm 27:1"},
    {text:"For he shall give his angels charge over thee, to keep thee in all thy ways.",ref:"Psalm 91:11"},
    {text:"He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler.",ref:"Psalm 91:4"},
    {text:"Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",ref:"Deuteronomy 31:6"},
    {text:"But the Lord is faithful, who shall stablish you, and keep you from evil.",ref:"2 Thessalonians 3:3"},
    {text:"Though a thousand fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.",ref:"Psalm 91:7"},
    {text:"As the mountains are round about Jerusalem, so the LORD is round about his people from henceforth even for ever.",ref:"Psalm 125:2"},
    {text:"The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.",ref:"Nahum 1:7"},
    {text:"But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.",ref:"Psalm 3:3"},
    {text:"Thou art my hiding place; thou shalt preserve me from trouble; thou shalt compass me about with songs of deliverance.",ref:"Psalm 32:7"},
    {text:"The LORD of hosts is with us; the God of Jacob is our refuge. Selah.",ref:"Psalm 46:7"},
  ],
  healing:[
    {text:"By whose stripes ye were healed.",ref:"1 Peter 2:24"},
    {text:"Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",ref:"Psalm 103:2-3"},
    {text:"And the prayer of faith shall save the sick, and the Lord shall raise him up.",ref:"James 5:15"},
    {text:"He healeth the broken in heart, and bindeth up their wounds.",ref:"Psalm 147:3"},
    {text:"But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",ref:"Isaiah 53:5"},
    {text:"The LORD is nigh unto them that are of a broken heart.",ref:"Psalm 34:18"},
    {text:"I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.",ref:"Jeremiah 30:17"},
    {text:"He sent his word, and healed them, and delivered them from their destructions.",ref:"Psalm 107:20"},
    {text:"And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom, and healing all manner of sickness.",ref:"Matthew 4:23"},
    {text:"And said, If thou wilt diligently hearken to the voice of the LORD thy God, I will put none of these diseases upon thee.",ref:"Exodus 15:26"},
    {text:"Heal me, O LORD, and I shall be healed; save me, and I shall be saved: for thou art my praise.",ref:"Jeremiah 17:14"},
    {text:"But unto you that fear my name shall the Sun of righteousness arise with healing in his wings.",ref:"Malachi 4:2"},
    {text:"Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness.",ref:"1 Peter 2:24"},
    {text:"And Jesus said unto him, Go thy way; thy faith hath made thee whole.",ref:"Mark 10:52"},
    {text:"And the whole multitude sought to touch him: for there went virtue out of him, and healed them all.",ref:"Luke 6:19"},
    {text:"My son, attend to my words; incline thine ear unto my sayings. For they are life unto those that find them, and health to all their flesh.",ref:"Proverbs 4:20-22"},
    {text:"And Jesus went forth, and saw a great multitude, and was moved with compassion toward them, and he healed their sick.",ref:"Matthew 14:14"},
  ],
  wisdom:[
    {text:"Trust in the LORD with all thine heart; and lean not unto thine own understanding.",ref:"Proverbs 3:5"},
    {text:"If any of you lack wisdom, let him ask of God, that giveth to all men liberally.",ref:"James 1:5"},
    {text:"I will instruct thee and teach thee in the way which thou shalt go.",ref:"Psalm 32:8"},
    {text:"The fear of the LORD is the beginning of wisdom.",ref:"Proverbs 9:10"},
    {text:"For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.",ref:"Proverbs 2:6"},
    {text:"Thy word is a lamp unto my feet, and a light unto my path.",ref:"Psalm 119:105"},
    {text:"The entrance of thy words giveth light; it giveth understanding unto the simple.",ref:"Psalm 119:130"},
    {text:"Get wisdom, get understanding: forget it not; neither decline from the words of my mouth.",ref:"Proverbs 4:5"},
    {text:"Wisdom is the principal thing; therefore get wisdom: and with all thy getting get understanding.",ref:"Proverbs 4:7"},
    {text:"The mouth of the righteous speaketh wisdom, and his tongue talketh of judgment.",ref:"Psalm 37:30"},
    {text:"So teach us to number our days, that we may apply our hearts unto wisdom.",ref:"Psalm 90:12"},
    {text:"Happy is the man that findeth wisdom, and the man that getteth understanding.",ref:"Proverbs 3:13"},
    {text:"But the wisdom that is from above is first pure, then peaceable, gentle, and easy to be intreated.",ref:"James 3:17"},
    {text:"A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels.",ref:"Proverbs 1:5"},
    {text:"In whom are hid all the treasures of wisdom and knowledge.",ref:"Colossians 2:3"},
    {text:"How much better is it to get wisdom than gold! and to get understanding rather to be chosen than silver!",ref:"Proverbs 16:16"},
    {text:"The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.",ref:"Proverbs 1:7"},
  ],
  thanksgiving:[
    {text:"Enter into his gates with thanksgiving, and into his courts with praise.",ref:"Psalm 100:4"},
    {text:"In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",ref:"1 Thessalonians 5:18"},
    {text:"By him therefore let us offer the sacrifice of praise to God continually.",ref:"Hebrews 13:15"},
    {text:"O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",ref:"Psalm 136:1"},
    {text:"I will praise the name of God with a song, and will magnify him with thanksgiving.",ref:"Psalm 69:30"},
    {text:"O give thanks unto the LORD; call upon his name: make known his deeds among the people.",ref:"Psalm 105:1"},
    {text:"It is a good thing to give thanks unto the LORD, and to sing praises unto thy name, O most High.",ref:"Psalm 92:1"},
    {text:"Giving thanks always for all things unto God and the Father in the name of our Lord Jesus Christ.",ref:"Ephesians 5:20"},
    {text:"And let the peace of God rule in your hearts, to the which also ye are called in one body; and be ye thankful.",ref:"Colossians 3:15"},
    {text:"Continue in prayer, and watch in the same with thanksgiving.",ref:"Colossians 4:2"},
    {text:"Thanks be unto God for his unspeakable gift.",ref:"2 Corinthians 9:15"},
    {text:"Praise ye the LORD. O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",ref:"Psalm 106:1"},
    {text:"O give thanks unto the God of gods: for his mercy endureth for ever.",ref:"Psalm 136:2"},
    {text:"Oh that men would praise the LORD for his goodness, and for his wonderful works to the children of men!",ref:"Psalm 107:8"},
    {text:"I will offer to thee the sacrifice of thanksgiving, and will call upon the name of the LORD.",ref:"Psalm 116:17"},
    {text:"What shall I render unto the LORD for all his benefits toward me?",ref:"Psalm 116:12"},
    {text:"Rooted and built up in him, and stablished in the faith, as ye have been taught, abounding therein with thanksgiving.",ref:"Colossians 2:7"},
  ],
  petition:[
    {text:"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",ref:"Matthew 7:7"},
    {text:"Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",ref:"Philippians 4:6"},
    {text:"And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.",ref:"Matthew 21:22"},
    {text:"Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.",ref:"Mark 11:24"},
    {text:"And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us.",ref:"1 John 5:14"},
    {text:"Call unto me, and I will answer thee, and shew thee great and mighty things, which thou knowest not.",ref:"Jeremiah 33:3"},
    {text:"If ye shall ask any thing in my name, I will do it.",ref:"John 14:14"},
    {text:"Delight thyself also in the LORD: and he shall give thee the desires of thine heart.",ref:"Psalm 37:4"},
    {text:"The LORD is far from the wicked: but he heareth the prayer of the righteous.",ref:"Proverbs 15:29"},
    {text:"Ye have not, because ye ask not.",ref:"James 4:2"},
    {text:"Hitherto have ye asked nothing in my name: ask, and ye shall receive, that your joy may be full.",ref:"John 16:24"},
    {text:"And whatsoever we ask, we receive of him, because we keep his commandments.",ref:"1 John 3:22"},
    {text:"The eyes of the LORD are upon the righteous, and his ears are open unto their cry.",ref:"Psalm 34:15"},
    {text:"He will fulfil the desire of them that fear him: he also will hear their cry, and will save them.",ref:"Psalm 145:19"},
    {text:"In the day when I cried thou answeredst me, and strengthenedst me with strength in my soul.",ref:"Psalm 138:3"},
    {text:"For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened.",ref:"Matthew 7:8"},
    {text:"And I say unto you, Ask, and it shall be given you; seek, and ye shall find.",ref:"Luke 11:9"},
  ],
  faith:[
    {text:"Now faith is the substance of things hoped for, the evidence of things not seen.",ref:"Hebrews 11:1"},
    {text:"So then faith cometh by hearing, and hearing by the word of God.",ref:"Romans 10:17"},
    {text:"But without faith it is impossible to please him.",ref:"Hebrews 11:6"},
    {text:"For we walk by faith, not by sight.",ref:"2 Corinthians 5:7"},
    {text:"I can do all things through Christ which strengtheneth me.",ref:"Philippians 4:13"},
    {text:"Looking unto Jesus the author and finisher of our faith.",ref:"Hebrews 12:2"},
    {text:"Jesus said unto him, If thou canst believe, all things are possible to him that believeth.",ref:"Mark 9:23"},
    {text:"For as the body without the spirit is dead, so faith without works is dead also.",ref:"James 2:26"},
    {text:"And he said to the woman, Thy faith hath saved thee; go in peace.",ref:"Luke 7:50"},
    {text:"Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked.",ref:"Ephesians 6:16"},
    {text:"That the trial of your faith, being much more precious than of gold that perisheth, might be found unto praise.",ref:"1 Peter 1:7"},
    {text:"For whatsoever is born of God overcometh the world: and this is the victory that overcometh the world, even our faith.",ref:"1 John 5:4"},
    {text:"If ye have faith as a grain of mustard seed, ye shall say unto this mountain, Remove hence; and it shall remove.",ref:"Matthew 17:20"},
    {text:"Being justified by faith, we have peace with God through our Lord Jesus Christ.",ref:"Romans 5:1"},
    {text:"Fight the good fight of faith, lay hold on eternal life.",ref:"1 Timothy 6:12"},
    {text:"These all died in faith, not having received the promises, but having seen them afar off.",ref:"Hebrews 11:13"},
    {text:"By faith Abraham, when he was called to go out into a place which he should after receive for an inheritance, obeyed.",ref:"Hebrews 11:8"},
  ],
  peace:[
    {text:"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.",ref:"John 14:27"},
    {text:"And the peace of God, which passeth all understanding, shall keep your hearts and minds.",ref:"Philippians 4:7"},
    {text:"Thou wilt keep him in perfect peace, whose mind is stayed on thee.",ref:"Isaiah 26:3"},
    {text:"The LORD will give strength unto his people; the LORD will bless his people with peace.",ref:"Psalm 29:11"},
    {text:"The LORD lift up his countenance upon thee, and give thee peace.",ref:"Numbers 6:26"},
    {text:"Great peace have they which love thy law: and nothing shall offend them.",ref:"Psalm 119:165"},
    {text:"Be still, and know that I am God.",ref:"Psalm 46:10"},
    {text:"For he is our peace, who hath made both one, and hath broken down the middle wall of partition between us.",ref:"Ephesians 2:14"},
    {text:"And let the peace of God rule in your hearts.",ref:"Colossians 3:15"},
    {text:"These things I have spoken unto you, that in me ye might have peace.",ref:"John 16:33"},
    {text:"The meek shall inherit the earth; and shall delight themselves in the abundance of peace.",ref:"Psalm 37:11"},
    {text:"For to be carnally minded is death; but to be spiritually minded is life and peace.",ref:"Romans 8:6"},
    {text:"Blessed are the peacemakers: for they shall be called the children of God.",ref:"Matthew 5:9"},
    {text:"Mark the perfect man, and behold the upright: for the end of that man is peace.",ref:"Psalm 37:37"},
    {text:"Now the Lord of peace himself give you peace always by all means.",ref:"2 Thessalonians 3:16"},
    {text:"For the kingdom of God is not meat and drink; but righteousness, and peace, and joy in the Holy Ghost.",ref:"Romans 14:17"},
    {text:"Depart from evil, and do good; seek peace, and pursue it.",ref:"Psalm 34:14"},
  ],
  justice:[
    {text:"But let judgment run down as waters, and righteousness as a mighty stream.",ref:"Amos 5:24"},
    {text:"He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy.",ref:"Micah 6:8"},
    {text:"The LORD executeth righteousness and judgment for all that are oppressed.",ref:"Psalm 103:6"},
    {text:"For the LORD is righteous, he loveth righteousness.",ref:"Psalm 11:7"},
    {text:"Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",ref:"Matthew 5:6"},
    {text:"Open thy mouth, judge righteously, and plead the cause of the poor and needy.",ref:"Proverbs 31:9"},
    {text:"The LORD is known by the judgment which he executeth.",ref:"Psalm 9:16"},
    {text:"To do justice and judgment is more acceptable to the LORD than sacrifice.",ref:"Proverbs 21:3"},
    {text:"Thus saith the LORD; Execute ye judgment and righteousness, and deliver the spoiled out of the hand of the oppressor.",ref:"Jeremiah 22:3"},
    {text:"Learn to do well; seek judgment, relieve the oppressed, judge the fatherless, plead for the widow.",ref:"Isaiah 1:17"},
    {text:"Defend the poor and fatherless: do justice to the afflicted and needy.",ref:"Psalm 82:3"},
    {text:"For I the LORD love judgment, I hate robbery for burnt offering.",ref:"Isaiah 61:8"},
    {text:"The righteous LORD loveth righteousness; his countenance doth behold the upright.",ref:"Psalm 11:7"},
    {text:"Shall not the Judge of all the earth do right?",ref:"Genesis 18:25"},
    {text:"He shall judge the world in righteousness, and the people with equity.",ref:"Psalm 98:9"},
    {text:"Execute true judgment, and shew mercy and compassions every man to his brother.",ref:"Zechariah 7:9"},
    {text:"Righteousness and judgment are the habitation of thy throne: mercy and truth shall go before thy face.",ref:"Psalm 89:14"},
  ],
  prayer:[
    {text:"Pray without ceasing.",ref:"1 Thessalonians 5:17"},
    {text:"The effectual fervent prayer of a righteous man availeth much.",ref:"James 5:16"},
    {text:"Let us therefore come boldly unto the throne of grace.",ref:"Hebrews 4:16"},
    {text:"For where two or three are gathered together in my name, there am I in the midst of them.",ref:"Matthew 18:20"},
    {text:"Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them.",ref:"Matthew 18:19"},
    {text:"The LORD is nigh unto all them that call upon him, to all that call upon him in truth.",ref:"Psalm 145:18"},
    {text:"Come unto me, all ye that labour and are heavy laden, and I will give you rest.",ref:"Matthew 11:28"},
    {text:"If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven.",ref:"2 Chronicles 7:14"},
    {text:"But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret.",ref:"Matthew 6:6"},
    {text:"Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought.",ref:"Romans 8:26"},
    {text:"Rejoicing in hope; patient in tribulation; continuing instant in prayer.",ref:"Romans 12:12"},
    {text:"Is any among you afflicted? let him pray. Is any merry? let him sing psalms.",ref:"James 5:13"},
    {text:"Watch and pray, that ye enter not into temptation: the spirit indeed is willing, but the flesh is weak.",ref:"Matthew 26:41"},
    {text:"And I say unto you, Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",ref:"Luke 11:9"},
    {text:"Confess your faults one to another, and pray one for another, that ye may be healed.",ref:"James 5:16"},
    {text:"Evening, and morning, and at noon, will I pray, and cry aloud: and he shall hear my voice.",ref:"Psalm 55:17"},
    {text:"Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance.",ref:"Ephesians 6:18"},
  ],
  spiritual_warfare:[
    {text:"Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",ref:"Ephesians 6:11"},
    {text:"For we wrestle not against flesh and blood, but against principalities, against powers.",ref:"Ephesians 6:12"},
    {text:"Submit yourselves therefore to God. Resist the devil, and he will flee from you.",ref:"James 4:7"},
    {text:"For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds.",ref:"2 Corinthians 10:4"},
    {text:"Thou art my battle axe and weapons of war: for with thee will I break in pieces the nations.",ref:"Jeremiah 51:20"},
    {text:"No weapon that is formed against thee shall prosper; and every tongue that shall rise against thee in judgment thou shalt condemn.",ref:"Isaiah 54:17"},
    {text:"Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour.",ref:"1 Peter 5:8"},
    {text:"And they overcame him by the blood of the Lamb, and by the word of their testimony.",ref:"Revelation 12:11"},
    {text:"Finally, my brethren, be strong in the Lord, and in the power of his might.",ref:"Ephesians 6:10"},
    {text:"The LORD shall fight for you, and ye shall hold your peace.",ref:"Exodus 14:14"},
    {text:"Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world.",ref:"1 John 4:4"},
    {text:"But thanks be to God, which giveth us the victory through our Lord Jesus Christ.",ref:"1 Corinthians 15:57"},
    {text:"And these signs shall follow them that believe; In my name shall they cast out devils.",ref:"Mark 16:17"},
    {text:"Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy.",ref:"Luke 10:19"},
    {text:"For though we walk in the flesh, we do not war after the flesh.",ref:"2 Corinthians 10:3"},
    {text:"Nay, in all these things we are more than conquerors through him that loved us.",ref:"Romans 8:37"},
    {text:"Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son.",ref:"Colossians 1:13"},
  ],
  intercession:[
    {text:"I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men.",ref:"1 Timothy 2:1"},
    {text:"And he saw that there was no man, and wondered that there was no intercessor.",ref:"Isaiah 59:16"},
    {text:"Pray one for another, that ye may be healed. The effectual fervent prayer of a righteous man availeth much.",ref:"James 5:16"},
    {text:"I have set watchmen upon thy walls, O Jerusalem, which shall never hold their peace day nor night.",ref:"Isaiah 62:6"},
    {text:"And I sought for a man among them, that should make up the hedge, and stand in the gap before me for the land.",ref:"Ezekiel 22:30"},
    {text:"Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who also maketh intercession for us.",ref:"Romans 8:34"},
    {text:"Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.",ref:"Hebrews 7:25"},
    {text:"Brethren, pray for us.",ref:"1 Thessalonians 5:25"},
    {text:"Bear ye one another\u2019s burdens, and so fulfil the law of Christ.",ref:"Galatians 6:2"},
    {text:"Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints.",ref:"Ephesians 6:18"},
    {text:"For there is one God, and one mediator between God and men, the man Christ Jesus.",ref:"1 Timothy 2:5"},
    {text:"Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought.",ref:"Romans 8:26"},
    {text:"And Abraham drew near, and said, Wilt thou also destroy the righteous with the wicked?",ref:"Genesis 18:23"},
    {text:"Therefore I will look unto the LORD; I will wait for the God of my salvation: my God will hear me.",ref:"Micah 7:7"},
    {text:"And Moses besought the LORD his God, and said, LORD, why doth thy wrath wax hot against thy people?",ref:"Exodus 32:11"},
    {text:"The LORD turned the captivity of Job, when he prayed for his friends.",ref:"Job 42:10"},
    {text:"Peter therefore was kept in prison: but prayer was made without ceasing of the church unto God for him.",ref:"Acts 12:5"},
  ],
  forgiveness:[
    {text:"And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\u2019s sake hath forgiven you.",ref:"Ephesians 4:32"},
    {text:"For if ye forgive men their trespasses, your heavenly Father will also forgive you.",ref:"Matthew 6:14"},
    {text:"But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you.",ref:"Matthew 5:44"},
    {text:"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",ref:"1 John 1:9"},
    {text:"As far as the east is from the west, so far hath he removed our transgressions from us.",ref:"Psalm 103:12"},
    {text:"Let all bitterness, and wrath, and anger, and clamour, and evil speaking, be put away from you, with all malice.",ref:"Ephesians 4:31"},
    {text:"Forbearing one another, and forgiving one another, if any man have a quarrel against any: even as Christ forgave you, so also do ye.",ref:"Colossians 3:13"},
    {text:"Then said Jesus, Father, forgive them; for they know not what they do.",ref:"Luke 23:34"},
    {text:"Come now, and let us reason together, saith the LORD: though your sins be as scarlet, they shall be as white as snow.",ref:"Isaiah 1:18"},
    {text:"Who is a God like unto thee, that pardoneth iniquity, and passeth by the transgression of the remnant of his heritage?",ref:"Micah 7:18"},
    {text:"Blessed is he whose transgression is forgiven, whose sin is covered.",ref:"Psalm 32:1"},
    {text:"I, even I, am he that blotteth out thy transgressions for mine own sake, and will not remember thy sins.",ref:"Isaiah 43:25"},
    {text:"In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.",ref:"Ephesians 1:7"},
    {text:"Then Peter said unto them, Repent, and be baptized every one of you in the name of Jesus Christ for the remission of sins.",ref:"Acts 2:38"},
    {text:"And when ye stand praying, forgive, if ye have ought against any: that your Father also which is in heaven may forgive you.",ref:"Mark 11:25"},
    {text:"For thou, Lord, art good, and ready to forgive; and plenteous in mercy unto all them that call upon thee.",ref:"Psalm 86:5"},
    {text:"Then came Peter to him, and said, Lord, how oft shall my brother sin against me, and I forgive him? Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven.",ref:"Matthew 18:21-22"},
  ],
  praise:[
    {text:"Let every thing that hath breath praise the LORD. Praise ye the LORD.",ref:"Psalm 150:6"},
    {text:"O come, let us sing unto the LORD: let us make a joyful noise to the rock of our salvation.",ref:"Psalm 95:1"},
    {text:"O sing unto the LORD a new song: sing unto the LORD, all the earth.",ref:"Psalm 96:1"},
    {text:"I will praise thee, O LORD, with my whole heart; I will shew forth all thy marvellous works.",ref:"Psalm 9:1"},
    {text:"From the rising of the sun unto the going down of the same the LORD\u2019s name is to be praised.",ref:"Psalm 113:3"},
    {text:"I will bless the LORD at all times: his praise shall continually be in my mouth.",ref:"Psalm 34:1"},
    {text:"Praise ye the LORD. Praise God in his sanctuary: praise him in the firmament of his power.",ref:"Psalm 150:1"},
    {text:"Great is the LORD, and greatly to be praised; and his greatness is unsearchable.",ref:"Psalm 145:3"},
    {text:"Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name.",ref:"Psalm 100:4"},
    {text:"Thou art worthy, O Lord, to receive glory and honour and power: for thou hast created all things.",ref:"Revelation 4:11"},
    {text:"Make a joyful noise unto the LORD, all ye lands. Serve the LORD with gladness.",ref:"Psalm 100:1-2"},
    {text:"Praise the LORD, O my soul: and all that is within me, bless his holy name.",ref:"Psalm 103:1"},
    {text:"I will sing unto the LORD as long as I live: I will sing praise to my God while I have my being.",ref:"Psalm 104:33"},
    {text:"Because thy lovingkindness is better than life, my lips shall praise thee.",ref:"Psalm 63:3"},
    {text:"Sing unto the LORD, bless his name; shew forth his salvation from day to day.",ref:"Psalm 96:2"},
    {text:"Praise the LORD; for the LORD is good: sing praises unto his name; for it is pleasant.",ref:"Psalm 135:3"},
    {text:"Whoso offereth praise glorifieth me: and to him that ordereth his conversation aright will I shew the salvation of God.",ref:"Psalm 50:23"},
  ],
  anxiety:[
    {text:"Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",ref:"Philippians 4:6"},
    {text:"And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.",ref:"Philippians 4:7"},
    {text:"Casting all your care upon him; for he careth for you.",ref:"1 Peter 5:7"},
    {text:"Fear thou not; for I am with thee: be not dismayed; for I am thy God.",ref:"Isaiah 41:10"},
    {text:"Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.",ref:"Isaiah 26:3"},
    {text:"Come unto me, all ye that labour and are heavy laden, and I will give you rest.",ref:"Matthew 11:28"},
    {text:"The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",ref:"Psalm 27:1"},
    {text:"When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.",ref:"Isaiah 43:2"},
    {text:"For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",ref:"2 Timothy 1:7"},
    {text:"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled.",ref:"John 14:27"},
    {text:"In the multitude of my thoughts within me thy comforts delight my soul.",ref:"Psalm 94:19"},
    {text:"When I am afraid, I will trust in thee.",ref:"Psalm 56:3"},
    {text:"The LORD is on my side; I will not fear: what can man do unto me?",ref:"Psalm 118:6"},
    {text:"Say to them that are of a fearful heart, Be strong, fear not: behold, your God will come.",ref:"Isaiah 35:4"},
    {text:"I sought the LORD, and he heard me, and delivered me from all my fears.",ref:"Psalm 34:4"},
    {text:"Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me.",ref:"Psalm 23:4"},
    {text:"Be not afraid, only believe.",ref:"Mark 5:36"},
  ],
  provision:[
    {text:"But my God shall supply all your need according to his riches in glory by Christ Jesus.",ref:"Philippians 4:19"},
    {text:"But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",ref:"Matthew 6:33"},
    {text:"The LORD is my shepherd; I shall not want.",ref:"Psalm 23:1"},
    {text:"And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work.",ref:"2 Corinthians 9:8"},
    {text:"Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over.",ref:"Luke 6:38"},
    {text:"Every good gift and every perfect gift is from above, and cometh down from the Father of lights.",ref:"James 1:17"},
    {text:"The young lions do lack, and suffer hunger: but they that seek the LORD shall not want any good thing.",ref:"Psalm 34:10"},
    {text:"He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?",ref:"Romans 8:32"},
    {text:"Bring ye all the tithes into the storehouse, and prove me now herewith, saith the LORD of hosts, if I will not open you the windows of heaven.",ref:"Malachi 3:10"},
    {text:"The blessing of the LORD, it maketh rich, and he addeth no sorrow with it.",ref:"Proverbs 10:22"},
    {text:"And the LORD shall make thee the head, and not the tail; and thou shalt be above only, and thou shalt not be beneath.",ref:"Deuteronomy 28:13"},
    {text:"The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures.",ref:"Psalm 23:1-2"},
    {text:"For the LORD thy God bringeth thee into a good land, a land of brooks of water, of fountains and depths.",ref:"Deuteronomy 8:7"},
    {text:"Honour the LORD with thy substance, and with the firstfruits of all thine increase.",ref:"Proverbs 3:9"},
    {text:"A good man leaveth an inheritance to his children\u2019s children: and the wealth of the sinner is laid up for the just.",ref:"Proverbs 13:22"},
    {text:"Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.",ref:"3 John 1:2"},
    {text:"And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things.",ref:"2 Corinthians 9:8"},
  ],
  family:[
    {text:"Train up a child in the way he should go: and when he is old, he will not depart from it.",ref:"Proverbs 22:6"},
    {text:"As for me and my house, we will serve the LORD.",ref:"Joshua 24:15"},
    {text:"Lo, children are an heritage of the LORD: and the fruit of the womb is his reward.",ref:"Psalm 127:3"},
    {text:"Honour thy father and thy mother: that thy days may be long upon the land.",ref:"Exodus 20:12"},
    {text:"And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord.",ref:"Ephesians 6:4"},
    {text:"Her children arise up, and call her blessed; her husband also, and he praiseth her.",ref:"Proverbs 31:28"},
    {text:"For this cause shall a man leave his father and mother, and cleave to his wife.",ref:"Mark 10:6-7"},
    {text:"Except the LORD build the house, they labour in vain that build it.",ref:"Psalm 127:1"},
    {text:"And thou shalt teach them diligently unto thy children.",ref:"Deuteronomy 6:6-7"},
    {text:"Behold, how good and how pleasant it is for brethren to dwell together in unity!",ref:"Psalm 133:1"},
    {text:"And these words, which I command thee this day, shall be in thine heart: And thou shalt teach them diligently unto thy children.",ref:"Deuteronomy 6:6-7"},
    {text:"But from the beginning of the creation God made them male and female.",ref:"Mark 10:6"},
    {text:"Can a woman forget her sucking child, that she should not have compassion on the son of her womb? yea, they may forget, yet will I not forget thee.",ref:"Isaiah 49:15"},
    {text:"Husbands, love your wives, even as Christ also loved the church, and gave himself for it.",ref:"Ephesians 5:25"},
    {text:"A friend loveth at all times, and a brother is born for adversity.",ref:"Proverbs 17:17"},
    {text:"The father of the righteous shall greatly rejoice: and he that begetteth a wise child shall have joy of him.",ref:"Proverbs 23:24"},
    {text:"He setteth the solitary in families: he bringeth out those which are bound with chains.",ref:"Psalm 68:6"},
  ],
  repentance:[
    {text:"If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven.",ref:"2 Chronicles 7:14"},
    {text:"Repent ye therefore, and be converted, that your sins may be blotted out.",ref:"Acts 3:19"},
    {text:"Therefore also now, saith the LORD, turn ye even to me with all your heart, and with fasting, and with weeping, and with mourning.",ref:"Joel 2:12"},
    {text:"The Lord is not slack concerning his promise; but is longsuffering to us-ward, not willing that any should perish.",ref:"2 Peter 3:9"},
    {text:"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.",ref:"1 John 1:9"},
    {text:"Have mercy upon me, O God, according to thy lovingkindness: according unto the multitude of thy tender mercies blot out my transgressions.",ref:"Psalm 51:1"},
    {text:"Create in me a clean heart, O God; and renew a right spirit within me.",ref:"Psalm 51:10"},
    {text:"Draw nigh to God, and he will draw nigh to you. Cleanse your hands, ye sinners; and purify your hearts.",ref:"James 4:8"},
    {text:"I acknowledged my sin unto thee, and mine iniquity have I not hid. I said, I will confess my transgressions unto the LORD; and thou forgavest the iniquity of my sin.",ref:"Psalm 32:5"},
    {text:"The sacrifices of God are a broken spirit: a broken and a contrite heart, O God, thou wilt not despise.",ref:"Psalm 51:17"},
    {text:"Let the wicked forsake his way, and the unrighteous man his thoughts: and let him return unto the LORD.",ref:"Isaiah 55:7"},
    {text:"For godly sorrow worketh repentance to salvation not to be repented of.",ref:"2 Corinthians 7:10"},
    {text:"I tell you, Nay: but, except ye repent, ye shall all likewise perish.",ref:"Luke 13:3"},
    {text:"Remember therefore from whence thou art fallen, and repent, and do the first works.",ref:"Revelation 2:5"},
    {text:"I say unto you, that likewise joy shall be in heaven over one sinner that repenteth.",ref:"Luke 15:7"},
    {text:"Wash you, make you clean; put away the evil of your doings from before mine eyes; cease to do evil.",ref:"Isaiah 1:16"},
    {text:"And rend your heart, and not your garments, and turn unto the LORD your God: for he is gracious.",ref:"Joel 2:13"},
  ],
  salvation:[
    {text:"That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",ref:"Romans 10:9"},
    {text:"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",ref:"John 3:16"},
    {text:"For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.",ref:"Ephesians 2:8"},
    {text:"Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.",ref:"Acts 4:12"},
    {text:"For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",ref:"Romans 6:23"},
    {text:"For whosoever shall call upon the name of the Lord shall be saved.",ref:"Romans 10:13"},
    {text:"Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",ref:"John 14:6"},
    {text:"Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",ref:"2 Corinthians 5:17"},
    {text:"He that believeth on the Son hath everlasting life.",ref:"John 3:36"},
    {text:"For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth.",ref:"Romans 1:16"},
    {text:"The LORD is my light and my salvation; whom shall I fear?",ref:"Psalm 27:1"},
    {text:"He is despised and rejected of men; a man of sorrows, and acquainted with grief.",ref:"Isaiah 53:3"},
    {text:"For the Son of man is come to seek and to save that which was lost.",ref:"Luke 19:10"},
    {text:"But as many as received him, to them gave he power to become the sons of God.",ref:"John 1:12"},
    {text:"I am the door: by me if any man enter in, he shall be saved.",ref:"John 10:9"},
    {text:"And it shall come to pass, that whosoever shall call on the name of the LORD shall be delivered.",ref:"Joel 2:32"},
    {text:"Verily, verily, I say unto you, He that heareth my word, and believeth on him that sent me, hath everlasting life.",ref:"John 5:24"},
  ]
};

const DAILY_VERSES = [
  {text:"The LORD is my shepherd; I shall not want.",ref:"Psalm 23:1"},
  {text:"I can do all things through Christ which strengtheneth me.",ref:"Philippians 4:13"},
  {text:"Be still, and know that I am God.",ref:"Psalm 46:10"},
  {text:"Trust in the LORD with all thine heart.",ref:"Proverbs 3:5"},
  {text:"Ask, and it shall be given you; seek, and ye shall find.",ref:"Matthew 7:7"},
  {text:"For God so loved the world, that he gave his only begotten Son.",ref:"John 3:16"},
  {text:"The LORD is my light and my salvation; whom shall I fear?",ref:"Psalm 27:1"},
  {text:"Fear thou not; for I am with thee.",ref:"Isaiah 41:10"},
  {text:"Pray without ceasing.",ref:"1 Thessalonians 5:17"},
  {text:"God is our refuge and strength, a very present help in trouble.",ref:"Psalm 46:1"},
  {text:"Delight thyself also in the LORD: and he shall give thee the desires of thine heart.",ref:"Psalm 37:4"},
  {text:"Come unto me, all ye that labour and are heavy laden, and I will give you rest.",ref:"Matthew 11:28"},
  {text:"He healeth the broken in heart, and bindeth up their wounds.",ref:"Psalm 147:3"},
  {text:"No weapon that is formed against thee shall prosper.",ref:"Isaiah 54:17"},
  {text:"With God all things are possible.",ref:"Matthew 19:26"},
  {text:"The peace of God, which passeth all understanding, shall keep your hearts and minds.",ref:"Philippians 4:7"},
  {text:"Casting all your care upon him; for he careth for you.",ref:"1 Peter 5:7"},
  {text:"Thy word is a lamp unto my feet, and a light unto my path.",ref:"Psalm 119:105"},
  {text:"Create in me a clean heart, O God; and renew a right spirit within me.",ref:"Psalm 51:10"},
  {text:"The LORD bless thee, and keep thee: The LORD make his face shine upon thee.",ref:"Numbers 6:24-25"},
  {text:"For where two or three are gathered together in my name, there am I in the midst of them.",ref:"Matthew 18:20"},
  {text:"In every thing give thanks: for this is the will of God.",ref:"1 Thessalonians 5:18"},
  {text:"The effectual fervent prayer of a righteous man availeth much.",ref:"James 5:16"},
  {text:"And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.",ref:"Matthew 21:22"},
  {text:"Now faith is the substance of things hoped for, the evidence of things not seen.",ref:"Hebrews 11:1"},
  {text:"The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",ref:"Proverbs 18:10"},
  {text:"He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",ref:"Psalm 91:1"},
  {text:"So shall my word be that goeth forth out of my mouth: it shall not return unto me void.",ref:"Isaiah 55:11"},
  {text:"Let the words of my mouth, and the meditation of my heart, be acceptable in thy sight, O LORD.",ref:"Psalm 19:14"},
  {text:"The LORD is my strength and my shield; my heart trusted in him, and I am helped.",ref:"Psalm 28:7"},
  {text:"For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil.",ref:"Jeremiah 29:11"},
  {text:"The LORD is gracious, and full of compassion; slow to anger, and of great mercy.",ref:"Psalm 145:8"},
  {text:"In all thy ways acknowledge him, and he shall direct thy paths.",ref:"Proverbs 3:6"},
  {text:"Wait on the LORD: be of good courage, and he shall strengthen thine heart.",ref:"Psalm 27:14"},
  {text:"The righteous cry, and the LORD heareth, and delivereth them out of all their troubles.",ref:"Psalm 34:17"},
  {text:"Have not I commanded thee? Be strong and of a good courage; be not afraid.",ref:"Joshua 1:9"},
  {text:"For we walk by faith, not by sight.",ref:"2 Corinthians 5:7"},
  {text:"He healeth the broken in heart, and bindeth up their wounds.",ref:"Psalm 147:3"},
  {text:"Blessed are the peacemakers: for they shall be called the children of God.",ref:"Matthew 5:9"},
  {text:"The LORD is my rock, and my fortress, and my deliverer.",ref:"Psalm 18:2"},
  {text:"But they that wait upon the LORD shall renew their strength.",ref:"Isaiah 40:31"},
  {text:"Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.",ref:"Ephesians 6:11"},
  {text:"Rejoice in the Lord alway: and again I say, Rejoice.",ref:"Philippians 4:4"},
  {text:"For where two or three are gathered together in my name, there am I in the midst of them.",ref:"Matthew 18:20"},
  {text:"And we know that all things work together for good to them that love God.",ref:"Romans 8:28"},
  {text:"Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about.",ref:"1 Peter 5:8"},
  {text:"Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life.",ref:"James 1:12"},
  {text:"Ye are the salt of the earth.",ref:"Matthew 5:13"},
  {text:"I will praise thee; for I am fearfully and wonderfully made.",ref:"Psalm 139:14"},
  {text:"But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith.",ref:"Galatians 5:22"},
  {text:"The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",ref:"Psalm 34:18"},
  {text:"If God be for us, who can be against us?",ref:"Romans 8:31"},
  {text:"Draw nigh to God, and he will draw nigh to you.",ref:"James 4:8"},
  {text:"Commit thy way unto the LORD; trust also in him; and he shall bring it to pass.",ref:"Psalm 37:5"},
  {text:"Greater love hath no man than this, that a man lay down his life for his friends.",ref:"John 15:13"},
  {text:"For with God nothing shall be impossible.",ref:"Luke 1:37"},
  {text:"The earth is the LORD\u2019s, and the fulness thereof; the world, and they that dwell therein.",ref:"Psalm 24:1"},
  {text:"Let us hold fast the profession of our faith without wavering; for he is faithful that promised.",ref:"Hebrews 10:23"},
  {text:"O taste and see that the LORD is good: blessed is the man that trusteth in him.",ref:"Psalm 34:8"},
  {text:"Beloved, let us love one another: for love is of God.",ref:"1 John 4:7"},
  {text:"Fear not, little flock; for it is your Father\u2019s good pleasure to give you the kingdom.",ref:"Luke 12:32"},
  {text:"Set your affection on things above, not on things on the earth.",ref:"Colossians 3:2"},
  {text:"Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight.",ref:"Hebrews 12:1"},
  {text:"Every good gift and every perfect gift is from above, and cometh down from the Father of lights.",ref:"James 1:17"},
  {text:"He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",ref:"Psalm 91:1"},
  {text:"The name of the LORD is a strong tower: the righteous runneth into it, and is safe.",ref:"Proverbs 18:10"},
  {text:"Who shall separate us from the love of Christ?",ref:"Romans 8:35"},
  {text:"For I am persuaded, that neither death, nor life, nor angels, nor principalities shall be able to separate us from the love of God.",ref:"Romans 8:38-39"},
  {text:"Not by might, nor by power, but by my spirit, saith the LORD of hosts.",ref:"Zechariah 4:6"},
  {text:"Know ye that the LORD he is God: it is he that hath made us, and not we ourselves.",ref:"Psalm 100:3"},
  {text:"He that overcometh shall inherit all things; and I will be his God, and he shall be my son.",ref:"Revelation 21:7"},
  {text:"Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual blessings.",ref:"Ephesians 1:3"},
  {text:"The grass withereth, the flower fadeth: but the word of our God shall stand for ever.",ref:"Isaiah 40:8"},
  {text:"Eye hath not seen, nor ear heard, the things which God hath prepared for them that love him.",ref:"1 Corinthians 2:9"},
  {text:"And be not conformed to this world: but be ye transformed by the renewing of your mind.",ref:"Romans 12:2"},
  {text:"Many are the afflictions of the righteous: but the LORD delivereth him out of them all.",ref:"Psalm 34:19"},
  {text:"Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",ref:"Matthew 5:6"},
  {text:"And whatsoever ye do, do it heartily, as to the Lord, and not unto men.",ref:"Colossians 3:23"},
  {text:"For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish.",ref:"John 3:16"},
  {text:"My grace is sufficient for thee: for my strength is made perfect in weakness.",ref:"2 Corinthians 12:9"},
  {text:"The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.",ref:"Psalm 121:8"},
  {text:"I will never leave thee, nor forsake thee.",ref:"Hebrews 13:5"},
  {text:"In the beginning was the Word, and the Word was with God, and the Word was God.",ref:"John 1:1"},
  {text:"Submit yourselves therefore to God. Resist the devil, and he will flee from you.",ref:"James 4:7"},
  {text:"Behold, I stand at the door, and knock: if any man hear my voice, and open the door, I will come in to him.",ref:"Revelation 3:20"},
  {text:"Be ye therefore perfect, even as your Father which is in heaven is perfect.",ref:"Matthew 5:48"},
  {text:"For the LORD God is a sun and shield: the LORD will give grace and glory.",ref:"Psalm 84:11"},
  {text:"Teach me thy way, O LORD; I will walk in thy truth: unite my heart to fear thy name.",ref:"Psalm 86:11"},
  {text:"But the God of all grace, who hath called us unto his eternal glory by Christ Jesus, shall himself perfect, stablish, strengthen, settle you.",ref:"1 Peter 5:10"},
  {text:"Seek ye the LORD while he may be found, call ye upon him while he is near.",ref:"Isaiah 55:6"},
];

/* ─────────────────────────────────────────────
   2. STATE
   ───────────────────────────────────────────── */
let state = {
  currentPage: 'home',
  selectedCategory: null,
  currentStep: 0,
  stepData: {},
  generatedCode: null,
  gematriaTotal: 0,
  audioPlaying: false,
  audioLoop: false,
  lastPrayerText: '',
  modalData: null,
};

/* ── Utility: escape HTML to prevent XSS ── */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ── Share scripture quotes ── */
const SHARE_SCRIPTURES = [
  '"For where two or three are gathered together in my name, there am I in the midst of them." — Matthew 18:20',
  '"The effectual fervent prayer of a righteous man availeth much." — James 5:16',
  '"Ask, and it shall be given you; seek, and ye shall find." — Matthew 7:7',
  '"Pray without ceasing." — 1 Thessalonians 5:17',
  '"If my people shall humble themselves, and pray, I will heal their land." — 2 Chronicles 7:14',
  '"Let us therefore come boldly unto the throne of grace." — Hebrews 4:16',
];
function randomShareScripture() {
  return SHARE_SCRIPTURES[Math.floor(Math.random() * SHARE_SCRIPTURES.length)];
}
function getCategoryLabel() {
  const cat = state.selectedCategory;
  return (cat && cat.name && cat.name !== 'Custom Prayer') ? cat.name + ' ' : '';
}

/* ─────────────────────────────────────────────
   3. GEMATRIA
   ───────────────────────────────────────────── */
function gematria(text) {
  let total = 0;
  for (const ch of text.toUpperCase()) {
    if (ch >= 'A' && ch <= 'Z') total += ch.charCodeAt(0) - 64;
    else if (ch >= '0' && ch <= '9') total += parseInt(ch);
  }
  return total;
}

function generateCode(text, len = 6) {
  const total = gematria(text);
  state.gematriaTotal = total;
  return String(total % (10 ** len));
}

/* ─────────────────────────────────────────────
   4. NAVIGATION
   ───────────────────────────────────────────── */
function navigate(page) {
  state.currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (el) el.classList.add('active');
  const btn = document.querySelector(`[data-page="${page}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'scripture') renderScriptures();
  if (page === 'journal') renderJournal();
}

/* ─────────────────────────────────────────────
   5. TOAST
   ───────────────────────────────────────────── */
function toast(msg, dur = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}

/* ─────────────────────────────────────────────
   6. DAILY SCRIPTURE
   ───────────────────────────────────────────── */
function setDailyScripture() {
  const day = Math.floor(Date.now() / 86400000) % DAILY_VERSES.length;
  const v = DAILY_VERSES[day];
  const el = document.getElementById('daily-text');
  const ref = document.getElementById('daily-ref');
  if (el) el.textContent = v.text;
  if (ref) ref.textContent = '— ' + v.ref + ' (KJV)';
}

/* ─────────────────────────────────────────────
   7. PRAYER BUILDER
   ───────────────────────────────────────────── */
function selectCategory(catId) {
  dismissKeyboard();
  const cat = CATEGORIES.find(c => c.id === catId);
  if (!cat) return;
  state.selectedCategory = cat;
  state.currentStep = 0;
  state.stepData = {};

  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`[data-cat="${catId}"]`)?.classList.add('selected');

  document.getElementById('custom-section').classList.add('hidden');
  document.getElementById('builder-section').classList.remove('hidden');
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('code-section').classList.add('hidden');
  renderStep();
  document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectCustomPrayer() {
  dismissKeyboard();
  state.selectedCategory = { id:'custom', icon:'hand', name:'Custom Prayer', verse:'', steps:[] };
  state.currentStep = 0;
  state.stepData = {};

  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  document.querySelector('[data-cat="custom"]')?.classList.add('selected');

  document.getElementById('builder-section').classList.add('hidden');
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('code-section').classList.add('hidden');
  document.getElementById('custom-section').classList.remove('hidden');

  const input = document.getElementById('custom-input');
  const cc = document.getElementById('custom-char-count');
  if (input) {
    input.value = '';
    input.removeEventListener('input', updateCustomCharCount);
    input.addEventListener('input', updateCustomCharCount);
    if (cc) cc.textContent = '0 characters';
  }
  document.getElementById('custom-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCustomCharCount() {
  const input = document.getElementById('custom-input');
  const cc = document.getElementById('custom-char-count');
  if (input && cc) cc.textContent = input.value.length + ' characters';
}

function generateCustomCode() {
  dismissKeyboard();
  const input = document.getElementById('custom-input');
  const fullPrayer = input ? input.value.trim() : '';
  if (!fullPrayer) { toast('Please write your prayer before generating a code'); return; }

  const cat = state.selectedCategory;
  const finalCode = generateCode(fullPrayer);
  state.generatedCode = finalCode;
  state.lastPrayerText = fullPrayer;

  document.getElementById('code-gematria-val').textContent = state.gematriaTotal;
  document.getElementById('code-number').textContent = finalCode;
  document.getElementById('code-section').classList.remove('hidden');
  document.getElementById('code-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Scramble animation
  const codeEl = document.getElementById('code-number');
  let iterations = 0;
  const maxIterations = 30;
  const interval = setInterval(() => {
    codeEl.textContent = Array.from({length: Math.max(finalCode.length, 4)}, () =>
      Math.floor(Math.random() * 10)).join('');
    iterations++;
    if (iterations >= maxIterations) {
      clearInterval(interval);
      codeEl.textContent = finalCode;
      launchConfetti();
      incrementPrayerCount();
      updateStreak();
    }
  }, 55);

  savePrayer(cat, finalCode, fullPrayer);
}

function renderStep() {
  const cat = state.selectedCategory;
  if (!cat) return;
  const step = cat.steps[state.currentStep];
  const total = cat.steps.length;
  const wrap = document.getElementById('step-content');

  const pct = ((state.currentStep + 1) / total * 100).toFixed(0);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-current').textContent = `Step ${state.currentStep + 1} of ${total}`;
  document.getElementById('progress-cat').textContent = cat.name;

  wrap.innerHTML = `
    <div class="step-wrap">
      <div class="step-header">
        ${icon(step.icon, 'step-icon')}
        <span class="step-title">${step.title}</span>
      </div>
      <p class="step-guidance">${step.guidance}</p>
      <div class="scripture">
        ${step.scripture.text}
        <span class="scripture-ref">— ${step.scripture.ref} (KJV)</span>
      </div>
      <button class="use-scripture-btn" onclick="useScripture()">${icon('scroll','btn-icon')} Use This Scripture</button>
      <textarea class="prayer-input" id="step-input"
        placeholder="${step.placeholder}"
        rows="4">${state.stepData[step.key] || ''}</textarea>
      <div class="char-count" id="char-count">0 characters</div>
    </div>
  `;

  const input = document.getElementById('step-input');
  const cc = document.getElementById('char-count');
  input.addEventListener('input', () => { cc.textContent = input.value.length + ' characters'; });
  cc.textContent = input.value.length + ' characters';

  const nav = document.getElementById('step-nav');
  const isFirst = state.currentStep === 0;
  const isLast = state.currentStep === total - 1;
  nav.innerHTML = `
    <button class="btn btn-outline" ${isFirst ? 'disabled' : ''} onclick="prevStep()">Back</button>
    ${isLast
      ? `<button class="btn btn-gold" onclick="previewPrayer()">Preview Prayer</button>`
      : `<button class="btn btn-gold" onclick="nextStep()">Continue</button>`}
  `;
}

function saveCurrentStep() {
  const cat = state.selectedCategory;
  if (!cat) return;
  const step = cat.steps[state.currentStep];
  const input = document.getElementById('step-input');
  if (input) state.stepData[step.key] = input.value.trim();
}

function nextStep() {
  dismissKeyboard();
  saveCurrentStep();
  if (state.currentStep < state.selectedCategory.steps.length - 1) {
    state.currentStep++;
    renderStep();
    setTimeout(() => {
      dismissKeyboard();
      document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

function prevStep() {
  dismissKeyboard();
  saveCurrentStep();
  if (state.currentStep > 0) { state.currentStep--; renderStep(); }
}

function useScripture() {
  const step = state.selectedCategory.steps[state.currentStep];
  const input = document.getElementById('step-input');
  if (input) {
    const prefix = input.value ? input.value + ' ' : '';
    input.value = prefix + step.scripture.text;
    input.dispatchEvent(new Event('input'));
    toast('Scripture added to your prayer');
  }
}

/* ─────────────────────────────────────────────
   8. PREVIEW & CODE GENERATION
   ───────────────────────────────────────────── */
function previewPrayer() {
  dismissKeyboard();
  saveCurrentStep();
  const cat = state.selectedCategory;
  let allFilled = true;
  for (const step of cat.steps) {
    if (!state.stepData[step.key] || !state.stepData[step.key].trim()) { allFilled = false; break; }
  }
  if (!allFilled) { toast('Please complete all sections of your prayer'); return; }

  const lines = cat.steps.map(s => state.stepData[s.key].trim());
  const previewEl = document.getElementById('preview-text');
  previewEl.textContent = lines.join('\n\n');
  previewEl.setAttribute('contenteditable', 'true');
  document.getElementById('preview-section').classList.remove('hidden');
  setTimeout(() => {
    dismissKeyboard();
    document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function editPrayer() {
  dismissKeyboard();
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generatePrayerCode() {
  const cat = state.selectedCategory;
  // Read from the editable preview (user may have edited it)
  const previewEl = document.getElementById('preview-text');
  const fullPrayer = previewEl.innerText.trim();
  const finalCode = generateCode(fullPrayer);
  state.generatedCode = finalCode;
  state.lastPrayerText = fullPrayer;

  const codeEl = document.getElementById('code-number');
  document.getElementById('code-gematria-val').textContent = state.gematriaTotal;
  document.getElementById('code-section').classList.remove('hidden');
  document.getElementById('code-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Scramble animation — random digits cycling before reveal
  let iterations = 0;
  const maxIterations = 30;
  const interval = setInterval(() => {
    codeEl.textContent = Array.from({length: Math.max(finalCode.length, 4)}, () =>
      Math.floor(Math.random() * 10)).join('');
    iterations++;
    if (iterations >= maxIterations) {
      clearInterval(interval);
      codeEl.textContent = finalCode;
      launchConfetti();
      incrementPrayerCount();
      updateStreak();
    }
  }, 55);

  savePrayer(cat, finalCode, fullPrayer);
}

/* ─────────────────────────────────────────────
   9. SHARING
   ───────────────────────────────────────────── */
function buildShareMessage(opts) {
  const catLabel = getCategoryLabel();
  const code = (opts && opts.code) || state.generatedCode || '';
  const scripture = randomShareScripture();
  return `My ${catLabel}Prayer Code: ${code}\n\n${scripture}\n\nThis code was generated through Prayer Codes — structured biblical prayers encoded through English Gematria.\n\nPray this code with me to amplify our connection to the throne of grace.\n\nCreate yours at prayer.quantummerlin.com\n\n#PrayerCodes #PrayWithMe #Faith`;
}

function copyCode() {
  if (!state.generatedCode) return;
  navigator.clipboard.writeText(state.generatedCode).then(() => toast('Prayer Code copied')).catch(() => toast('Could not copy — try manually'));
}

function copyPrayerMessage() {
  if (!state.generatedCode) return;
  const msg = buildShareMessage();
  navigator.clipboard.writeText(msg).then(() => toast('Prayer message copied')).catch(() => toast('Could not copy — try manually'));
}

function shareWhatsApp() {
  const msg = buildShareMessage();
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}

function shareFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://prayer.quantummerlin.com'), '_blank');
}

function shareTwitter() {
  const catLabel = getCategoryLabel();
  const msg = `My ${catLabel}Prayer Code: ${state.generatedCode} — Structured biblical prayer encoded through Gematria. Pray with me. prayer.quantummerlin.com #PrayerCodes`;
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(msg), '_blank');
}

function shareEmail() {
  const catLabel = getCategoryLabel();
  const code = state.generatedCode || '';
  const subject = encodeURIComponent(`Pray With Me — ${catLabel}Prayer Code: ${code}`);
  const body = encodeURIComponent(buildShareMessage());
  window.open(`mailto:?subject=${subject}&body=${body}`);
}

function nativeShare() {
  if (!navigator.share || !state.generatedCode) return;
  const catLabel = getCategoryLabel();
  navigator.share({
    title: `My ${catLabel}Prayer Code: ` + state.generatedCode,
    text: buildShareMessage(),
    url: 'https://prayer.quantummerlin.com'
  }).catch(() => {});
}

/* ─────────────────────────────────────────────
   10. AUDIO PLAYER
   ───────────────────────────────────────────── */
let audioEl = null;

function initAudio() {
  audioEl = document.getElementById('freq-audio');
  if (!audioEl) return;
  audioEl.addEventListener('timeupdate', updateAudioProgress);
  audioEl.addEventListener('ended', () => {
    if (state.audioLoop) { audioEl.currentTime = 0; audioEl.play(); }
    else { stopAudio(); }
  });
}

function toggleAudio() {
  if (!audioEl) return;
  if (state.audioPlaying) stopAudio(); else playAudio();
}

function playAudio() {
  audioEl.play();
  state.audioPlaying = true;
  document.getElementById('play-icon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  document.querySelectorAll('.wave-bar').forEach(b => b.classList.add('active'));
  timerStart = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const s = String(elapsed % 60).padStart(2, '0');
    const el = document.getElementById('timer');
    if (el) el.textContent = m + ':' + s;
  }, 1000);
}

function stopAudio() {
  audioEl.pause();
  state.audioPlaying = false;
  document.getElementById('play-icon').innerHTML = '<polygon points="5,3 19,12 5,21"/>';
  document.querySelectorAll('.wave-bar').forEach(b => b.classList.remove('active'));
  clearInterval(timerInterval);
}

function toggleLoop() {
  state.audioLoop = !state.audioLoop;
  document.getElementById('loop-btn').classList.toggle('active', state.audioLoop);
  if (audioEl) audioEl.loop = state.audioLoop;
  toast(state.audioLoop ? 'Loop enabled' : 'Loop disabled');
}

function updateAudioProgress() {
  if (!audioEl || !audioEl.duration) return;
  document.getElementById('audio-fill').style.width = (audioEl.currentTime / audioEl.duration * 100) + '%';
}

function seekAudio(e) {
  if (!audioEl || !audioEl.duration) return;
  const rect = e.currentTarget.getBoundingClientRect();
  audioEl.currentTime = ((e.clientX - rect.left) / rect.width) * audioEl.duration;
}

let timerStart = 0, timerInterval = null;

/* ─────────────────────────────────────────────
   11. SCRIPTURE LIBRARY (with Favorites)
   ───────────────────────────────────────────── */
let activeTag = 'all';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem('scriptureFavorites') || '[]'); } catch { return []; }
}
function saveFavorites(favs) { localStorage.setItem('scriptureFavorites', JSON.stringify(favs)); }
function isFavorite(ref) { return getFavorites().includes(ref); }
function toggleFavorite(ref, event) {
  if (event) event.stopPropagation();
  let favs = getFavorites();
  if (favs.includes(ref)) favs = favs.filter(f => f !== ref);
  else favs.push(ref);
  saveFavorites(favs);
  renderScriptures(document.getElementById('scripture-search')?.value.trim().toLowerCase() || '');
  toast(favs.includes(ref) ? 'Added to favorites' : 'Removed from favorites');
}

function filterScriptures(tag) {
  activeTag = tag;
  document.querySelectorAll('.tag').forEach(t => t.classList.toggle('active', t.dataset.tag === tag));
  renderScriptures();
}

function searchScriptures() {
  renderScriptures(document.getElementById('scripture-search').value.trim().toLowerCase());
}

function renderScriptures(query = '') {
  const container = document.getElementById('scripture-list');
  if (!container) return;
  container.innerHTML = '';
  let results = [];

  if (activeTag === 'all') {
    for (const cat in SCRIPTURE_DB) SCRIPTURE_DB[cat].forEach(s => results.push({ ...s, cat }));
  } else if (activeTag === 'favorites') {
    const favs = getFavorites();
    for (const cat in SCRIPTURE_DB) SCRIPTURE_DB[cat].forEach(s => { if (favs.includes(s.ref)) results.push({ ...s, cat }); });
  } else if (SCRIPTURE_DB[activeTag]) {
    results = SCRIPTURE_DB[activeTag].map(s => ({ ...s, cat: activeTag }));
  }

  if (query) {
    results = results.filter(s => s.text.toLowerCase().includes(query) || s.ref.toLowerCase().includes(query));
  }

  if (results.length === 0) {
    container.innerHTML = '<p class="text-center text-dim mt-2">No scriptures found. Try another search.</p>';
    return;
  }

  results.forEach(s => {
    const fav = isFavorite(s.ref);
    const div = document.createElement('div');
    div.className = 'scripture-card';
    div.onclick = () => { navigator.clipboard.writeText(`"${s.text}" — ${s.ref} (KJV)`); toast('Scripture copied'); };
    div.innerHTML = `
      <div class="scripture-card-top">
        <div class="scripture-card-text">"${s.text}"</div>
        <button class="fav-btn ${fav ? 'active' : ''}" onclick="toggleFavorite('${s.ref}', event)" aria-label="${fav ? 'Remove from favorites' : 'Add to favorites'}" title="${fav ? 'Remove from favorites' : 'Add to favorites'}">${fav ? '★' : '☆'}</button>
      </div>
      <div class="scripture-card-ref">— ${s.ref} (KJV)</div>
      <div class="scripture-copy-hint">Tap to copy</div>
    `;
    container.appendChild(div);
  });
}

/* ─────────────────────────────────────────────
   12. PRAYER JOURNAL (localStorage)
   ───────────────────────────────────────────── */
function getJournal() {
  try { return JSON.parse(localStorage.getItem('prayerJournal') || '[]'); } catch { return []; }
}
function saveJournal(journal) { localStorage.setItem('prayerJournal', JSON.stringify(journal)); }

function savePrayer(cat, code, fullText) {
  const journal = getJournal();
  journal.unshift({
    id: Date.now(), code, category: cat.name, icon: cat.icon,
    text: fullText,
    date: new Date().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' }),
    answered: false
  });
  saveJournal(journal);
}

function renderJournal() {
  const journal = getJournal();
  const container = document.getElementById('journal-list');
  if (!container) return;

  if (journal.length === 0) {
    container.innerHTML = `
      <div class="journal-empty">
        ${icon('pray','journal-empty-icon')}
        <p class="mt-1">Your prayer journal is empty.</p>
        <p class="text-dim">Create your first prayer to begin.</p>
        <div class="btn-center mt-2">
          <button class="btn btn-gold" onclick="navigate('home')">Create Prayer</button>
        </div>
      </div>`;
    return;
  }

  container.innerHTML = journal.map((entry, i) => `
    <div class="journal-entry ${entry.answered ? 'answered' : ''}" onclick="openPrayerModal(${i})" style="cursor:pointer;">
      <div class="journal-top">
        <span class="journal-code">${icon(entry.icon || 'pray','journal-icon')} ${entry.code}</span>
        <span class="journal-date">${entry.date}</span>
      </div>
      <div class="journal-cat">${escapeHTML(entry.category)}</div>
      <div class="journal-preview">${escapeHTML(entry.text)}</div>
      ${entry.answered ? '<div class="answered-badge">${icon("cross","badge-icon")} Prayer Answered</div>' : ''}
      <div class="journal-actions" onclick="event.stopPropagation()">
        ${!entry.answered ? `<button class="btn btn-outline" onclick="markAnswered(${i})">Mark Answered</button>` : ''}
        <button class="btn btn-ghost" onclick="copyJournalCode(${i})">Copy Code</button>
        <button class="btn btn-ghost" onclick="deleteJournalEntry(${i})">Remove</button>
      </div>
    </div>
  `).join('');
}

function markAnswered(idx) {
  const journal = getJournal();
  if (journal[idx]) { journal[idx].answered = true; saveJournal(journal); renderJournal(); toast('Prayer marked as answered — praise the Lord'); }
}
function copyJournalCode(idx) {
  const journal = getJournal();
  if (journal[idx]) { navigator.clipboard.writeText(journal[idx].code); toast('Code copied'); }
}
function deleteJournalEntry(idx) {
  if (!confirm('Remove this prayer from your journal?')) return;
  const journal = getJournal();
  journal.splice(idx, 1); saveJournal(journal); renderJournal(); updatePrayerStats(); toast('Entry removed');
}
function exportJournal() {
  const journal = getJournal();
  if (journal.length === 0) { toast('Journal is empty'); return; }
  let text = 'PRAYER CODES JOURNAL\n' + '='.repeat(40) + '\n\n';
  journal.forEach(e => {
    text += `Code: ${e.code}\nCategory: ${e.category}\nDate: ${e.date}\n${e.answered ? 'STATUS: ANSWERED\n' : ''}\n${e.text}\n\n${'—'.repeat(40)}\n\n`;
  });
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'prayer-journal.txt'; a.click();
  toast('Journal exported');
}
function clearAllJournal() {
  const journal = getJournal();
  if (journal.length === 0) { toast('Journal is already empty'); return; }
  if (!confirm('Clear all ' + journal.length + ' entries from your prayer journal? This cannot be undone.')) return;
  localStorage.removeItem('prayerJournal');
  renderJournal(); updatePrayerStats(); toast('Journal cleared');
}

/* ── Fullscreen Prayer Modal ── */
function openPrayerModal(idxOrData) {
  let data;
  if (typeof idxOrData === 'number') {
    const journal = getJournal();
    data = journal[idxOrData];
  } else if (typeof idxOrData === 'object') {
    data = idxOrData;
  }
  if (!data) return;
  state.modalData = data;
  document.getElementById('modal-code').textContent = data.code;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-text').textContent = data.text;
  document.getElementById('modal-date').textContent = data.date;
  // Reset share buttons and privacy toggle each time
  const shareBtns = document.getElementById('modal-share-btns');
  if (shareBtns) shareBtns.classList.add('hidden');
  const textEl = document.getElementById('modal-text');
  const dividerEl = document.querySelector('.prayer-modal-divider');
  if (textEl) textEl.classList.remove('prayer-hidden');
  if (dividerEl) dividerEl.classList.remove('prayer-hidden');
  const privBtn = document.getElementById('modal-privacy-toggle');
  if (privBtn) {
    privBtn.classList.remove('active');
    privBtn.querySelector('svg').style.display = '';
    const btnText = privBtn.childNodes[privBtn.childNodes.length - 1];
    if (btnText) btnText.textContent = ' Hide Prayer';
  }
  const placeholder = document.getElementById('modal-hidden-placeholder');
  if (placeholder) placeholder.classList.remove('visible');
  const hint = document.getElementById('modal-hint');
  if (hint) { hint.style.opacity = '1'; setTimeout(() => { hint.style.opacity = '0'; }, 3500); }
  const modal = document.getElementById('prayer-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  const btt = document.getElementById('back-to-top');
  if (btt) btt.style.display = 'none';
}

function openScreenshotModal() {
  if (!state.generatedCode || !state.selectedCategory) return;
  openPrayerModal({
    code: state.generatedCode,
    category: state.selectedCategory.name || 'Prayer',
    text: state.lastPrayerText || '',
    date: new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })
  });
}

function closePrayerModal(e) {
  if (e && e.target !== e.currentTarget && !e.target.classList.contains('prayer-modal-close')) return;
  const modal = document.getElementById('prayer-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  const btt = document.getElementById('back-to-top');
  if (btt) btt.style.display = '';
  state.modalData = null;
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePrayerModal();
});

/* ── Modal Share Actions ── */
function toggleModalShare(e) {
  if (e) e.stopPropagation();
  const btns = document.getElementById('modal-share-btns');
  if (btns) btns.classList.toggle('hidden');
}
function togglePrayerPrivacy(e) {
  if (e) e.stopPropagation();
  const textEl = document.getElementById('modal-text');
  const dividerEl = document.querySelector('.prayer-modal-divider');
  const btn = document.getElementById('modal-privacy-toggle');
  const placeholder = document.getElementById('modal-hidden-placeholder');
  if (!textEl) return;
  const isHidden = textEl.classList.toggle('prayer-hidden');
  if (dividerEl) dividerEl.classList.toggle('prayer-hidden', isHidden);
  if (btn) {
    btn.classList.toggle('active', isHidden);
    const btnText = btn.childNodes[btn.childNodes.length - 1];
    if (btnText) btnText.textContent = isHidden ? ' Show Prayer' : ' Hide Prayer';
  }
  if (placeholder) placeholder.classList.toggle('visible', isHidden);
}
function copyModalCode(e) {
  if (e) e.stopPropagation();
  if (!state.modalData) return;
  navigator.clipboard.writeText(state.modalData.code).then(() => toast('Prayer Code copied')).catch(() => toast('Could not copy'));
}
function copyModalMessage(e) {
  if (e) e.stopPropagation();
  if (!state.modalData) return;
  const msg = buildShareMessage({ code: state.modalData.code });
  navigator.clipboard.writeText(msg).then(() => toast('Prayer message copied')).catch(() => toast('Could not copy'));
}
function shareModalWhatsApp(e) {
  if (e) e.stopPropagation();
  if (!state.modalData) return;
  const msg = buildShareMessage({ code: state.modalData.code });
  window.open('https://wa.me/?text=' + encodeURIComponent(msg), '_blank');
}
function shareModalEmail(e) {
  if (e) e.stopPropagation();
  if (!state.modalData) return;
  const code = state.modalData.code;
  const cat = state.modalData.category || 'Prayer';
  const subject = encodeURIComponent(`Pray With Me — ${cat} Code: ${code}`);
  const body = encodeURIComponent(buildShareMessage({ code }));
  window.open(`mailto:?subject=${subject}&body=${body}`);
}

/* ─────────────────────────────────────────────
   13. PARTICLE SYSTEM
   ───────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      dx: (Math.random() - 0.5) * 0.12,
      dy: -(Math.random() * 0.25 + 0.04),
      alpha: Math.random() * 0.4 + 0.08,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy; p.pulse += 0.012;
      const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${a})`; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,175,55,${a * 0.12})`; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ─────────────────────────────────────────────
   13b. CONFETTI, STREAKS, MILESTONES
   ───────────────────────────────────────────── */
function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#D4AF37','#F0D060','#A8D8EA','#7B5EA7','#64D8A4','#fff'];
  const particles = Array.from({length: 100}, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.5) * 14 - 5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 6 + 2,
    life: 1
  }));
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.012;
      if (p.life > 0) {
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    if (alive) requestAnimationFrame(animate);
    else canvas.remove();
  }
  animate();
}

function updateStreak() {
  const today = new Date().toDateString();
  const data = JSON.parse(localStorage.getItem('prayerStreak') || '{"count":0,"lastDate":""}');
  const lastDate = data.lastDate ? new Date(data.lastDate).toDateString() : '';
  if (lastDate === today) return data.count;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  if (lastDate === yesterday.toDateString()) data.count++;
  else data.count = 1;
  data.lastDate = today;
  localStorage.setItem('prayerStreak', JSON.stringify(data));
  if (data.count > 1) toast('Prayer streak: ' + data.count + ' days');
  return data.count;
}

function incrementPrayerCount() {
  let count = parseInt(localStorage.getItem('totalPrayers') || '0') + 1;
  localStorage.setItem('totalPrayers', String(count));
  const milestones = [1, 5, 10, 25, 50, 100, 250, 500];
  if (milestones.includes(count)) {
    setTimeout(() => {
      const msgs = {
        1: 'Your first prayer code — share it with someone you love',
        5: '5 prayers encoded! Share your journey with others',
        10: '10 prayers — your faith is growing. Invite someone to pray with you',
        25: '25 prayers! You’re building a powerful habit of faith',
        50: '50 prayers encoded — you are a prayer warrior',
        100: '100 prayers! Your dedication is a testimony. Share it',
        250: '250 prayers — your commitment inspires. Spread the word',
        500: '500 prayers encoded. You are a pillar of faith',
      };
      toast(msgs[count] || 'Milestone: ' + count + ' prayers created', 5000);
      launchConfetti();
    }, 2000);
  }
  return count;
}

function dismissKeyboard() {
  if (document.activeElement && document.activeElement !== document.body) {
    document.activeElement.blur();
  }
}

/* ─────────────────────────────────────────────
   14. NEW PRAYER RESET
   ───────────────────────────────────────────── */
function newPrayer() {
  state.selectedCategory = null; state.currentStep = 0;
  state.stepData = {}; state.generatedCode = null;
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('builder-section').classList.add('hidden');
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('code-section').classList.add('hidden');
  document.getElementById('custom-section').classList.add('hidden');
  navigate('home');
}

/* ─────────────────────────────────────────────
   15. PRAYER STATS
   ───────────────────────────────────────────── */
function updatePrayerStats() {
  const prayers = parseInt(localStorage.getItem('totalPrayers') || '0');
  const streakData = JSON.parse(localStorage.getItem('prayerStreak') || '{"count":0}');
  const journal = JSON.parse(localStorage.getItem('prayerJournal') || '[]');
  const statsEl = document.getElementById('prayer-stats');
  if (!statsEl) return;
  if (prayers > 0) {
    statsEl.style.display = 'block';
    document.getElementById('stat-prayers').textContent = prayers;
    document.getElementById('stat-streak').textContent = streakData.count || 0;
    document.getElementById('stat-journal').textContent = journal.length;
  }
}

/* ─────────────────────────────────────────────
   15b. MEDITATION TIMER
   ───────────────────────────────────────────── */
let meditationDuration = 300;
let meditationRemaining = 300;
let meditationInterval = null;
let meditationRunning = false;

function setMeditationTime(mins) {
  if (meditationRunning) return;
  meditationDuration = mins * 60;
  meditationRemaining = meditationDuration;
  document.querySelectorAll('.timer-preset').forEach(b => b.classList.toggle('active', parseInt(b.textContent) === mins));
  updateMeditationDisplay();
  const prog = document.getElementById('timer-progress');
  if (prog) prog.style.strokeDashoffset = '528';
}

function updateMeditationDisplay() {
  const display = document.getElementById('meditation-display');
  if (!display) return;
  const m = Math.floor(meditationRemaining / 60);
  const s = meditationRemaining % 60;
  display.textContent = m + ':' + String(s).padStart(2, '0');
}

function toggleMeditation() {
  const btn = document.getElementById('meditation-btn');
  const label = document.getElementById('meditation-label');
  if (meditationRunning) {
    clearInterval(meditationInterval);
    meditationRunning = false;
    if (btn) btn.textContent = 'Resume Meditation';
    if (label) label.textContent = 'Paused';
    return;
  }
  if (meditationRemaining <= 0) {
    meditationRemaining = meditationDuration;
    updateMeditationDisplay();
    const prog = document.getElementById('timer-progress');
    if (prog) prog.style.strokeDashoffset = '528';
  }
  meditationRunning = true;
  if (btn) btn.textContent = 'Pause';
  if (label) label.textContent = 'Meditating...';
  meditationInterval = setInterval(() => {
    meditationRemaining--;
    updateMeditationDisplay();
    const prog = document.getElementById('timer-progress');
    if (prog) {
      const pct = 1 - (meditationRemaining / meditationDuration);
      prog.style.strokeDashoffset = String(528 - (528 * pct));
    }
    if (meditationRemaining <= 0) {
      clearInterval(meditationInterval);
      meditationRunning = false;
      if (btn) btn.textContent = 'Begin Again';
      if (label) label.textContent = 'Meditation complete';
      toast('Meditation complete \u2014 go in peace', 4000);
      launchConfetti();
    }
  }, 1000);
}

/* ─────────────────────────────────────────────
   15c. BACK TO TOP
   ───────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   16. INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setDailyScripture();
  initParticles();
  initAudio();
  initBackToTop();
  updatePrayerStats();
  setTimeout(() => { renderScriptures(); renderJournal(); }, 100);
  navigate('home');

  // Show native share button on supported devices
  if (navigator.share) {
    const shareGrid = document.querySelector('.share-grid');
    if (shareGrid) {
      const nativeBtn = document.createElement('button');
      nativeBtn.className = 'share-btn';
      nativeBtn.setAttribute('aria-label', 'Share via device');
      nativeBtn.onclick = nativeShare;
      nativeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> Share';
      shareGrid.insertBefore(nativeBtn, shareGrid.firstChild);
    }
  }
});