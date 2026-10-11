// Comprehensive Offline Knowledge Base and Multilingual Dictionary for Zebene's World

export interface OfflineLesson {
  id: string;
  category: string;
  amharicCategory: string;
  title: string;
  amharicTitle: string;
  summary: string;
  historicalContext: string;
  keyConcepts: string[];
  stepByStepGuide: string[];
  realWorldImpact: string;
  quickQuiz: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}

export const OFFLINE_LESSONS: OfflineLesson[] = [
  {
    id: 'agri-irrigation',
    category: 'Agriculture & Food Sovereignty',
    amharicCategory: 'ግብርና እና የምግብ ሉዓላዊነት',
    title: 'Modern Drip Irrigation & Soil Conservation',
    amharicTitle: 'ዘመናዊ ጠብታ መስኖ እና የአፈር እንክብካቤ',
    summary: 'A complete practical blueprint for producing high-yield crops using minimal water through decentralized drip irrigation systems and biological composting.',
    historicalContext: 'Terraced agriculture and indigenous water management developed in Ethiopia and ancient Mesopotamia for thousands of years.',
    keyConcepts: [
      'Gravity-Fed Micro Drip Irrigation: Eliminates need for fuel pumps using 10m height gravity tanks.',
      'Organic Vermicomposting: Enhances soil microbial density without chemical fertilizer expense.',
      'Multi-Stratum Agroforestry: Growing legumes, grains, and fruit trees in symbiotic tiers.'
    ],
    stepByStepGuide: [
      'Step 1: Construct a 1,000-liter elevated rainwater catchment tank at 2-3 meters height.',
      'Step 2: Lay UV-resistant perforated PE tubes along crop furrows with 30cm spacing.',
      'Step 3: Mulch soil beds with dry straw or teff residue to suppress evaporation by 70%.'
    ],
    realWorldImpact: 'Multiplies harvest cycles from 1 to 3 seasons per year, guaranteeing year-round household income and nutritional security in rural communities.',
    quickQuiz: [
      {
        question: 'What is the main benefit of gravity-fed drip irrigation in rural areas?',
        options: [
          'It conserves water and works without expensive electric or fuel pumps',
          'It requires daily gasoline fuel delivery',
          'It damages soil structure',
          'It only works during continuous rain'
        ],
        correctIndex: 0,
        explanation: 'Gravity systems deliver water directly to crop roots with 90% water efficiency without fuel or power grids.'
      }
    ]
  },
  {
    id: 'software-ai',
    category: 'Technology & Computing',
    amharicCategory: 'የቴክኖሎጂ እና ኮምፒውተር እውቀት',
    title: 'Software Engineering & Autonomous Systems',
    amharicTitle: 'የሶፍትዌር ምህንድስና እና አርቴፊሻል ኢንተለጀንስ',
    summary: 'Learn the architectural foundations of modern software, offline-first client architecture, TypeScript, distributed systems, and machine learning.',
    historicalContext: 'From Ada Lovelace and Alan Turing to modern open-source decentralized systems powering billions of devices globally.',
    keyConcepts: [
      'Offline-First Progressive Web Apps: Cache assets locally with Service Workers for 100% resilience.',
      'Event-Driven Reactive State: Declarative UI architectures updating immediately on user input.',
      'Edge Intelligence: Running compressed neural network weights directly on mobile processors.'
    ],
    stepByStepGuide: [
      'Step 1: Master algorithms, data structures (hash tables, binary trees, graphs), and clean code principles.',
      'Step 2: Build local service workers and IndexedDB stores for resilient local data persistence.',
      'Step 3: Connect open-source models with local vector indexes for zero-connectivity semantic retrieval.'
    ],
    realWorldImpact: 'Enables any student or engineer in any rural or urban corner of the world to build world-class digital products and export tech solutions globally.',
    quickQuiz: [
      {
        question: 'What allows Progressive Web Apps to function without active internet?',
        options: [
          'Service Workers intercepting network requests and serving cached app assets',
          'Continuous satellite dish communication',
          'Paid cloud hosting subscriptions',
          'They cannot function without internet'
        ],
        correctIndex: 0,
        explanation: 'Service Workers cache the HTML, CSS, JavaScript, and data schemas locally in the browser storage.'
      }
    ]
  },
  {
    id: 'health-firstaid',
    category: 'Medicine & Public Health',
    amharicCategory: 'ህክምና እና የማህበረሰብ ጤና',
    title: 'Community First Aid & Preventative Medicine',
    amharicTitle: 'የማህበረሰብ የመጀመሪያ ህክምና እርዳታ እና በሽታ መከላከል',
    summary: 'Essential life-saving medical techniques, emergency trauma triage, water purification, maternal care, and epidemic prevention for communities.',
    historicalContext: 'Hippocratic traditions and indigenous herbal medicine documented across African, Asian, and Mediterranean civilizations.',
    keyConcepts: [
      'Oral Rehydration Salt (ORS) Formulation: 1 liter clean water + 6 teaspoons sugar + 1/2 teaspoon salt.',
      'Emergency Hemorrhage Control: Direct pressure, arterial elevation, and proper sterile tourniquet usage.',
      'Bio-Sand Filtration: Removing 99% of biological waterborne pathogens with layered sand and gravel.'
    ],
    stepByStepGuide: [
      'Step 1: Assess emergency airway, breathing, and circulation (ABC protocol) calmly.',
      'Step 2: Apply direct, uninterrupted pressure to open bleeding wounds with clean linen.',
      'Step 3: Boil drinking water for a rolling 3 minutes or filter through bio-sand beds.'
    ],
    realWorldImpact: 'Prevents 80% of preventable infant dehydration deaths and stabilizes trauma injuries before hospital transport.',
    quickQuiz: [
      {
        question: 'What is the correct emergency ratio for homemade Oral Rehydration Salts (ORS)?',
        options: [
          '1 Liter water + 6 level tsp sugar + 1/2 level tsp salt',
          '1 Liter water + 20 tsp salt',
          'Only boiled tea without water',
          'Pure sugar with zero water'
        ],
        correctIndex: 0,
        explanation: 'This precise osmotic balance allows the intestinal wall to rapidly absorb water and electrolytes.'
      }
    ]
  },
  {
    id: 'solar-energy',
    category: 'Renewable Energy & Infrastructure',
    amharicCategory: 'ታዳሽ ኃይል እና መሰረተ ልማት',
    title: 'Off-Grid Solar Photovoltaic & Micro-Grids',
    amharicTitle: 'ገለልተኛ የፀሐይ ብርሃን ኃይል (ሶላር) እና ማይክሮ-ግሪድ',
    summary: 'Design, assemble, and maintain decentralized solar battery power stations for lighting, grain mills, refrigeration, and health clinics.',
    historicalContext: 'Discovered via the photoelectric effect by Edmond Becquerel and explained by Albert Einstein in 1905.',
    keyConcepts: [
      'Photovoltaic Conversion: Monocrystalline silicon cells converting photons into direct current (DC).',
      'Charge Controllers: MPPT (Maximum Power Point Tracking) algorithms optimizing battery charging curves.',
      'Lithium Iron Phosphate (LiFePO4) Safety: 4,000+ deep cycles without thermal runaway danger.'
    ],
    stepByStepGuide: [
      'Step 1: Calculate daily watt-hour energy budget (e.g. 5 LED bulbs + phone charging + laptop = 350Wh).',
      'Step 2: Pair a 200W solar panel with a 12V 50Ah LiFePO4 battery and 20A MPPT controller.',
      'Step 3: Mount panel facing true solar South with an angle equal to your local latitude.'
    ],
    realWorldImpact: 'Brings light to rural classrooms, eliminates harmful kerosene smoke, and powers mobile communications in remote regions.',
    quickQuiz: [
      {
        question: 'Why is an MPPT charge controller superior to basic PWM controllers?',
        options: [
          'It extracts up to 30% more energy by dynamically matching solar voltage to battery voltage',
          'It consumes all power as heat',
          'It requires no solar panels',
          'It only operates at night'
        ],
        correctIndex: 0,
        explanation: 'MPPT dynamically finds the sweet spot of voltage and current to maximize battery charging efficiency.'
      }
    ]
  },
  {
    id: 'cooperative-finance',
    category: 'Economics & Civic Wealth',
    amharicCategory: 'ኢኮኖሚክስ እና ህብረት ባንክ',
    title: 'Equitable Cooperative Banking & Micro-Credit',
    amharicTitle: 'ፍትሃዊ የህብረት ባንክ እና አነስተኛ ብድር',
    summary: 'How collective savings associations (Equb/Edir models) scale into modern credit unions that foster micro-enterprises without predatory usury.',
    historicalContext: 'Centuries-old Ethiopian traditions of Equb (ዕቁብ) and Edir (ዕድር) combining mutual insurance with zero-interest capital pooling.',
    keyConcepts: [
      'Equb Rotating Credit Model: Democratically pooled capital distributed to rotating members for enterprise growth.',
      'Edir Community Social Security: Mutual assistance covering healthcare, bereavement, and community defense.',
      'Value-Backed Community Currencies: Local exchange trading systems stimulating neighborhood commerce.'
    ],
    stepByStepGuide: [
      'Step 1: Charter a 20-member association with transparent ledger rules and a joint savings escrow.',
      'Step 2: Allocate 10% of monthly contributions into a rainy-day solidarity fund and 90% into productive loans.',
      'Step 3: Provide zero-usury micro-loans to women-led crafts, grain storage, and tech apprenticeships.'
    ],
    realWorldImpact: 'Eliminates predatory money lenders, retains local wealth within communities, and fuels grassroots economic emancipation.',
    quickQuiz: [
      {
        question: 'What is the core social strength of traditional Equb (ዕቁብ)?',
        options: [
          'High social trust, zero debt traps, and interest-free access to startup capital',
          'Wall Street speculation',
          'Extreme interest rate inflation',
          'Exclusion of community members'
        ],
        correctIndex: 0,
        explanation: 'Equb relies on communal solidarity, transparency, and cooperative capital formation without exploitation.'
      }
    ]
  },
  {
    id: 'diplomacy-peace',
    category: 'Global Law & Governance',
    amharicCategory: 'አለምአቀፍ ህግ እና ዲፕሎማሲ',
    title: 'Peaceful Conflict Resolution & Human Rights Law',
    amharicTitle: 'ሰላማዊ የግጭት አፈታት እና የሰብአዊ መብት ህጎች',
    summary: 'The principles of restorative justice, elder mediation, the UN Charter, African Union mechanisms, and customary mediation frameworks.',
    historicalContext: 'African councils of elders (Shemgelna/Gadaa) integrated with global universal human rights covenants.',
    keyConcepts: [
      'Shemgelna Restorative Arbitration: Finding truth, mutual reconciliation, and social restoration rather than punitive retribution.',
      'The Universal Declaration of Human Rights (1948): Inalienable rights of every living human person.',
      'Active Non-Violent Negotiation: Addressing core material grievances to create lasting structural peace.'
    ],
    stepByStepGuide: [
      'Step 1: Convene conflicting parties in a neutral assembly chamber with verified equal speaking rights.',
      'Step 2: Separate personal emotions from material dispute issues; list common shared interests.',
      'Step 3: Document a binding written covenant with enforceable community guarantees.'
    ],
    realWorldImpact: 'Prevents communal clashes, heals historic grievances, and fosters pan-human brotherhood across all borders.',
    quickQuiz: [
      {
        question: 'What distinguishes traditional restorative mediation (Shemgelna) from punitive litigation?',
        options: [
          'It focuses on healing relationships, restitution, and community harmony',
          'It only imposes long prison terms',
          'It escalates violence',
          'It ignores the voices of elders and victims'
        ],
        correctIndex: 0,
        explanation: 'Restorative mediation restores community balance, mutual honor, and enduring reconciliation.'
      }
    ]
  }
];

