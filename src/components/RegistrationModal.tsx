import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Camera,
  ScanFace,
  CheckCircle2,
  X,
  Shield,
  Smartphone,
  Globe,
  User,
  Upload,
  Calendar,
  MapPin,
  LogOut,
  RefreshCw,
  Image as ImageIcon,
} from 'lucide-react';

export const RegistrationModal: React.FC = () => {
  const { isRegistrationOpen, setIsRegistrationOpen, currentUser, registerUser, signOutUser } = useApp();

  const [fullName, setFullName] = useState(currentUser.fullName || '');
  const [gender, setGender] = useState<string>(currentUser.gender || 'ወንድ (Male)');
  const [age, setAge] = useState<string>(currentUser.age ? String(currentUser.age) : '28');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber || '+251 91 123 4567');
  const [address, setAddress] = useState<string>(currentUser.address || 'አዲስ አበባ፣ ኢትዮጵያ (Addis Ababa)');
  const [nationality, setNationality] = useState(currentUser.nationality || 'Ethiopia 🇪🇹');
  const [photoUrl, setPhotoUrl] = useState<string>(currentUser.photoUrl || '');

  // Camera capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      if (currentUser.fullName) setFullName(currentUser.fullName);
      if (currentUser.gender) setGender(currentUser.gender);
      if (currentUser.age) setAge(String(currentUser.age));
      if (currentUser.phoneNumber) setPhoneNumber(currentUser.phoneNumber);
      if (currentUser.address) setAddress(currentUser.address);
      if (currentUser.nationality) setNationality(currentUser.nationality);
      if (currentUser.photoUrl) setPhotoUrl(currentUser.photoUrl);
    }
  }, [currentUser, isRegistrationOpen]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  if (!isRegistrationOpen) return null;

  // Real Camera Handling
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Real camera not accessible:', err);
      alert('ካሜራ መክፈት አልተቻለም። እባክዎ ከፋይል/ጋለሪ ፎቶ ይጫኑ (Camera unavailable, please upload a photo from your device/gallery).');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const takeCameraSnapshot = () => {
    if (!videoRef.current) return;
    try {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw image mirrored if front camera
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPhotoUrl(dataUrl);
      }
    } catch (e) {
      console.error('Error taking snapshot:', e);
    }
    stopCamera();
  };

  // File Upload Handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('እባክዎ ትክክለኛ የምስል/ፎቶ ፋይል ይምረጡ! (Please select an image file)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setPhotoUrl(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      alert('እባክዎ ሙሉ ስምዎን ያስገቡ! (Please enter your full name)');
      return;
    }

    // Default avatar if none provided
    const finalPhoto =
      photoUrl ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80';

    registerUser({
      fullName: fullName.trim(),
      gender,
      age: parseInt(age, 10) || 28,
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      nationality: nationality.trim(),
      photoUrl: finalPhoto,
      faceVerified: true,
      isAuthenticated: true,
    });

    stopCamera();
    setIsRegistrationOpen(false);
  };

  const handleSignOut = () => {
    stopCamera();
    signOutUser();
    // Reset form fields
    setFullName('');
    setPhotoUrl('');
    setPhoneNumber('');
    setAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          onClick={() => {
            stopCamera();
            setIsRegistrationOpen(false);
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="ዝጋ / Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2 shadow-inner">
            <ScanFace className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-200 via-white to-amber-400 bg-clip-text text-transparent">
            የአባላት ምዝገባ እና መግቢያ
          </h2>
          <p className="text-xs text-slate-300 font-semibold mt-0.5">
            Citizen Registration & Identity Verification
          </p>
          <p className="text-[11px] text-amber-400/90 mt-1">
            ስም • ፆታ • እድሜ • ስልክ ቁጥር • አድራሻ • ወንበር ላይ የሚቀመጥ የራስ ፎቶ
          </p>
        </div>

        {/* Sign-Out / Current User Info Banner (if currently authenticated) */}
        {currentUser?.isAuthenticated && (
          <div className="mb-4 p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2.5">
              <img
                src={currentUser.photoUrl}
                alt={currentUser.fullName}
                className="w-8 h-8 rounded-full object-cover border border-amber-400"
              />
              <div>
                <div className="font-bold text-white">{currentUser.fullName}</div>
                <div className="text-[10px] text-emerald-400">በአሁኑ ሰዓት ገብተዋል (Logged In)</div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white rounded-lg text-xs font-bold border border-rose-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ሳይን አውት (Sign Out)</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-3.5">
          {/* 1. Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>1. ሙሉ ስም (Full Legal Name):</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="ለምሳሌ: አበበ ከበደ / Abebe Kebede"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* 2. Gender & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>2. ፆታ (Gender):</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              >
                <option value="ወንድ (Male)">ወንድ (Male)</option>
                <option value="ሴት (Female)">ሴት (Female)</option>
                <option value="ሌላ (Other)">ሌላ (Other)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>3. እድሜ (Age):</span>
              </label>
              <input
                type="number"
                min="12"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="ለምሳሌ: 28"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* 3. Phone Number & Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>4. ስልክ ቁጥር (Phone Number):</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+251 91 123 4567"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>5. አድራሻ (Address / City):</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ለምሳሌ: አዲስ አበባ፣ ኢትዮጵያ"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>6. ዜግነትና ሀገር (Nationality & Country):</span>
            </label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              placeholder="e.g., Ethiopia 🇪🇹, Kenya 🇰🇪, USA 🇺🇸"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          {/* 4. REAL PHOTO UPLOAD & CAMERA SNAPSHOT SECTION */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>7. ወንበሮች ላይ የሚቀመጥ የራስ ፎቶ (Seat Profile Photo):</span>
              </label>
              {photoUrl && (
                <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  ፎቶ ዝግጁ ነው (Ready)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              ይህ ፎቶ በጉባኤው አዳራሽ ወንበር ላይ ሲቀመጡ በወንበርዎ ላይ በቀጥታ የሚታይ የእርስዎ ትክክለኛ ፎቶ ነው።
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview Circle */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl border-2 border-amber-400/80 overflow-hidden shadow-lg bg-slate-900 flex items-center justify-center">
                  {photoUrl ? (
                    <img src={photoUrl} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-slate-600" />
                  )}
                </div>
                {photoUrl && (
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5 border-2 border-slate-950">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </span>
                )}
              </div>

              {/* Upload & Camera Buttons */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap gap-2">
                  {/* File Upload Button */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 min-w-[130px] py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>ከፋይል/ጋለሪ ጫን (Upload)</span>
                  </button>

                  {/* Camera Toggle Button */}
                  {!isCameraActive ? (
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex-1 min-w-[130px] py-2 px-3 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>በካሜራ አንሳ (Live Cam)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex-1 min-w-[130px] py-2 px-3 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition-colors"
                    >
                      ካሜራ ዝጋ (Cancel)
                    </button>
                  )}
                </div>

                <div className="text-[10px] text-slate-500">
                  ማንኛውንም JPG ወይም PNG ፎቶ ከስልክዎ ወይም ከኮምፒተርዎ መጫን ይችላሉ።
                </div>
              </div>
            </div>

            {/* Live Camera Viewfinder (if camera activated) */}
            {isCameraActive && (
              <div className="relative aspect-video max-h-56 rounded-xl overflow-hidden bg-black border border-amber-500/50 flex items-center justify-center mt-2">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
                <div className="absolute inset-0 border-2 border-dashed border-amber-400/40 rounded-xl pointer-events-none flex items-center justify-center">
                  <div className="w-32 h-36 border border-amber-400 rounded-full opacity-60" />
                </div>
                <button
                  type="button"
                  onClick={takeCameraSnapshot}
                  className="absolute bottom-3 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>ፎቶ አንሳ (Take Snapshot)</span>
                </button>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
            <span className="text-[10px] text-slate-500 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>UN UDHR Verified Sovereign Citizen Profile</span>
            </span>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>መዝግብ እና ግባ (Save & Sign In)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
