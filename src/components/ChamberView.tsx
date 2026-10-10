import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  Send,
  PlusCircle,
  ShieldCheck,
  Radio,
  Share2,
  ThumbsUp,
  Hand,
  FileBadge,
  Sparkles,
  TreeDeciduous,
  Lock,
  Heart,
  BookOpen,
  Award,
  RefreshCw,
  Camera,
  Users,
  Eye,
  Maximize2,
} from 'lucide-react';
import { speakText, initSpeechRecognition } from '../services/speech';
import { WeddingContractModal } from './WeddingContractModal';
import { ChamberRegistrationModal } from './ChamberRegistrationModal';

export const ChamberView: React.FC = () => {
  const {
    activeChamber,
    activeChamberCode,
    seats,
    myCurrentSeat,
    isMyMicOn,
    isMyVideoOn,
    userLanguage,
    messages,
    claimSeat,
    leaveSeat,
    toggleMic,
    toggleVideo,
    sendMessage,
    rewardUserAction,
    autoTranslateEnabled,
    setAutoTranslateEnabled,
    currentUser,
    chamberRegistrations,
    chamberMembersRegistry,
    activeCameraStream,
    cameraStatus,
    cameraFacingMode,
    toggleCameraFacingMode,
    startUserCamera,
    stopUserCamera,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [weddingModalOpen, setWeddingModalOpen] = useState(false);
  const [chamberRegModalOpen, setChamberRegModalOpen] = useState(false);
  const [expandedSeatCount, setExpandedSeatCount] = useState(36);
  const [videoMode, setVideoMode] = useState<'split' | 'podium' | 'self'>('split');

  // Callback ref for binding camera stream reliably to video element
  const videoNodeRef = useRef<HTMLVideoElement | null>(null);
  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoNodeRef.current = node;
    if (node && activeCameraStream) {
      node.srcObject = activeCameraStream;
      node.play().catch((err) => console.log('Video play catch:', err));
    }
  }, [activeCameraStream]);

  // Secondary preview ref
  const pipVideoRef = useCallback((node: HTMLVideoElement | null) => {
    if (node && activeCameraStream) {
      node.srcObject = activeCameraStream;
      node.play().catch(() => {});
    }
  }, [activeCameraStream]);

  // Auto scroll chat
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Speech Recognition hook
  const handleMicVoiceInput = () => {
    if (isListeningMic) {
      setIsListeningMic(false);
      return;
    }

    const recognizer = initSpeechRecognition(
      (transcript) => {
        setInputText(transcript);
        setIsListeningMic(false);
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsListeningMic(false);
      }
    );

    if (recognizer.isSupported) {
      setIsListeningMic(true);
      recognizer.start();
    } else {
      alert('Speech Recognition not supported in this browser. You can type in any language directly below!');
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSending) return;

    setIsSending(true);
    const text = inputText;
    setInputText('');
    await sendMessage(text);
    setIsSending(false);
  };

  const handleLikeSession = () => {
    rewardUserAction('like');
  };

  const handleShareSession = () => {
    rewardUserAction('share');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Chamber invitation link copied to clipboard! Share with family and friends.');
    }
  };

  // Check if current user is registered in this chamber
  const userRegistration = chamberRegistrations[activeChamberCode];
  const chamberMembers = chamberMembersRegistry[activeChamberCode] || [];

  // Active speaker on auditorium
  const activeSpeakerSeat = seats.find((s) => s.occupiedBy?.isSpeaking) || seats.find((s) => s.occupiedBy !== null);

  return (
    <div className="space-y-6">
      {/* Modals */}
      <WeddingContractModal isOpen={weddingModalOpen} onClose={() => setWeddingModalOpen(false)} />
      <ChamberRegistrationModal
        isOpen={chamberRegModalOpen}
        onClose={() => setChamberRegModalOpen(false)}
      />

      {/* Chamber Header & Strict Isolation Shield */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${activeChamber.color} opacity-10 blur-3xl pointer-events-none`} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs">
                Chamber #{activeChamber.code}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                {activeChamber.badge}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Strict Chamber Isolation Active</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-100 flex items-center gap-2">
              <span>{activeChamber.name}</span>
              <span className="text-amber-400 font-serif text-lg font-bold">({activeChamber.amharicName})</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              {activeChamber.description}
            </p>
          </div>

          {/* Social Engagement & Registration Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setChamberRegModalOpen(true)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 shadow-sm ${
                userRegistration
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20'
                  : 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md animate-pulse'
              }`}
            >
              <FileBadge className="w-3.5 h-3.5" />
              <span>
                {userRegistration
                  ? `Badge: ${userRegistration.badgeId}`
                  : 'የቤቱ መመዝገቢያ (Chamber Registry)'}
              </span>
            </button>

            <button
              onClick={handleLikeSession}
              title="Like & Support this Chamber Assembly"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Like & Earn</span>
            </button>

            <button
              onClick={handleShareSession}
              title="Share Chamber Link"
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share & Invite</span>
            </button>

            {activeChamberCode === 5 && (
              <button
                onClick={() => setWeddingModalOpen(true)}
                className="px-3.5 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-500/20 flex items-center space-x-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Wedding Registry</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Per-Chamber Initial Registration Notice Bar (if not yet registered in this house) */}
      {!userRegistration && (
        <div className="bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-indigo-500/15 border border-amber-500/40 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
              <FileBadge className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-amber-200">
                ማስታወሻ፡ በChamber #{activeChamberCode} ({activeChamber.amharicName}) እስካሁን አልተመዘገቡም!
              </p>
              <p className="text-[11px] text-slate-300">
                እያንዳንዱ ቤት ራሱን የቻለ የመጀመሪያ የአባላት መመዝገቢያ አለው። አሁኑኑ ተመዝግበው ህጋዊ የቤቱን ባጅ ያግኙ።
              </p>
            </div>
          </div>

          <button
            onClick={() => setChamberRegModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-transform active:scale-95 shrink-0"
          >
            አሁኑኑ ይመዝገቡ (Register in this House) →
          </button>
        </div>
      )}

      {/* Main Assembly Floor & HD Video Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): HD Face-to-Face Video Stage & Numbered Seats */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Visual Podium / Active Video Screen */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
            {/* View Mode Toolbar on Video Box */}
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-slate-200 text-xs">
                  Face-to-Face HD Video Stage (የፊት ለፊት ጥራት ያለው ቪዲዮ)
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono">
                  1080p HD Active
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setVideoMode('split')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dual Split View
                </button>
                <button
                  onClick={() => setVideoMode('self')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'self' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My HD Camera
                </button>
                <button
                  onClick={() => setVideoMode('podium')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'podium' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Podium Focus
                </button>
              </div>
            </div>

            {/* Video Stage Container */}
            <div className="aspect-video w-full bg-slate-950 relative flex items-center justify-center overflow-hidden">
              {/* Split View: Podium Speaker + My Front Camera side by side */}
              {videoMode === 'split' && (
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  {/* Left Half: Podium Broadcaster */}
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
                    {activeSpeakerSeat?.occupiedBy ? (
                      <>
                        <img
                          src={activeSpeakerSeat.occupiedBy.userAvatar}
                          alt={activeSpeakerSeat.occupiedBy.userName}
                          className="w-28 h-28 rounded-2xl object-cover shadow-2xl border-2 border-amber-400/80 ring-4 ring-amber-500/20"
                        />
                        <div className="absolute bottom-10 flex items-center gap-1">
                          {[12, 24, 18, 36, 28, 44, 20].map((h, idx) => (
                            <span
                              key={idx}
                              className="w-1 bg-gradient-to-t from-amber-500 to-rose-400 rounded-full animate-pulse"
                              style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }}
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] font-bold text-slate-100">
                          Podium: {activeSpeakerSeat.occupiedBy.userName} (Seat #{activeSpeakerSeat.seatNumber})
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 text-slate-400 text-xs">
                        <Radio className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-pulse" />
                        <p>Podium Open for Speaking</p>
                      </div>
                    )}
                  </div>

                  {/* Right Half: User Front-Facing Video */}
                  <div className="relative w-full h-full flex items-center justify-center bg-slate-950 overflow-hidden">
                    {isMyVideoOn && activeCameraStream ? (
                      <>
                        <video
                          ref={setVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover transform -scale-x-100"
                        />
                        <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span>Your HD Camera Live</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 space-y-2">
                        <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400">
                          <Camera className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-slate-300 font-semibold">Your Front Camera is Idle</p>
                        <p className="text-[11px] text-slate-400">
                          Click below to start crystal-clear front-facing HD video!
                        </p>
                        <button
                          onClick={toggleVideo}
                          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                        >
                          ካሜራ ክፈት (Start Camera)
                        </button>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] font-bold text-amber-300">
                      You: {currentUser.fullName}
                    </div>
                  </div>
                </div>
              )}

              {/* Full Self View */}
              {videoMode === 'self' && (
                <div className="w-full h-full relative flex items-center justify-center bg-slate-950">
                  {isMyVideoOn && activeCameraStream ? (
                    <video
                      ref={setVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-3">
                      <Camera className="w-12 h-12 text-amber-400 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-100">Activate High-Definition Front Video</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Allow camera permissions to transmit crystal-clear 1080p face video to the chamber auditorium.
                      </p>
                      <button
                        onClick={toggleVideo}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg"
                      >
                        ካሜራ ክፈት (Start Front Camera)
                      </button>
                    </div>
                  )}
                  {/* PiP of Podium speaker if present */}
                  {activeSpeakerSeat?.occupiedBy && (
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-slate-900 border-2 border-amber-400 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                      <img
                        src={activeSpeakerSeat.occupiedBy.userAvatar}
                        alt="Speaker"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-white">
                        {activeSpeakerSeat.occupiedBy.userName.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Full Podium View */}
              {videoMode === 'podium' && (
                <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
                  {activeSpeakerSeat?.occupiedBy ? (
                    <>
                      <img
                        src={activeSpeakerSeat.occupiedBy.userAvatar}
                        alt={activeSpeakerSeat.occupiedBy.userName}
                        className="w-36 h-36 rounded-2xl object-cover shadow-2xl border-2 border-amber-400/80 ring-4 ring-amber-500/20"
                      />
                      <div className="absolute bottom-16 flex items-center gap-1">
                        {[12, 24, 18, 36, 28, 44, 20, 32, 16, 26].map((h, idx) => (
                          <span
                            key={idx}
                            className="w-1.5 bg-gradient-to-t from-amber-500 to-rose-400 rounded-full animate-pulse"
                            style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/80 text-xs font-bold text-slate-100">
                        Speaker: {activeSpeakerSeat.occupiedBy.userName} ({activeSpeakerSeat.occupiedBy.userNationality})
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8 space-y-2">
                      <Radio className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                      <p className="text-sm font-bold text-slate-200">The Assembly Floor is Open</p>
                      <p className="text-xs text-slate-400">Claim a seat below to speak on the podium!</p>
                    </div>
                  )}

                  {/* PiP of User Camera */}
                  {isMyVideoOn && activeCameraStream && (
                    <div className="absolute bottom-4 right-4 w-36 h-28 bg-slate-950 border-2 border-emerald-400 rounded-xl overflow-hidden shadow-2xl">
                      <video
                        ref={pipVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform -scale-x-100"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] text-emerald-400 font-bold">
                        Your Cam HD
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-3 left-3 flex items-center space-x-2 pointer-events-none">
                <span className="px-2.5 py-1 rounded-lg bg-rose-500/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Live Chamber Video</span>
                </span>
              </div>
            </div>

            {/* Video & Audio Controls Toolbar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                {/* Mic toggle */}
                <button
                  onClick={toggleMic}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                    isMyMicOn
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isMyMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-rose-400" />}
                  <span>{isMyMicOn ? 'Mic Live (ድምፅ በርቷል)' : 'Muted (ድምፅ አጥፋ)'}</span>
                </button>

                {/* Video toggle */}
                <button
                  onClick={toggleVideo}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                    isMyVideoOn
                      ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {isMyVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4 text-slate-400" />}
                  <span>{isMyVideoOn ? 'Camera HD (ካሜራ በርቷል)' : 'ካሜራ ክፈት (Start Camera)'}</span>
                </button>

                {/* Mobile Camera Flip */}
                {isMyVideoOn && (
                  <button
                    onClick={toggleCameraFacingMode}
                    title="Flip between front and rear cameras"
                    className="p-2 rounded-xl text-xs font-medium border bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}

                {/* Hand Raise */}
                <button
                  onClick={() => setIsHandRaised(!isHandRaised)}
                  className={`p-2 rounded-xl text-xs font-medium border transition-colors ${
                    isHandRaised
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Raise hand to request speaking turn"
                >
                  <Hand className="w-4 h-4" />
                </button>
              </div>

              {/* Seat Status & Registration Quick Action */}
              <div className="flex items-center space-x-3">
                {myCurrentSeat !== null ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      Seated at Chair #{myCurrentSeat}
                    </span>
                    <button
                      onClick={leaveSeat}
                      className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg text-xs font-semibold border border-rose-500/30 transition-colors"
                    >
                      Leave Seat (ተነስ)
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Click any numbered chair below to occupy your seat!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Numbered Seats Auditorium Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                  <span>Auditorium Chairs (ያልተገደቡ የወንበር ተራ ቁጥሮች)</span>
                  <span className="text-[11px] font-normal text-amber-400">
                    Unlimited Expandable Seats
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Each chair connects directly to HD front-facing video camera and microphone.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">
                  Occupied: {seats.filter((s) => s.occupiedBy !== null).length} / {expandedSeatCount}
                </span>
                <button
                  onClick={() => setExpandedSeatCount((prev) => prev + 16)}
                  className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add More Seats</span>
                </button>
              </div>
            </div>

            {/* Grid of Chairs */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 max-h-80 overflow-y-auto pr-1">
              {Array.from({ length: expandedSeatCount }).map((_, idx) => {
                const seatNum = idx + 1;
                const existingSeat = seats.find((s) => s.seatNumber === seatNum);
                const occupant = existingSeat?.occupiedBy;
                const isMe = myCurrentSeat === seatNum;

                return (
                  <div
                    key={seatNum}
                    onClick={() => {
                      if (!occupant) {
                        claimSeat(seatNum);
                      }
                    }}
                    className={`relative p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[90px] cursor-pointer group ${
                      isMe
                        ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                        : occupant
                        ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-amber-500/50 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-mono font-bold text-amber-300/80">#{seatNum}</span>
                      {occupant && <span>{occupant.isMuted ? '🔇' : '🎙️'}</span>}
                    </div>

                    {occupant ? (
                      <div className="space-y-1">
                        <div className="relative mx-auto">
                          <img
                            src={occupant.userAvatar}
                            alt={occupant.userName}
                            className="w-8 h-8 rounded-full object-cover mx-auto border border-slate-700"
                          />
                          {occupant.isSpeaking && (
                            <span className="absolute -inset-0.5 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
                          )}
                        </div>
                        <p className="text-[10px] font-semibold text-slate-200 truncate max-w-[65px]">
                          {occupant.userName.split(' ')[0]}
                        </p>
                      </div>
                    ) : (
                      <div className="my-auto py-1 text-center">
                        <span className="text-[11px] text-slate-500 group-hover:text-amber-400 font-medium">
                          Empty
                        </span>
                        <p className="text-[9px] text-slate-600 group-hover:text-slate-400">Claim</p>
                      </div>
                    )}

                    <div className="w-full text-[9px] text-slate-500 truncate mt-1">
                      {isMe ? '⭐ You' : occupant ? occupant.userNationality : 'Available'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Specialized Chamber Details Component */}
          {activeChamberCode === 2 && (
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                <TreeDeciduous className="w-5 h-5" />
                <span>Chamber #2: Lineage Chronicles & Ancestral Registry (የስጋ ዘመድ የዘር ግንድ)</span>
              </div>
              <p className="text-xs text-slate-300">
                Connect your family bloodline, register maternal and paternal clans, and maintain family solidarity across generations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Genealogy Records</span>
                  <span className="text-emerald-300 font-bold text-base">14 Recorded Clans</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Kinship Mutual Emergency Pool</span>
                  <span className="text-emerald-300 font-bold text-base">42,500 ETB Available</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block mb-1">Oral History Archives</span>
                  <span className="text-emerald-300 font-bold text-base">38 Audio Testimonies</span>
                </div>
              </div>
            </div>
          )}

          {activeChamberCode === 3 && (
            <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>Chamber #3: Statesmanship & Governance Chamber (የባለስልጣናት ቤት)</span>
              </div>
              <p className="text-xs text-slate-300">
                Exclusive deliberation space for official civil servants, policy analysts, and national developers focusing on sovereignty, energy security, and regional diplomacy.
              </p>
              <div className="p-3 bg-blue-950/30 border border-blue-800/40 rounded-xl text-xs text-blue-200">
                Policy Docket #2026-A: Green Hydrogen and Trans-Continental Infrastructure Corridors currently under open debate.
              </div>
            </div>
          )}

          {activeChamberCode === 4 && (
            <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <Lock className="w-5 h-5" />
                <span>Chamber #4: Sanctuary of Secrets & Matrimony (የሚስጥር ቤት)</span>
              </div>
              <p className="text-xs text-slate-300">
                Encrypted discreet consultations for couples, courtship counseling, and family dispute resolution under total anonymity shields.
              </p>
              <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl text-xs text-rose-200">
                Zero-Knowledge Privacy: No records, video recordings, or chat logs are stored or leaked outside this sanctuary.
              </div>
            </div>
          )}

          {activeChamberCode === 6 && (
            <div className="bg-slate-900 border border-violet-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-violet-400 font-bold text-sm">
                <BookOpen className="w-5 h-5" />
                <span>Chamber #6: Faith & Interfaith Sanctuary (የእምነት ቤት)</span>
              </div>
              <p className="text-xs text-slate-300">
                Peaceful theological discourse and scriptural exploration across all faiths. Fostering universal brotherhood, mutual love, and spiritual enlightenment.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Orthodox Tewahedo', 'Islamic Studies', 'Protestant Evangelical', 'Catholic Tradition', 'Interfaith World Peace'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-violet-500/10 text-violet-300 border border-violet-500/30 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeChamberCode === 7 && (
            <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>Chamber #7: Global Peace & Security Oversight (የደህንነት አስጠባቂ ቤት)</span>
              </div>
              <p className="text-xs text-slate-300">
                International peacekeeping radar and civility monitor. Automated AI filters detect disturbance, defamation, and incitement in real time, keeping all 7 houses safe and united.
              </p>
              <div className="p-3 bg-red-950/30 border border-red-800/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between">
                <span>Current Harmony Index: 99.8% Constructive Dialogue</span>
                <span className="font-mono text-xs">Radar: ALL SECTORS SECURE</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Live Multilingual Chat with Instant AI Translation & Voice TTS */}
        <div className="lg:col-span-4 flex flex-col h-[750px] bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xs text-slate-100 flex items-center gap-1.5">
                <span>Chamber #{activeChamberCode} Live Assembly Chat</span>
              </h3>
              <p className="text-[10px] text-amber-400 font-medium">
                Auto-translated to your language ({userLanguage.toUpperCase()})
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoTranslateEnabled(!autoTranslateEnabled)}
                className={`text-[10px] px-2 py-1 rounded font-bold transition-colors ${
                  autoTranslateEnabled
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-slate-800 text-slate-500'
                }`}
                title="Toggle Automatic AI Translation"
              >
                {autoTranslateEnabled ? 'AI Translation: ON' : 'Translate: OFF'}
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div
            ref={chatScrollRef}
            className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800"
          >
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No messages yet in Chamber #{activeChamberCode}. Speak into the mic or type below to inaugurate dialogue!
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = msg.userId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                      msg.isOfficial
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : isMine
                        ? 'bg-slate-800/90 border-slate-700/80'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={msg.userAvatar}
                          alt={msg.userName}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-200 truncate max-w-[120px]">
                          {msg.userName}
                        </span>
                        <span className="text-[10px]">{msg.userNationality}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                    </div>

                    <div className="text-slate-300 text-xs">{msg.originalText}</div>

                    {msg.translatedText && msg.translatedText !== msg.originalText && (
                      <div className="mt-1 pt-1 border-t border-slate-800/80 text-[11px] text-amber-300/95 font-medium flex items-start justify-between gap-2 bg-amber-500/5 p-1.5 rounded-lg">
                        <div className="flex-1">
                          <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-sans">
                            Instant AI Translation:
                          </span>
                          <span>{msg.translatedText}</span>
                        </div>
                        <button
                          onClick={() => speakText(msg.translatedText || '', userLanguage)}
                          title="Listen with AI Voice"
                          className="p-1 rounded text-amber-400 hover:text-white hover:bg-slate-800 shrink-0"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Chat Input & Voice Recognition */}
          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleMicVoiceInput}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListeningMic
                    ? 'bg-rose-500 text-white animate-pulse border-rose-400'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title={isListeningMic ? 'Listening... Speak now' : 'Speak into Microphone in your native language'}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListeningMic
                    ? 'Listening to your speech...'
                    : 'Type or speak in any language (Amharic, English, etc.)...'
                }
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="p-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 disabled:opacity-40 text-white rounded-xl shadow-md shadow-amber-500/20 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>Speaks Amharic, Oromo, English, Arabic, Spanish, French & 100+ tongues.</span>
              <span className="text-amber-400/80">+20 ETB Earned per Contribution</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