// Offline translation lookup table covering Amharic, English, Oromo, Tigrinya, Arabic, French, Swahili
export const OFFLINE_DICTIONARY: Record<string, Record<string, string>> = {
  // Common phrases
  'ሰላም': { en: 'Peace / Greetings', om: 'Nagaa', ti: 'ሰላም', ar: 'سلام', fr: 'Paix / Bonjour', sw: 'Amani' },
  'እንኳን ደህና መጣችሁ': { en: 'Welcome to Zebene World', om: 'Baga nagaan dhuftan', ti: 'እንቋዕ ብደሓን መጻእኹም', ar: 'أهلاً وسهلاً', fr: 'Bienvenue', sw: 'Karibuni' },
  'እንማማር': { en: 'Let us learn together', om: 'Waliin ha barannu', ti: 'ንማሃር', ar: 'نتعلم معاً', fr: 'Apprenons ensemble', sw: 'Tujifunze pamoja' },
  'ፍቅርና አንድነት': { en: 'Love and Unity', om: 'Jaalalaafi Tokkummaa', ti: 'ፍቕርን ሓድነትን', ar: 'المحبة والوحدة', fr: 'Amour et Unité', sw: 'Upendo na Umoja' },
  'እውቀት': { en: 'Knowledge and Wisdom', om: 'Beekumsa', ti: 'ፍልጠት', ar: 'المعرفة والحكمة', fr: 'Connaissance', sw: 'Ujuzi' },
  'ወንድማማችነት': { en: 'Universal Brotherhood', om: 'Obbolummaa', ti: 'ሕውነት', ar: 'الأخوة العالمية', fr: 'Fraternité', sw: 'Undugu' },
  'ሰላማዊ ውይይት': { en: 'Peaceful Dialogue', om: 'Marii Nagaa', ti: 'ሰላማዊ ዘተ', ar: 'حوار سلمي', fr: 'Dialogue pacifique', sw: 'Mazungumzo ya amani' },
  'የጋራ ቤት': { en: 'Common Assembly House', om: 'Mana Waliinii', ti: 'ናይ ሓባር ቤት', ar: 'البيت المشترك', fr: 'Maison commune', sw: 'Nyumba ya pamoja' },
  'ስራ እና ፈጠራ': { en: 'Work and Innovation', om: 'Hojii fi Kalaqa', ti: 'ስራሕን ምህዞን', ar: 'العمل والابتكار', fr: 'Travail et innovation', sw: 'Kazi na uvumbuzi' },
  'በጎ አድራጎት': { en: 'Charity and Benevolence', om: 'Tola Ooltummaa', ti: 'ሰናይ ተግባር', ar: 'العمل الخيري', fr: 'Charité et solidarité', sw: 'Hisani' },
  'ባንክ እና ኢኮኖሚ': { en: 'Banking and Civic Economy', om: 'Baankii fi Dinagdee', ti: 'ባንክን ቁጠባን', ar: 'المصارف والاقتصاد', fr: 'Banque et économie', sw: 'Benki na uchumi' },
  'ህግ እና ስርዓት': { en: 'Rule of Law and Justice', om: 'Seeraa fi Sirna', ti: 'ሕግን ስርዓትን', ar: 'القانون والعدل', fr: 'Droit et justice', sw: 'Sheria na haki' },

  // English greetings & keywords
  'hello': { am: 'ሰላም (Peace / Greetings)', om: 'Nagaa', ti: 'ሰላም', ar: 'مرحباً', fr: 'Bonjour', sw: 'Habari' },
  'welcome': { am: 'እንኳን ደህና መጣችሁ', om: 'Baga nagaan dhuftan', ti: 'እንቋዕ ብደሓን መጻእኹም', ar: 'أهلاً بكم', fr: 'Bienvenue', sw: 'Karibu' },
  'peace': { am: 'ሰላም', om: 'Nagaa', ti: 'ሰላም', ar: 'سلام', fr: 'Paix', sw: 'Amani' },
  'unity': { am: 'አንድነት', om: 'Tokkummaa', ti: 'ሓድነት', ar: 'وحدة', fr: 'Unité', sw: 'Umoja' },
  'knowledge': { am: 'እውቀት', om: 'Beekumsa', ti: 'ፍልጠት', ar: 'معرفة', fr: 'Connaissance', sw: 'Maarifa' },
  'brotherhood': { am: 'ወንድማማችነት', om: 'Obbolummaa', ti: 'ሕውነት', ar: 'أخوة', fr: 'Fraternité', sw: 'Undugu' },
  'technology': { am: 'ቴክኖሎጂ', om: 'Teeknooloojii', ti: 'ቴክኖሎጂ', ar: 'تكنولوجيا', fr: 'Technologie', sw: 'Teknolojia' },
  'education': { am: 'ትምህርት', om: 'Barnoota', ti: 'ትምህርቲ', ar: 'تعليم', fr: 'Éducation', sw: 'Elimu' },
  'love': { am: 'ፍቅር', om: 'Jaalala', ti: 'ፍቕሪ', ar: 'محبة', fr: 'Amour', sw: 'Upendo' },
  'humanity': { am: 'የሰው ልጅ / የሰው ዘር', om: 'Ilma Namaa', ti: 'ደቂ ሰብ', ar: 'الإنسانية', fr: 'Humanité', sw: 'Ubinadamu' }
};

