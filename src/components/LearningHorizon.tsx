import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { requestAITutorLesson, TutorResponse } from '../services/api';
import { OFFLINE_LESSONS, OfflineLesson } from '../data/offlineData';
import {
  BookOpen,
  Search,
  Sparkles,
  CheckCircle,
  HelpCircle,
  GraduationCap,
  Layers,
  ArrowRight,
  Lightbulb,
  WifiOff,
  Zap,
} from 'lucide-react';

export const LearningHorizon: React.FC = () => {
  const { userLanguage, rewardUserAction } = useApp();
  const [query, setQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState('Technology & Artificial Intelligence');
  const [isLoading, setIsLoading] = useState(false);
  const [lesson, setLesson] = useState<TutorResponse | null>({
    title: 'Modern Agricultural Technology & Smart Drip Irrigation',
    summary:
      'Smart agricultural engineering combines automated solar pumps, soil moisture sensors, and optimized crop genetics to achieve 400% food yields even in arid rural regions.',
    historicalContext:
      'From ancient Nile irrigation systems and terraced highlands to 21st-century IoT telemetry and precision micro-irrigation.',
    keyConcepts: [
      'Solar-Powered Micro-Drip Infrastructure: Minimizes water evaporation by 80% directly delivering nutrients to plant root zones.',
      'Precision Soil Moisture Sensors: Inexpensive telemetry probes reporting moisture levels via SMS to local farmer handsets.',
      'Regenerative Agronomy: Crop rotation with indigenous drought-resistant legumes to naturally enrich nitrogen levels without synthetic fertilizer.'
    ],
    stepByStepGuide: [
      'Step 1: Conduct baseline soil pH and seasonal rainfall assessment.',
      'Step 2: Deploy gravity-fed or low-pressure solar pumps connected to drip tubes.',
      'Step 3: Organize community farmer cooperatives for shared wholesale distribution and seed banking.'
    ],
    realWorldImpact:
      'Eradicates seasonal famine, provides nutritious school meals for orphans, and creates generational income for rural youth and women farmers.',
    quickQuiz: [
      {
        question: 'What is the primary water conservation advantage of precision drip irrigation over flood irrigation?',
        options: [
          'It delivers water directly to root systems, slashing evaporation by up to 80%',
          'It requires massive diesel generators to operate',
          'It only works inside high-tech indoor greenhouses',
          'It eliminates the need for sunlight'
        ],
        correctIndex: 0,
        explanation: 'Drip systems apply water directly at root zones, preventing evaporative runoff.'
      }
    ]
  });

  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const popularDisciplines = [
    { title: 'Artificial Intelligence & Software', topic: 'Technology' },
    { title: 'Smart Irrigation & Modern Farming', topic: 'Agriculture' },
    { title: 'Cardiovascular Health & Medicine', topic: 'Healthcare' },
    { title: 'Sovereign Macroeconomics & Banking', topic: 'Economics' },
    { title: 'Renewable Solar & Geothermal Energy', topic: 'Energy' },
    { title: 'International Law & Human Rights', topic: 'Diplomacy' },
  ];

  const handleSearch = async (searchQuery: string, topicName: string = activeTopic) => {
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    setQuizSubmitted(false);
    setSelectedQuizAnswers({});

    const res = await requestAITutorLesson(
      searchQuery,
      topicName,
      userLanguage === 'am' ? 'Amharic' : 'English'
    );
    setLesson(res);
    setIsLoading(false);
    rewardUserAction('game'); // Reward for knowledge pursuit!
  };

  const handleSelectQuiz = (qIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
  };

  const loadOfflineLesson = (offLesson: OfflineLesson) => {
    setLesson({
      title: `${offLesson.title} (${offLesson.amharicTitle})`,
      summary: offLesson.summary,
      historicalContext: offLesson.historicalContext,
      keyConcepts: offLesson.keyConcepts,
      stepByStepGuide: offLesson.stepByStepGuide,
      realWorldImpact: offLesson.realWorldImpact,
      quickQuiz: offLesson.quickQuiz,
      isOffline: true,
    });
    setQuizSubmitted(false);
    setSelectedQuizAnswers({});
    rewardUserAction('game');
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>AI Automated Learning Horizon (የትምህርት አድማስ)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Universal Knowledge & Curriculum Generator
          </h1>
          <p className="text-sm text-slate-300">
            Search any field of human civilization, science, or art. Our AI generates comprehensive, master-level modules adapted for global learners in any language.
          </p>

          {/* Search Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="pt-2 flex items-center space-x-2 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any discipline (e.g., Quantum Computing, Renewable Energy, Economics)..."
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-transform active:scale-95 shrink-0"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Explore Subject</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Buttons */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 py-1 text-[11px] font-semibold">Suggested Fields:</span>
            {popularDisciplines.map((d) => (
              <button
                key={d.title}
                onClick={() => {
                  setQuery(d.title);
                  setActiveTopic(d.topic);
                  handleSearch(d.title, d.topic);
                }}
                className="px-2.5 py-1 bg-slate-900/80 hover:bg-indigo-900/40 text-slate-300 hover:text-white border border-slate-700/80 rounded-lg text-[11px] transition-colors"
              >
                {d.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Offline Knowledge Vault (የኦፍላይን እውቀት ማህደር) - 100% Pre-cached Modules */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <span>Offline Knowledge Vault</span>
                <span className="text-amber-400 font-serif">(የኦፍላይን እውቀት ማህደር)</span>
              </h3>
              <p className="text-[11px] text-slate-400">
                ኢንተርኔት በሌለበት ጊዜና ቦታ በቀጥታ የሚከፈቱ የተዘጋጁ ሙያዊ ትምህርቶች (Pre-cached Sovereign Masterclasses)
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-semibold shrink-0">
            ⚡ 100% Offline Ready
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OFFLINE_LESSONS.map((ol) => (
            <button
              key={ol.id}
              onClick={() => loadOfflineLesson(ol)}
              className="text-left p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/50 transition-all group space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                <span>{ol.amharicCategory}</span>
                <span className="text-slate-500 group-hover:text-amber-300 transition-colors">ክፈት →</span>
              </div>
              <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                {ol.title}
              </h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {ol.amharicTitle} — {ol.summary}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Lesson Content */}
      {lesson && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          {/* Module Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center space-x-2 text-xs text-indigo-400 font-bold">
                <BookOpen className="w-4 h-4" />
                <span>Standard Sovereign Masterclass • Self-Paced Learning</span>
              </div>
              {lesson.isOffline && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <WifiOff className="w-3 h-3 text-amber-400" />
                  <span>Offline Knowledge Loaded (ያለ ኢንተርኔት የተጫነ)</span>
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100">
              {lesson.title}
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {lesson.summary}
            </p>
          </div>

          {/* Historical Genesis */}
          {lesson.historicalContext && (
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" />
                <span>Historical Evolution & Milestones</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lesson.historicalContext}
              </p>
            </div>
          )}

          {/* Core Theoretical Principles */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Foundational Concepts & Principles</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lesson.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-1.5"
                >
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/20">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{concept}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Step-by-Step Guide */}
          {lesson.stepByStepGuide && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" />
                <span>Actionable Field Implementation Steps</span>
              </h3>
              <div className="space-y-2">
                {lesson.stepByStepGuide.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-emerald-950/10 border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-emerald-200 flex items-start space-x-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Real-World Societal Impact */}
          {lesson.realWorldImpact && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5">
              <h4 className="font-bold text-xs text-amber-300 uppercase tracking-wider">
                Community & Sovereign Impact
              </h4>
              <p className="text-xs sm:text-sm text-slate-200">
                {lesson.realWorldImpact}
              </p>
            </div>
          )}

          {/* Interactive Self-Check Quiz */}
          {lesson.quickQuiz && lesson.quickQuiz.length > 0 && (
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Knowledge Checkpoint & Certification Quiz</span>
                </h3>
                <span className="text-xs text-amber-400 font-semibold">+50 ETB Reward for Completion</span>
              </div>

              {lesson.quickQuiz.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-slate-100">
                    Q{qIdx + 1}: {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options?.map((opt, optIdx) => {
                      const isSelected = selectedQuizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex !== undefined && q.correctIndex === optIdx;
                      let btnStyle = 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800';

                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600/30 border-indigo-400 text-white font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuiz(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && q.explanation && (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={quizSubmitted}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  {quizSubmitted ? 'Quiz Evaluated' : 'Submit Answers & Verify'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
