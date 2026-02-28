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
  ],
  healing:[
    {text:"By whose stripes ye were healed.",ref:"1 Peter 2:24"},
    {text:"Bless the LORD, O my soul, and forget not all his benefits: Who forgiveth all thine iniquities; who healeth all thy diseases.",ref:"Psalm 103:2-3"},
    {text:"And the prayer of faith shall save the sick, and the Lord shall raise him up.",ref:"James 5:15"},
    {text:"He healeth the broken in heart, and bindeth up their wounds.",ref:"Psalm 147:3"},
    {text:"But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",ref:"Isaiah 53:5"},
    {text:"The LORD is nigh unto them that are of a broken heart.",ref:"Psalm 34:18"},
    {text:"I will restore health unto thee, and I will heal thee of thy wounds, saith the LORD.",ref:"Jeremiah 30:17"},
  ],
  wisdom:[
    {text:"Trust in the LORD with all thine heart; and lean not unto thine own understanding.",ref:"Proverbs 3:5"},
    {text:"If any of you lack wisdom, let him ask of God, that giveth to all men liberally.",ref:"James 1:5"},
    {text:"I will instruct thee and teach thee in the way which thou shalt go.",ref:"Psalm 32:8"},
    {text:"The fear of the LORD is the beginning of wisdom.",ref:"Proverbs 9:10"},
    {text:"For the LORD giveth wisdom: out of his mouth cometh knowledge and understanding.",ref:"Proverbs 2:6"},
    {text:"Thy word is a lamp unto my feet, and a light unto my path.",ref:"Psalm 119:105"},
  ],
  thanksgiving:[
    {text:"Enter into his gates with thanksgiving, and into his courts with praise.",ref:"Psalm 100:4"},
    {text:"In every thing give thanks: for this is the will of God in Christ Jesus concerning you.",ref:"1 Thessalonians 5:18"},
    {text:"By him therefore let us offer the sacrifice of praise to God continually.",ref:"Hebrews 13:15"},
    {text:"O give thanks unto the LORD; for he is good: for his mercy endureth for ever.",ref:"Psalm 136:1"},
    {text:"I will praise the name of God with a song, and will magnify him with thanksgiving.",ref:"Psalm 69:30"},
  ],
  petition:[
    {text:"Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.",ref:"Matthew 7:7"},
    {text:"Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",ref:"Philippians 4:6"},
    {text:"And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.",ref:"Matthew 21:22"},
    {text:"Therefore I say unto you, What things soever ye desire, when ye pray, believe that ye receive them, and ye shall have them.",ref:"Mark 11:24"},
    {text:"And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us.",ref:"1 John 5:14"},
  ],
  faith:[
    {text:"Now faith is the substance of things hoped for, the evidence of things not seen.",ref:"Hebrews 11:1"},
    {text:"So then faith cometh by hearing, and hearing by the word of God.",ref:"Romans 10:17"},
    {text:"But without faith it is impossible to please him.",ref:"Hebrews 11:6"},
    {text:"For we walk by faith, not by sight.",ref:"2 Corinthians 5:7"},
    {text:"I can do all things through Christ which strengtheneth me.",ref:"Philippians 4:13"},
  ],
  peace:[
    {text:"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.",ref:"John 14:27"},
    {text:"And the peace of God, which passeth all understanding, shall keep your hearts and minds.",ref:"Philippians 4:7"},
    {text:"Thou wilt keep him in perfect peace, whose mind is stayed on thee.",ref:"Isaiah 26:3"},
    {text:"The LORD will give strength unto his people; the LORD will bless his people with peace.",ref:"Psalm 29:11"},
  ],
  justice:[
    {text:"But let judgment run down as waters, and righteousness as a mighty stream.",ref:"Amos 5:24"},
    {text:"He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy.",ref:"Micah 6:8"},
    {text:"The LORD executeth righteousness and judgment for all that are oppressed.",ref:"Psalm 103:6"},
    {text:"For the LORD is righteous, he loveth righteousness.",ref:"Psalm 11:7"},
  ],
  prayer:[
    {text:"Pray without ceasing.",ref:"1 Thessalonians 5:17"},
    {text:"The effectual fervent prayer of a righteous man availeth much.",ref:"James 5:16"},
    {text:"Let us therefore come boldly unto the throne of grace.",ref:"Hebrews 4:16"},
    {text:"For where two or three are gathered together in my name, there am I in the midst of them.",ref:"Matthew 18:20"},
    {text:"Again I say unto you, That if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them.",ref:"Matthew 18:19"},
    {text:"The LORD is nigh unto all them that call upon him, to all that call upon him in truth.",ref:"Psalm 145:18"},
    {text:"Come unto me, all ye that labour and are heavy laden, and I will give you rest.",ref:"Matthew 11:28"},
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
};

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

  document.getElementById('builder-section').classList.remove('hidden');
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('code-section').classList.add('hidden');
  renderStep();
  document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  input.focus();

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
    document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  document.getElementById('preview-text').textContent = lines.join('\n\n');
  document.getElementById('preview-section').classList.remove('hidden');
  document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function editPrayer() {
  dismissKeyboard();
  document.getElementById('preview-section').classList.add('hidden');
  document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generatePrayerCode() {
  const cat = state.selectedCategory;
  const fullPrayer = cat.steps.map(s => state.stepData[s.key].trim()).join(' ');
  const finalCode = generateCode(fullPrayer);
  state.generatedCode = finalCode;

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
function copyCode() {
  if (!state.generatedCode) return;
  navigator.clipboard.writeText(state.generatedCode).then(() => toast('Prayer Code copied'));
}

function copyPrayerMessage() {
  if (!state.generatedCode) return;
  const msg = `My Prayer Code: ${state.generatedCode}\n\nThis code was generated through Prayer Codes — structured biblical prayers encoded through English Gematria.\n\nPray this code with me to amplify our connection to the throne of grace.\n\nCreate yours at prayer.quantummerlin.com\n\n#PrayerCodes #PrayWithMe #Faith`;
  navigator.clipboard.writeText(msg).then(() => toast('Prayer message copied'));
}

function shareWhatsApp() {
  const msg = `My Prayer Code: ${state.generatedCode}%0A%0AThis code was generated through Prayer Codes — structured biblical prayers encoded through English Gematria.%0A%0APray this code with me. Create yours at prayer.quantummerlin.com`;
  window.open('https://wa.me/?text=' + msg, '_blank');
}

function shareFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent('https://prayer.quantummerlin.com'), '_blank');
}

