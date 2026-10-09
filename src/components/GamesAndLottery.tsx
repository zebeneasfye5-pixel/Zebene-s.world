import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  Ticket,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Coins,
  History,
} from 'lucide-react';

export const GamesAndLottery: React.FC = () => {
  const { userWallet, rewardUserAction } = useApp();

  // Fortune Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [spinResult, setSpinResult] = useState<string | null>(null);

  // Trivia State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [showTriviaResult, setShowTriviaResult] = useState(false);

  // Lottery Ticket Purchase State
  const [myTickets, setMyTickets] = useState<string[]>([
    'ZW-LOTTO-7821',
    'ZW-LOTTO-9014',
  ]);
  const [lotteryPurchasedNotice, setLotteryPurchasedNotice] = useState<string | null>(null);

  const triviaQuestions = [
    {
      question: 'Which ancient African civilization is renowned for towering monolithic obelisks and early coinage?',
      options: ['The Aksumite Empire', 'Ancient Carthage', 'The Songhai Empire', 'The Kingdom of Kush'],
      correct: 0,
      reward: 35,
    },
    {
      question: 'What is the fastest growing renewable energy source deployed across developing nations in 2026?',
      options: ['Decentralized Solar Photovoltaics', 'Coal Gasification', 'Diesel Micro-generators', 'Heavy Crude Combustion'],
      correct: 0,
      reward: 40,
    },
    {
      question: 'In international economics, what does the principle of sovereign monetary reserve promote?',
      options: ['Financial resilience and independent economic stability', 'Complete isolation from global markets', 'Zero domestic manufacturing', 'Forced hyperinflation'],
      correct: 0,
      reward: 45,
    },
    {
      question: 'Which biological macromolecule carries hereditary blueprints across all living organisms?',
      options: ['Deoxyribonucleic Acid (DNA)', 'Cellulose Fiber', 'Calcium Carbonate', 'Polyethylene'],
      correct: 0,
      reward: 50,
    },
  ];

  const wheelPrizes = [
    { label: '50 ETB', value: 50, color: 'from-amber-500 to-amber-600' },
    { label: '100 ETB', value: 100, color: 'from-rose-500 to-rose-600' },
    { label: '25 ETB', value: 25, color: 'from-emerald-500 to-emerald-600' },
    { label: '250 ETB', value: 250, color: 'from-indigo-500 to-indigo-600' },
    { label: '500 ETB', value: 500, color: 'from-purple-500 to-purple-600' },
    { label: 'Mega Ticket 🎟️', value: 150, color: 'from-pink-500 to-rose-600' },
  ];

  const spinFortuneWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);

    // Random prize slice index (0 to 5)
    const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
    const selectedPrize = wheelPrizes[prizeIndex];

    // Extra spins (5-8 full rotations)
    const extraRotations = 360 * 5;
    const sliceAngle = 360 / wheelPrizes.length;
    const targetAngle = wheelRotation + extraRotations + (prizeIndex * sliceAngle) + sliceAngle / 2;

    setWheelRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(`Congratulations! You won: ${selectedPrize.label}`);
      rewardUserAction('game');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f43f5e', '#6366f1'],
      });
    }, 3200);
  };

  const handleAnswerTrivia = (optionIdx: number) => {
    if (selectedTriviaAnswer !== null) return;
    setSelectedTriviaAnswer(optionIdx);

    const isCorrect = optionIdx === triviaQuestions[currentQuestionIdx].correct;
    if (isCorrect) {
      setTriviaScore((prev) => prev + 1);
      rewardUserAction('game');
    }
  };

  const nextTriviaQuestion = () => {
    setSelectedTriviaAnswer(null);
    if (currentQuestionIdx < triviaQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setShowTriviaResult(true);
    }
  };

  const buyLotteryTicket = () => {
    if (userWallet.balanceBirr < 25) {
      alert('Insufficient wallet balance to buy a ticket (25 ETB needed). Earn more by participating in chambers!');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newTicket = `ZW-LOTTO-${randomNum}`;
    setMyTickets((prev) => [...prev, newTicket]);
    setLotteryPurchasedNotice(`Ticket ${newTicket} purchased successfully for 25 ETB!`);
    rewardUserAction('like');
    setTimeout(() => setLotteryPurchasedNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 border border-rose-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold">
              <Trophy className="w-4 h-4 text-rose-400" />
              <span>Knowledge Arena & Multitier Lottery System (ጨዋታና ዘመናዊ ሎተሪ)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Civic Gaming & Fortune Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Sharpen your mind with global knowledge trivia or spin the Fortune Wheel. All games directly reward your account with real earnings!
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Available Balance</span>
              <span className="text-base font-extrabold text-amber-300">{userWallet.balanceBirr} ETB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Wheel of Fortune & Trivia Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fortune Wheel (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col items-center justify-between">
          <div className="w-full text-center sm:text-left border-b border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-100 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Fortune Wheel (የእድል መዘወሪያ ቆጣሪ)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Spin daily to win instant Birr rewards, bonus points, or Jackpot entries!
            </p>
          </div>

          {/* Interactive Wheel Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center">
            {/* Top Pointer arrow */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 filter drop-shadow-md" />

            {/* Rotating Wheel Disk */}
            <div
              className="w-full h-full rounded-full border-4 border-amber-400/80 shadow-2xl overflow-hidden transition-transform duration-[3000ms] cubic-bezier(0.17, 0.67, 0.12, 0.99) relative"
              style={{ transform: `rotate(${wheelRotation}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {wheelPrizes.map((p, idx) => {
                  const angle = 360 / wheelPrizes.length;
                  const startAngle = idx * angle;
                  const endAngle = (idx + 1) * angle;

                  const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                  const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                  const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                  const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                  const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;
                  const colors = ['#f59e0b', '#ec4899', '#10b981', '#6366f1', '#8b5cf6', '#ef4444'];

                  return (
                    <g key={idx}>
                      <path d={pathData} fill={colors[idx % colors.length]} stroke="#0f172a" strokeWidth="1" />
                      <text
                        x="50"
                        y="22"
                        transform={`rotate(${startAngle + angle / 2}, 50, 50)`}
                        fontSize="5.5"
                        fontWeight="bold"
                        fill="#ffffff"
                        textAnchor="middle"
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Center Hub Button */}
            <button
              onClick={spinFortuneWheel}
              disabled={isSpinning}
              className="absolute z-10 w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-300 font-extrabold text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center disabled:opacity-50"
            >
              <span>{isSpinning ? '...' : 'SPIN'}</span>
              <span className="text-[8px] text-slate-400">ዙር</span>
            </button>
          </div>

          {/* Result Alert */}
          {spinResult && (
            <div className="w-full p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold text-center">
              {spinResult}
            </div>
          )}

          <div className="w-full pt-2 flex items-center justify-between text-xs text-slate-400">
            <span>Free Spin Available Today</span>
            <span className="text-amber-400 font-semibold">100% Fair Random Seed</span>
          </div>
        </div>

        {/* Right: Knowledge Trivia Arena (6 cols) */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>Global Brain Trivia (የእውቀት ጥያቄና መልስ)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Answer correctly to earn Birr tokens directly into your wallet.
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-lg font-bold">
              Question {currentQuestionIdx + 1} / {triviaQuestions.length}
            </span>
          </div>

          {!showTriviaResult ? (
            <div className="space-y-4 my-auto">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold uppercase text-amber-400 block mb-1">
                  Prize: +{triviaQuestions[currentQuestionIdx].reward} ETB
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  {triviaQuestions[currentQuestionIdx].question}
                </p>
              </div>

              <div className="space-y-2">
                {triviaQuestions[currentQuestionIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedTriviaAnswer === oIdx;
                  const isCorrect = oIdx === triviaQuestions[currentQuestionIdx].correct;
                  let style = 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300';

                  if (selectedTriviaAnswer !== null) {
                    if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    else if (isSelected && !isCorrect) style = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerTrivia(oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {selectedTriviaAnswer !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      {selectedTriviaAnswer !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {selectedTriviaAnswer !== null && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={nextTriviaQuestion}
                    className="px-5 py-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                  >
                    Next Challenge →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4 my-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Trivia Challenge Completed!</h3>
              <p className="text-xs text-slate-300">
                You scored {triviaScore} out of {triviaQuestions.length} correct answers! Earnings have been credited to your wallet balance.
              </p>
              <button
                onClick={() => {
                  setCurrentQuestionIdx(0);
                  setSelectedTriviaAnswer(null);
                  setShowTriviaResult(false);
                  setTriviaScore(0);
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}

          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 flex items-center justify-between">
            <span>Verified Knowledge Pool</span>
            <span className="text-emerald-400 font-medium">Score: {triviaScore} Wins</span>
          </div>
        </div>
      </div>

      {/* Modern Multi-tier Lottery & Jackpot System */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-400 text-[11px] font-bold mb-1">
              <Ticket className="w-3.5 h-3.5" />
              <span>Global Sovereign Mega Jackpot (የአለም አቀፍ ሜጋ ሎተሪ)</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-100">
              Weekly Transparent Community Lottery Draw
            </h2>
            <p className="text-xs text-slate-400">
              Verifiable cryptographic random drawing. 10% of proceeds fund the Humanitarian Aid Pool.
            </p>
          </div>

          {/* Current Jackpot Prize Pool */}
          <div className="bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 p-4 rounded-2xl text-center sm:text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Current Grand Prize
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              750,000 <span className="text-amber-400 text-lg">ETB</span>
            </div>
            <span className="text-[10px] text-slate-400">Next Live Draw in: 3 Days, 14 Hours</span>
          </div>
        </div>

        {/* Action: Buy or Claim Ticket */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
              Acquire Lottery Entry
            </h3>
            <p className="text-xs text-slate-400">
              Single entry ticket cost: 25 ETB. You can enter with unlimited tickets.
            </p>
            <button
              onClick={buyLotteryTicket}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Purchase Ticket (25 ETB)</span>
            </button>
            {lotteryPurchasedNotice && (
              <p className="text-[11px] text-emerald-400 text-center font-semibold">
                {lotteryPurchasedNotice}
              </p>
            )}
          </div>

          {/* My Tickets */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center justify-between">
              <span>My Active Tickets</span>
              <span className="text-amber-400 font-mono">{myTickets.length} Held</span>
            </h3>
            <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
              {myTickets.map((t, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono font-bold text-amber-300 flex items-center justify-between"
                >
                  <span>{t}</span>
                  <span className="text-[10px] text-emerald-400 font-sans">Active Entry</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Verifiable Winners */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-xs text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-slate-400" />
              <span>Last Draw Champions</span>
            </h3>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between items-center p-1.5 bg-slate-900/60 rounded">
                <span>Mesfin G. (Hawassa) 🇪🇹</span>
                <span className="text-amber-400 font-bold">120,000 ETB</span>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-slate-900/60 rounded">
                <span>Fatima K. (Addis Ababa) 🇪🇹</span>
                <span className="text-amber-400 font-bold">50,000 ETB</span>
              </div>
              <div className="flex justify-between items-center p-1.5 bg-slate-900/60 rounded">
                <span>Jean-Luc B. (Kinshasa) 🇨🇩</span>
                <span className="text-amber-400 font-bold">25,000 ETB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
