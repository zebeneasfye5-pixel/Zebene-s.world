import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Heart,
  Globe2,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

interface DelegateComment {
  id: string;
  userName: string;
  userAvatar: string;
  nationality: string;
  timestamp: string;
  commentText: string;
  likesCount: number;
  hasLiked?: boolean;
}

export const InteractiveCommentWall: React.FC = () => {
  const { currentUser, rewardUserAction, setIsInviteModalOpen } = useApp();

  const [comments, setComments] = useState<DelegateComment[]>([
    {
      id: 'c-1',
      userName: 'ክቡር ዘበነ አስፍዬ (Zebene Asfeye - Founder)',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      nationality: 'Ethiopia 🇪🇹',
      timestamp: '10:45 AM',
      commentText: 'ሰላም ለሁሉም የዓለም ህዝቦች ይሁን! በጋራ ተወያይተን አለማችንን ወደተሻለ የፍቅር፣ የወንድማማችነት እና የሳይንስ ብልጽግና እናሸጋግራለን።',
      likesCount: 148,
      hasLiked: true,
    },
    {
      id: 'c-2',
      userName: 'Dr. Amina Diallo',
      userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      nationality: 'Senegal 🇸🇳',
      timestamp: '11:12 AM',
      commentText: 'The seamless real-time voice interpretation and Hague nuptial covenant represent a revolutionary leap in global civic dignity.',
      likesCount: 92,
      hasLiked: false,
    },
    {
      id: 'c-3',
      userName: 'Marcus Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      nationality: 'Singapore 🇸🇬',
      timestamp: '11:30 AM',
      commentText: 'Proud to be accredited in Chamber #3. The rotating Equb financial system and humanitarian escrow are truly transformative.',
      likesCount: 64,
      hasLiked: false,
    },
  ]);

  const [newCommentInput, setNewCommentInput] = useState('');
  const [totalLikes, setTotalLikes] = useState(3842);
  const [userHasLikedApp, setUserHasLikedApp] = useState(false);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;

    const newComment: DelegateComment = {
      id: `c-${Date.now()}`,
      userName: currentUser.fullName || 'Citizen Delegate',
      userAvatar: currentUser.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      nationality: currentUser.nationality || 'Ethiopia 🇪🇹',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      commentText: newCommentInput.trim(),
      likesCount: 1,
      hasLiked: true,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentInput('');
    rewardUserAction('speak');
  };

  const handleToggleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const nextState = !c.hasLiked;
          return {
            ...c,
            hasLiked: nextState,
            likesCount: nextState ? c.likesCount + 1 : c.likesCount - 1,
          };
        }
        return c;
      })
    );
    rewardUserAction('like');
  };

  const handleAppLike = () => {
    if (!userHasLikedApp) {
      setTotalLikes((prev) => prev + 1);
      setUserHasLikedApp(true);
      rewardUserAction('like');
    }
  };

  return (
    <div className="space-y-6">
      {/* Social Interaction Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6 fill-amber-500/30 text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">
              የጉባኤው ማህበራዊ መስተጋብር (Likes, Shares & Community Dialogue)
            </h3>
            <p className="text-xs text-slate-400">
              ድምር ላይኮች፦ <strong className="text-amber-300">{totalLikes.toLocaleString()}</strong> | የቀጥታ አስተያየቶች፦ <strong>{comments.length}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAppLike}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              userHasLikedApp
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${userHasLikedApp ? 'fill-white' : ''}`} />
            <span>{userHasLikedApp ? 'አመሰግናለሁ! (Liked)' : 'ላይክ አድርግ (Like Platform)'}</span>
          </button>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>ለአለም አጋራ (Share Link)</span>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <form onSubmit={handlePostComment} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-2">
        <input
          type="text"
          value={newCommentInput}
          onChange={(e) => setNewCommentInput(e.target.value)}
          placeholder="ሀሳብዎን፣ ምርቃትዎን ወይም አስተያየትዎን እዚህ ይፃፉ... (Write your live comment here)"
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={!newCommentInput.trim()}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>ላክ (Post)</span>
        </button>
      </form>

      {/* Comments Stream */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="w-8 h-8 rounded-full object-cover border border-amber-400/80 shadow"
                />
                <div>
                  <span className="font-bold text-white block">{comment.userName}</span>
                  <span className="text-[10px] text-slate-400">{comment.nationality}</span>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 font-mono">{comment.timestamp}</span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed pl-10">
              {comment.commentText}
            </p>

            <div className="pl-10 pt-1 flex items-center space-x-3 text-xs">
              <button
                onClick={() => handleToggleLike(comment.id)}
                className={`flex items-center space-x-1.5 text-[11px] font-semibold transition-colors cursor-pointer ${
                  comment.hasLiked ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${comment.hasLiked ? 'fill-amber-400' : ''}`} />
                <span>{comment.likesCount} ላይክ</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
