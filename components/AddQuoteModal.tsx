import React, { useState } from 'react';
import { X, Quote as QuoteIcon } from 'lucide-react';
import { QuoteFormData, AnimationTheme } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AddQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: QuoteFormData) => void;
}

const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ isOpen, onClose, onSave }) => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [theme, setTheme] = useState<AnimationTheme>(AnimationTheme.DRIFT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSave({
      text: text.trim(),
      author: author.trim() || 'Unknown',
      theme,
    });

    setText('');
    setAuthor('');
    setTheme(AnimationTheme.DRIFT);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-200/40 backdrop-blur-sm z-40 transition-all"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-surface w-full max-w-2xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12 pointer-events-auto relative overflow-hidden">
              
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 bg-stone-50 hover:bg-stone-100 rounded-full text-subtle hover:text-ink transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8 opacity-50">
                 <QuoteIcon size={20} className="text-subtle" />
                 <span className="text-sm font-sans font-medium text-subtle uppercase tracking-widest">New Entry</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-2 group">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g., The journey of a thousand miles begins with a single step."
                    className="w-full bg-transparent border-none p-0 text-3xl md:text-4xl font-serif text-ink placeholder:text-stone-200 focus:ring-0 resize-none min-h-[160px] leading-tight selection:bg-stone-100"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stone-100">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold font-sans text-subtle uppercase tracking-widest mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Oscar Wilde"
                      className="w-full bg-stone-50 hover:bg-stone-100 focus:bg-white border-none rounded-xl px-4 py-3 text-ink text-sm font-medium font-sans transition-colors placeholder:text-stone-300 focus:ring-2 focus:ring-stone-100"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold font-sans text-subtle uppercase tracking-widest mb-2">
                      Animation Style
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { val: AnimationTheme.DRIFT, label: 'Drift' },
                        { val: AnimationTheme.FADE_UP, label: 'Fade' },
                        { val: AnimationTheme.SHIMMER, label: 'Shimmer' },
                        { val: AnimationTheme.TYPEWRITER, label: 'Type' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          onClick={() => setTheme(opt.val)}
                          className={`px-3 py-3 rounded-xl text-xs font-bold font-sans transition-all border ${
                            theme === opt.val 
                              ? 'bg-ink text-white border-ink shadow-lg scale-[1.02]' 
                              : 'bg-white text-subtle border-stone-100 hover:border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={!text.trim()}
                    className="px-8 py-4 bg-ink text-white rounded-2xl font-medium text-sm font-sans hover:bg-stone-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    Save to Collection
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddQuoteModal;