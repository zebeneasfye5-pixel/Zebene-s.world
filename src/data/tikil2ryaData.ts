export interface MultilingualPurpose {
  langCode: string;
  langName: string;
  nativeName: string;
  title: string;
  motto: string;
  overview: string;
  foundingPhilosophy: string;
  chambersRole: {
    chamberCode: number;
    name: string;
    role: string;
  }[];
  pillars: {
    title: string;
    description: string;
  }[];
}

export interface CriminalDirectiveViolation {
  id: string;
  severityLevel: 1 | 2 | 3 | 4;
  title: string;
  amharicTitle: string;
  category: 'fake_accounts' | 'defamation' | 'intimidation' | 'abusive_language' | 'racism_tribalism' | 'factional_selfish_gain';
  description: string;
  amharicDescription: string;
  prohibitedActions: string[];
  amharicProhibitedActions: string[];
  internationalLawBasis: string;
  penaltiesAndConsequences: string[];
  amharicPenaltiesAndConsequences: string[];
  investigationMethod: string;
  amharicInvestigationMethod: string;
}

export const TIKIL_2RYA_MULTILINGUAL_PURPOSE: Record<string, MultilingualPurpose> = {
  am: {
    langCode: 'am',
    langName: 'Amharic',
    nativeName: 'አማርኛ',
    title: 'የዘበነ ዓለም (Zebene\'s World) አጠቃላይ ዋና ዓላማና ራዕይ',
    motto: 'ሰው መሆን ብቻ በቂ የሆነበት፤ ፍቅር፣ ዕውቀትና እውነተኛ ፍትህ የሚያስተሳስሩት ዓለም አቀፍ የሰው ልጆች የጋራ መድረክ!',
    overview: 'ይህ ድህረገፅና መተግበሪያ የተመሰረተው በታላቁ መስራች ዘበነ ሲሆን፤ ዋና ዓላማው በዓለም ዙሪያ የሚገኙ የሰው ልጆችን ያለ ምንም የዘር፣ የቋንቋ፣ የሃይማኖት፣ የጎሳ ወይም የድንበር ልዩነት በአንድ ወንድማማችነት እና እህትማማችነት ማስተሳሰር ነው። የሰው ልጆች ክብር የሚጠበቅበት፣ በራስ ሉዓላዊ ቴክኖሎጂ የተገነባ፣ ምንም አይነት የውጭ አልጎሪዝም ማጭበርበር የሌለበትና እውነተኛ ሰላም የሚሰፍንበት ዓለም አቀፍ ዲጂታል ጉባኤ ነው።',
    foundingPhilosophy: 'ቴክኖሎጂ ለጥላቻና ለመከፋፈል ሳይሆን ለዕውቀት፣ ለፍቅር፣ ለድሆች አጋዥነት እና ለፍትሃዊ ኢኮኖሚ መዋል አለበት። ማንም ሰው በሀብቱ ወይም በብሄሩ ሳይሆን በሰብአዊ ክብሩ፣ በዕውቀቱና በስነምግባሩ የሚመዘንበት ዘመን ተፈጥሯል።',
    chambersRole: [
      {
        chamberCode: 1,
        name: 'ክፍል 1 - የታላቁ ህዝባዊ ጉባኤ አዳራሽ (Universal Assembly)',
        role: 'ማንኛውም ሰው ሃሳቡን በነፃነት የሚገልጽበት፣ ድምፁ በቅጽበት ወደ 9 የዓለም ቋንቋዎች ተተርጉሞ ለሁሉም የሚደርስበት ክፍት ህዝባዊ መድረክ።'
      },
      {
        chamberCode: 2,
        name: 'ክፍል 2 - የዲፕሎማሲና የሀገራት የሰላም ስምምነት (Diplomatic Chamber)',
        role: 'በሀገራት እና በህዝቦች መካከል ያሉ አለመግባባቶች በውይይት የሚፈቱበት፣ የሰላም ስምምነቶች የሚፈረሙበት የዲፕሎማሲ ማዕከል።'
      },
      {
        chamberCode: 3,
        name: 'ክፍል 3 - የከፍተኛ ሉዓላዊነትና ይፋዊ አዋጆች (High Sovereign Protocol)',
        role: 'ታላላቅ የዓለም አቀፍ አዋጆች፣ ህጋዊ ቻርተሮች እና የጋራ ቃል ኪዳኖች ይፋ የሚደረጉበት ክቡር ክፍል (ጥበቃ የሚደረግለት)።'
      },
      {
        chamberCode: 4,
        name: 'ክፍል 4 - የቅዱስ ሚስጥርና የቤተሰብ እርቅ (Sanctuary of Secrets)',
        role: 'የግልና የቤተሰብ ሚስጥሮች፣ የትዳር አለመግባባቶች እና የሽምግልና ሂደቶች በከፍተኛ ምስጢራዊነት የሚታዩበት እና የሚታረቁበት ክፍል (ጥበቃ የሚደረግለት)።'
      },
      {
        chamberCode: 5,
        name: 'ክፍል 5 - የዓለም አቀፍ ሰርግና የጋብቻ ቃል ኪዳን (Nuptial Hall)',
        role: 'በዓለም ዙሪያ ባሉ ዘመዶች ፊት ህጋዊ የኦንላይን ሰርግ የሚከበርበት፣ በሽማግሌዎች ፊት በዲጂታል ፊርማ አስገዳጅ የጋብቻ ውል የሚፈረምበት የፍቅር ማዕከል።'
      },
      {
        chamberCode: 6,
        name: 'ክፍል 6 - የፈጠራ ተሰጥኦ፣ ከወለድ ነፃ ብድርና ውድድር (Talent & Micro-Loans)',
        role: 'ወጣቶች የሙዚቃ፣ የግጥም፣ የቴክኖሎጂ ፈጠራቸውን አቅርበው ሽልማት የሚያገኙበት፤ ከወለድ ነፃ የንግድና የትምህርት ብድር የሚሰጥበት ክፍል'
      },
      {
        chamberCode: 7,
        name: 'ክፍል 7 - የሽማግሌዎች የበላይ ፍርድና የሰላም አስከባሪዎች (Supreme Council of Elders)',
        role: 'ጥፋተኞችን የሚያርሙ፣ ጥልን የሚያስታርቁ፣ የስነምግባር ጥሰቶችን የሚፈርዱና የዓለምን ሰላም የሚጠብቁ የሽማግሌዎች እና የሰላም አስከባሪዎች ጉባኤ።'
      }
    ],
    pillars: [
      {
        title: 'የትምህርት አድማስ (AI Learning Horizon)',
        description: 'ሳይንስ፣ ግብርና፣ ህክምና፣ ቋንቋዎችና ቴክኖሎጂን ያለ ምንም ክፍያ በኦንላይን እና ያለ ኢንተርኔት (Offline) መማር የሚያስችል የዕውቀት ጎተራ።'
      },
      {
        title: 'ፍትሃዊ ኢኮኖሚና የበጎ አድራጎት ማዕከል',
        description: 'በኢትዮጵያ ንግድ ባንክ (CBE) እና በቴሌብር (Telebirr) የተሳሰረ፣ የየቲም ልጆችንና አቅመ-ደካሞችን 100% ያለ አላስፈላጊ ወጪ የሚደግፍ ንጹህ የፋይናንስ ስርዓት።'
      },
      {
        title: 'ሙሉ በሙሉ ያለ ኢንተርኔት የመስራት አቅም (Offline Resilience)',
        description: 'የኔትወርክ መቆራረጥ ሳይገድበው በ PWA ቴክኖሎጂ በስልኮችና ኮምፒውተሮች ላይ እንደ ቋሚ አፕሊኬሽን የሚሰራ ሉዓላዊ ቴክኖሎጂ።'
      }
    ]
  },
  en: {
    langCode: 'en',
    langName: 'English',
    nativeName: 'English',
    title: 'Grand Comprehensive Purpose & Architecture of Zebene\'s World',
    motto: 'A Universal Human Sanctuary Where Shared Humanity, Genuine Love, Knowledge, and Uncompromising Justice Prevail!',
    overview: 'Zebene’s World was conceived and established by its visionary founder Zebene to unite global humanity into a single fraternal civilization free from ethnic discrimination, geographic borders, and algorithmic deceit. It operates as a sovereign digital congress safeguarding human dignity, real-time multilingual communication, and international legal integrity.',
    foundingPhilosophy: 'Technology must serve knowledge, human dignity, charitable solidarity, and ethical economics rather than division, greed, or conflict. Every citizen is measured not by wealth or pedigree, but by integrity, wisdom, and benevolence.',
    chambersRole: [
      {
        chamberCode: 1,
        name: 'Chamber 1 - Universal Assembly Hall',
        role: 'An open global forum where citizens express ideas freely, translated instantly across 9 languages.'
      },
      {
        chamberCode: 2,
        name: 'Chamber 2 - Diplomatic & Treaty Chamber',
        role: 'A diplomatic council where inter-community disputes are mediated and peace pacts ratified.'
      },
      {
        chamberCode: 3,
        name: 'Chamber 3 - High Sovereign Protocol',
        role: 'A protected hall for historic sovereign proclamations, legal enactments, and international charters.'
      },
      {
        chamberCode: 4,
        name: 'Chamber 4 - Sanctuary of Secrets & Confidential Trust',
        role: 'An encrypted sanctuary dedicated to marital counseling, private reconciliation, and sacred oaths.'
      },
      {
        chamberCode: 5,
        name: 'Chamber 5 - Sacred Nuptial & Matrimonial Grand Hall',
        role: 'A sanctified venue for global virtual weddings with legally binding UNCITRAL biometric contracts.'
      },
      {
        chamberCode: 6,
        name: 'Chamber 6 - Talent Horizon, Micro-Credit & Inventions',
        role: 'A meritocratic stage where talents earn recognition and entrepreneurs receive zero-interest community loans.'
      },
      {
        chamberCode: 7,
        name: 'Chamber 7 - Supreme Council of Elders & Peacekeepers',
        role: 'The moral apex of the platform, resolving ethical breaches, enforcing discipline, and safeguarding peace.'
      }
    ],
    pillars: [
      {
        title: 'AI Learning Horizon',
        description: 'Universal access to STEM, agriculture, medicine, languages, and civics—operational both online and offline.'
      },
      {
        title: 'Fair Economics & Philanthropic Solidarity',
        description: 'Direct integration with CBE and Telebirr rails providing transparent giving for orphans and ethical revenue sharing.'
      },
      {
        title: 'Offline Sovereign Resilience (PWA)',
        description: 'Complete operational resilience independent of external server downtimes or internet blackouts.'
      }
    ]
  },
  om: {
    langCode: 'om',
    langName: 'Afaan Oromoo',
    nativeName: 'Afaan Oromoo',
    title: 'Kaayyoo Guddaa fi Ergama Addunyaa Zebene (Zebene\'s World)',
    motto: 'Nama ta\'uun qofti bakka ga\'aa ta\'e; jaalala, beekumsaa fi haqa dhugaan kan walitti hidhame!',
    overview: 'Addunyaan Zebene hundeessaa guddaa Zebene\'n kan hundeeffame yoo ta\'u, kaayyoon isaa guddaan ilmaan namaa addunyaa mara jiran garaagarummaa sabaa, afaanii, amantii fi daangaa malee tokkummaadhaan walitti fiduudha.',
    foundingPhilosophy: 'Teknooloojiin jibbaa fi qoqqoodamaaf osoo hin taane beekumsaaf, jaalalaaf, gargaarsa hiyyeessotaaf fi dinagdee haqa qabeessaaf ooluu qaba.',
    chambersRole: [
      { chamberCode: 1, name: 'Kutaa 1 - Yaa\'ii Ummataa Bal\'aa', role: 'Namni hundi yaada isaa bilisaan kan ibsu, sagaleen isaa afaanota 9tti kan hiikamu.' },
      { chamberCode: 2, name: 'Kutaa 2 - Dippilomaasii fi Nageenya', role: 'Waldhabiinsi hawaasaa mariidhaan kan furamu fi waliigalteen nageenyaa kan mallatteeffamu.' },
      { chamberCode: 3, name: 'Kutaa 3 - Seera fi Labsii Olaanaa', role: 'Labsiiwwan gurguddoon fi kakuun hawaasummaa kan itti labsamu.' },
      { chamberCode: 4, name: 'Kutaa 4 - Iddoo Iccitii fi Araara Maatii', role: 'Iccitiin maatii fi mariin araaraa eegumsa cimaadhaan kan itti adeemsifamu.' },
      { chamberCode: 5, name: 'Kutaa 5 - Cidha Addunyaa fi Kakuu Gaa\'elaa', role: 'Cidhi intarneetiin geggeeffamee waliigalteen gaa\'elaa seera qabeessi kan mallatteeffamu.' },
      { chamberCode: 6, name: 'Kutaa 6 - Dandeettii, Liqii Dhala Malee fi Kalaqa', role: 'Dandeettii aartii fi kalaqa agarsiisuun badhaasa argachuu fi liqii dhala malee argachuu.' },
      { chamberCode: 7, name: 'Kutaa 7 - Yaa\'ii Jaarsolii fi Tiksitoota Nageenyaa', role: 'Badii sirreessuu, araarsuu fi nageenya waloo eeguuf kan dhaabbate.' }
    ],
    pillars: [
      { title: 'Barnoota AI (AI Learning Horizon)', description: 'Saayinsii, qonna, yaalaa fi afaanota tola intarneetii malees barachuuf kan gargaaru.' },
      { title: 'Dinagdee Haqa Qabeessa fi Gargaarsa', description: 'Baankii Daldala Itoophiyaa (CBE) fi Telebirr waliin kan hidhame, ijoollee maatii hin qabne kan deeggaru.' },
      { title: 'Intarneetii Malee Hojjechuu (Offline PWA)', description: 'Intarneetiin yoo addaan citeyyuu bilbila fi kompiitara irratti guutummaatti kan hojjetu.' }
    ]
  },
  ti: {
    langCode: 'ti',
    langName: 'Tigrinya',
    nativeName: 'ትግርኛ',
    title: 'ዓብዪ ዕላማን ራእይን ዓለም ዘበነ (Zebene\'s World)',
    motto: 'ሰብ ምዃን ጥራይ እኹል ኣብ ዝኾነሉ፤ ፍቕሪ፣ ፍልጠትን ናይ ሓቂ ፍትሕን ዘተኣሳስሮ ዓለምለኸ መድረኽ!',
    overview: 'ዓለም ዘበነ ብመስራቲ ዘበነ ዝተመስረተ ኮይኑ፤ ቀንዲ ዕላማኡ ኣብ መላእ ዓለም ዝርከቡ ደቂ ሰባት ብዘይ ኣድልዎ ብሄር፣ ቋንቋ፣ ሃይማኖት ወይ ዶብ ብሓደ ሕውነት ምትእስሳር እዩ።',
    foundingPhilosophy: 'ቴክኖሎጂ ንጽልእን ምክፍፋልን ዘይኮነስ ንፍልጠት፣ ንፍቕሪ፣ ንድኻታት ምሕጋዝን ንፍትሓዊ ቁጠባን ክውዕል ኣለዎ።',
    chambersRole: [
      { chamberCode: 1, name: 'ክፍሊ 1 - ዓብዪ ህዝባዊ ኣዳራሽ', role: 'ነፍሲ ወከፍ ሰብ ሓሳቡ ብነፃነት ዝገልጸሉ፣ ድምጹ ብቕጽበት ናብ 9 ቋንቋታት ዓለም ዝትርጎመሉ።' },
      { chamberCode: 2, name: 'ክፍሊ 2 - ዲፕሎማሲን ስምምዕ ሰላምን', role: 'ዘይምርድዳእ ብዘተ ዝፍታሓሉን ናይ ሰላም ስምምዓት ዝፍረመሉን ማእኸል።' },
      { chamberCode: 3, name: 'ክፍሊ 3 - ላዕለዋይ ልኡላውነትን ኣዋጃትን', role: 'ዓበይቲ ኣዋጃትን ሕጋዊ ቻርተራትን ዝእወጁሉ ቅዱስ ክፍሊ።' },
      { chamberCode: 4, name: 'ክፍሊ 4 - ቅዱስ ምስጢርን ዕርቂ ስድራቤትን', role: 'ምስጢራት ስድራቤትን ዕርቅን ብልዑል ምስጢር ዝረኣየሉ ክፍሊ።' },
      { chamberCode: 5, name: 'ክፍሊ 5 - ዓለምለኸ መርዓን ቃል ኪዳን መርዓን', role: 'ብኦንላይን ሰርግ ዝካየደሉን ሕጋዊ ናይ መርዓ ሰነድ ዝፍረመሉን ማእኸል።' },
      { chamberCode: 6, name: 'ክፍሊ 6 - ተውህቦ፣ ብዘይ ወለድ ልቓሕን ፈጠራን', role: 'ናይ ሙዚቃን ቴክኖሎጂን ውድድር ዝካየደሉን ብዘይ ወለድ ልቓሕ ዝወሃበሉን ክፍሊ።' },
      { chamberCode: 7, name: 'ክፍሊ 7 - ዋዕላ ሽማግለታትን ሓለውቲ ሰላምን', role: 'ስነ-ምግባር ዝቆጻጸሩ፣ ሰላም ዝሕልዉን ፍትሒ ዘረጋግጹን ሽማግለታት።' }
    ],
    pillars: [
      { title: 'ኣድማስ ትምህርቲ (AI Learning)', description: 'ሳይንስ፣ ሕርሻ፣ ሕክምና ብዘይ ክፍሊት ብኦንላይንን ብዘይ ኢንተርኔትን ምምሃር።' },
      { title: 'ፍትሓዊ ቁጠባን ምትሕግጋዝን', description: 'ምስ ንግዲ ባንክ ኢትዮጵያን ቴሌብርን ዝተኣሳሰረ፣ ንዘኽታማት ዝድግፍ ስርዓት።' },
      { title: 'ብዘይ ኢንተርኔት ምስራሕ (Offline PWA)', description: 'ኢንተርኔት ኣብ ዘይብሉ እዋን እውን ምሉእ ብምሉእ ዝሰርሕ ሉዓላዊ ቴክኖሎጂ።' }
    ]
  },
  so: {
    langCode: 'so',
    langName: 'Somali',
    nativeName: 'Soomaali',
    title: 'Ujeeddada Guud iyo Aragtida Caalamka Zebene (Zebene\'s World)',
    motto: 'Meel bini\'aadamnimadu ku filan tahay; jacayl, aqoon iyo caddaalad dhab ah ku midoobeen!',
    overview: 'Caalamka Zebene waxaa aasaasay Zebene si uu dadka adduunka oo dhan ugu mideeyo walaalnimo iyada oo aan loo eegin qabiil, luqad, diin, ama xuduudo.',
    foundingPhilosophy: 'Tiknoolajiyadu waa inay u adeegtaa aqoonta, jacaylka, caawinta masaakiinta iyo dhaqaale caddaalad ah, ee ma aha nacayb iyo kala qaybsanaan.',
    chambersRole: [
      { chamberCode: 1, name: 'Qolka 1 - Golaha Guud ee Shacabka', role: 'Qof kastaa wuxuu si xor ah u cabbiri karaa fikradiisa, codkiisana waxaa loo turjumayaa 9 luqadood.' },
      { chamberCode: 2, name: 'Qolka 2 - Dibloomaasiyadda & Nabadda', role: 'Khilaafaadka waxaa lagu xalliyaa wadahadal heshiisyo nabadeedna waa lagu saxiixaa.' },
      { chamberCode: 3, name: 'Qolka 3 - Xeerarka & Baaqyada Sare', role: 'Baaqyada muhiimka ah iyo axdiyada sharciga ah ayaa lagu shaaciyaa.' },
      { chamberCode: 4, name: 'Qolka 4 - Sirta & Dib-u-heshiisiinta Qoyska', role: 'Sirta qoyska iyo heshiisiinta ayaa lagu maareeyaa si qarsoodi sare ah.' },
      { chamberCode: 5, name: 'Qolka 5 - Aroosyada Caalamiga & Heshiiska Guurka', role: 'Aroos sharci ah oo online ah iyo heshiis guur oo saxiixan.' },
      { chamberCode: 6, name: 'Qolka 6 - Hibada, Daymaha Bilaa Ribada ah', role: 'Tartannada hal-abuurka iyo daymaha ganacsiga oo aan ribo lahayn.' },
      { chamberCode: 7, name: 'Qolka 7 - Golaha Odayaasha & Ilaalada Nabadda', role: 'Ilaalinta anshaxa, nabad dhisidda iyo caddaaladda bulshada.' }
    ],
    pillars: [
      { title: 'Barashada AI', description: 'Sayniska, beeraha, caafimaadka iyo luqadaha oo bilaash ah xitaa khadka la\'aantiis.' },
      { title: 'Dhaqaale Caddaalad ah & Sadaqo', description: 'Kuxiran CBE & Telebirr si loo caawiyo agoonta iyo danyarta.' },
      { title: 'Khad la\'aan Shaqaynta (Offline PWA)', description: 'U shaqaynaya sidii abka rasmiga ah xitaa marka uusan jirin internet.' }
    ]
  },
  ar: {
    langCode: 'ar',
    langName: 'Arabic',
    nativeName: 'العربية',
    title: 'الهدف الأسمى والرؤية الشاملة لعالم زبني (Zebene\'s World)',
    motto: 'حيث تكفي الإنسانية وحدها؛ ميثاق عالمي يجمعه الحب والمعرفة والعدالة الحقيقية!',
    overview: 'تأسس عالم زبني على يد مؤسسه زبني بهدف توحيد البشرية جمعاء عبر القارات دون أي تمييز عرقي أو لغوي أو ديني أو حدود جغرافية، في مؤتمر رقمي سيادي يحمي الكرامة الإنسانية.',
    foundingPhilosophy: 'التكنولوجيا يجب أن تكرس للمعرفة والمحبة ومساندة الفقراء والعدالة الاقتصادية، وليس للكراهية والانقسام.',
    chambersRole: [
      { chamberCode: 1, name: 'الغرفة 1 - الجمعية العامة الشعبية', role: 'منبر حر للتعبير مع ترجمة صوتية فورية لتسع لغات عالمية.' },
      { chamberCode: 2, name: 'الغرفة 2 - الدبلوماسية ومعاهدات السلام', role: 'حل النزاعات بالحوار وتوقيع مواثيق الصلح والسلام بين المجتمعات.' },
      { chamberCode: 3, name: 'الغرفة 3 - البروتوكول السيادي والإعلانات الكبرى', role: 'إعلان المواثيق والعهود الإنسانية التاريخية.' },
      { chamberCode: 4, name: 'الغرفة 4 - ملاذ الأسرار والصلح الأسري', role: 'جلسات استشارية وصلح عائلي مشفرة ومحاطة بأعلى درجات السرية.' },
      { chamberCode: 5, name: 'الغرفة 5 - الأعراس العالمية وعقود الزواج', role: 'إقامة مراسم الزواج الرقمي القانوني المعتمد وفق معايير UNCITRAL.' },
      { chamberCode: 6, name: 'الغرفة 6 - المواهب والقروض بدون فوائد', role: 'رعاية الابتكارات وتقديم قروض مجتمعية ميسرة بدون أي فوائد ربوية.' },
      { chamberCode: 7, name: 'الغرفة 7 - مجلس الحكماء وحفظة السلام', role: 'حفظ النظام الأخلاقي وفض الخصومات وإرساء السلام والأمان.' }
    ],
    pillars: [
      { title: 'أفق التعليم بالذكاء الاصطناعي', description: 'تعليم العلوم والزراعة والطب واللغات مجاناً مع دعم كامل للعمل بدون إنترنت.' },
      { title: 'الاقتصاد العادل والتضامن الخيري', description: 'ربط مباشر مع بنك إثيوبيا التجاري وتيليبير لدعم الأيتام والمحتاجين بشفافية 100%.' },
      { title: 'الصمود بدون إنترنت (PWA)', description: 'تطبيق سيادي يعمل بكفاءة كاملة حتى في حالات انقطاع شبكة الإنترنت.' }
    ]
  },
  fr: {
    langCode: 'fr',
    langName: 'French',
    nativeName: 'Français',
    title: 'Objectif Grandiose et Architecture de Zebene\'s World',
    motto: 'Un sanctuaire universel où l\'humanité partagée, l\'amour, le savoir et la justice triomphent!',
    overview: 'Zebene\'s World a été fondé par son créateur souverain Zebene pour unir l\'humanité mondiale par-delà les clivages ethniques, linguistiques ou géographiques au sein d\'un congrès numérique souverain.',
    foundingPhilosophy: 'La technologie doit servir la connaissance, l\'amour du prochain, la solidarité avec les vulnérables et l\'équité économique, plutôt que la cupidité et la division.',
    chambersRole: [
      { chamberCode: 1, name: 'Chambre 1 - Assemblée Populaire Universelle', role: 'Tribune libre avec traduction vocale instantanée en 9 langues.' },
      { chamberCode: 2, name: 'Chambre 2 - Diplomatie & Traités de Paix', role: 'Résolution pacifique des différends et ratification des pactes civiques.' },
      { chamberCode: 3, name: 'Chambre 3 - Haut Protocole Souverain', role: 'Proclamations historiques et promulgation des chartes internationales.' },
      { chamberCode: 4, name: 'Chambre 4 - Sanctuaire des Secrets & Réconciliation', role: 'Médiation familiale et arbitrages privés hautement confidentiels.' },
      { chamberCode: 5, name: 'Chambre 5 - Célébration Nuptiale & Alliances', role: 'Mariages virtuels officiels et contrats biométriques exécutoires (UNCITRAL).' },
      { chamberCode: 6, name: 'Chambre 6 - Talents, Inventions & Micro-Crédit', role: 'Compétitions méritocratiques et prêts communautaires sans intérêt.' },
      { chamberCode: 7, name: 'Chambre 7 - Conseil Suprême des Sages', role: 'Gardiens de la paix, justice réparatrice et arbitrage éthique.' }
    ],
    pillars: [
      { title: 'Horizon d\'Apprentissage IA', description: 'Éducation universelle en sciences, agriculture, médecine et civisme, en ligne et hors ligne.' },
      { title: 'Économie Équitable & Philanthropie', description: 'Intégration directe avec CBE et Telebirr pour le soutien intégral aux orphelins.' },
      { title: 'Résilience Hors Ligne Souveraine (PWA)', description: 'Fonctionnement intégral sur tout appareil sans dépendance à Internet.' }
    ]
  },
  es: {
    langCode: 'es',
    langName: 'Spanish',
    nativeName: 'Español',
    title: 'Propósito General y Arquitectura de Zebene\'s World',
    motto: '¡Un santuario universal donde la humanidad compartida, el conocimiento y la justicia prevalecen!',
    overview: 'Zebene\'s World fue fundado por Zebene para unir a la humanidad en una fraternidad global sin barreras étnicas, religiosas o fronterizas, garantizando la paz mediante tecnología soberana.',
    foundingPhilosophy: 'La tecnología debe servir al saber, la compasión, el socorro a los necesitados y la economía justa, y jamás a la división o el odio.',
    chambersRole: [
      { chamberCode: 1, name: 'Cámara 1 - Gran Asamblea Popular', role: 'Foro abierto con traducción en tiempo real a 9 idiomas del mundo.' },
      { chamberCode: 2, name: 'Cámara 2 - Diplomacia y Tratados de Paz', role: 'Resolución pacífica de conflictos y pactos de hermandad entre pueblos.' },
      { chamberCode: 3, name: 'Cámara 3 - Alto Protocolo Soberano', role: 'Proclamaciones oficiales y cartas magnas internacionales.' },
      { chamberCode: 4, name: 'Cámara 4 - Santuario de Secretos y Reconciliación', role: 'Consejería matrimonial y mediación confidencial cifrada.' },
      { chamberCode: 5, name: 'Cámara 5 - Bodas Universales y Pacto Matrimonial', role: 'Bodas digitales y certificados civiles vinculantes con firma biométrica.' },
      { chamberCode: 6, name: 'Cámara 6 - Talentos, Innovación y Microcrédito', role: 'Impulso al talento joven y préstamos comunitarios sin intereses.' },
      { chamberCode: 7, name: 'Cámara 7 - Consejo Supremo de Sabios', role: 'Justicia restaurativa, disciplina ética y preservación de la paz.' }
    ],
    pillars: [
      { title: 'Horizonte Educativo con IA', description: 'Cursos de ciencia, agricultura y medicina accesibles tanto en línea como sin internet.' },
      { title: 'Economía Justa y Solidaridad', description: 'Integración bancaria transparente que apoya al 100% a orfanatos y ancianos.' },
      { title: 'Autonomía Sin Conexión (Offline PWA)', description: 'Ejecución completa e independiente de caídas de red en cualquier dispositivo.' }
    ]
  },
  zh: {
    langCode: 'zh',
    langName: 'Chinese',
    nativeName: '中文',
    title: '泽贝内世界（Zebene\'s World）宏伟宗旨与系统架构',
    motto: '人类生而平等，爱、智慧与公义永存的全球人类数字家园！',
    overview: '泽贝内世界由创始人泽贝内建立，旨在跨越种族、语言、宗教和国界的藩篱，将全世界人民团结在真正的兄弟情谊中，以主权科技保障人类尊严与和平。',
    foundingPhilosophy: '科技必须服务于知识启蒙、慈悲博爱、扶危济困与公平经济，绝不能沦为煽动仇恨和分裂的工具。',
    chambersRole: [
      { chamberCode: 1, name: '第一厅 - 全球大众议事厅', role: '自由发表演讲，实时语音同传至全球9种语言。' },
      { chamberCode: 2, name: '第二厅 - 外交与和平公约厅', role: '通过对话调解跨社区冲突，签署和平协议。' },
      { chamberCode: 3, name: '第三厅 - 最高主权协议厅', role: '发布重大国际宣言与人道主义主权宪章。' },
      { chamberCode: 4, name: '第四厅 - 圣洁秘密与家庭调解厅', role: '高度加密的家庭调解与私密心理支持空间。' },
      { chamberCode: 5, name: '第五厅 - 全球神圣婚礼与婚约大厅', role: '举行合法线上跨国婚礼，出具具有国际法律效力的生物识别结婚证书。' },
      { chamberCode: 6, name: '第六厅 - 青年才智、免息贷款与发明厅', role: '才华竞演奖励平台，提供零利息助学与助创社区贷款。' },
      { chamberCode: 7, name: '第七厅 - 长老最高委员会与和平卫士', role: '维护公序良俗，惩戒违规行为，捍卫永久和平。' }
    ],
    pillars: [
      { title: 'AI 智慧学习地平线', description: '涵盖科学、农业、医学的通用教育，支持完全离线学习。' },
      { title: '公平金融与孤儿人道救助', description: '与埃塞商业银行及Telebirr直连，善款100%透明直达孤儿院。' },
      { title: '全主权离线运行能力 (PWA)', description: '在网络中断或无信号环境下依然可流畅运行。' }
    ]
  },
  sw: {
    langCode: 'sw',
    langName: 'Swahili',
    nativeName: 'Kiswahili',
    title: 'Kusudi Kuu na Muundo wa Ulimwengu wa Zebene (Zebene\'s World)',
    motto: 'Mahali ambapo ubinadamu unatosha; upendo, hekima na haki ya kweli vinapotawala!',
    overview: 'Ulimwengu wa Zebene ulianzishwa na mwanzilishi mkuu Zebene ili kuwaunganisha wanadamu wote ulimwenguni bila ubaguzi wa kikabila, lugha, dini au mipaka ya kijiografia.',
    foundingPhilosophy: 'Teknolojia lazima itumike kwa elimu, upendo, kusaidia maskini na uchumi wa haki badala ya chuki na migawanyiko.',
    chambersRole: [
      { chamberCode: 1, name: 'Chumba 1 - Bunge Kuu la Wananchi', role: 'Jukwaa huru la kutoa maoni linalotafsiriwa mara moja katika lugha 9 za kimataifa.' },
      { chamberCode: 2, name: 'Chumba 2 - Diplomasia na Mikataba ya Amani', role: 'Kutatua migogoro kwa mazungumzo na kuridhia mikataba ya amani.' },
      { chamberCode: 3, name: 'Chumba 3 - Itifaki Kuu ya Enzi', role: 'Kutangaza maamuzi makubwa ya kitaifa na mikataba ya kimataifa.' },
      { chamberCode: 4, name: 'Chumba 4 - Mahali pa Siri na Upatanishi wa Familia', role: 'Mashauri ya ndoa na siri za kibinafsi zilizolindwa kwa usiri mkubwa.' },
      { chamberCode: 5, name: 'Chumba 5 - Harusi za Kimataifa na Mikataba ya Ndoa', role: 'Sherehe za harusi mtandaoni na vyeti vya kisheria vilivyoidhinishwa na UNCITRAL.' },
      { chamberCode: 6, name: 'Chumba 6 - Vipaji, Mikopo Isiyo na Riba na Uvumbuzi', role: 'Kutambua vipaji vya vijana na kutoa mikopo bila riba.' },
      { chamberCode: 7, name: 'Chumba 7 - Baraza Kuu la Wazee na Walinzi wa Amani', role: 'Kusimamia nidhamu, kupatanisha na kulinda amani ya wote.' }
    ],
    pillars: [
      { title: 'Elimu ya AI (AI Learning Horizon)', description: 'Sayansi, kilimo na tiba bure hata bila mtandao wa intaneti.' },
      { title: 'Uchumi wa Haki na Misaada ya Kibinadamu', description: 'Imeunganishwa na CBE na Telebirr kusaidia watoto yatima kwa uwazi 100%.' },
      { title: 'Uwezo wa Kufanya Kazi Bila Mtandao (Offline PWA)', description: 'Inafanya kazi kikamilifu hata bila kuunganishwa na mtandao.' }
    ]
  }
};

