import { LegalArticle } from '../types';

export const INTERNATIONAL_LEGAL_ARTICLES: LegalArticle[] = [
  {
    id: 'art-1-human-rights',
    articleNumber: 1,
    title: 'Universal Human Dignity, Non-Violence & Anti-Incitement Mandate',
    amharicTitle: 'የሰው ልጆች ክብር፣ ሰላም እና ጥላቻና ጥቃትን የመከልከል ዓለም አቀፍ ድንጋጌ',
    category: 'human_rights',
    internationalTreatyReference: 'UN Universal Declaration of Human Rights (UDHR Arts. 1, 3, 19, 29) & ICCPR Art. 20',
    summary: 'Strict prohibition of hate speech, incitement to violence, ethnic or religious discrimination, and war propaganda across all chambers and communication streams.',
    amharicSummary: 'በሁሉም ክፍሎች እና የንግግር መድረኮች ላይ የጥላቻ ንግግር፣ ብሄር ተኮር ወይም ሃይማኖታዊ ግጭት መቀስቀስ፣ የስም ማጥፋት እና የጦርነት ቅስቀሳ በጥብቅ የተከለከለ ነው።',
    fullProvisions: [
      'Every participant within Zebene’s World possesses inherent dignity and equal human rights without distinction of nationality, race, language, or faith (UDHR Article 2).',
      'Freedom of expression is upheld subject to the fundamental duty to avoid harm; any speech advocating violence, terrorism, or ethnic hatred is instantly nullified (ICCPR Article 20).',
      'Automated peace sentinels and Chamber 7 elders actively moderate all live speech, audio streams, and translated broadcasts to maintain uncompromised civil peace.',
      'Defamation, harassment, cyber-bullying, and threats directed against any citizen, elder, or child are treated as actionable civil violations and criminal threats.'
    ],
    amharicProvisions: [
      'በዘበነ የመሰረተው አለም ውስጥ የሚሳተፍ ማንኛውም ሰው የዘር፣ የቋንቋ፣ የሃይማኖት ወይም የዜግነት ልዩነት ሳይደረግበት እኩል ሰብአዊ ክብር እና ጥበቃ አለው።',
      'ሃሳብን በነፃነት የመግለጽ መብት የሚከበረው የሌሎችን ክብርና ሰላም በማይነካ መልኩ ብቻ ነው፤ የጥላቻና የግጭት ቅስቀሳ ወዲያውኑ ውድቅ ይደረጋል።',
      'በክፍል 7 ያሉ የሰላም አስከባሪዎች እና አውቶሜትድ የሰላም ሲስተሞች ሁሉንም የድምፅና የፅሁፍ ውይይቶች በሰላማዊ መንገድ እንዲመሩ ይቆጣጠራሉ።',
      'ማንኛውንም ተሳታፊ፣ ሽማግሌ፣ ሴቶች ወይም ህፃናትን ማዋረድ፣ ስም ማጥፋት ወይም ማስፈራራት በዓለም አቀፍ ህግ ተጠያቂ ያደርጋል።'
    ],
    legalConsequences: 'Immediate revocation of chamber privileges, cryptographic expulsion, permanent identity blacklisting, and submission of incident logs to relevant international human rights and judicial bodies.',
    amharicConsequences: 'የመድረክ መብትን ወዲያውኑ ማገድ፣ አካውንትን በቋሚነት ማሰናበት እና የጥፋት መረጃዎችን ለሚመለከታቸው ዓለም አቀፍ የፍትህ አካላት አሳልፎ መስጠት።',
    icon: 'ShieldCheck'
  },
  {
    id: 'art-2-cybercrime',
    articleNumber: 2,
    title: 'International Cybercrime Prohibition & Infrastructure Integrity',
    amharicTitle: 'የሳይበር ወንጀል፣ ዲጂታል ጥቃት እና የመረጃ ስርዓት ጥበቃ ዓለም አቀፍ ህግ',
    category: 'cybercrime',
    internationalTreatyReference: 'Budapest Convention on Cybercrime (ETS No. 185) & AU Malabo Convention on Cybersecurity',
    summary: 'Criminal liability for hacking, bot exploitation, unauthorized breach of restricted chambers, DDoS attacks, deepfake manipulation, and credential spoofing.',
    amharicSummary: 'ያለፈቃድ ወደ ተዘጉ ክፍሎች ሰርጎ መግባት፣ ቦቶችን መጠቀም፣ የሳይበር ጥቃት ማድረስ፣ የዲፕፌክ ማጭበርበር እና የሌሎችን ማንነት መስረቅ በከፍተኛ የወንጀል ህግ ያስቀጣል።',
    fullProvisions: [
      'Unauthorized access to restricted sovereign areas (Chambers 3 and 4) constitutes intentional cyber-trespass punishable under Budapest Convention Articles 2-5.',
      'Deployment of malicious automated scripts, crawlers, DDoS packets, or reverse-engineering payloads against server endpoints will trigger automated forensic defense.',
      'The generation or distribution of deceptive deepfakes, synthetic voice impersonations of dignitaries or family members, or spoofed biometric tokens is strictly criminalized.',
      'Cryptographic logs including IPv6 signatures, hardware identifiers, and biometric hash audits are immutably archived to support cross-border prosecution.'
    ],
    amharicProvisions: [
      'ያለፈቃድ ወደ ተከለከሉ ዲፕሎማሲያዊ እና ሚስጥራዊ ክፍሎች (ክፍል 3 እና 4) ሰርጎ መግባት እንደ ከባድ የሳይበር ወንጀል ይቆጠራል።',
      'በሲስተሙ ላይ የዲዶስ (DDoS) ጥቃት መሞከር፣ አውቶሜትድ ቦቶች መልቀቅ ወይም የሰርቨሩን ዳታ ለመስረቅ መሞከር በህግ ያስቀጣል።',
      'በ AI የተሰሩ የውሸት ምስሎችን (Deepfake)፣ የተቀረፁ የድምፅ ማጭበርበሮችን ወይም የውሸት ባዮሜትሪክ መረጃዎችን መጠቀም በጥብቅ የተከለከለ ነው።',
      'ማንኛውም አጠራጣሪ እንቅስቃሴ በዲጂታል ፎረንሲክስ ተመዝግቦ ለዓለም አቀፍ የፖሊስ ተቋማት (ኢንተርፖል) ይላካል።'
    ],
    legalConsequences: 'Permanent forfeiture of digital assets, forensic packet preservation, civil damages claims up to $250,000 USD, and criminal referral to Interpol Cybercrime Directorate and domestic law enforcement.',
    amharicConsequences: 'የንብረት እና የዋሌት ቀሪ ሂሳብ መታገድ፣ የካሳ ጥያቄ መቅረብ እና ጉዳዩ በቀጥታ ለኢንተርፖል የሳይበር ወንጀል መምሪያ እና ለሀገር ውስጥ ፖሊስ መተላለፍ።',
    icon: 'Lock'
  },
  {
    id: 'art-3-financial-aml',
    articleNumber: 3,
    title: 'Global Anti-Money Laundering (AML/CFT) & Financial Integrity',
    amharicTitle: 'የጸረ-ገንዘብ ማጭበርበር፣ ህገወጥ ዝውውር መከላከያ (AML/CFT) እና የፋይናንስ ግልጽነት ህግ',
    category: 'financial_aml',
    internationalTreatyReference: 'FATF (Financial Action Task Force) 40 Recommendations & Basel Committee Standards on Due Diligence',
    summary: 'Stringent surveillance against illicit fund transfers, money laundering, financial deception, loan fraud, and illicit gaming operations across all monetary rails.',
    amharicSummary: 'ማንኛውም በ CBE፣ ቴሌብር፣ ስዊፍት ወይም ፔይፓል የሚደረግ የገንዘብ ዝውውር፣ ብድር እና የሎተሪ ሽልማት ከማጭበርበር እና ከህገወጥ ገንዘብ ማሸሽ የፀዳ መሆን አለበት።',
    fullProvisions: [
      'All fiat and digital transfers executed via CBE, Telebirr, and international payment gateways are anchored in strict Know-Your-Customer (KYC) compliance.',
      'Any attempt to route proceeds of corruption, human trafficking, tax evasion, or illicit commerce through platform wallets or loans will be automatically frozen.',
      'Talent reward funds, fortune wheel payouts, and loan disbursements are audited in real time against sovereign reserve ratios (5% Creator Reserve, 10% Liquidity Safety Reserve).',
      'Falsification of loan collateral, fraudulent chargebacks, or phantom donation campaigns will result in immediate asset seizure and civil recovery litigation.'
    ],
    amharicProvisions: [
      'በኢትዮጵያ ንግድ ባንክ (CBE)፣ በቴሌብር (Telebirr) እና በዓለም አቀፍ የክፍያ መንገዶች የሚደረግ ማንኛውም እንቅስቃሴ ትክክለኛ ማንነትን ባረጋገጠ አካውንት ብቻ ይፈጸማል።',
      'ከሙስና፣ ከህገወጥ ንግድ ወይም ከታክስ ማጭበርበር የተገኘን ገንዘብ በዋሌት ውስጥ ለማዘዋወር መሞከር አካውንቱ ወዲያውኑ እንዲታገድ ያደርጋል።',
      'የፈጠራ ሽልማቶች፣ የሎተሪ አሸናፊዎች እና የብድር ገንዘቦች በህጋዊ የኦዲት ቁጥጥር እና የካፒታል ጥበቃ ደንብ የተጠበቁ ናቸው።',
      'ሀሰተኛ የብድር ሰነድ ማቅረብ ወይም በሀሰት የበጎ አድራጎት ገንዘብ መሰብሰብ በወንጀል እና በፍትሐብሔር ህግ ከፍተኛ ቅጣት ያስከትላል።'
    ],
    legalConsequences: 'Instant wallet asset freeze, blacklisting across Ethiopian and international banking settlement networks, and reporting to the Financial Intelligence Center (FIC).',
    amharicConsequences: 'የዋሌት ገንዘብ ወዲያውኑ እንዲታገድ መደረግ፣ በባንኮች ጥቁር መዝገብ መመዝገብ እና ለፋይናንስ ደህንነት አገልግሎት (FIC) ሪፖርት መደረግ።',
    icon: 'Landmark'
  },
  {
    id: 'art-4-civil-contracts',
    articleNumber: 4,
    title: 'Legal Enforceability of Nuptial Covenants & Electronic Civil Contracts',
    amharicTitle: 'የጋብቻ ቃል ኪዳን ሰነድ እና የኤሌክትሮኒክስ ውሎች ህጋዊ አስገዳጅነት',
    category: 'civil_contracts',
    internationalTreatyReference: 'UNCITRAL Model Law on Electronic Commerce (1996) & Electronic Signatures (2001)',
    summary: 'Binding legal validity of digital marriage covenants executed in Chamber 5, micro-loan contracts in Chamber 6, and mutual civic compacts with cryptographic biometric signing.',
    amharicSummary: 'በክፍል 5 የሚፈረሙ የጋብቻ ውሎች፣ በክፍል 6 የሚደረጉ የብድር ስምምነቶች እና የሽምግልና ውሳኔዎች በዓለም አቀፍ የኤሌክትሮኒክስ ህግ መሰረት አስገዳጅ የህግ ኃይል አላቸው።',
    fullProvisions: [
      'Digital signatures verified via camera biometric timestamp, presiding elder consent, and witness seals hold equal legal parity to handwritten pen signatures under UNCITRAL standards.',
      'Marriage covenants executed in Chamber 5 create legally enforceable reciprocal duties of mutual support, fidelity, and familial heritage recognition.',
      'Micro-lending contracts stipulate explicit repayment milestones; default without certified hardship triggers civil garnishment and credit bureau reporting.',
      'All covenant certificates are issued with unique SHA-256 verification hashes, ensuring non-repudiation and global evidentiary admissibility before civil courts.'
    ],
    amharicProvisions: [
      'በካሜራ ባዮሜትሪክ እና በሽማግሌዎች ፊት የተፈረመ የዲጂታል ፊርማ እንደ ወረቀት ፊርማ ሙሉ ህጋዊ ተቀባይነት አለው።',
      'በክፍል 5 የተደረገ ጋብቻ ሁለቱንም ጥንዶች በህግና በስነምግባር የሚያስተሳስር ይፋዊ የቤተሰብ ህግ ሰነድ ነው።',
      'በክፍል 6 የተወሰደ ብድር በገባው ቃል መሰረት መመለስ አለበት፤ ያለ አግባብ አለመክፈል በህግ ተጠያቂ ያደርጋል።',
      'እያንዳንዱ ውል የማይደለዝ ልዩ የዲጂታል መለያ ኮድ (Hash) ስለሚሰጠው በፍርድ ቤት እንደ ጽኑ ማስረጃ ያገለግላል።'
    ],
    legalConsequences: 'Civil enforcement through expedited arbitral tribunals, registration with civil registration authorities, and judicial execution against defaulting parties.',
    amharicConsequences: 'በፍርድ ቤቶች እና በሽምግልና ጉባኤዎች በኩል ውሉን አስገድዶ ማስፈጸም እና በውል አፍራሹ ላይ የህግ እርምጃ መውሰድ።',
    icon: 'FileBadge'
  },
  {
    id: 'art-5-intellectual-property',
    articleNumber: 5,
    title: 'World Intellectual Property Organization (WIPO) Protection & Authorship',
    amharicTitle: 'የአእምሯዊ ንብረት ጥበቃ፣ የፈጠራ ባለቤትነት እና የቅጂ መብት ዓለም አቀፍ ህግ',
    category: 'intellectual_property',
    internationalTreatyReference: 'WIPO Copyright Treaty (WCT), Berne Convention for the Protection of Literary and Artistic Works',
    summary: 'Worldwide copyright and patent protection for educational modules, live talent performances, technological blueprints, cultural heritage, and platform design assets.',
    amharicSummary: 'በመተግበሪያው ውስጥ የሚቀርቡ የትምህርት ዝግጅቶች፣ የኪነ-ጥበብ ስራዎች፣ የቴክኖሎጂ ፈጠራዎች እና የአሰራር ስርዓቶች በዓለም አቀፍ የኮፒራይት ህግ የተጠበቁ ናቸው።',
    fullProvisions: [
      'All original curriculum produced by the AI Learning Horizon and contributed by verified scholars remains protected intellectual property.',
      'Talent competition entries (music, poetry, engineering inventions) submitted in Chamber 6 retain creator moral and economic rights under the Berne Convention.',
      'The sovereign emblem, iconography, chamber architectural designs, and proprietary communication algorithms of Zebene’s World are protected trademarks and assets.',
      'Unlawful cloning, commercial scraping, unauthorized redistribution, or piracy of platform content will be prosecuted across international patent and copyright courts.'
    ],
    amharicProvisions: [
      'በትምህርት አድማስ ክፍል የሚዘጋጁ ትምህርቶች እና የሳይንስ ጥናቶች የፈጣሪዎቻቸው የአእምሮ ንብረት ናቸው።',
      'በተሰጥኦ ውድድር የሚቀርቡ የሙዚቃ፣ የስነ-ግጥም እና የፈጠራ ስራዎች በዓለም አቀፍ የቅጂ መብት ህግ ሙሉ ጥበቃ አላቸው።',
      'የዘበነ ዓለም ይፋዊ ዓለም አቀፍ አርማ፣ ዲዛይን እና ቴክኖሎጂ ያለፈቃድ ማባዛት ወይም መጠቀም በህግ የተከለከለ ነው።',
      'የሌሎችን ስራ ሰርቆ የራስ ማድረግ ወይም ያለፈቃድ ለንግድ ማዋል በዓለም አቀፍ ፍርድ ቤት ያስቀጣል።'
    ],
    legalConsequences: 'Statutory damages for copyright infringement up to $150,000 per violation, takedown mandates, and global domain/application injunctions.',
    amharicConsequences: 'ለደረሰ የቅጂ መብት ጉዳት ከፍተኛ የገንዘብ ካሳ መክፈል፣ የተሰረቀው ስራ እንዲታገድ መደረግ እና ህጋዊ ክስ መመስረት።',
    icon: 'Sparkles'
  },
  {
    id: 'art-6-privacy-data',
    articleNumber: 6,
    title: 'Data Privacy, Biometric Custody & Fundamental Digital Rights',
    amharicTitle: 'የመረጃ ደህንነት፣ የግል ሚስጥር እና የባዮሜትሪክ መረጃ ጥበቃ ህግ (GDPR)',
    category: 'privacy_data',
    internationalTreatyReference: 'EU General Data Protection Regulation (GDPR) & AU Convention on Cyber Security and Personal Data Protection',
    summary: 'Strict safeguarding of facial biometric data, identity records, and private communications. Zero unauthorized commercial resale, transparent auditability.',
    amharicSummary: 'የተጠቃሚዎች የፊት ገጽታ (Biometrics)፣ ስልክ ቁጥር እና የግል መረጃዎች በከፍተኛ ሚስጥር የተጠበቁ ናቸው፤ ለሶስተኛ ወገን ፈጽሞ ለንግድ አይሸጡም።',
    fullProvisions: [
      'Facial biometric authentication tokens are converted into cryptographic mathematical vectors; raw video captures are not sold to third-party advertising brokers.',
      'Users retain the fundamental right to review, rectify, and request account de-identification pursuant to GDPR Article 17 (Right to be Forgotten).',
      'Private communications held inside Chamber 4 (Sanctuary of Secrets) are encrypted; no algorithmic profiling or marketing eavesdropping is practiced.',
      'Data retention adheres strictly to legal necessity for maintaining civic auditability, fraud prevention, and compliance with statutory financial retention laws.'
    ],
    amharicProvisions: [
      'የፊት ባዮሜትሪክ መረጃዎች ወደ ሚስጥራዊ ኮድ ተቀይረው ለደህንነት ብቻ ይውላሉ እንጂ ለማስታወቂያ ወይም ለንግድ ድርጅቶች አይሸጡም።',
      'ማንኛውም ተጠቃሚ መረጃው እንዲስተካከል ወይም አካውንቱ እንዲሰረዝ የመጠየቅ ሙሉ ዲጂታል መብት አለው።',
      'በሚስጥር ክፍል (ክፍል 4) የሚደረጉ የትዳር እና የሽምግልና ንግግሮች በከፍተኛ ሚስጥር የተጠበቁ ናቸው።',
      'የመረጃ አያያዛችን ተጠቃሚዎችን ከማጭበርበር ለመጠበቅ እና የዓለም አቀፍ የውሂብ ህግጋትን ለማክበር ብቻ የተዘጋጀ ነው።'
    ],
    legalConsequences: 'Substantial regulatory administrative fines under international data protection laws, right of compensation for affected data subjects.',
    amharicConsequences: 'የተጠቃሚን መረጃ አላግባብ የተጠቀመ ማንኛውም አካል በከባድ የገንዘብ ቅጣት እና የካሳ ክፍያ ተጠያቂ ይሆናል።',
    icon: 'Eye'
  },
  {
    id: 'art-7-jurisdiction',
    articleNumber: 7,
    title: 'International Jurisdiction, Global Arbitration & Law Enforcement Cooperation',
    amharicTitle: 'የዓለም አቀፍ የዳኝነት ስልጣን፣ የሽምግልና ፍርድ እና የህግ ተባባሪነት ስምምነት',
    category: 'jurisdiction',
    internationalTreatyReference: 'New York Convention on the Recognition and Enforcement of Foreign Arbitral Awards (1958) & UN Model Law on International Commercial Arbitration',
    summary: 'Binding agreement to international dispute arbitration, mutual legal assistance with sovereign authorities, and cross-border liability enforcement.',
    amharicSummary: 'በዚህ ድህረገፅ እና መተግበሪያ ላይ የሚደረግ ማንኛውም እንቅስቃሴ በዓለም አቀፍ ህግና ዳኝነት ተፈጻሚነት ስር የወደቀ ነው፤ ከፖሊስና ፍትህ አካላት ጋር ቀጥተኛ ትብብር ይደረጋል።',
    fullProvisions: [
      'By accessing Zebene’s World, every user unequivocally consents to jurisdiction under harmonized international commercial and civil dispute resolution mechanisms.',
      'Substantive claims arising out of platform actions shall first be submitted to the Sovereign Council of Elders and verified international arbitration panels.',
      'The platform maintains an active Mutual Legal Assistance Protocol to comply promptly with lawful judicial warrants and subpoenas issued by legitimate courts.',
      'No user may invoke territorial anonymity or transnational borders to escape civil damages or criminal accountability for acts committed through this portal.'
    ],
    amharicProvisions: [
      'ይህንን መተግበሪያ ወይም ድህረገፅ የሚጠቀም ማንኛውም ሰው ራሱን ለዓለም አቀፍ የህግ ተጠያቂነትና ዳኝነት አስገዢ ማድረጉን ያረጋግጣል።',
      'ማንኛውም አለመግባባት በቅድሚያ በታላላቅ የሽምግልና ጉባኤዎች እና በዓለም አቀፍ የግልግል ፍርድ ቤቶች እንዲታይ ይደረጋል።',
      'መተግበሪያው ከዓለም አቀፍ የህግ አስከባሪዎችና ከፍርድ ቤቶች ጋር ህጋዊ ትብብር በማድረግ ወንጀልና ጥፋት እንዳይፈጸም ይከላከላል።',
      'ማንም ሰው በየትኛውም ሀገር ቢኖር ከህግ ማምለጥ እንደማይችል እና ድንበር ሳይገድበው በህግ ፊት እንደሚቀርብ ተረጋግጧል።'
    ],
    legalConsequences: 'Enforceability of arbitral awards across 170+ signatory nations under the New York Convention, cross-border civil asset recovery, and lawful extradition referral.',
    amharicConsequences: 'የተሰጠ ውሳኔ በ170+ ሀገራት በሚገኙ ፍርድ ቤቶች ተፈጻሚ መሆን እና ንብረትን በማስከበር ህጋዊ ቅጣት መጣል የሚቻል መሆኑ።',
    icon: 'Scale'
  }
];

