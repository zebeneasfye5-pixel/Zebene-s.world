import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  LogIn,
  Key,
  Smartphone,
  User,
  Camera,
  CheckCircle2,
  X,
  Upload,
  ShieldCheck,
  Lock,
  Globe2,
} from 'lucide-react';

interface AuthGateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthGateModal: React.FC<AuthGateModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, registerUser } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  const [phone, setPhone] = useState(currentUser.phoneNumber || '+251 91 123 4567');
  const [password, setPassword] = useState('2026');
  const [fullName, setFullName] = useState(currentUser.fullName || '');
  const [gender, setGender] = useState(currentUser.gender || 'ወንድ (Male)');
  const [age, setAge] = useState(currentUser.age ? String(currentUser.age) : '28');
  const [address, setAddress] = useState(currentUser.address || 'አዲስ አበባ፣ ኢትዮጵያ (Addis Ababa)');
  const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        setPhotoUrl(ev.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      setErrorMsg('እባክዎ ስልክ ቁጥር እና ሚስጥር ቁጥር ያስገቡ (Please provide phone and password).');
      return;
    }

    if (authMode === 'register' && !fullName.trim()) {
      setErrorMsg('እባክዎ ሙሉ ስምዎን ያስገቡ (Please enter full name).');
      return;
    }

    registerUser({
      phoneNumber: phone.trim(),
      fullName: fullName.trim() || currentUser.fullName || 'Verified Citizen',
      gender,
      age: Number(age) || 28,
      address,
      photoUrl: photoUrl || currentUser.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      faceVerified: true,
      isAuthenticated: true,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-6 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {authMode === 'signin' ? 'ሳይን ኢን / መግቢያ (Sign In)' : 'አዲስ አባል ምዝገባ (Register)'}
          </h2>
          <p className="text-xs text-slate-400">
            Zebene's World • የሉዓላዊ ዲፕሎማሲ አዳራሽ ይፋዊ መግቢያ
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'signin' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            መግቢያ (Sign In)
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-xl transition-all ${
              authMode === 'register' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            አዲስ ምዝገባ (Register)
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">ስልክ ቁጥር (Phone Number):</label>
            <div className="relative">
              <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251 91 123 4567"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-slate-300 font-semibold block">ሚስጥር ቁጥር (PIN / Password):</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
                required
              />
            </div>
          </div>

          {/* Register mode fields */}
          {authMode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold block">ሙሉ ስም (Full Name):</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ስም እና የአባት ስም"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">ፆታ (Gender):</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="ወንድ (Male)">ወንድ (Male)</option>
                    <option value="ሴት (Female)">ሴት (Female)</option>
                    <option value="ሌላ (Other)">ሌላ (Other)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">እድሜ (Age):</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="28"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-1 pt-1">
                <label className="text-slate-300 font-semibold block">የራስ ፎቶ (Profile Photo):</label>
                <div className="flex items-center gap-2">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="Uploaded avatar"
                      className="w-10 h-10 rounded-xl object-cover border border-amber-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500">
                      <Camera className="w-5 h-5" />
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-amber-400" />
                    <span>ፎቶ ምረጥ (Choose Photo)</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-xl shadow-amber-500/20 transition-all cursor-pointer mt-4"
          >
            {authMode === 'signin' ? 'ወደ ጉባኤው ግባ (Sign In to Assembly)' : 'ይፋዊ ምዝገባን አጠናቅቅ (Complete Registration)'}
          </button>
        </form>

        <p className="text-[10px] text-slate-500 text-center mt-4">
          Secured under Budapest Cybercrime ETS 185 and FATF AML regulations.
        </p>
      </div>
    </div>
  );
};