export const STRICT_CRIMINAL_ACCOUNTABILITY_DIRECTIVES: CriminalDirectiveViolation[] = [
  {
    id: 'viol-1-fake-accounts-sybil',
    severityLevel: 3,
    category: 'fake_accounts',
    title: 'Prohibition of Multiple Fake Accounts, Impersonation & Identity Fraud',
    amharicTitle: 'ከአንድ በላይ በሆነ የውሸት (Fake) አካውንት ማጭበርበር፣ ማንነትን መዝረፍ እና ማባዛት በጥብቅ የተከለከለ ነው',
    description: 'Operating duplicate accounts, fabricating fake personas, using bot nets, or hijacking real identities to manipulate chambers, voting, lotteries, or micro-loans constitutes aggravated digital fraud under international cyber conventions.',
    amharicDescription: 'በዚህ ድህረገፅ እና መተግበሪያ ላይ ማንኛውም ሰው ከአንድ አካውንት በላይ መክፈት፣ የውሸት ስም ወይም ፎቶ መጠቀም፣ የሌላ ሰውን ማንነት መስረቅ፣ ወይም በቦቶች አማካኝነት ድምፅን፣ ጨዋታን፣ ብድርን ወይም ንግግርን ለማጭበርበር መሞከር በከባድ የሳይበር ወንጀል ህግ ያስቀጣል።',
    prohibitedActions: [
      'Creating multiple profiles using different burner emails, proxy numbers, or forged biometric credentials.',
      'Deploying automated bot networks to inflate follower counts, sway chamber votes, or monopolize queue seats.',
      'Using synthetic deepfake imagery, borrowed selfies, or deceased persons’ credentials during facial verification.',
      'Circumventing bans by re-registering under alias names or falsified identification tokens.'
    ],
    amharicProhibitedActions: [
      'የተለያዩ ስልኮችን ወይም የውሸት ኢሜይሎችን በመጠቀም ከአንድ በላይ አካውንት መክፈት።',
      'በክፍሎች ውስጥ መቀመጫ ለመያዝ፣ በድምፅ መስጫ ወይም በውድድሮች ላይ ለማጭበርበር ቦቶችን (Bots) መጠቀም።',
      'በፊት ባዮሜትሪክ ማረጋገጫ ወቅት የሌላ ሰውን ፎቶ፣ በ AI የተሰራ ምስል (Deepfake) ወይም የሟቾችን መታወቂያ መጠቀም።',
      'አካውንት ሲታገድ በሌላ ስም ተመልሶ ለመግባት መሞከር።'
    ],
    internationalLawBasis: 'Budapest Convention on Cybercrime (ETS 185, Arts. 7 & 8: Computer-related Forgery and Fraud); UN Convention against Transnational Organized Crime; Interpol Cyber Forensics Protocols.',
    penaltiesAndConsequences: [
      'Immediate revocation and cryptographic destruction of all duplicate and affiliated accounts.',
      'Permanent biometric hash and device fingerprint blacklisting across all sovereign chambers.',
      'Total forfeiture of all deposited wallet balances and frozen loan applications.',
      'Issuance of formal Cyber-Fraud Incident Dossier to national cyber security agencies and Interpol.'
    ],
    amharicPenaltiesAndConsequences: [
      'ሁሉንም የተባዙ እና ተባባሪ የውሸት አካውንቶችን ወዲያውኑ ማጥፋት እና ማገድ።',
      'የግለሰቡን የፊት ባዮሜትሪክ እና የስልክ/ኮምፒውተር መለያ ኮድ በቋሚ የጥቁር መዝገብ ውስጥ መመዝገብ።',
      'በዋሌት ውስጥ ያለውን ማንኛውንም ቀሪ ገንዘብ መውረስ እና የብድር ጥያቄን መሰረዝ።',
      'የወንጀል ፎረንሲክስ መረጃዎችን በማዘጋጀት ለሀገር ውስጥ የሳይበር ደህንነት እና ለኢንተርፖል ፖሊስ ሪፖርት ማድረግ።'
    ],
    investigationMethod: 'Automated biometric embedding cosine distance clustering, device TLS fingerprinting, and behavioral IP graph analysis.',
    amharicInvestigationMethod: 'አውቶሜትድ የፊት ባዮሜትሪክ ንጽጽር፣ የኮምፒውተር/ስልክ ዲጂታል አሻራ እና የኔትወርክ ፎረንሲክስ መመርመሪያ ስርዓት።'
  },
  {
    id: 'viol-2-defamation-slander',
    severityLevel: 2,
    category: 'defamation',
    title: 'Defamation, Character Assassination, Malicious Slander & Fake Accusations',
    amharicTitle: 'የተሳታፊዎችን ስም ማጥፋት፣ በሀሰት መወንጀል፣ ማዋረድ እና የክብር ማጉደፍ በዓለም አቀፍ የፍትሐብሔርና የወንጀል ህግ ያስቀጣል',
    description: 'Attacking the dignity, good name, commercial reputation, or family honor of any participant through fabricated allegations, doctored screenshots, or smear campaigns is strictly actionable before international and local courts.',
    amharicDescription: 'በዚህ ድህረገፅ እና መተግበሪያ ውስጥ የሚሳተፍን ማንኛውንም ግለሰብ፣ ቤተሰብ፣ አገልጋይ ወይም መሪ በሀሰት መወንጀል፣ ስሙን ማጉደፍ፣ የተቀነባበረ የውሸት መረጃ ማሰራጨት ወይም ክብሩን ማዋረድ በከፍተኛ የፍትሐብሔር ካሳ እና በወንጀል ህግ ያስቀጣል።',
    prohibitedActions: [
      'Broadcasting unverified accusations of financial theft, moral crimes, or treason against fellow members.',
      'Distributing doctored audio recordings or fabricated chat screenshots to tarnish another citizen’s standing.',
      'Coordinating group slander campaigns across chambers to destroy an artist’s, merchant’s, or scholar’s livelihood.',
      'Filing deliberate false police/moderator reports against innocent delegates to silence opposing views.'
    ],
    amharicProhibitedActions: [
      'ያለ በቂ ማስረጃ በተሳታፊዎች ላይ ሌባ፣ አጭበርባሪ ወይም ከሃዲ የሚል የሀሰት ወሬ ማውራት።',
      'የተቆራረጡ የድምፅና የፎቶ ማስረጃዎችን በመስራት የሌሎችን ስም ለማጥፋት መሞከር።',
      'በፈጣሪዎች፣ በነጋዴዎች ወይም በትምህርት ሰዎች ላይ የተቀናጀ የስም ማጥፋት ዘመቻ መክፈት።',
      'የሌሎችን ሃሳብ ለማፈን ሆን ብሎ የውሸት አቤቱታ ለሽማግሌዎች ወይም ለፖሊስ ማቅረብ።'
    ],
    internationalLawBasis: 'UN International Covenant on Civil and Political Rights (ICCPR Art. 17: Protection from unlawful attacks on honour and reputation); African Charter on Human and Peoples\' Rights Art. 5.',
    penaltiesAndConsequences: [
      'Mandatory broadcast of an official public retraction and apology across all 7 chambers.',
      'Freeze on withdrawal permissions until civil compensation claims (up to 250,000 ETB / $5,000 USD) are resolved.',
      'Suspension of speaker and microphone privileges for a minimum of 30 to 90 calendar days.',
      'Delivery of notarized cryptographic transcripts to claimant’s legal counsel for civil tort proceedings.'
    ],
    amharicPenaltiesAndConsequences: [
      'በሁሉም 7 ክፍሎች ውስጥ ይፋዊ ይቅርታ እና የሀሰት መረጃውን የማስተባበያ መልዕክት በግዴታ እንዲያስተላልፍ መደረግ።',
      'የካሳ ክፍያ (እስከ 250,000 የኢትዮጵያ ብር) በፍርድ ቤት እስኪወሰን ድረስ ከዋሌት ገንዘብ እንዳያወጣ ማገድ።',
      'ከ30 እስከ 90 ቀናት ድረስ በማይክራፎን እንዳይናገር እና በውይይት እንዳይሳተፍ ማገድ።',
      'የተናገረውን ሙሉ የድምፅና የፅሁፍ ማስረጃ ለተጎጂው ጠበቃ በፍርድ ቤት ክስ እንዲመሰርት አሳልፎ መስጠት።'
    ],
    investigationMethod: 'Verifiable audit ledger of spoken acoustic streams, real-time speech-to-text transcripts, and immutable timestamp logs.',
    amharicInvestigationMethod: 'የተቀረፁ ኦሪጅናል የድምፅ ሰነዶች፣ የተተረጎሙ ፅሁፎች እና የማይደለዝ የሰዓት ማህተም ኦዲት።'
  },
  {
    id: 'viol-3-intimidation-threats',
    severityLevel: 4,
    category: 'intimidation',
    title: 'Direct Intimidation, Extortion, Threats of Bodily Harm & Cyber-Terrorism',
    amharicTitle: 'ተሳታፊዎችን ማስፈራራት፣ የግድያ ወይም የአካል ጉዳት ዛቻ መሰንዘር፣ ማስገደድ እና ማሸበር በከባድ ዓለም አቀፍ ወንጀል ያስቀጣል',
    description: 'Any threat against the physical safety, life, family members, or residence of a platform participant triggers immediate emergency protocols and referral to the International Criminal Police Organization (Interpol).',
    amharicDescription: 'ማንኛውንም ተሳታፊ ወይም ቤተሰቡን በአካል ለመጉዳት፣ ለመግደል፣ ንብረቱን ለማውደም ወይም ለማስፈራራት መሞከር፤ እንዲሁም አድራሻውን በማውጣት (Doxxing) ህይወቱን አደጋ ላይ መጣል እንደ ከባድ ሽብርተኝነት እና ዓለም አቀፍ ወንጀል ይቆጠራል።',
    prohibitedActions: [
      'Expressing verbal or textual threats of homicide, physical violence, arson, or abduction.',
      'Doxxing private residential addresses, school locations of children, or family phone numbers to terrorize delegates.',
      'Extorting financial ransoms or loans under threat of exposure, physical assault, or digital sabotage.',
      'Organizing digital militias or violent extremist mobs to intimidate witnesses in judicial chambers.'
    ],
    amharicProhibitedActions: [
      'እገድልሃለሁ፣ አጠፋሃለሁ፣ እደበድብሃለሁ የሚል የዛቻ እና የማስፈራራት ቃል መናገር ወይም መፃፍ።',
      'የግለሰቡን ወይም የልጆቹን የመኖሪያ አድራሻ፣ ትምህርት ቤት ወይም ስልክ በማውጣት ማስፈራራት።',
      'ገንዘብ ካልሰጠኸኝ ወይም ካላበደርከኝ ጉዳት አደርስብሃለሁ በማለት መማለጃ ወይም ጉቦ መጠየቅ።',
      'በሽምግልና እና በፍትህ ክፍሎች ምስክሮችን ለማስፈራራት የተደራጀ ቡድን ማሰማራት።'
    ],
    internationalLawBasis: 'UN Convention Against Transnational Organized Crime; International Criminal Court (ICC) Jurisprudence; Budapest Cybercrime Convention Art. 9; Domestic Criminal Codes (Terroristic Threats & Extortion).',
    penaltiesAndConsequences: [
      'Immediate unilateral termination of platform citizenship with zero right of appeal.',
      'Permanent lock-out with emergency preservation of IP packet streams, hardware MAC identifiers, and voice biometrics.',
      'Direct dispatch of emergency criminal alert to Interpol Threat Response Center and local Federal Police Command.',
      'Full asset freeze and civil damages liability for intentional infliction of emotional distress.'
    ],
    amharicPenaltiesAndConsequences: [
      'የመተግበሪያውን ዜግነት ያለምንም ይግባኝ ወዲያውኑ በቋሚነት ማሰናበት።',
      'የተጠቃሚውን የኢንተርኔት አድራሻ (IP)፣ የስልክ መለያ ኮድ እና የድምፅ ፎረንሲክስ ለደህንነት አካላት መስጠት።',
      'ለኢንተርፖል ዓለም አቀፍ ፖሊስ እና ለሀገር ውስጥ ፌዴራል ፖሊስ አስቸኳይ የወንጀል ክስ መክፈት።',
      'የንብረት እና የገንዘብ እገዳ መጣል እንዲሁም ለደረሰ የስነ-ልቦና ጉዳት በከፍተኛ ካሳ መጠየቅ።'
    ],
    investigationMethod: 'Emergency Threat Escalation Protocol (ETEP), voice frequency stress analysis, and geo-location triangular tracing.',
    amharicInvestigationMethod: 'አስቸኳይ የደህንነት ማስጠንቀቂያ ስርዓት፣ የድምፅ ፍሪኩዌንሲ ምርመራ እና የቦታ መገኛ ጂኦ-ትሬሲንግ።'
  },
  {
    id: 'viol-4-abusive-language-harassment',
    severityLevel: 1,
    category: 'abusive_language',
    title: 'Profanity, Verbal Degradation, Vulgar Abuse & Sustained Harassment',
    amharicTitle: 'መሳደብ፣ ጸያፍ ቃላት መጠቀም፣ ክብረ-ንፅህናን የሚነኩ ስድቦች እና ተከታታይ ትንኮሳ በጥብቅ የተከለከለ ነው',
    description: 'Civic assemblies require dignity and sacred acoustic hygiene. Vulgar slurs, sexual harassment, demeaning epithets, and persistent badgering will not be tolerated in any chamber.',
    amharicDescription: 'በዚህ ድህረገፅ እና መተግበሪያ ውስጥ ሰዎችን መሳደብ፣ የስድብ ቃላትን ማዝነብ፣ ፆታዊ ትንኮሳ ማድረግ፣ እና ሰዎችን የሚያሳንሱ ቃላትን መጠቀም በጥብቅ የተከለከለ ነው። ማንኛውም ንግግር በጨዋነትና በስነምግባር መመራት አለበት።',
    prohibitedActions: [
      'Hurling explicit curses, anatomical insults, or sexually humiliating comments over open audio channels.',
      'Persistent unwanted messaging, stalking, or harassing individuals who have requested disengagement.',
      'Disrupting spiritual prayers, matrimonial blessings in Chamber 5, or solemn elder arbitrations with profanities.',
      'Targeting mothers, children, vulnerable elders, or persons with disabilities with demeaning ridicule.'
    ],
    amharicProhibitedActions: [
      'ክፉ እና ጸያፍ የስድብ ቃላትን በድምፅ ወይም በፅሁፍ መናገር።',
      'ሴቶችን እና ወጣቶችን በፆታዊ ቃላት ማዋረድ ወይም ያልተገባ የትንኮሳ መልዕክት መላክ።',
      'በክፍል 5 በሰርግ ስነ-ስርዓት ወይም በክፍል 7 በሽማግሌዎች ምርቃት ወቅት በስድብ መረበሽ።',
      'እናቶችን፣ ህፃናትን፣ አረጋውያንን ወይም የአካል ጉዳተኞችን ማሾፍ እና ማዋረድ።'
    ],
    internationalLawBasis: 'Universal Declaration of Human Rights (UDHR Art. 12: Protection of Honour); UNESCO Guidelines for Safeguarding Freedom of Expression while Protecting Civil Decorum.',
    penaltiesAndConsequences: [
      'Level 1: Automated instant audio kill-switch and 24-hour mute duration.',
      'Level 2 (Repeat): 14-day total exile to the probationary listener-only penance status.',
      'Level 3 (Habitual): Revocation of speaking license for 1 full sovereign quarter (90 days) + civic re-education test.',
      'Public recording of disciplinary demerit points on citizen’s public profile card.'
    ],
    amharicPenaltiesAndConsequences: [
      'ደረጃ 1፡ ማይክራፎን ወዲያውኑ በሲስተም መዘጋት እና ለ24 ሰዓታት እንዳይናገር መታገድ።',
      'ደረጃ 2 (ሲደገም)፡ ለ14 ቀናት ድምፅ እንዳይሰማ እና ማዳመጥ ብቻ ወደሚችልበት የቅጣት ደረጃ መውረድ።',
      'ደረጃ 3 (ከተደጋገመ)፡ ለ3 ወራት (90 ቀናት) የመናገር መብት መሰረዝ እና የስነምግባር ፈተና መውሰድ።',
      'በግለሰቡ ይፋዊ ፕሮፋይል ላይ የስነምግባር ጥሰት ጥቁር ነጥብ መመዝገብ።'
    ],
    investigationMethod: 'Real-time NLP profanity filtering, acoustic cadence decibel anomaly alerts, and verified elder moderation reports.',
    amharicInvestigationMethod: 'አውቶሜትድ የስድብ ቃላት ማጣሪያ፣ የድምፅ ውጥረት መቆጣጠሪያ እና የሽማግሌዎች የቁጥጥር ሪፖርት።'
  },
  {
    id: 'viol-5-racism-tribalism-division',
    severityLevel: 4,
    category: 'racism_tribalism',
    title: 'Racism, Tribal Supremacy, Ethnic Incitement & Sectarian Division',
    amharicTitle: 'ዘረኝነት፣ የጎሳ የበላይነት፣ ብሄር ተኮር ግጭት መቀስቀስ እና ህዝብን መከፋፈል በዓለም አቀፍ የወንጀል ፍርድ ቤት (ICC) የሚያስጠይቅ ጥፋት ነው',
    description: 'Zebene’s World was created to obliterate tribal walls. Weaponizing ethnicity, preaching tribal supremacy, inciting ethnic cleansing, or promoting racial contempt is treated as an atrocity crime of universal jurisdiction.',
    amharicDescription: 'ይህ ድህረገፅ የተመሰረተው የዘርና የጎሳ ግንቦችን ለማፍረስ እና ፍቅርን ለማንገስ ነው። ዘረኝነትን ማራመድ፣ የኔ ብሄር ከሌላው ይበልጣል ማለት፣ በብሄሮች መካከል ጥላቻና ጦርነት መቀስቀስ፣ ወይም አንዱን ጎሳ ማዋረድ እንደ ዓለም አቀፍ የሰው ልጆች ወንጀል ተቆጥሮ በከፍተኛ የወንጀል ህግ ያስቀጣል።',
    prohibitedActions: [
      'Propagating doctrines of racial or ethnic purity, genetic supremacy, or innate cultural inferiority.',
      'Inciting inter-ethnic skirmishes, historical tribal revenge, or territorial evictions across dialogue chambers.',
      'Using dehumanizing ethnic slurs, animalistic metaphors, or hate symbols against any linguistic or cultural nationality.',
      'Forming ethnic blocs to hijack assembly votes or disenfranchise fellow human beings based on birthplace.'
    ],
    amharicProhibitedActions: [
      'የኔ ዘር ወይም ብሄር ከሌላው ይበልጣል በሚል የትምክህት ወይም የጥላቻ ንግግር ማድረግ።',
      'በብሄሮች መካከል ጥልና ጦርነት እንዲነሳ መቀስቀስ ወይም የድሮ ቁስሎችን እየጫሩ ህዝብን ማጋጨት።',
      'ብሄርን ወይም ህዝብን የሚያንቋሽሹ የስድብ ቃላትን እና ምልክቶችን መጠቀም።',
      'በክፍሎች ውስጥ በብሄር ተቧድኖ ሌሎችን ለማግለል ወይም የራስን ቡድን የበላይ ለማድረግ መሞከር።'
    ],
    internationalLawBasis: 'UN International Convention on the Elimination of All Forms of Racial Discrimination (ICERD); Rome Statute of the International Criminal Court (ICC Art. 7: Persecution on ethnic grounds as Crime Against Humanity); ICCPR Art. 20(2).',
    penaltiesAndConsequences: [
      'Immediate unilateral, permanent, unappealable expulsion from Zebene’s World for life.',
      'Irreversible cryptographic identity burning: the offender’s biometric hash is marked as "Hostis Humani Generis" (Enemy of Humankind).',
      'Complete forfeiture of all accumulated wealth, talent rewards, and civic stakes to the Sovereign Orphan Fund.',
      'Immediate referral of hate incitement forensic dossiers to the UN Human Rights Committee, Special Rapporteur on Minority Rights, and domestic criminal prosecutors.'
    ],
    amharicPenaltiesAndConsequences: [
      'ያለምንም ይግባኝ በህይወት ዘመን ሙሉ ከዘበነ ዓለም በቋሚነት መባረር።',
      'የግለሰቡ የፊት ባዮሜትሪክ እና ማንነት "የሰው ልጆች የሰላም ጠላት" ተብሎ በዓለም አቀፍ መዝገብ መታገድ።',
      'በዋሌቱ ውስጥ ያለ ማንኛውም የተሰበሰበ ገንዘብ ወይም ሽልማት ሙሉ ለሙሉ ለየቲም ልጆች ድጋፍ ፈንድ ገቢ መደረግ።',
      'የጥላቻና የዘረኝነት ንግግሩ ማስረጃ ለተባበሩት መንግስታት የሰብአዊ መብቶች ኮሚቴ እና ለሀገር ውስጥ አቃቤ ህግ ተላልፎ መሰጠት።'
    ],
    investigationMethod: 'Semantic cross-lingual hate speech embeddings, ethnic incitement trigger lexicons, and 7-Elder Unanimous Tribunal Review.',
    amharicInvestigationMethod: 'የጥላቻና ዘረኝነት ቃላት አውቶሜትድ መርማሪ ስርዓት እና የ7ቱ የበላይ ሽማግሌዎች የጋራ ውሳኔ ጉባኤ።'
  },
  {
    id: 'viol-6-factional-selfish-gain',
    severityLevel: 3,
    category: 'factional_selfish_gain',
    title: 'Factional Domination, Cartel Manipulation, Illicit Selfish Gain & Abusive Actions',
    amharicTitle: 'ለተለየ ቡድን ጥቅም ወይም ለግል ጥቅም ብቻ አላስፈላጊ የቃላትም ይሁን የድርጊት አካሄድ ለመተግበር መሞከር በህግ ያስቀጣል',
    description: 'Subverting the community interest for illicit cartel enrichment, hijacking loans, cornering talent prize allocations, or rigging democratic chamber deliberations for private clique advancement constitutes aggravated corruption and unfair trade abuse.',
    amharicDescription: 'የዚህን መድረክ ዓላማ ወደ ጎን በመተው ለተለየ ቡድን፣ ለቡችላዎች ወይም ለግል ጥቅም ብቻ በማዋል አላስፈላጊ የቃላትም ይሁን የድርጊት አካሄድ መተግበር፤ የብድርና የበጎ አድራጎት ገንዘብን ለራስ ጥቅም ማዋል፤ ወይም ውሳኔዎችን ለጥቅመኞች ቡድን ማስገዛት በከባድ የሙስና እና ማጭበርበር ህግ ያስቀጣል።',
    prohibitedActions: [
      'Conspiring as an organized clique to monopolize micro-loan disbursements or default systematically on platform credit.',
      'Rigging talent competitions and fortune wheel draws through kickbacks, bribery, or voting cartels.',
      'Misappropriating humanitarian charity intended for orphans to bankroll personal projects or private businesses.',
      'Using aggressive, abusive lobbying or blackmail to steer chamber elders toward decisions favoring special interest cartels.'
    ],
    amharicProhibitedActions: [
      'በቡድን ተደራጅቶ ከወለድ ነፃ የተሰጠውን የህብረተሰብ ብድር ለግል ጥቅም መውሰድና ባለመክፈል የጋራ ሀብትን መበዝበዝ።',
      'በተሰጥኦ ውድድሮች እና በሽልማት ላይ በጉቦ ወይም በሙስና አሸናፊዎችን ለመቀየር መሞከር።',
      'ለየቲሞችና ለአቅመ-ደካሞች የተሰበሰበውን የበጎ አድራጎት ገንዘብ ለግል ኪስ ወይም ለቡድን ጥቅም ማዋል ወይም ማባከን።',
      'የሽማግሌዎችን ውሳኔ በጉቦ፣ በዛቻ ወይም ባልተገባ ጫና ለተለየ ወገን ወይም ለግል ጥቅም እንዲያደላ ለማድረግ መሞከር።'
    ],
    internationalLawBasis: 'UN Convention Against Corruption (UNCAC); FATF Standards on Financial Intermediary Collusion; World Bank Guidelines on Preventing Fraud and Corruption.',
    penaltiesAndConsequences: [
      'Immediate dissolution and permanent blacklisting of the offending cartel, group, or syndicate.',
      'Mandatory restitution of all diverted capital, prizes, or micro-loan funds with 100% punitive penalty surcharges.',
      'Freezing of personal bank accounts (CBE / Telebirr settlement rails) linked to platform identification.',
      'Forwarding of audited forensic balance sheets to national financial intelligence agencies and judicial enforcement.'
    ],
    amharicPenaltiesAndConsequences: [
      'የተደራጀውን ቡድን ወይም ቡድንተኞችን ወዲያውኑ መበተን እና በቋሚነት ማገድ።',
      'ለግል ጥቅም የዋለውን ማንኛውንም ገንዘብ ወይም ንብረት ሙሉ ለሙሉ ከመቶ በመቶ ቅጣት ጋር ማስመለስ።',
      'ከመተግበሪያው ጋር የተሳሰሩ የኢትዮጵያ ንግድ ባንክ እና የቴሌብር ሂሳቦች እንዲታገዱ ለባንኮች ማሳወቅ።',
      'የፋይናንስ ኦዲት መረጃዎችን ለሀገር ውስጥ የፋይናንስ ደህንነት አገልግሎት (FIC) እና ፍርድ ቤቶች መላክ።'
    ],
    investigationMethod: 'Graph network entity relationship mapping, illicit ledger transaction clustering, and multi-signature elder escrow audit.',
    amharicInvestigationMethod: 'የፋይናንስ ዝውውር መረብ ኦዲት፣ የቡድን ግንኙነት ፎረንሲክስ እና የሽማግሌዎች የጋራ የገንዘብ ቁጥጥር።'
  }
];