export interface UserManualStep {
  stepNumber: number;
  category: string;
  amharicCategory: string;
  title: string;
  amharicTitle: string;
  description: string;
  amharicDescription: string;
  keyInstructions: string[];
  amharicInstructions: string[];
  legalWarning: string;
  amharicWarning: string;
  iconName: string;
}

export const USER_OPERATIONAL_MANUAL: UserManualStep[] = [
  {
    stepNumber: 1,
    category: 'Chambers & Discourse Etiquette',
    amharicCategory: 'የክፍሎች አጠቃቀምና የስነምግባር ደንብ',
    title: 'Sovereign Assembly Participation & Microphone Conduct',
    amharicTitle: 'በ7ቱ ክፍሎች የመሳተፍ እና የድምፅና ምስል አጠቃቀም መመሪያ',
    description: 'How to enter chambers (Dial 1 through 7), claim numbered seats, speak with peace and respect, and maintain civil decorum.',
    amharicDescription: 'ከ1 እስከ 7 ቁጥሮችን በመጫን ወደ ክፍሎቹ መግባት፣ መቀመጫ መያዝ፣ ማይክራፎን መክፈት እና በሰላማዊ መንገድ ሃሳብን የመግለጽ ስርዓት።',
    keyInstructions: [
      'Enter Chamber 1 by pressing "1" or selecting from the top dialer; seats 1 through 32 can be claimed by verified participants.',
      'When your microphone is enabled, speak clearly; the real-time AI engine translates your voice instantly into 9 global languages.',
      'Keep your speech constructive: focus on human progress, kinship reconciliation, scientific learning, and charity.',
      'Always mute your microphone when not addressing the assembly to preserve audio acoustic sanctity for all delegates.'
    ],
    amharicInstructions: [
      'ቁጥር 1ን በመጫን ወደ ህዝባዊው አዳራሽ ይግቡ፤ መቀመጫ በመምረጥ ንግግር ማድረግ ይችላሉ።',
      'ማይክራፎንዎን ከፍተው በሚናገሩበት ወቅት ድምፅዎ ወዲያውኑ ወደ 9 የዓለም ቋንቋዎች ተተርጉሞ ለሁሉም ይደርሳል።',
      'ንግግርዎ ገንቢ፣ የሚያስተምር፣ ፍቅርንና ሰላምን የሚሰብክ እንዲሁም ለሰው ልጆች አጋዥ መሆን አለበት።',
      'ንግግርዎን ሲጨርሱ የሌሎች ድምፅ እንዳይረበሽ ማይክራፎንዎን ወዲያውኑ ይዝጉ።'
    ],
    legalWarning: 'Incitement to violence, insulting participants, or warmongering results in automatic speech cancellation and permanent account ban under Article 1.',
    amharicWarning: 'የጥላቻ ንግግር፣ ስድብ ወይም ሁከት መቀስቀስ በዓለም አቀፍ ህግ አንቀጽ 1 መሰረት ወዲያውኑ ከአካውንት ያሰናብታል።',
    iconName: 'Globe2'
  },
  {
    stepNumber: 2,
    category: 'Biometric Face ID & Registration',
    amharicCategory: 'የፊት ባዮሜትሪክ እና የምዝገባ መመሪያ',
    title: 'Identity Verification & Sovereign Citizen Badge',
    amharicTitle: 'ትክክለኛ ማንነትን ማረጋገጥ እና ይፋዊ የዜግነት ባጅ ማግኘት',
    description: 'Ensure authentic human presence through camera facial recognition, complete your profile, and receive your verified diplomatic credential.',
    amharicDescription: 'በካሜራ የፊት ገጽታን በማረጋገጥ የውሸት አካውንቶችን መከላከል እና ይፋዊ የዜግነት መታወቂያ ባጅ መውሰድ።',
    keyInstructions: [
      'Click your profile avatar or the "Verify Face Biometric" button in the navigation bar.',
      'Allow camera access, align your face within the biometric oval frame, and capture your authentic portrait.',
      'Fill in your true legal name, nationality, and phone number for secure multi-factor authentication.',
      'Upon verification, your profile receives the green Sovereign Shield and verified citizenship status.'
    ],
    amharicInstructions: [
      'በላይኛው መስመር ላይ ያለውን የፕሮፋይል ምስል ወይም "ባዮሜትሪክ አረጋግጥ" የሚለውን ይጫኑ።',
      'ካሜራውን ፈቅደው ፊትዎን በክቡ ውስጥ በትክክል በማሳየት ምስልዎን ያረጋግጡ።',
      'ትክክለኛ ስምዎን፣ ዜግነትዎን እና ስልክ ቁጥርዎን ያስገቡ።',
      'ማንነትዎ ሲረጋገጥ አረንጓዴ የክብር ምልክት እና ይፋዊ የዜግነት ሰነድ ይሰጥዎታል።'
    ],
    legalWarning: 'Using stolen photographs, deepfakes, or fake names constitutes criminal identity fraud under Article 2 of the Budapest Convention.',
    amharicWarning: 'የሌላ ሰውን ፎቶ መጠቀም፣ የውሸት ስም ማቅረብ ወይም ማጭበርበር በሳይበር ወንጀል ህግ አንቀጽ 2 መሰረት ያስቀጣል።',
    iconName: 'UserCheck'
  },
  {
    stepNumber: 3,
    category: 'Banking, Loans & Micro-Economy',
    amharicCategory: 'የባንክ፣ ብድርና ኢኮኖሚ አጠቃቀም መመሪያ',
    title: 'CBE & Telebirr Financial Operations & Responsible Borrowing',
    amharicTitle: 'በኢትዮጵያ ንግድ ባንክና ቴሌብር ገንዘብ ማዘዋወር እና በሃላፊነት መበደር',
    description: 'Safely deposit, withdraw, apply for community micro-loans, and reward creators within strict international anti-money laundering boundaries.',
    amharicDescription: 'ገንዘብ በሰላም ማስቀመጥ፣ ማውጣት፣ ከወለድ ነፃ የህብረተሰብ ብድር መውሰድ እና ፈጣሪዎችን መደገፍ።',
    keyInstructions: [
      'Navigate to the "Banking, Loans & Talent" tab to inspect your wallet balances in Ethiopian Birr (ETB) and USD.',
      'Deposit or withdraw funds through official verified rails (Commercial Bank of Ethiopia or Ethio Telecom Telebirr).',
      'When applying for micro-loans, accurately state your productive business or educational purpose and agreed repayment duration.',
      'Repay all loans on schedule to raise your civic credit rating and unlock higher community capital limits.'
    ],
    amharicInstructions: [
      'ወደ "ኢኮኖሚና ባንክ" ክፍል በመሄድ የዋሌትዎን የብርና የዶላር ቀሪ ሂሳብ ይመልከቱ።',
      'በኢትዮጵያ ንግድ ባንክ (CBE) ወይም በቴሌብር (Telebirr) በኩል ህጋዊ የገንዘብ ማውጣትና ማስገባት ያከናውኑ።',
      'ብድር ሲጠይቁ ለስራ ወይም ለትምህርት የሚውልበትን ትክክለኛ ምክንያት እና የሚመልሱበትን ወር ይግለጹ።',
      'የተበደሩትን ገንዘብ በሰዓቱ በመመለስ የክብር ደረጃዎን ያሳድጉ እና ለተጨማሪ ብድር ብቁ ይሁኑ።'
    ],
    legalWarning: 'Money laundering, financial scamming, or default on verified loans leads to asset seizure and blacklisting under Article 3.',
    amharicWarning: 'የገንዘብ ማጭበርበር፣ ህገወጥ ዝውውር ወይም ብድር አለመክፈል በህግ አንቀጽ 3 መሰረት ንብረት እንዲታገድ ያደርጋል።',
    iconName: 'Landmark'
  },
  {
    stepNumber: 4,
    category: 'Virtual Weddings & Nuptial Covenants',
    amharicCategory: 'የኦንላይን ሰርግ እና የጋብቻ ውል መመሪያ',
    title: 'Chamber 5 Sacred Nuptial Ceremonies & Elder Witness Signatures',
    amharicTitle: 'በክፍል 5 ህጋዊ ሰርግ ማካሄድ እና በሽማግሌዎች ፊት ቃል ኪዳን መፈረም',
    description: 'How to register a worldwide matrimonial ceremony, invite elders and global witnesses, and bind the union with electronic civil enforceability.',
    amharicDescription: 'በዓለም ዙሪያ ካሉ ዘመዶች ጋር በቪዲዮ ሰርግ ማክበር፣ በሽማግሌዎች ፊት መፈራረም እና ጽኑ የጋብቻ ውል ማግኘት።',
    keyInstructions: [
      'Enter Chamber 5 (Nuptial & Wedding Hall) and click "Open Nuptial Covenant (የጋብቻ ቃል ኪዳን)".',
      'Input the legal names of Partner One, Partner Two, presiding elders (አጋቢ ሽማግሌዎች), and verified witnesses.',
      'Review the harmonized Ethiopian & International matrimonial articles protecting mutual respect and familial harmony.',
      'Both partners, elder, and witnesses click to apply their biometric cryptographic digital signatures.',
      'Download and print the official Gold-Sealed Marriage Certificate with its permanent verification QR code.'
    ],
    amharicInstructions: [
      'ወደ ክፍል 5 (የሰርግ ቤት) በመግባት "የጋብቻ ቃል ኪዳን ክፈት" የሚለውን ይጫኑ።',
      'የሙሽራውን፣ የሙሽሪቷን፣ የአጋቢ ሽማግሌዎችን እና የምስክሮችን ስም በትክክል ያስገቡ።',
      'በኢትዮጵያና በዓለም አቀፍ የቤተሰብ ህግ የተዘጋጀውን የጋብቻ ቃል ኪዳን አንብበው ይረዱ።',
      'ሁሉም ወገኖች በዲጂታል ፊርማ አማካኝነት ቃል ኪዳናቸውን ያረጋግጣሉ።',
      'የወርቅ ማህተም ያለበትን ይፋዊ የጋብቻ ሰርተፊኬት አውርደው ማተም ይችላሉ።'
    ],
    legalWarning: 'Polygamous concealment, forced marriages, or fraudulent matrimonial misrepresentation violate international civil rights under Article 4.',
    amharicWarning: 'የውሸት መረጃ መስጠት፣ አስገድዶ ማጋባት ወይም ማጭበርበር በዓለም አቀፍ የቤተሰብ ህግ አንቀጽ 4 መሰረት ያስቀጣል።',
    iconName: 'HeartHandshake'
  },
  {
    stepNumber: 5,
    category: 'Humanitarian Solidarity & Orphans',
    amharicCategory: 'የበጎ አድራጎትና የየቲሞች ድጋፍ መመሪያ',
    title: 'Transparent Giving, Orphan Sponsorship & Rural Development',
    amharicTitle: 'ግልጽ የሆነ የበጎ አድራጎት ድጋፍ ማድረግ እና ህፃናትን መንከባከብ',
    description: 'Direct 100% auditable donations to verified orphanages, elderly relief funds, and clean water wells across vulnerable communities.',
    amharicDescription: 'ለየቲሞች፣ ለአቅመ-ደካሞች እና ለተቸገሩ ወገኖች ያለምንም መካከለኛ አላስፈላጊ ወጪ ሙሉ ድጋፍ ማድረስ።',
    keyInstructions: [
      'Visit the "Humanitarian Aid & Orphans" tab to inspect active humanitarian campaigns.',
      'Select a verified cause: e.g., "Addis Orphanage Food & Books", "Rural Clean Water Well", or "Elder Healthcare Fund".',
      'Enter your contribution amount in ETB; every contribution is deducted transparently from your wallet balance.',
      'Track real-time progress indicators and receive verified humanitarian donor recognition points.'
    ],
    amharicInstructions: [
      'ወደ "በጎ አድራጎት" ክፍል በመሄድ ክፍት የሆኑ የድጋፍ ፕሮጀክቶችን ይመልከቱ።',
      'የሚደግፉትን ይምረጡ፡ ለምሳሌ ለየቲም ልጆች ምግብና ደብተር፣ የመጠጥ ውሃ ወይም ለአረጋውያን ህክምና።',
      'የሚለግሱትን የገንዘብ መጠን ያስገቡ፤ ገንዘቡ በቀጥታ ከዋሌትዎ ተቀናሽ ሆኖ ለተረጂዎች ይደርሳል።',
      'የፕሮጀክቱን እድገት እና ያደረጉትን ድጋፍ በግልጽ በሲስተሙ መከታተል ይችላሉ።'
    ],
    legalWarning: 'Misappropriation of charitable donations or fraudulent donation appeals are prosecuted as aggravated fraud under Article 3.',
    amharicWarning: 'የድሆችንና የየቲሞችን ገንዘብ ማባከን ወይም በሀሰት ድጋፍ መጠየቅ በከባድ የፋይናንስ ወንጀል ያስቀጣል።',
    iconName: 'Heart'
  },
  {
    stepNumber: 6,
    category: 'AI Learning Horizon & Offline Resilience',
    amharicCategory: 'የትምህርት አድማስ እና ያለ ኢንተርኔት መጠቀም',
    title: 'Continuous Education, Inventions & Offline Knowledge Vault',
    amharicTitle: 'ዕውቀትን መቅሰም፣ ሳይንስና ቴክኖሎጂን መማር እና ያለ ኢንተርኔት መስራት',
    description: 'Access world-class educational curricula with interactive AI tutoring, and utilize complete offline lessons without internet connectivity.',
    amharicDescription: 'በ AI አጋዥነት በዓለም አቀፍ ደረጃ መማር፤ ኢንተርኔት ባይኖርም እንኳን አፕሊኬሽኑ ሙሉ ለሙሉ በኦፍላይን እንዲሰራ ማድረግ።',
    keyInstructions: [
      'Navigate to the "AI Learning Horizon" tab to explore topics ranging from STEM, Agriculture, Medicine, to Civic Diplomacy.',
      'Type questions or explore curated offline courses; the built-in sovereign archive answers questions even when totally offline.',
      'Test your understanding through interactive quizzes and earn sovereign educational master badges.',
      'Use the top "Online / Offline" toggle button at any time to verify that your application runs smoothly without internet.'
    ],
    amharicInstructions: [
      'ወደ "የትምህርት አድማስ" ክፍል በመግባት ሳይንስ፣ ግብርና፣ ህክምና እና ዲፕሎማሲን ይማሩ።',
      'ጥያቄዎችዎን ይጠይቁ፤ ኢንተርኔት ባይኖርም እንኳን በአፕሊኬሽኑ ውስጥ የተጫነው ዕውቀት መልስ ይሰጥዎታል።',
      'ፈተናዎችን በመስራት የዕውቀት ደረጃዎን ይፈትሹ እና የክብር ባጆችን ያግኙ።',
      'በላይኛው መስመር ያለውን "Online / Offline" ቁልፍ በመጫን ያለ ኢንተርኔት መስራቱን በማንኛውም ጊዜ ማረጋገጥ ይችላሉ።'
    ],
    legalWarning: 'Plagiarism, academic dishonesty, or commercial piracy of educational curricula violates Article 5 of the WIPO Copyright Treaty.',
    amharicWarning: 'የትምህርት ስራዎችን መስረቅ ወይም ማጭበርበር በዓለም አቀፍ የኮፒራይት ህግ አንቀጽ 5 መሰረት ያስቀጣል።',
    iconName: 'BookOpen'
  }
];

