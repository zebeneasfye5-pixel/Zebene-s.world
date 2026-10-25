import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserPlus,
  Share2,
  Smartphone,
  Copy,
  Check,
  X,
  Send,
  MessageCircle,
  Mail,
  Upload,
  QrCode,
  Download,
  Users,
  CheckCircle2,
  Globe2,
  Sparkles,
} from 'lucide-react';
import { InvitedContact } from '../types';

export const ContactInviteModal: React.FC = () => {
  const {
    isInviteModalOpen,
    setIsInviteModalOpen,
    invitedContacts,
    addInvitedContact,
    currentUser,
    activeChamberCode,
  } = useApp();

  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'phone_contacts' | 'qr_card' | 'history'>('share');
  const [singleName, setSingleName] = useState('');
  const [singlePhone, setSinglePhone] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isInviteModalOpen) return null;

  const inviteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-7t24bbefvjbfmx3q3mm3pp-125744783365.europe-west1.run.app';
  const customInviteLink = `${inviteUrl}?ref=${currentUser.id}&chamber=${activeChamberCode}`;

  const defaultInvitationText = `🌍 ክቡር ወዳጄ ሆይ! በክቡር ዘበነ አስፍዬ ወደተመሰረተው ታላቅ አለም አቀፍ የሉዓላዊ ህዝቦች ጉባኤ (Zebene's World) በይፋ ተጋብዘዋል!
በ 170+ ሀገራት የቀጥታ የድምፅና የምስል ትርጓሜ፣ በ 7 ሉዓላዊ አዳራሾች፣ በዲጂታል ሰርግ አዳራሽ፣ በኢኮኖሚና ባንክ እንዲሁም የህግ ከለላ ስርአት አባል ሆነው አብረውን ይሳተፉ።
👇 አሁኑኑ በዚህ ይፋዊ ሊንክ ይቀላቀሉን፦
${customInviteLink}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(customInviteLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Zebene's World (ዘበነ የመሰረተው አለም) - Diplomatic Invitation",
          text: defaultInvitationText,
          url: customInviteLink,
        });
        addInvitedContact({
          id: `inv-${Date.now()}`,
          name: 'Device Contact / Social Share',
          channel: 'phone_contacts',
          status: 'sent',
          invitedAt: new Date().toISOString(),
        });
      } catch (err) {
        // user dismissed share sheet
      }
    } else {
      handleCopyLink();
    }
  };

  // Contacts Picker API (Direct sync with real phone contacts on Android/iOS/Chrome)
  const handlePickPhoneContacts = async () => {
    setContactsError(null);
    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const props = ['name', 'tel', 'email'];
        const contacts = await (navigator as any).contacts.select(props, { multiple: true });
        if (contacts && contacts.length > 0) {
          let count = 0;
          contacts.forEach((c: any) => {
            const name = c.name?.[0] || 'Phone Contact';
            const tel = c.tel?.[0] || '';
            const email = c.email?.[0] || '';
            addInvitedContact({
              id: `inv-phone-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
              name,
              phoneNumber: tel,
              email,
              channel: 'phone_contacts',
              status: 'pending',
              invitedAt: new Date().toISOString(),
            });
            count++;
          });
          setImportedCount(count);
          setActiveTab('history');
        }
      } catch (ex: any) {
        setContactsError('ስልክዎ የኮንታክት መምረጫውን አልፈቀደም ወይም አቋርጠውታል (Contacts selection was cancelled or denied).');
      }
    } else {
      setContactsError('ይህ ብራውዘር በቀጥታ የስልክ አድራሻ መፅሀፍን (Contacts Picker API) አይደግፍም። እባክዎ ከታች የ vCard (.vcf) ወይም CSV ፋይል ይጫኑ ወይም በስልክ ቁጥር ይጋብዙ።');
    }
  };

  // Import vCard (.vcf) or CSV contacts file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      let count = 0;
      if (file.name.endsWith('.vcf')) {
        // Simple vCard parsing
        const lines = text.split(/\r\n|\r|\n/);
        let curName = '';
        let curTel = '';
        let curEmail = '';

        for (const line of lines) {
          if (line.startsWith('FN:')) curName = line.substring(3).trim();
          if (line.startsWith('TEL')) {
            const parts = line.split(':');
            curTel = parts[parts.length - 1].trim();
          }
          if (line.startsWith('EMAIL')) {
            const parts = line.split(':');
            curEmail = parts[parts.length - 1].trim();
          }
          if (line.startsWith('END:VCARD')) {
            if (curName || curTel) {
              addInvitedContact({
                id: `vcf-${Date.now()}-${count}`,
                name: curName || curTel,
                phoneNumber: curTel,
                email: curEmail,
                channel: 'phone_contacts',
                status: 'pending',
                invitedAt: new Date().toISOString(),
              });
              count++;
            }
            curName = '';
            curTel = '';
            curEmail = '';
          }
        }
      } else {
        // CSV parsing (name,phone,email)
        const lines = text.split('\n');
        for (const line of lines) {
          const parts = line.split(',');
          if (parts.length >= 2) {
            const name = parts[0]?.trim();
            const tel = parts[1]?.trim();
            const email = parts[2]?.trim() || '';
            if (name && (tel || email)) {
              addInvitedContact({
                id: `csv-${Date.now()}-${count}`,
                name,
                phoneNumber: tel,
                email,
                channel: 'phone_contacts',
                status: 'pending',
                invitedAt: new Date().toISOString(),
              });
              count++;
            }
          }
        }
      }

      setImportedCount(count);
      setActiveTab('history');
    };
    reader.readAsText(file);
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!singleName.trim() || (!singlePhone.trim() && !singleEmail.trim())) {
      alert('እባክዎ ቢያንስ ስም እና ስልክ ቁጥር ወይም ኢሜይል ያስገቡ (Please provide name and phone/email)');
      return;
    }

    addInvitedContact({
      id: `manual-${Date.now()}`,
      name: singleName.trim(),
      phoneNumber: singlePhone.trim(),
      email: singleEmail.trim(),
      channel: singlePhone ? 'sms' : 'email',
      status: 'pending',
      invitedAt: new Date().toISOString(),
    });

    setSingleName('');
    setSinglePhone('');
    setSingleEmail('');
    setActiveTab('history');
  };

  const handleSendViaWhatsApp = (phone?: string) => {
    const target = phone ? phone.replace(/[^0-9]/g, '') : '';
    const url = target
      ? `https://api.whatsapp.com/send?phone=${target}&text=${encodeURIComponent(defaultInvitationText)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(defaultInvitationText)}`;
    window.open(url, '_blank');
  };

  const handleSendViaTelegram = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(customInviteLink)}&text=${encodeURIComponent(defaultInvitationText)}`;
    window.open(url, '_blank');
  };

  const handleSendViaSMS = (phone?: string) => {
    const cleanPhone = phone ? phone.replace(/[^0-9+]/g, '') : '';
    const url = `sms:${cleanPhone}?body=${encodeURIComponent(defaultInvitationText)}`;
    window.location.href = url;
  };

  const handleSendViaEmail = (email?: string) => {
    const cleanEmail = email || '';
    const subject = encodeURIComponent("Zebene's World - Official Sovereign Invitation (የይፋ ግብዣ)");
    const body = encodeURIComponent(defaultInvitationText);
    window.location.href = `mailto:${cleanEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative my-6 text-slate-100">
        <button
          onClick={() => setIsInviteModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <span>የአባላት ግብዣና የስልክ አድራሻ ማገናኛ</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Direct Sync
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Easily invite and sync members from phone contacts, WhatsApp, Telegram, SMS, and external sites.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'share' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>ቅጽበታዊ ግብዣ (Quick Share)</span>
          </button>

          <button
            onClick={() => setActiveTab('phone_contacts')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'phone_contacts' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>ስልክ ኮንታክት (Phone Sync)</span>
          </button>

          <button
            onClick={() => setActiveTab('qr_card')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'qr_card' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>የካርድ ፎርማት (QR Card)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ዝርዝር ({invitedContacts.length})</span>
          </button>
        </div>

        {/* Tab 1: Direct Social Share */}
        {activeTab === 'share' && (
          <div className="space-y-4">
            {/* Custom Link Copy Box */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                የእርስዎ የግል የመጋበዣ ሊንክ (Your Personal Invite Link):
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={customInviteLink}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 select-all font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copiedLink ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                  }`}
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'ተገልብጧል!' : 'ኮፒ'}</span>
                </button>
              </div>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleSendViaWhatsApp()}
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleSendViaTelegram}
                className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-sky-600/20 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Telegram</span>
              </button>

              <button
                onClick={() => handleSendViaSMS()}
                className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>SMS / iMessage</span>
              </button>

              <button
                onClick={() => handleSendViaEmail()}
                className="p-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                <span>Email Invite</span>
              </button>
            </div>

            {/* Native Mobile Share Sheet */}
            <button
              onClick={handleNativeShare}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>በስልክዎ አፖች በሙሉ ለሁሉም ያጋሩ (Native Device Share Sheet)</span>
            </button>
          </div>
        )}

        {/* Tab 2: Phone Contacts & File Importer */}
        {activeTab === 'phone_contacts' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-amber-400" />
                    <span>ከስልክ ማውጫ በቀጥታ አባላትን ምረጥ (Phone Contacts Picker)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Direct access to Android & iOS device phonebook via HTML5 Contacts API.
                  </p>
                </div>

                <button
                  onClick={handlePickPhoneContacts}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
                >
                  ስልክ ማውጫ ክፈት
                </button>
              </div>

              {contactsError && (
                <p className="text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
                  {contactsError}
                </p>
              )}
            </div>

            {/* File Upload (vCard .vcf or CSV) */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-indigo-400" />
                <span>የኮንታክት ፋይል ጫን (Upload vCard .vcf or CSV)</span>
              </h4>
              <p className="text-[11px] text-slate-400">
                Export your phone contacts to .vcf file and upload here to invite all friends in one click.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".vcf,.csv,text/vcard,text/csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 hover:text-white font-bold text-xs border border-indigo-500/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>vCard / CSV ፋይል ምረጥ (Choose Contact File)</span>
              </button>
            </div>

            {/* Quick Single Contact Adder */}
            <form onSubmit={handleManualAdd} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200">አንድ አባል በእጅ አስገባ (Add Single Member):</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="ሙሉ ስም (Full Name)"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  placeholder="ስልክ ቁጥር (Phone Number)"
                  value={singlePhone}
                  onChange={(e) => setSinglePhone(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
                <input
                  type="email"
                  placeholder="ኢሜይል (Email - Optional)"
                  value={singleEmail}
                  onChange={(e) => setSingleEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                + ወደ ዝርዝር ጨምር (Add to List)
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Official Diplomatic QR Invitation Card */}
        {activeTab === 'qr_card' && (
          <div className="space-y-4 text-center">
            <div className="p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border-2 border-amber-500/40 shadow-2xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-rose-500 to-indigo-500" />
              
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Official Diplomatic Credentials Invitation
              </span>
              <h3 className="text-lg font-black text-white">
                Zebene's World • ዘበነ የመሰረተው አለም
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                ክቡር ተጋባዥ ሆይ! በ 170+ ሀገራት የጋራ ዲፕሎማሲ ጉባኤ በክብር እንዲሳተፉ ይጋብዛል።
              </p>

              {/* QR Code graphic generator representation */}
              <div className="w-40 h-40 bg-white p-2.5 rounded-2xl mx-auto shadow-xl flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(customInviteLink)}`}
                  alt="Invitation QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-[11px] text-amber-300 font-bold">
                Scan with any Smartphone Camera to Join Instantly
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Code: ZW-INV-{currentUser.id.toUpperCase()}-{activeChamberCode}
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>የግብዣ ካርዱን አትም / አውርድ (Print / Save Invitation Card)</span>
            </button>
          </div>
        )}

        {/* Tab 4: Invited Contacts History & Batch Sender */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">የተጋበዙ/የተዘጋጁ አባላት ({invitedContacts.length}):</span>
              {importedCount > 0 && (
                <span className="text-emerald-400 font-bold">
                  ✓ {importedCount} አዲስ አባላት ተጨመሩ!
                </span>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {invitedContacts.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  እስካሁን የተጋበዘ አባል የለም። ከላይ «ስልክ ኮንታክት» የሚለውን ተጭነው አባላትን ያክሉ።
                </div>
              ) : (
                invitedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block">{contact.name}</span>
                      <span className="text-[11px] text-slate-400">
                        {contact.phoneNumber || contact.email || 'Via Social Link'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {contact.phoneNumber && (
                        <button
                          onClick={() => handleSendViaWhatsApp(contact.phoneNumber)}
                          className="px-2 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[10px] font-bold border border-emerald-500/30"
                          title="WhatsApp Invite"
                        >
                          WhatsApp
                        </button>
                      )}
                      {contact.phoneNumber && (
                        <button
                          onClick={() => handleSendViaSMS(contact.phoneNumber)}
                          className="px-2 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-[10px] font-bold border border-indigo-500/30"
                          title="SMS Invite"
                        >
                          SMS
                        </button>
                      )}
                      {contact.email && (
                        <button
                          onClick={() => handleSendViaEmail(contact.email)}
                          className="px-2 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-[10px] font-bold border border-rose-500/30"
                          title="Email Invite"
                        >
                          Email
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
