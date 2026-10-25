// Comprehensive Synchronized Translations for Zebene's World (ዘበነ የመሰረተው አለም)
// When a language is selected, ALL UI text, buttons, and prompts throughout the platform switch instantly!

export interface TranslationDictionary {
  masterDashboard: string;
  subMasterDashboard: string;
  cleanScreenNotice: string;
  openDashboard: string;
  closeDashboard: string;
  signIn: string;
  signOut: string;
  phoneNumber: string;
  password: string;
  fullName: string;
  gender: string;
  male: string;
  female: string;
  otherGender: string;
  age: string;
  address: string;
  nationality: string;
  photoUpload: string;
  founderName: string;
  foundingDate: string;
  grandAssembly: string;
  universalCongress: string;

  // 10 Numbered Dashboard Modules
  mod1Title: string;
  mod1Desc: string;
  mod2Title: string;
  mod2Desc: string;
  mod3Title: string;
  mod3Desc: string;
  mod4Title: string;
  mod4Desc: string;
  mod5Title: string;
  mod5Desc: string;
  mod6Title: string;
  mod6Desc: string;
  mod7Title: string;
  mod7Desc: string;
  mod8Title: string;
  mod8Desc: string;
  mod9Title: string;
  mod9Desc: string;
  mod10Title: string;
  mod10Desc: string;

  // Chambers
  chamber1Name: string;
  chamber2Name: string;
  chamber3Name: string;
  chamber4Name: string;
  chamber5Name: string;
  chamber6Name: string;
  chamber7Name: string;

  // Wedding & Hague
  groom: string;
  bride: string;
  bestMan: string;
  maidOfHonor: string;
  elders: string;
  witnesses: string;
  attendees: string;
  addMoreAttendees: string;
  hagueApostille: string;
  signContract: string;

  // Equb & Financial
  equbTitle: string;
  equbCycle: string;
  drawLottery: string;
  bankingTitle: string;
  cbeBank: string;
  telebirr: string;

  // Live Actions
  speakButton: string;
  listenButton: string;
  likeAction: string;
  shareAction: string;
  commentAction: string;
}