function shareTwitter() {
  const msg = `My Prayer Code: ${state.generatedCode} — Structured biblical prayer encoded through Gematria. Pray with me. prayer.quantummerlin.com #PrayerCodes`;
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(msg), '_blank');
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
   11. SCRIPTURE LIBRARY
   ───────────────────────────────────────────── */
let activeTag = 'all';

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
    const div = document.createElement('div');
    div.className = 'scripture-card';
    div.onclick = () => { navigator.clipboard.writeText(`"${s.text}" — ${s.ref} (KJV)`); toast('Scripture copied'); };
    div.innerHTML = `
      <div class="scripture-card-text">"${s.text}"</div>
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
    <div class="journal-entry ${entry.answered ? 'answered' : ''}">
      <div class="journal-top">
        <span class="journal-code">${icon(entry.icon || 'pray','journal-icon')} ${entry.code}</span>
        <span class="journal-date">${entry.date}</span>
      </div>
      <div class="journal-cat">${entry.category}</div>
      <div class="journal-preview">${entry.text}</div>
      ${entry.answered ? '<div class="answered-badge">${icon("cross","badge-icon")} Prayer Answered</div>' : ''}
      <div class="journal-actions">
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
  const journal = getJournal();
  journal.splice(idx, 1); saveJournal(journal); renderJournal(); toast('Entry removed');
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
      toast('Milestone: ' + count + ' prayers created', 4000);
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
  navigate('home');
}

/* ─────────────────────────────────────────────
   15. INIT
   ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setDailyScripture();
  initParticles();
  initAudio();
  setTimeout(() => { renderScriptures(); renderJournal(); }, 100);
  navigate('home');
});