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
  Scale,
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
    effectiveOnline,
    setIsLegalModalOpen,
    setActiveTab,
    legalCertificate,
    broadcastVoiceAudio,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [weddingModalOpen, setWeddingModalOpen] = useState(false);
  const [chamberRegModalOpen, setChamberRegModalOpen] = useState(false);
  const [expandedSeatCount, setExpandedSeatCount] = useState(36);
  const [videoMode, setVideoMode] = useState<'split' | 'podium' | 'self'>('split');
  // Full-body height & framing controls as requested
  const [videoFraming, setVideoFraming] = useState<'contain' | 'cover'>('contain');
  const [stageHeight, setStageHeight] = useState<'tall' | 'cinema' | 'standard'>('tall');
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [isFullWidthStage, setIsFullWidthStage] = useState<boolean>(true);

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
        broadcastVoiceAudio(transcript);
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
    broadcastVoiceAudio(text);
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

      {/* International Legal Accountability Compliance Notice Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-amber-500/30 rounded-xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between text-xs gap-2 shadow-md">
        <div className="flex items-center space-x-2.5">
          <Scale className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="text-slate-300">
            <strong className="text-amber-300 font-bold">ዓለም አቀፍ የሕግ ተጠያቂነት ማስታወሻ፦</strong> በዚህ ክፍል የሚደረግ ማንኛውም ንግግር፣ ቪዲዮና ውይይት በ UN UDHR እና Budapest Cybercrime Convention ህግጋት የተገዛ ነው።
          </span>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('tikil_2rya')}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/25 to-indigo-500/25 hover:from-amber-500/40 hover:to-indigo-500/40 text-amber-300 border border-amber-500/50 text-[11px] font-black transition-colors"
          >
            📁 ጥቅል መመሪያ (ዓላማና ወንጀል መመሪያ)
          </button>
          <button
            onClick={() => setActiveTab('legal_compliance')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-colors"
          >
            መመሪያውን አንብብ (Legal Guide)
          </button>
          {!legalCertificate?.isCertified && (
            <button
              onClick={() => setIsLegalModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold animate-pulse transition-colors"
            >
              ውል ፈርም (Sign Compact)
            </button>
          )}
        </div>
      </div>

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

      {/* 1. Full-Width Panoramic HD Video Stage (100% Widescreen - ወደጎን ሙሉ ለሙሉ የሰፋ) */}
      <div className="w-full">
        {/* Main Visual Podium / Active Video Screen */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* View Mode & Full-Body Zoom Toolbar on Video Box */}
          <div className="bg-slate-950 px-3 sm:px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-slate-200 text-xs">
                Face-to-Face Full Body Stage (የፊት ለፊት ሙሉ አካል ቪዲዮ)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                100% Widescreen • ወደጎን ሙሉ ስፋት
              </span>
            </div>

            {/* View Layout & Height / Zoom Controls */}
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Full-Body / Uncropped Framing Toggle */}
              <button
                onClick={() => setVideoFraming(videoFraming === 'contain' ? 'cover' : 'contain')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors flex items-center space-x-1 ${
                  videoFraming === 'contain'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                }`}
                title="Toggle Full Body (Uncropped) vs Fill Screen"
              >
                <span>🧍</span>
                <span>{videoFraming === 'contain' ? 'ሙሉ አካል (Full Body: ON)' : 'ሙላት (Fill)'}</span>
              </button>

              {/* Stage Height Toggle (ረጅም ቁመት) */}
              <button
                onClick={() => {
                  if (stageHeight === 'tall') setStageHeight('cinema');
                  else if (stageHeight === 'cinema') setStageHeight('standard');
                  else setStageHeight('tall');
                }}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-lg text-[11px] font-bold transition-colors"
                title="Cycle video stage height upward and downward"
              >
                ↕️ ቁመት: {stageHeight === 'cinema' ? 'እጅግ ረጅም (780px)' : stageHeight === 'tall' ? 'ረጅም (640px)' : 'መደበኛ (480px)'}
              </button>

              {/* Zoom Out / In Controls */}
              <div className="flex items-center space-x-0.5 bg-slate-900 border border-slate-700 rounded-lg px-1 py-0.5">
                <span className="text-[10px] text-slate-400 font-semibold px-1">ዙም:</span>
                <button
                  onClick={() => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.1).toFixed(2))))}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  title="Zoom Out (Show more body/room)"
                >
                  -
                </button>
                <button
                  onClick={() => setZoomLevel(1.0)}
                  className="px-1.5 text-[10px] font-mono text-amber-300 hover:text-white"
                  title="Reset to 1.0x Full Wide"
                >
                  {zoomLevel}x
                </button>
                <button
                  onClick={() => setZoomLevel((prev) => Math.min(1.4, Number((prev + 0.1).toFixed(2))))}
                  className="w-5 h-5 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
                  title="Zoom In"
                >
                  +
                </button>
              </div>

              {/* Layout View Modes */}
              <div className="flex items-center space-x-1 border-l border-slate-800 pl-1.5 ml-1">
                <button
                  onClick={() => setVideoMode('split')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dual Split
                </button>
                <button
                  onClick={() => setVideoMode('self')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'self' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My Camera
                </button>
                <button
                  onClick={() => setVideoMode('podium')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    videoMode === 'podium' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Podium
                </button>
              </div>
            </div>
          </div>

            {/* Video Stage Container with Extended Vertical Height */}
            <div
              className={`w-full bg-slate-950 relative flex items-center justify-center overflow-hidden transition-all duration-300 ${
                stageHeight === 'cinema'
                  ? 'h-[680px] sm:h-[780px]'
                  : stageHeight === 'tall'
                  ? 'h-[540px] sm:h-[640px]'
                  : 'h-[440px] sm:h-[480px]'
              }`}
            >
              {/* Split View: Podium Speaker + My Front Camera side by side */}
              {videoMode === 'split' && (
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
                  {/* Left Half: Podium Broadcaster */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden p-4">
                    {activeSpeakerSeat?.occupiedBy ? (
                      <>
                        <div className="relative my-auto flex flex-col items-center justify-center">
                          <img
                            src={activeSpeakerSeat.occupiedBy.videoFrame || activeSpeakerSeat.occupiedBy.userAvatar}
                            alt={activeSpeakerSeat.occupiedBy.userName}
                            className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl object-cover shadow-2xl border-4 border-amber-400/80 ring-8 ring-amber-500/20"
                          />
                          <div className="mt-4 flex items-center gap-1.5">
                            {[16, 32, 24, 48, 36, 56, 28, 40, 20].map((h, idx) => (
                              <span
                                key={idx}
                                className="w-1.5 bg-gradient-to-t from-amber-500 to-rose-400 rounded-full animate-pulse"
                                style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="w-full mt-auto bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-100 block">
                              Podium: {activeSpeakerSeat.occupiedBy.userName}
                            </span>
                            <span className="text-[11px] text-amber-300">
                              Seat #{activeSpeakerSeat.seatNumber} • {activeSpeakerSeat.occupiedBy.userNationality}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                            Live Speaker
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 text-slate-400 text-xs my-auto">
                        <Radio className="w-12 h-12 text-amber-400 mx-auto mb-3 animate-pulse" />
                        <p className="font-bold text-sm text-slate-200">Podium Open for Speaking</p>
                        <p className="text-xs text-slate-400 mt-1">Claim a numbered chair below to address the world.</p>
                      </div>
                    )}
                  </div>

                  {/* Right Half: User Front-Facing Video (Full body tall frame) */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950 overflow-hidden">
                    {isMyVideoOn && activeCameraStream ? (
                      <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-slate-950">
                        <video
                          ref={setVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className={`w-full h-full ${
                            videoFraming === 'contain' ? 'object-contain' : 'object-cover'
                          } transition-all duration-300`}
                          style={{ transform: `scaleX(-1) scale(${zoomLevel})` }}
                        />
                        {/* Live Badges */}
                        <div className="absolute top-3 right-3 bg-emerald-500/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          <span>HD Full Body Live ({zoomLevel}x)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 space-y-3 my-auto">
                        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow-xl">
                          <Camera className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-200 font-bold">Front-Facing Camera is Idle</p>
                          <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                            Click below to transmit tall, uncropped full-body video into the chamber!
                          </p>
                        </div>
                        <button
                          onClick={toggleVideo}
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95"
                        >
                          ካሜራ ክፈት (Start Full Body Camera)
                        </button>
                      </div>
                    )}

                    <div className="w-full p-3 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-amber-300 block">You: {currentUser.fullName}</span>
                        <span className="text-[10px] text-slate-400">{currentUser.nationality}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => setVideoFraming(videoFraming === 'contain' ? 'cover' : 'contain')}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          title="Toggle full body vs zoom-fill"
                        >
                          {videoFraming === 'contain' ? 'Fit (ሙሉ አካል)' : 'Fill (ሙላት)'}
                        </button>
                        {isMyVideoOn && (
                          <button
                            onClick={toggleCameraFacingMode}
                            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                            title="Flip camera"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Self View (Extended Vertical View) */}
              {videoMode === 'self' && (
                <div className="w-full h-full relative flex items-center justify-center bg-slate-950 overflow-hidden">
                  {isMyVideoOn && activeCameraStream ? (
                    <video
                      ref={setVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full ${
                        videoFraming === 'contain' ? 'object-contain' : 'object-cover'
                      } transition-all duration-300`}
                      style={{ transform: `scaleX(-1) scale(${zoomLevel})` }}
                    />
                  ) : (
                    <div className="text-center p-8 space-y-4 my-auto">
                      <Camera className="w-16 h-16 text-amber-400 mx-auto" />
                      <h4 className="text-base font-bold text-slate-100">Activate High-Definition Front Video</h4>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        Allow camera permissions to transmit crystal-clear 1080p full-body video into the chamber auditorium.
                      </p>
                      <button
                        onClick={toggleVideo}
                        className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold rounded-xl shadow-lg"
                      >
                        ካሜራ ክፈት (Start Full Body Camera)
                      </button>
                    </div>
                  )}

                  {/* Floating Controls at Bottom of Video */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-300">{currentUser.fullName} (Full Body View • {zoomLevel}x)</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setVideoFraming(videoFraming === 'contain' ? 'cover' : 'contain')}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold"
                      >
                        {videoFraming === 'contain' ? '🧍 ሙሉ አካል (Uncropped)' : 'Crop Fill'}
                      </button>
                      <button
                        onClick={() => setZoomLevel((prev) => Math.max(0.75, Number((prev - 0.1).toFixed(2))))}
                        className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
                        title="Zoom out"
                      >
                        - ዙም
                      </button>
                      <button
                        onClick={() => setZoomLevel((prev) => Math.min(1.4, Number((prev + 0.1).toFixed(2))))}
                        className="px-2 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
                        title="Zoom in"
                      >
                        + ዙም
                      </button>
                    </div>
                  </div>

                  {/* PiP of Podium speaker if present */}
                  {activeSpeakerSeat?.occupiedBy && (
                    <div className="absolute top-4 right-4 w-36 h-28 bg-slate-900 border-2 border-amber-400 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
                      <img
                        src={activeSpeakerSeat.occupiedBy.userAvatar}
                        alt="Speaker"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-bold">
                        {activeSpeakerSeat.occupiedBy.userName.split(' ')[0]}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Full Podium View */}
              {videoMode === 'podium' && (
                <div className="w-full h-full relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-6 overflow-hidden">
                  {activeSpeakerSeat?.occupiedBy ? (
                    <>
                      <div className="my-auto flex flex-col items-center justify-center">
                        <img
                          src={activeSpeakerSeat.occupiedBy.videoFrame || activeSpeakerSeat.occupiedBy.userAvatar}
                          alt={activeSpeakerSeat.occupiedBy.userName}
                          className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl object-cover shadow-2xl border-4 border-amber-400/80 ring-8 ring-amber-500/20"
                        />
                        <div className="mt-6 flex items-center gap-1.5">
                          {[16, 32, 24, 48, 36, 56, 28, 44, 24, 36, 20].map((h, idx) => (
                            <span
                              key={idx}
                              className="w-1.5 bg-gradient-to-t from-amber-500 to-rose-400 rounded-full animate-pulse"
                              style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="w-full mt-auto bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-sm font-black text-slate-100 block">
                            Speaker: {activeSpeakerSeat.occupiedBy.userName}
                          </span>
                          <span className="text-xs text-amber-300 font-semibold">
                            Chamber #{activeChamberCode} • {activeSpeakerSeat.occupiedBy.userNationality}
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                          Addressing Chamber
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-8 space-y-3 my-auto">
                      <Radio className="w-14 h-14 text-amber-400 mx-auto animate-pulse" />
                      <p className="text-base font-bold text-slate-200">The Assembly Floor is Open</p>
                      <p className="text-xs text-slate-400">Claim a numbered chair below to speak on the podium!</p>
                    </div>
                  )}

                  {/* PiP of User Camera */}
                  {isMyVideoOn && activeCameraStream && (
                    <div className="absolute top-4 right-4 w-40 h-32 bg-slate-950 border-2 border-emerald-400 rounded-2xl overflow-hidden shadow-2xl">
                      <video
                        ref={pipVideoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full ${
                          videoFraming === 'contain' ? 'object-contain' : 'object-cover'
                        }`}
                        style={{ transform: `scaleX(-1) scale(${zoomLevel})` }}
                      />
                      <span className="absolute bottom-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold">
                        Your Cam HD
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Status Badges Overlay */}
              <div className="absolute top-3 left-3 flex items-center space-x-2 pointer-events-none z-10">
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
        </div>

        {/* 2. Lower Assembly Floor: Numbered Chairs Auditorium (8 Cols) & Live Chat (4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column (8 cols): Numbered Seats Auditorium & Specialized Panels */}
          <div className="lg:col-span-8 space-y-6">
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
                            src={occupant.videoFrame || occupant.userAvatar}
                            alt={occupant.userName}
                            className="w-10 h-10 rounded-xl object-cover mx-auto border-2 border-amber-400/80 shadow-md"
                          />
                          {occupant.isSpeaking && (
                            <span className="absolute -inset-1 rounded-xl border-2 border-emerald-400 animate-ping pointer-events-none" />
                          )}
                          {occupant.isVideoOn && (
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-slate-900" />
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-100 truncate max-w-[70px]">
                          {occupant.userName.split(' ')[0]}
                        </p>
                        {occupant.gender && (
                          <p className="text-[8px] text-slate-400 truncate max-w-[70px]">
                            {occupant.gender.split(' ')[0]} {occupant.age ? `• ${occupant.age}` : ''}
                          </p>
                        )}
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
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-xs text-slate-100 flex items-center gap-1.5">
                <span>Chamber #{activeChamberCode} Live Assembly Chat</span>
                <span className="text-amber-400 font-bold">(የቀጥታ ጉባኤ ውይይት)</span>
              </h3>
              <p className="text-[10px] text-amber-400 font-medium">
                Auto-translated to your language ({userLanguage.toUpperCase()}) • በቀጥታ በድምፅ ይተረጎማል
              </p>
            </div>

            <div className="flex items-center space-x-1.5">
              {!effectiveOnline && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>ኦፍላይን ይሰራል</span>
                </span>
              )}
              {/* Dedicated Hear / Audio Mode Button in Chamber */}
              <button
                onClick={() => {
                  const lastMsg = [...messages].reverse().find((m) => m.translatedText || m.originalText);
                  if (lastMsg) {
                    speakText(lastMsg.translatedText || lastMsg.originalText, userLanguage);
                  }
                }}
                className="px-2 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center space-x-1 transition-colors"
                title="ለመስማት: የመጨረሻውን መልዕክት በድምፅ አዳምጥ (Hear: Listen to latest message)"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ለመስማት (Hear)</span>
              </button>

              <button
                onClick={() => setAutoTranslateEnabled(!autoTranslateEnabled)}
                className={`text-[10px] px-2 py-1 rounded-lg font-bold transition-colors ${
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
                      <div className="flex items-center space-x-1.5">
                        {msg.isOffline && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                            📶 Offline
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                      </div>
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
                className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1.5 transition-all ${
                  isListeningMic
                    ? 'bg-rose-500 text-white animate-pulse border-rose-400 shadow-md shadow-rose-500/20'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500'
                }`}
                title={isListeningMic ? 'ድምፅ እየተቀበለ ነው (Listening)... ለመጨረስ ተጫን' : 'ለመናገር ተጫን (Click to Speak in your native language)'}
              >
                <Mic className="w-4 h-4" />
                <span className="text-[11px] font-black">{isListeningMic ? 'እያዳመጠ ነው...' : 'ለመናገር (Speak)'}</span>
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListeningMic
                    ? 'ድምፅህ እየተጻፈ ነው... (Listening to your speech...)'
                    : 'በመረጥከው ቋንቋ ጻፍ ወይም ተናገር (Type or speak in any language)...'
                }
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="p-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 disabled:opacity-40 text-white rounded-xl shadow-md shadow-amber-500/20 transition-transform active:scale-95"
                title="ላክ (Send)"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
              <span>ቋንቋዎች (Tongues): አማርኛ፣ ኦሮምኛ፣ English፣ ትግርኛ፣ العربية፣ French & 100+</span>
              <span className="text-amber-400/80">+20 ETB Earned per Contribution</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
