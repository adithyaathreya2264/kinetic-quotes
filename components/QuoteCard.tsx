import React from 'react';
import { Quote, AnimationTheme } from '../types';
import KineticText from './KineticText';
import { Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuoteCardProps {
  quote: Quote;
  onDelete: (id: number) => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Remove this quote from your collection?")) {
        onDelete(quote.id!);
    }
  };

  const handleCopy = (e: React.MouseEvent) => {
      e.stopPropagation();
      navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
  };

  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="group relative bg-surface p-8 md:p-10 rounded-2xl shadow-soft hover:shadow-soft-hover transition-all duration-500 border border-stone-100 flex flex-col justify-between overflow-hidden"
    >
      {/* Decorative Gradient based on ID/Randomness logic could go here, staying minimal for now */}
      
      {/* Controls - visible on hover */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
        <button 
          onClick={handleCopy}
          className="p-2 text-stone-300 hover:text-ink hover:bg-stone-50 rounded-full transition-colors"
          title="Copy text"
        >
          <Copy size={14} />
        </button>
        <button 
          onClick={handleDelete}
          className="p-2 text-stone-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          title="Delete quote"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="mb-8 min-h-[120px] flex items-center justify-center">
        <KineticText 
          text={quote.text} 
          theme={quote.theme} 
          className="text-2xl md:text-3xl lg:text-[2rem] font-serif text-ink leading-tight text-center"
        />
      </div>

      <div className="flex flex-col items-center border-t border-stone-100/50 pt-6 mt-auto">
        <KineticText 
          text={quote.author} 
          theme={AnimationTheme.FADE_UP} 
          className="text-sm font-sans text-subtle font-medium tracking-widest uppercase"
          delay={4} 
        />
        {/* Subtle dot indicating theme/type */}
        <div className="mt-3 w-1 h-1 rounded-full bg-stone-200" />
      </div>
      
      {/* Ambient background effects */}
      {quote.theme === AnimationTheme.DRIFT && (
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-stone-50 rounded-full blur-[80px] opacity-60 pointer-events-none" />
      )}
       {quote.theme === AnimationTheme.SHIMMER && (
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-100 to-transparent opacity-50" />
      )}
    </motion.div>
  );
};

export default QuoteCard;