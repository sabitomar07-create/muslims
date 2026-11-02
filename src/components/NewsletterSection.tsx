import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../firebase/db';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isSuccess: boolean; whatsappUrl?: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setFeedback(null);

    const submittedEmail = email.trim();
    const res = await subscribeNewsletter(submittedEmail);
    if (res.success) {
      let waUrl: string | undefined = undefined;
      try {
        const notifyRes = await fetch('/api/notify-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: submittedEmail,
            source: 'Newsletter Drop Inner Circle'
          })
        });
        if (notifyRes.ok) {
          const notifyData = await notifyRes.json();
          waUrl = notifyData.whatsappUrl;
        }
      } catch (notifyErr) {
        console.warn('WhatsApp API notification log error:', notifyErr);
      }

      setFeedback({
        text: `${res.message} Store owner has been notified via WhatsApp!`,
        isSuccess: true,
        whatsappUrl: waUrl
      });
      setEmail('');
    } else {
      setFeedback({ text: res.message, isSuccess: false });
    }
    setLoading(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#0d0d0f] border-b border-zinc-800 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span>JOIN THE INNER CIRCLE</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-brand text-2xl sm:text-4xl font-extrabold uppercase text-white tracking-wide">
            NEVER MISS A LIMITED DROP.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
            Subscribe for secret discount codes, early access to limited capsule releases, and editorial lookbooks. No spam ever.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email address..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Feedback Message */}
        {feedback && (
          <div className="max-w-md mx-auto space-y-2">
            <div
              className={`p-3 rounded text-xs flex items-center gap-2 text-left ${
                feedback.isSuccess
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-200'
                  : 'bg-red-950/60 border border-red-800 text-red-200'
              }`}
            >
              {feedback.isSuccess ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              )}
              <span className="flex-1">{feedback.text}</span>
            </div>

            {feedback.whatsappUrl && (
              <div className="bg-[#161619] border border-emerald-900/60 rounded px-3 py-2 text-xs flex items-center justify-between text-zinc-300">
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>WhatsApp alert triggered</span>
                </span>
                <a
                  href={feedback.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline text-[11px] inline-flex items-center gap-1"
                >
                  <span>Open WhatsApp Alert</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
