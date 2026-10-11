import React, { useState } from 'react';
import {
  X,
  Play,
  Globe2,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Download,
  Info,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import { GlobalEmblem } from './GlobalEmblem';

interface PlayStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInstallPWA: () => void;
}

export const PlayStoreModal: React.FC<PlayStoreModalProps> = ({
  isOpen,
  onClose,
  onOpenInstallPWA,
}) => {
  const [activeTab, setActiveTab] = useState<'why' | 'publish_guide' | 'emblem_meaning' | 'metadata'>('why');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const playStoreMetadata = {
    title: "Zebene's World (ዘበነ የመሰረተው አለም)",
    shortDesc: "Global assembly uniting humanity across 7 sovereign chambers with live multilingual AI translation.",
    shortDescAmharic: "የሰው ልጆችን በአንድነት የሚያስተሳስር የ7ቱ ሉዓላዊ ሸንጎዎች አለም አቀፍ ጉባኤ እና የድምፅ ትርጉም መድረክ።",
    category: "Communication / Social / Education",
    tags: "Global Assembly, Multilingual Translation, Virtual Seats, Offline PWA, Video Congress, Civic Banking",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          title="Close / ዝጋ"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with New International Emblem */}
        <div className="flex items-center space-x-4 pb-5 border-b border-slate-800">
          <GlobalEmblem size="lg" showGlow={true} />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-500/30">
                Official Play Store & Global Identity
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Google Play Store እና ዓለም አቀፍ አርማ
            </h2>
            <p className="text-xs text-amber-400 font-medium">
              Zebene's World Sovereign Identity & Play Store Publication Kit
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 my-4 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('why')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'why'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>ለምን በሰርች አልመጣም?</span>
          </button>

          <button
            onClick={() => setActiveTab('publish_guide')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'publish_guide'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Play Store ላይ መጫኛ (3 ደረጃዎች)</span>
          </button>

          <button
            onClick={() => setActiveTab('emblem_meaning')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'emblem_meaning'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>አዲሱ ዓለም አቀፍ አርማ</span>
          </button>

          <button
            onClick={() => setActiveTab('metadata')}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'metadata'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>የPlay Store መረጃዎች</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 text-slate-300 text-xs sm:text-sm space-y-4">
          {/* TAB 1: WHY ISN'T IT SHOWING IN PLAY STORE SEARCH YET? */}
          {activeTab === 'why' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30">
                <h3 className="font-extrabold text-amber-300 text-sm sm:text-base mb-2 flex items-center gap-2">
                  <span>💡</span> ለምንድነው Google Play Store ላይ ሰርች ሲያደርጉ ያልመጣው?
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  Google Play Store የግል ኩባንያ (Google) የገበያ መደብር ነው። አንድ አፕሊኬሽን በGoogle Play Store
                  የፍለጋ ገጽ ላይ እንዲመጣ ባለቤቱ/አዘጋጁ የ<strong>Google Play Developer Console</strong> አካውንት
                  ከፍቶ ($25 የአንድ ጊዜ ክፍያ ያለው)፣ አፕሊኬሽኑን አስገብቶ የGoogle ይሁንታ (App Review) ማግኘት አለበት።
                  ያ ካልተደረገ Google በራሱ ፈልጎ አያወጣውም።
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>አሁን በቀጥታ እንዴት እየሰራ ነው?</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    አፕሊኬሽኑ በዘመናዊው <strong>Progressive Web App (PWA)</strong> ቴክኖሎጂ የተሰራ በመሆኑ፤ ማንኛውም ሰው
                    Play Store ሳይጠብቅ <strong>በቀጥታ በስልኩ ላይ "Install / Add to Home screen"</strong> በማድረግ
                    ልክ እንደ Play Store አፕ ሙሉ በሙሉ <strong>ኦፍላይንም ሆነ ኦንላይን</strong> መጠቀም ይችላል!
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                    <Globe2 className="w-4 h-4 shrink-0" />
                    <span>በዋናው Play Store ላይ ማንም እንዲያገኘውስ?</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    ይህ አፕሊኬሽን 100% የGoogle PWA መስፈርትን ስላሟላ፣ በGoogle ይፋዊ አጋር (PWABuilder / TWA)
                    በኩል በ10 ደቂቃ ውስጥ ወደ <strong>.aab (Android App Bundle)</strong> ተቀይሮ ወደ Play Store መጫን ይችላል!
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">
                    የአሁኑን አፕሊኬሽን በስልክዎ ለመጫን ይፈልጋሉ?
                  </h4>
                  <p className="text-slate-400 text-xs">
                    ያለ ምንም Play Store መዘግየት ወዲያውኑ በስልክዎ ስክሪን ላይ እንደ አፕ ይጫናል!
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenInstallPWA();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shrink-0 shadow-lg shadow-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  <span>በስልክህ ጫነው (Install App)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP PUBLISHING GUIDE */}
          {activeTab === 'publish_guide' && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300">
                አፕሊኬሽኑን በዋናው Google Play Store ላይ ለዓለም ህዝብ ለመጫን የሚከተሉትን 3 ደረጃዎች ይከተሉ፡
              </div>

              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-sm">
                    1
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-white text-sm">
                      የGoogle Play Android Package (.aab) በ1 ጠቅታ ማዘጋጀት
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      ወደ Google ይፋዊ የPWA ፓኬጅ ማዘጋጃ ድረ-ገጽ (<strong>PWABuilder.com</strong>) ይሂዱ።
                      የዚህን አፕሊኬሽን አድራሻ ያስገቡ። "Build Android Package" የሚለውን ይጫኑ። የተፈረመ የGoogle Play 
                      Bundle (<strong>.aab</strong>) ፋይል በነፃ ይሰጥዎታል።
                    </p>
                    <div className="pt-1">
                      <a
                        href="https://www.pwabuilder.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold underline"
                      >
                        <span>PWABuilder ይክፈቱ (pwabuilder.com)</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-rose-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                    2
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-white text-sm">
                      Google Play Console አካውንት መክፈት
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      በ <strong>play.google.com/console</strong> በመግባት የGoogle Developer አካውንት ይመዝገቡ
                      (ይህ የGoogle $25 የአንድ ጊዜ ክፍያ ነው)። "Create App" የሚለውን ተጭነው የአፑን ስም 
                      <strong> "Zebene's World (ዘበነ የመሰረተው አለም)"</strong> ብለው ይመዝግቡ።
                    </p>
                    <div className="pt-1">
                      <a
                        href="https://play.google.com/console"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold underline"
                      >
                        <span>Google Play Console ይክፈቱ</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500 text-white font-black flex items-center justify-center shrink-0 text-sm">
                    3
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-white text-sm">
                      .aab ፋይሉን መጫን እና ማተም (Submit for Review)
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      ከደረጃ 1 ያወረዱትን <strong>.aab</strong> ፋይል በPlay Console ላይ ይጫኑ። ቀጥሎ ከታች "የPlay Store መረጃዎች"
                      የሚለውን ታብ ተጭነው የተዘጋጁትን ማብራሪያዎች፣ አዲሱን ዓለም አቀፍ አርማ እና ስክሪንሾት አስገብተው
                      "Send for Review" ይበሉ። በ24-48 ሰዓት ውስጥ Google አጽድቆ በዓለም ዙሪያ በPlay Store ሰርች ላይ ያወጣዋል!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NEW INTERNATIONAL EMBLEM SHOWCASE */}
          {activeTab === 'emblem_meaning' && (
            <div className="space-y-4">
              <div className="text-center p-6 bg-slate-950 rounded-2xl border border-amber-500/30 flex flex-col items-center">
                <GlobalEmblem size="xl" showGlow={true} />
                <h3 className="text-lg font-black text-white mt-3">
                  የዘበነ ዓለም ይፋዊ ዓለም አቀፍ አርማ (Sovereign International Seal)
                </h3>
                <p className="text-xs text-amber-300 max-w-md mt-1">
                  የዓለም አቀፍ አንድነትን፣ ሰላምን እና የ7ቱን ሉዓላዊ ሸንጎዎች ስልጣኔ የሚገልጽ ውብ እና ማራኪ ቅርጽ።
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>🌍</span> ዓለም አቀፍ ምህዋር (Celestial Orbit & Grid)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    መላውን ዓለም የሚያስተሳስር የፕላኔት ምህዋር እና የሳተላይት መረብ፣ የሰው ልጅ ያለምንም ድንበር በቪዲዮና
                    በድምፅ እንዲገናኝ የሚያደርግ።
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>⭐</span> 7ቱ የወርቅ ከዋክብት (7 Sovereign Stars)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    በአርማው ዙሪያ ያሉ 7ቱ ከዋክብት 7ቱን ሉዓላዊ ሸንጎዎች (የአለም ህዝብ፣ ሊቃውንት፣ ንግድ፣ ወጣቶች፣ ሰርግ፣ የበጎ አድራጎት፣ የፍርድ) ይወክላሉ።
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>🌿</span> የሰላም የወይራ ቅርንጫፍ (Peace Laurel Wreath)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    በመሀል ላይ የተዘረጋው የወርቅ የወይራ ቅርንጫፍ ለዓለም ህዝቦች የሰላም፣ የእርቅ እና የመከባበር ሉዓላዊ ቃል ኪዳን መሆኑን ያበስራል።
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>👑</span> ወርቃማው ZW ሞኖግራም (24K Gold Monogram)
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    በጥልቅ ጥቁር ሰማያዊ ሜዳሊያ መሃል የተጻፈው "ZW" (Zebene's World) ወርቃማ የቅንጦት እና የአለም አቀፍ ደረጃ መገለጫ ነው።
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PLAY STORE METADATA (READY FOR COPY) */}
          {activeTab === 'metadata' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Play Console ላይ ሲመዘገቡ የሚሞሏቸው መረጃዎች በሙሉ እዚህ ተዘጋጅተውሎታል፤ በቀላሉ "Copy" በማድረግ መለጠፍ ይችላሉ፦
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">App Name (የአፕሊኬሽኑ ስም):</span>
                  <button
                    onClick={() => handleCopy(playStoreMetadata.title, 'title')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                  >
                    {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'title' ? 'ኮፒ ተደርጓል!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 bg-slate-900 rounded font-mono text-xs text-amber-300">
                  {playStoreMetadata.title}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Short Description (አጭር ማብራሪያ - Amharic):</span>
                  <button
                    onClick={() => handleCopy(playStoreMetadata.shortDescAmharic, 'shortAm')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                  >
                    {copiedKey === 'shortAm' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'shortAm' ? 'ኮፒ ተደርጓል!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 bg-slate-900 rounded text-xs text-slate-200">
                  {playStoreMetadata.shortDescAmharic}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Short Description (English):</span>
                  <button
                    onClick={() => handleCopy(playStoreMetadata.shortDesc, 'shortEn')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                  >
                    {copiedKey === 'shortEn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'shortEn' ? 'ኮፒ ተደርጓል!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 bg-slate-900 rounded text-xs text-slate-200">
                  {playStoreMetadata.shortDesc}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Category & Tags (ምድብ):</span>
                  <button
                    onClick={() => handleCopy(playStoreMetadata.tags, 'tags')}
                    className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold"
                  >
                    {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'tags' ? 'ኮፒ ተደርጓል!' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 bg-slate-900 rounded text-xs text-slate-300">
                  {playStoreMetadata.category} — {playStoreMetadata.tags}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Asset Links & PWA Manifest Verified 100%</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenInstallPWA();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors"
            >
              አፑን በስልክ ጫን
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-amber-500/20"
            >
              ተረድቻለሁ / ዝጋ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