// Client-side offline translation synthesizer
export function offlineTranslate(
  text: string,
  targetLangName: string = 'English'
): string {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct dictionary match
  if (OFFLINE_DICTIONARY[trimmed]) {
    const entry = OFFLINE_DICTIONARY[trimmed];
    const code = getLangCode(targetLangName);
    if (entry[code]) return entry[code];
    if (entry.en && code !== 'am') return entry.en;
    if (entry.am) return entry.am;
  }

  if (OFFLINE_DICTIONARY[lower]) {
    const entry = OFFLINE_DICTIONARY[lower];
    const code = getLangCode(targetLangName);
    if (entry[code]) return entry[code];
    if (entry.en && code !== 'am') return entry.en;
    if (entry.am) return entry.am;
  }

  // 2. Word-by-word substitution check
  for (const [key, map] of Object.entries(OFFLINE_DICTIONARY)) {
    if (trimmed.includes(key)) {
      const code = getLangCode(targetLangName);
      const replacement = map[code] || map.en || map.am;
      if (replacement) {
        return `[Offline Translation]: ${trimmed.replace(key, ` (${replacement}) `)}`;
      }
    }
  }

  // 3. Fallback semantic preservation
  if (targetLangName.toLowerCase().includes('amharic') || targetLangName === 'am') {
    return `[ኦፍላይን ትርጉም • አማርኛ]: ${trimmed}`;
  } else if (targetLangName.toLowerCase().includes('oromo') || targetLangName === 'om') {
    return `[Hiika Offline • Afaan Oromoo]: ${trimmed}`;
  } else if (targetLangName.toLowerCase().includes('tigrinya') || targetLangName === 'ti') {
    return `[ኦፍላይን ትርጉም • ትግርኛ]: ${trimmed}`;
  } else {
    return `[Offline Engine • ${targetLangName}]: ${trimmed}`;
  }
}

function getLangCode(lang: string): string {
  const l = lang.toLowerCase();
  if (l.includes('amh') || l === 'am') return 'am';
  if (l.includes('oro') || l === 'om') return 'om';
  if (l.includes('tig') || l === 'ti') return 'ti';
  if (l.includes('ara') || l === 'ar') return 'ar';
  if (l.includes('fre') || l === 'fr') return 'fr';
  if (l.includes('swa') || l === 'sw') return 'sw';
  return 'en';
}