export const FREQUENTLY_ASKED_LEGAL_QUESTIONS = [
  {
    question: 'Why is this application tied to international laws and treaties?',
    amharicQuestion: 'ለምንድነው ይህ መተግበሪያ እና ድህረገፅ ከዓለም አቀፍ ህግጋት ጋር የተሳሰረው?',
    answer: 'Zebene’s World is a global sovereign congress connecting millions of citizens across continents. For financial, civil, and communicative security to prevail, all participants must operate under predictable, enforceable international standards prohibiting hate, cyber-attacks, financial crimes, and contract breaches.',
    amharicAnswer: 'ይህ መተግበሪያ በዓለም ዙሪያ ያሉ ሰዎችን የሚያገናኝ ዓለም አቀፍ የጋራ መድረክ ነው። የገንዘብ ደህንነት፣ ሰላም እና እርስ በርስ መተማመን እንዲኖር ማንኛውም እንቅስቃሴ በዓለም አቀፍ ህግ፣ በፀረ-ሳይበር ወንጀል እና በፋይናንስ ደንቦች የተገዛ መሆን ግዴታ ስለሆነ ነው።'
  },
  {
    question: 'Can someone be held legally accountable for what they say or do here?',
    amharicQuestion: 'አንድ ሰው እዚህ ውስጥ ለሚናገረው ወይም ለሚያደርገው ነገር በህግ ሊጠየቅ ይችላል?',
    answer: 'Yes, absolutely. Every user registers with verified biometric identity, device hash, and timestamp. Acts of hate incitement, fraud, theft, or defamation are documented with cryptographic forensics and submitted directly to relevant national and international judicial authorities.',
    amharicAnswer: 'አዎ፣ በእርግጠኝነት! እያንዳንዱ ሰው ማንነቱና ባዮሜትሪክ መረጃው ስለሚመዘገብ የጥላቻ ንግግር፣ ስርቆት፣ ማጭበርበር ወይም ስም ማጥፋት የፈጸመ ሰው በዓለም አቀፍና በሀገር ውስጥ ፍርድ ቤቶች ተከሶ ይቀጣል።'
  },
  {
    question: 'Are wedding contracts and loan agreements executed here legally valid?',
    amharicQuestion: 'በዚህ መተግበሪያ ውስጥ የተፈረመ የሰርግ ውል እና የብድር ስምምነት በፍርድ ቤት ተቀባይነት አለው?',
    answer: 'Yes. Under the UNCITRAL Model Law on Electronic Signatures and modern civil procedure codes, cryptographically verified digital agreements with elder and witness assent are legally binding civil contracts admissible in courts of law worldwide.',
    amharicAnswer: 'አዎ! በዓለም አቀፍ የኤሌክትሮኒክስ ፊርማ ህግ (UNCITRAL) መሰረት በሽማግሌዎችና ምስክሮች ፊት በዲጂታል መንገድ የተፈረመ ማንኛውም የጋብቻ ወይም የብድር ውል በማንኛውም ፍርድ ቤት ጽኑ ህጋዊ ማስረጃ ሆኖ ያገለግላል።'
  },
  {
    question: 'How is user privacy protected while enforcing these laws?',
    amharicQuestion: 'የተጠቃሚዎች የግል ሚስጥር (Privacy) እንዴት ነው የሚጠበቀው?',
    answer: 'The platform strictly complies with GDPR and international data standards. Biometric vectors are encrypted, private chambers (like Chamber 4) remain confidential, and records are never sold to advertisers. Data is only inspected under strict lawful court orders or overt criminal violations.',
    amharicAnswer: 'በዓለም አቀፍ የውሂብ ጥበቃ ህግ (GDPR) መሰረት የሰው ምስልና የግል መረጃ በከፍተኛ ሚስጥር የተቆለፈ ነው። ለማስታወቂያ አይሸጥም፤ ሚስጥራዊ ክፍሎች አይቀዱም። ለህግ አካል የሚተላለፈው ግልጽ ወንጀል ሲፈጸም ብቻ ነው።'
  }
];