export const FOUR_TIER_PENALTY_MATRIX = [
  {
    tierLevel: 1,
    tierName: 'ደረጃ 1 - የመጀመሪያ ደረጃ ጥፋት (Minor Infraction)',
    englishName: 'Level 1: Minor Breach & Warning',
    scopeAmharic: 'ቀለል ያሉ የስድብ ቃላት፣ የንግግር ስነ-ስርዓት ማዛባት፣ የሌሎችን ድምፅ ማቋረጥ',
    scopeEnglish: 'Incidental profanity, minor chamber disturbance, interrupting delegates.',
    actionAmharic: 'የ24 ሰዓት የድምፅ እገዳ፣ ይፋዊ ማስጠንቀቂያ እና የስነምግባር ማስታወሻ።',
    actionEnglish: '24-hour audio mute, automated official warning, and behavioral strike logged.'
  },
  {
    tierLevel: 2,
    tierName: 'ደረጃ 2 - መካከለኛ ደረጃ ጥፋት (Moderate Violation)',
    englishName: 'Level 2: Serious Misconduct & Slander',
    scopeAmharic: 'የስም ማጥፋት፣ ተደጋጋሚ ስድብ፣ በሌሎች ላይ የሀሰት ወሬ ማውራት፣ ፆታዊ ትንኮሳ',
    scopeEnglish: 'Defamation, character assassination, sexual harassment, deliberate disturbance.',
    actionAmharic: 'ከ14 እስከ 30 ቀናት ከመድረክ ማገድ፣ ይፋዊ ይቅርታ በግዴታ ማስጠየቅ እና የካሳ ቅጣት።',
    actionEnglish: '14 to 30 days chamber ban, mandatory public apology, and civil compensation deduction.'
  },
  {
    tierLevel: 3,
    tierName: 'ደረጃ 3 - ከባድ ወንጀልና ማጭበርበር (Severe Crime & Fraud)',
    englishName: 'Level 3: Aggravated Fraud & Cartels',
    scopeAmharic: 'የፌክ አካውንቶች፣ የገንዘብ ማጭበርበር፣ ለቡድንና ለግል ጥቅም የህዝብን ሀብት መዝረፍ',
    scopeEnglish: 'Multiple fake accounts, bot manipulation, micro-loan fraud, corrupt factional takeover.',
    actionAmharic: 'አካውንቶችን ሙሉ ለሙሉ ማጥፋት፣ የዋሌት ገንዘብን መውረስ፣ በቋሚነት ማሰናበት እና የሲቪል ክስ መመስረት።',
    actionEnglish: 'Cryptographic account deletion, wallet freeze/forfeiture, permanent blacklist, and civil litigation.'
  },
  {
    tierLevel: 4,
    tierName: 'ደረጃ 4 - ከፍተኛ ዓለም አቀፍ ወንጀል (High International Crime)',
    englishName: 'Level 4: Universal Jurisdiction Atrocity Crime',
    scopeAmharic: 'ዘረኝነት፣ የጥላቻና የጦርነት ቅስቀሳ፣ የግድያና የአካል ጉዳት ማስፈራራት፣ ሽብርተኝነት',
    scopeEnglish: 'Racism, ethnic supremacy, incitement to genocide, terroristic threats, extortion of life.',
    actionAmharic: 'ያለምንም ይግባኝ በህይወት ዘመን ማባረር፣ መረጃውን ለኢንተርፖል እና ለሀገር ውስጥ ፌዴራል ፖሊስ አሳልፎ መስጠት።',
    actionEnglish: 'Lifetime irrevocable expulsion, immediate referral to Interpol Cybercrime Directorate and Federal Police with full forensic evidence.'
  }
];