export const TRANSLATIONS: Record<string, TranslationDictionary> = {
  am: {
    masterDashboard: 'ዋና የሉዓላዊ ጉባኤ ዳሽቦርድ',
    subMasterDashboard: 'ሁሉንም አገልግሎቶች በቅደም ተከተል የያዘ ማዕከላዊ መቆጣጠሪያ',
    cleanScreenNotice: 'ንፁህ፣ ፈጣን እና እጅግ ዘመናዊ አለም አቀፍ የዲፕሎማሲ አዳራሽ',
    openDashboard: '🎛️ ዋና ዳሽቦርድ ክፈት (Open Dashboard)',
    closeDashboard: 'ዳሽቦርድ ዝጋ (Close)',
    signIn: 'ግባ / ተመዝገብ (Sign In)',
    signOut: 'ከአካውንት ውጣ (Sign Out)',
    phoneNumber: 'ስልክ ቁጥር',
    password: 'ሚስጥር ቁጥር (PIN/Password)',
    fullName: 'ሙሉ ስም',
    gender: 'ፆታ',
    male: 'ወንድ',
    female: 'ሴት',
    otherGender: 'ሌላ',
    age: 'እድሜ',
    address: 'አድራሻ / ከተማ',
    nationality: 'ዜግነት',
    photoUpload: 'የራስ ፎቶ ይጫኑ',
    founderName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye)',
    foundingDate: 'ጥር 2 ቀን 2018 ዓ.ም. (January 10, 2026)',
    grandAssembly: 'ዘበነ የመሰረተው አለም • የሉዓላዊ ህዝቦች ጠቅላላ ጉባኤ',
    universalCongress: '170+ ሀገራት የተሳተፉበት የቀጥታ የድምፅና ምስል ትርጓሜ መድረክ',

    mod1Title: '፩. 1. የ 7ቱ ሉዓላዊ አዳራሾች ምዝገባና ምርጫ',
    mod1Desc: 'እያንዳንዱ ቤት በራሱ መስፈርት መመዝገቢያና ማረጋገጫ ያለው',
    mod2Title: '፪. 2. የቀጥታ ቪዲዮና ድምፅ አዳራሾች',
    mod2Desc: 'የቀጥታ HD ቪዲዮ፣ የወንበር ቁጥሮች እና የመድረክ ንግግሮች',
    mod3Title: '፫. 3. የሰርግ ቤትና አለም አቀፍ የጋብቻ ውል',
    mod3Desc: 'ያልተገደቡ አጃቢዎችና ሽማግሌዎች፣ የ Hague Apostille ህጋዊ ሰነድና ፎቶ',
    mod4Title: '፬. 4. ዘመናዊና ባህላዊ ጨዋታዎች እና ሎተሪ',
    mod4Desc: 'የገበጣ ውድድር፣ የጥበብ ጥያቄዎች እና የቀንና ወርሃዊ ሎተሪ እጣ',
    mod5Title: '፭. 5. አለም አቀፍ እቁብና የእጣ አወጣጥ',
    mod5Desc: 'በአለም አቀፍ የፋይናንስ ህግ የሚዳኝ ግልፅና ፍትሃዊ እቁብ',
    mod6Title: '፮. 6. አለም አቀፍ ሰብአዊና ልማት ድጋፍ',
    mod6Desc: 'የየቲሞች፣ የአደጋ ጊዜና የገጠር ልማት የህዝብ መረዳጃ ፈንድ',
    mod7Title: '፯. 7. የቀጥታ የድምፅ ትርጓሜና የገጽ ቋንቋ መቀየሪያ',
    mod7Desc: 'በቅጽበት የሚተረጉም ገደብ የለሽ ድምፅና ሙሉ የገጽ ፅሁፍ መቀየሪያ',
    mod8Title: '፰. 8. የፋይናንስ፣ የባንክና የገቢ ማገናኛ',
    mod8Desc: 'የኢትዮጵያ ንግድ ባንክ (CBE)፣ ቴሌብር እና የገንቢው የገቢ ካዝና',
    mod9Title: '፱. 9. መመሪያ፣ ህግና የተመሰረተበት ታሪክ',
    mod9Desc: 'ጥር 2/2018 ዓ.ም. ክቡር ዘበነ አስፍዬ የመሰረቱት ይፋዊ ቻርተርና ህግጋት',
    mod10Title: '፲. 10. ማህበራዊ መስተጋብር (ሼር፣ ላይክና ኮሜንት)',
    mod10Desc: 'የቀጥታ አስተያየት መስጫ፣ ማበረታቻ እና ማህበራዊ ግብዣዎች',

    chamber1Name: 'የሁሉም የጋራ ቤት (House of All Nations)',
    chamber2Name: 'የስጋ ዘመድ ቤት (Kinship & Lineage)',
    chamber3Name: 'የባለስልጣናት ቤት (Statesmanship)',
    chamber4Name: 'የሚስጥር ቤት (Sanctuary of Secrets)',
    chamber5Name: 'የሰርግ ቤት (Nuptial Cathedral)',
    chamber6Name: 'የእምነት ቤት (House of Faith)',
    chamber7Name: 'የሰላም ማስከበር (Peacekeeping)',

    groom: 'ሙሽራው',
    bride: 'ሙሽሪት',
    bestMan: 'ዋና ሚዜ',
    maidOfHonor: 'የሙሽሪት ሚዜ',
    elders: 'አጋቢ ሽማግሌዎች',
    witnesses: 'ህጋዊ ምስክሮች',
    attendees: 'አጃቢዎችና ታዳሚዎች',
    addMoreAttendees: '+ ተጨማሪ አጃቢ/ሽማግሌ ጨምር (Add Unlimited)',
    hagueApostille: 'The Hague Apostille Convention 1961 ማረጋገጫ',
    signContract: 'ውሉን በይፋ ፈርም',

    equbTitle: 'አለም አቀፍ የሉዓላዊ እቁብ (Universal Equb)',
    equbCycle: 'የእቁብ ዙር (ሳምንታዊ / ወርሃዊ)',
    drawLottery: 'እጣ አውጣ (Transparent Draw)',
    bankingTitle: 'የባንክና የክፍያ ስርአት (Banking Rails)',
    cbeBank: 'የኢትዮጵያ ንግድ ባንክ (CBE)',
    telebirr: 'ቴሌብር (Telebirr)',

    speakButton: 'ለመናገር ተጫን (Speak)',
    listenButton: 'ለመስማት ተጫን • ገደብ የለሽ (Listen Live)',
    likeAction: 'ላይክና ድጋፍ (Like)',
    shareAction: 'ለአለም አጋራ (Share)',
    commentAction: 'አስተያየት ፃፍ (Live Comment)',
  },

  en: {
    masterDashboard: 'Master Sovereign Assembly Dashboard',
    subMasterDashboard: 'Centralized Sequential Controller for All Global Services',
    cleanScreenNotice: 'Pristine, Ultra-Fast and Elite International Diplomatic Assembly',
    openDashboard: '🎛️ Open Master Dashboard',
    closeDashboard: 'Close Dashboard',
    signIn: 'Sign In / Register',
    signOut: 'Sign Out',
    phoneNumber: 'Phone Number',
    password: 'PIN / Passcode',
    fullName: 'Full Name',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    otherGender: 'Other',
    age: 'Age',
    address: 'Address / City',
    nationality: 'Nationality',
    photoUpload: 'Upload Profile Photo',
    founderName: 'H.E. Zebene Asfeye (Founder & Convener)',
    foundingDate: 'January 10, 2026 (ጥር 2/2018 ዓ.ም.)',
    grandAssembly: "Zebene's World • Universal Sovereign Diplomatic Assembly",
    universalCongress: '170+ Nations Live Multilingual Dialogue & Video Congress',

    mod1Title: '1. Chambers Registration & Specific Criteria Selector',
    mod1Desc: 'Each sovereign house with specialized role-based accreditation',
    mod2Title: '2. Live Video & Audio Assembly Floors',
    mod2Desc: 'Live HD video stage, numbered seats, and real-time floor speeches',
    mod3Title: '3. Nuptial Cathedral & Hague Marriage Contract',
    mod3Desc: 'Unlimited attendants & elders, Hague Apostille legal treaty, and photos',
    mod4Title: '4. Modern & Cultural Competitive Games & Lottery',
    mod4Desc: 'Mancala/Gebeta, wisdom challenges, and daily fortune lotteries',
    mod5Title: '5. International Equb (Rotating Savings & Credit)',
    mod5Desc: 'Governed under international cooperative finance with transparent draws',
    mod6Title: '6. Global Humanitarian Solidarity & Relief Fund',
    mod6Desc: 'Crowdfunded aid for orphans, drought emergency, and rural development',
    mod7Title: '7. Instant Voice Interpretation & Full-Page Translation',
    mod7Desc: 'Continuous live audio interpretation and synchronized UI translation',
    mod8Title: '8. Financial Rails, Banking & Developer Treasury',
    mod8Desc: 'Commercial Bank of Ethiopia (CBE), Telebirr, and developer reserves',
    mod9Title: '9. Operational Directives, Founding Charter & Laws',
    mod9Desc: 'Founded January 10, 2026 by Zebene Asfeye under UN UDHR & Budapest ETS 185',
    mod10Title: '10. Community Interaction (Share, Like & Live Comments)',
    mod10Desc: 'Real-time comment stream, rewards, and multi-channel invitations',

    chamber1Name: 'House of All Nations (ጠቅላላ ጉባኤ)',
    chamber2Name: 'Kinship & Lineage (የስጋ ዘመድ ቤት)',
    chamber3Name: 'Statesmanship (የባለስልጣናት ቤት)',
    chamber4Name: 'Sanctuary of Secrets (የሚስጥር ቤት)',
    chamber5Name: 'Nuptial Cathedral (የሰርግ ቤት)',
    chamber6Name: 'House of Faith (የእምነት ቤት)',
    chamber7Name: 'Peacekeeping (የሰላም ማስከበር)',

    groom: 'Groom (ሙሽራው)',
    bride: 'Bride (ሙሽሪት)',
    bestMan: 'Best Man',
    maidOfHonor: 'Maid of Honor',
    elders: 'Presiding Nuptial Elders',
    witnesses: 'Legal Witnesses',
    attendees: 'Attendants & Guests',
    addMoreAttendees: '+ Add More Attendants / Elders (Unlimited)',
    hagueApostille: 'The Hague Apostille Convention 1961 Certification',
    signContract: 'Solemnize & Sign Legally',

    equbTitle: 'International Sovereign Equb (ROSCA)',
    equbCycle: 'Cycle (Weekly / Monthly)',
    drawLottery: 'Execute Transparent Draw',
    bankingTitle: 'Banking & Financial Rails',
    cbeBank: 'Commercial Bank of Ethiopia (CBE)',
    telebirr: 'Telebirr Priority Rail',

    speakButton: 'Press to Speak (ማይክ ክፈት)',
    listenButton: 'Press to Listen • Unlimited Live Stream',
    likeAction: 'Like & Support',
    shareAction: 'Share with the World',
    commentAction: 'Post Live Comment',
  },

  om: {
    masterDashboard: 'Daashboordii Ol’aanaa Gamtaa Sabootaa',
    subMasterDashboard: 'Tajaajiloota hunda tartiibaan to’achuuf kan qophaa’e',
    cleanScreenNotice: 'Galma dippilomaasii addunyaa qulqulluu fi saffisaa',
    openDashboard: '🎛️ Daashboordii Bani',
    closeDashboard: 'Cufi',
    signIn: 'Seeni / Galmaa’i',
    signOut: 'Ba’i (Sign Out)',
    phoneNumber: 'Lakkoofsa Bilbilaa',
    password: 'Jecha Iccitii (PIN)',
    fullName: 'Maqaa Guutuu',
    gender: 'Kornyaa',
    male: 'Dhiira',
    female: 'Dhalaa',
    otherGender: 'Kan biroo',
    age: 'Umrii',
    address: 'Teessoo / Magaalaa',
    nationality: 'Lammummaa',
    photoUpload: 'Suuraa Keessan Olkaasaa',
    founderName: 'Kabajamaa Zabbana Asfaayee (Zebene Asfeye)',
    foundingDate: 'Amajjii 10, 2026',
    grandAssembly: 'Addunyaa Zabbanaa • Gamtaa Birmadummaa Addunyaa',
    universalCongress: 'Biyyoottan 170+ sagaleen battalumatti kan hiikamu',

    mod1Title: '1. Galmee fi Filannoo Galmawwan 7n',
    mod1Desc: 'Manneen hundi ulaagaa galmee of danda’e qabu',
    mod2Title: '2. Galmawwan Viidiyoo fi Sagalee Kallattii',
    mod2Desc: 'Viidiyoo HD, teessoowwan lakkofsaa fi haasawa waltajjii',
    mod3Title: '3. Galma Cidhaa fi Waliigaltee Fuudhaa Addunyaa',
    mod3Desc: 'Hordoftoota daangaa hin qabne, ragaa Hague Apostille fi suuraawwan',
    mod4Title: '4. Taphoota Aadaa, Ammayyaa fi Lootarii',
    mod4Desc: 'Taphawwan dandeettii fi lootarii guyyaa fi ji’aa',
    mod5Title: '5. Iqubii Addunyaa fi Carraa Baasuu',
    mod5Desc: 'Seera faayinaansii addunyaan kan geggeeffamu',
    mod6Title: '6. Deeggarsa Namoomaa fi Misooma Addunyaa',
    mod6Desc: 'Gargaarsa daa’imman abbaa hin qabnee fi gargaarsa yeroo balaa',
    mod7Title: '7. Sagalee fi Fuula Guutuu Battalatti Hiikuu',
    mod7Desc: 'Afaan tokko yoo filatamu barreeffamni hundi gara afaanichaatti jijjiirama',
    mod8Title: '8. Baankii fi Faayinaansii',
    mod8Desc: 'Baankii Daldala Itoophiyaa (CBE) fi Telebirr',
    mod9Title: '9. Qajeelfama, Seera fi Seenaa Hundeeffamaa',
    mod9Desc: 'Amajjii 10, 2026 Zabbana Asfaayeen kan hundeeffame',
    mod10Title: '10. Hawaasummaa (Share, Like fi Yaada)',
    mod10Desc: 'Yaada kallattii kennuu fi affeeruu',

    chamber1Name: 'Galma Hunda (House of All Nations)',
    chamber2Name: 'Galma Firaa fi Qomoo',
    chamber3Name: 'Galma Hayyoota fi Mootummaa',
    chamber4Name: 'Galma Iccitii',
    chamber5Name: 'Galma Cidha Fuudhaa',
    chamber6Name: 'Galma Amantii',
    chamber7Name: 'Eegumsa Nageenyaa',

    groom: 'Misirroo Dhiiraa',
    bride: 'Misirroo Dhalaa',
    bestMan: 'Mizee Dhiiraa',
    maidOfHonor: 'Mizee Dhalaa',
    elders: 'Jaarsolii Cidhaa',
    witnesses: 'Dhugaa Baatoota',
    attendees: 'Keessummoota',
    addMoreAttendees: '+ Dabalataan Galmeessi (Unlimited)',
    hagueApostille: 'Mirkaneessa Hague Apostille 1961',
    signContract: 'Waliigaltee Mallatteessi',

    equbTitle: 'Iqubii Birmadummaa Addunyaa',
    equbCycle: 'Marsi (Torbee / Ji’aan)',
    drawLottery: 'Carraa Baasi',
    bankingTitle: 'Sirna Baankii fi Kaffaltii',
    cbeBank: 'Baankii Daldala Itoophiyaa (CBE)',
    telebirr: 'Telebirr',

    speakButton: 'Dubbachuuf Tuqi (Speak)',
    listenButton: 'Dhaggeeffachuuf Tuqi (Listen)',
    likeAction: 'Jaalladhu (Like)',
    shareAction: 'Qoodi (Share)',
    commentAction: 'Yaada Barreessi',
  },

  ti: {
    masterDashboard: 'ቀንዲ ዳሽቦርድ ልኡላዊ ባይቶ ዓለም',
    subMasterDashboard: 'ንኹሎም ኣገልግሎታት ብተኸታታሊ ዘጠቓለለ መቆጻጸሪ',
    cleanScreenNotice: 'ጽሩይ፣ ቅልጡፍን ዘመናውን ዓለምለኸ ኣዳራሽ ዲፕሎማሲ',
    openDashboard: '🎛️ ዳሽቦርድ ክፈት (Open Dashboard)',
    closeDashboard: 'ዕጾ (Close)',
    signIn: 'እቶ / ተመዝገብ',
    signOut: 'ውጻእ (Sign Out)',
    phoneNumber: 'ቁጽሪ ተሌፎን',
    password: 'ምስጢር ቁጽሪ (PIN)',
    fullName: 'ምሉእ ስም',
    gender: 'ጾታ',
    male: 'ተባዕታይ',
    female: 'ኣንስታይ',
    otherGender: 'ካልእ',
    age: 'ዕድመ',
    address: 'ኣድራሻ / ከተማ',
    nationality: 'ዜግነት',
    photoUpload: 'ናይ ገዛእ ርእስኻ ፎቶ ኣእቱ',
    founderName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye)',
    foundingDate: 'ጥሪ 2/2018 ዓ.ም. (January 10, 2026)',
    grandAssembly: 'ዓለም ዘበነ • ሓባራዊ ባይቶ ልኡላውያን ህዝብታት',
    universalCongress: '170+ ሃገራት ብቐጥታ ድምጺ ዝትርጎመሉ ባይቶ',

    mod1Title: '1. ምዝገባን ምርጫን 7 ኣዳራሻት',
    mod1Desc: 'ነፍሲ ወከፍ ኣዳራሽ ብናይ ገዛእ ርእሱ ረቛሒ ዝምዝገበሉ',
    mod2Title: '2. ናይ ቀጥታ ቪድዮን ድምጽን ኣዳራሻት',
    mod2Desc: 'ናይ ቀጥታ HD ቪድዮ፣ ቁጽሪ መንበርን ናይ መድረኽ መደረን',
    mod3Title: '3. ኣዳራሽ መርዓን ዓለምለኸ ውዕሊ ቃል ኪዳንን',
    mod3Desc: 'ዘይውሱን ሚዜታትን ዓበይቲ ዓድን፣ ውዕሊ Hague Apostilleን ፎቶን',
    mod4Title: '4. ዘመናውን ባህላውን ጸወታታትን ሎተሪን',
    mod4Desc: 'ጸወታ ገበጣ፣ ናይ ጥበብ ሕቶታትን መዓልታዊ ሎተሪን',
    mod5Title: '5. ዓለምለኸ እቁብን ዕጫ ምውጻእን',
    mod5Desc: 'ብዓለምለኸ ናይ ፋይናንስ ሕጊ ዝመሓደር ግሉጽ እቁብ',
    mod6Title: '6. ዓለምለኸ ሰብኣውን ልምዓታውን ሓገዝ',
    mod6Desc: 'ሓገዝ ዘኽታማት፣ ግዜ ሓደጋን ገጠራዊ ልምዓትን',
    mod7Title: '7. ናይ ቀጥታ ድምጺ ትርጉምን ምሉእ ጽሑፍ ምቕያርን',
    mod7Desc: 'ሓደ ቋንቋ እንትምረጽ ምሉእ ጽሑፋት ገጽ ብቕጽበት ይቕየር',
    mod8Title: '8. ስርዓት ባንክን ክፍሊትን',
    mod8Desc: 'ንግዲ ባንኪ ኢትዮጵያ (CBE)፣ ቴሌብርን ካዝና ገንቢን',
    mod9Title: '9. መምርሒ፣ ሕግን ዝተመስረተሉ ታሪኽን',
    mod9Desc: 'ጥሪ 2/2018 ዓ.ም. ብዘበነ አስፍዬ ዝተመስረተ ሕጊ',
    mod10Title: '10. ማሕበራዊ ርክብ (ሼር፣ ላይክን ርእይቶን)',
    mod10Desc: 'ናይ ቀጥታ ርእይቶታት ምሃብን ምዕዳምን',

    chamber1Name: 'ናይ ኩሉ ሓባራዊ ቤት',
    chamber2Name: 'ቤት ስጋ ኣዝማድ',
    chamber3Name: 'ቤት ዲፕሎማሰኛታት',
    chamber4Name: 'ቤት ምስጢር',
    chamber5Name: 'ቤት መርዓ',
    chamber6Name: 'ቤት እምነት',
    chamber7Name: 'ቤት ሓለውቲ ሰላም',

    groom: 'መርዓዊ',
    bride: 'መርዓት',
    bestMan: 'ቀንዲ ሚዜ',
    maidOfHonor: 'ናይ መርዓት ሚዜ',
    elders: 'ኣመራርሓ ሽማግለታት',
    witnesses: 'ሕጋውያን ምስክራት',
    attendees: 'ዕዱማትን ኣሰነይትን',
    addMoreAttendees: '+ ተወሳኺ ኣሰነይቲ/ሽማግለታት ወስኽ',
    hagueApostille: 'ምርግጋጽ Hague Apostille 1961',
    signContract: 'ውዕሊ ፈርም',

    equbTitle: 'ዓለምለኸ ልኡላዊ እቁብ',
    equbCycle: 'ዙር እቁብ (ሰሙናዊ / ወርሓዊ)',
    drawLottery: 'ዕጫ ኣውጽእ',
    bankingTitle: 'ባንክን ፋይናንስን',
    cbeBank: 'ንግዲ ባንኪ ኢትዮጵያ (CBE)',
    telebirr: 'ቴሌብር',

    speakButton: 'ንምዝራብ ጠውቕ (Speak)',
    listenButton: 'ንምስማዕ ጠውቕ (Listen)',
    likeAction: 'ላይክ ግበር',
    shareAction: 'ንዓለም ኣካፍል',
    commentAction: 'ርእይቶ ጽሓፍ',
  },

  fr: {
    masterDashboard: 'Tableau de Bord Souverain Universel',
    subMasterDashboard: 'Centre de Contrôle Séquentiel pour Tous les Services Mondiaux',
    cleanScreenNotice: 'Assemblée Diplomatique Internationale Épurée, Rapide et Élite',
    openDashboard: '🎛️ Ouvrir le Tableau de Bord',
    closeDashboard: 'Fermer',
    signIn: 'Connexion / Inscription',
    signOut: 'Déconnexion',
    phoneNumber: 'Numéro de Téléphone',
    password: 'Code Secret (PIN/Mot de passe)',
    fullName: 'Nom Complet',
    gender: 'Genre',
    male: 'Masculin',
    female: 'Féminin',
    otherGender: 'Autre',
    age: 'Âge',
    address: 'Adresse / Ville',
    nationality: 'Nationalité',
    photoUpload: 'Télécharger une Photo de Profil',
    founderName: 'S.E. Zebene Asfeye (Fondateur)',
    foundingDate: '10 Janvier 2026',
    grandAssembly: "Monde de Zebene • Assemblée Souveraine Universelle",
    universalCongress: 'Dialogue Multilingue en Direct avec 170+ Nations',

    mod1Title: '1. Inscription aux 7 Chambres et Critères Dédiés',
    mod1Desc: 'Chaque chambre possède ses critères d’accréditation uniques',
    mod2Title: '2. Chambres Diplomatiques en Vidéo et Voix HD',
    mod2Desc: 'Plateau vidéo HD, sièges numérotés et discours de tribune en direct',
    mod3Title: '3. Cathédrale Nuptiale et Contrat de Mariage de La Haye',
    mod3Desc: 'Accompagnateurs illimités, convention de La Haye, signatures et photos',
    mod4Title: '4. Jeux Modernes, Culturels et Loterie Souveraine',
    mod4Desc: 'Mancala/Gebeta, défis de sagesse et tirages de loterie quotidiens',
    mod5Title: '5. Tontine Internationale (Equb / Épargne Tournante)',
    mod5Desc: 'Régulée par le droit financier coopératif avec tirage transparent',
    mod6Title: '6. Fonds Mondial de Solidarité Humanitaire et de Développement',
    mod6Desc: 'Aide aux orphelins, urgences climatiques et infrastructures rurales',
    mod7Title: '7. Interprétation Vocale en Direct et Traduction Intégrale',
    mod7Desc: 'Traduction instantanée de la voix et basculement de TOUT le texte du site',
    mod8Title: '8. Rails Bancaires, Télécoms et Réserve Financière',
    mod8Desc: 'Commercial Bank of Ethiopia (CBE), Telebirr et coffre-fort créateur',
    mod9Title: '9. Charte Fondatrice, Règlements et Historique',
    mod9Desc: 'Fondé le 10 janvier 2026 par Zebene Asfeye sous égide ONU et Budapest ETS 185',
    mod10Title: '10. Interactions Sociales (Partage, Mentions J’aime et Commentaires)',
    mod10Desc: 'Fil de commentaires en direct, récompenses et invitations multicanaux',

    chamber1Name: 'Maison de Toutes les Nations (Plénière)',
    chamber2Name: 'Maison de la Filiation et des Lignées',
    chamber3Name: 'Maison des Hauts Dignitaires et Diplomates',
    chamber4Name: 'Sanctuaire des Secrets et Fiançailles Discrètes',
    chamber5Name: 'Cathédrale Nuptiale et Célébration de Mariage',
    chamber6Name: 'Maison de la Foi et Fraternité Spirituelle',
    chamber7Name: 'Commandement du Maintien de la Paix et Civilité',

    groom: 'Marié',
    bride: 'Mariée',
    bestMan: 'Témoin Principal',
    maidOfHonor: 'Demoiselle d’Honneur',
    elders: 'Anciens Célébrants',
    witnesses: 'Témoins Légaux',
    attendees: 'Accompagnateurs et Invités',
    addMoreAttendees: '+ Ajouter Plus d’Invités / Anciens (Illimité)',
    hagueApostille: 'Convention Apostille de La Haye 1961',
    signContract: 'Signer et Sceller Légalement',

    equbTitle: 'Tontine Souveraine Internationale (Equb)',
    equbCycle: 'Cycle (Hebdomadaire / Mensuel)',
    drawLottery: 'Tirage au Sort Transparent',
    bankingTitle: 'Système Bancaire et Financier',
    cbeBank: 'Commercial Bank of Ethiopia (CBE)',
    telebirr: 'Telebirr',

    speakButton: 'Parler au Micro (Speak)',
    listenButton: 'Écouter en Continu (Listen)',
    likeAction: 'J’aime et Soutien',
    shareAction: 'Partager au Monde',
    commentAction: 'Laisser un Commentaire',
  },

  ar: {
    masterDashboard: 'لوحة التحكم الرئيسية للمجلس السيادي العالمي',
    subMasterDashboard: 'مركز التحكم المتسلسل لكافة الخدمات العالمية المنظمة',
    cleanScreenNotice: 'قاعة دبلوماسية دولية نقية وفائقة السرعة والعصرية',
    openDashboard: '🎛️ افتح لوحة التحكم الرئيسية',
    closeDashboard: 'إغلاق',
    signIn: 'تسجيل الدخول / التسجيل',
    signOut: 'تسجيل الخروج',
    phoneNumber: 'رقم الهاتف',
    password: 'الرمز السري (PIN)',
    fullName: 'الاسم الكامل',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    otherGender: 'آخر',
    age: 'العمر',
    address: 'العنوان / المدينة',
    nationality: 'الجنسية',
    photoUpload: 'تحميل الصورة الشخصية',
    founderName: 'معالي زبيني أسفاي (Zebene Asfeye)',
    foundingDate: '10 يناير 2026',
    grandAssembly: 'عالم زبيني • الجمعية السيادية العامة للشعوب',
    universalCongress: 'حوار صوتي ومرئي فوري يضم أكثر من 170 دولة',

    mod1Title: '1. التسجيل ومعايير الغرف السيادية السبع',
    mod1Desc: 'لكل غرفة معايير اعتماد خاصة بها ومستقلة',
    mod2Title: '2. قاعات الفيديو والصوت المباشر والمقاعد',
    mod2Desc: 'بث فيديو عالي الدقة، مقاعد مرقمة، وكلمات منصة مباشرة',
    mod3Title: '3. كاتدرائية الزواج وعقد لاهاي الدولي',
    mod3Desc: 'مرافقون وشهود غير محدودين، تصديق أحدث اتفاقية لاهاي والصور',
    mod4Title: '4. الألعاب التراثية والحديثة واليانصيب',
    mod4Desc: 'لعبة المنقلة التراثية، أسئلة الحكمة، ويانصيب الحظ',
    mod5Title: '5. صندوق الادخار التبادلي الدولي (الإكوب)',
    mod5Desc: 'خاضع للقوانين المالية التعاونية الدولية مع سحب شفاف',
    mod6Title: '6. صندوق التضامن الإنساني والتنمية العالمية',
    mod6Desc: 'دعم الأيتام، إغاثة الكوارث، ومشاريع المياه والتعليم',
    mod7Title: '7. الترجمة الصوتية الفورية وتحويل نصوص الموقع',
    mod7Desc: 'عند اختيار لغة تتغير كل نصوص الموقع والصوت فورياً',
    mod8Title: '8. المنظومة البنكية والمالية والتحويلات',
    mod8Desc: 'البنك التجاري الإثيوبي (CBE)، وتيليبير، وخزينة المطور',
    mod9Title: '9. الميثاق التأسيسي والقوانين وتاريخ التأسيس',
    mod9Desc: 'تأسس في 10 يناير 2026 برئاسة زبيني أسفاي وفق اتفاقيات الأمم المتحدة',
    mod10Title: '10. التفاعل الاجتماعي (مشاركة، إعجاب وتعليقات)',
    mod10Desc: 'سجل التعليقات المباشرة، والمكافآت، والمشاركة المتعددة',

    chamber1Name: 'بيت الشعوب العام (House of All Nations)',
    chamber2Name: 'بيت الأنساب والصلة العائلية',
    chamber3Name: 'بيت الدبلوماسية ورجال الدولة',
    chamber4Name: 'محراب الأسرار والخطوبة الخاصة',
    chamber5Name: 'كاتدرائية عقد القران والزواج',
    chamber6Name: 'بيت الإيمان والوئام الروحي',
    chamber7Name: 'قيادة حفظ السلام والعدالة',

    groom: 'العريس',
    bride: 'العروس',
    bestMan: 'الإشبين الرئيسي',
    maidOfHonor: 'إشبينة العروس',
    elders: 'شيوخ العقد والشهود',
    witnesses: 'الشهود القانونيون',
    attendees: 'المرافقون والضيوف',
    addMoreAttendees: '+ إضافة مرافقين وشيوخ بدون حد (Unlimited)',
    hagueApostille: 'تصديق معاهدة لاهاي للأبوستيل 1961',
    signContract: 'توقيع العقد رسمياً',

    equbTitle: 'الإكوب السيادي الدولي (Equb)',
    equbCycle: 'دورة السحب (أسبوعية / شهرية)',
    drawLottery: 'إجراء السحب الشفاف',
    bankingTitle: 'المنظومة المصرفية',
    cbeBank: 'البنك التجاري الإثيوبي (CBE)',
    telebirr: 'تيليبير (Telebirr)',

    speakButton: 'اضغط للتحدث (Speak)',
    listenButton: 'استماع مستمر مباشر (Listen)',
    likeAction: 'إعجاب ودعم',
    shareAction: 'شارك مع العالم',
    commentAction: 'اكتب تعليقاً حياً',
  },
};

export function getTranslation(lang: string = 'am'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS['am'] || TRANSLATIONS['en'];
}
