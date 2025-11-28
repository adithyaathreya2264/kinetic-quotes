import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Plus, Download, Upload, Library, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './db';
import { QuoteFormData } from './types';
import QuoteCard from './components/QuoteCard';
import AddQuoteModal from './components/AddQuoteModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quotes = useLiveQuery(() => db.quotes.reverse().toArray());

  const handleAddQuote = async (data: QuoteFormData) => {
    try {
      await db.quotes.add({
        ...data,
        createdAt: Date.now(),
      });
    } catch (error) {
      console.error('Failed to add quote:', error);
      alert('Could not save quote. Please try again.');
    }
  };

  const handleDeleteQuote = async (id: number) => {
    try {
      await db.quotes.delete(id);
    } catch (error) {
      console.error('Failed to delete quote:', error);
    }
  };

  const handleExport = async () => {
    if (!quotes || quotes.length === 0) return;
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kinetic-quotes-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
            const validQuotes = json.filter((q: any) => q.text && q.author && q.theme);
            if(confirm(`Import ${validQuotes.length} quotes? This will add to your existing library.`)) {
                const safeQuotes = validQuotes.map(({ id, ...rest }) => rest);
                await db.quotes.bulkAdd(safeQuotes);
            }
        }
      } catch (err) {
        console.error(err);
        alert("Failed to parse JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-paper pb-32 selection:bg-stone-200 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div 
            animate={{ 
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
            }}
            className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-br from-stone-200/30 via-stone-100/20 to-transparent rounded-full blur-[100px]" 
        />
        
        <motion.div 
            animate={{ 
                x: [0, -30, 0],
                y: [0, -50, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-gradient-to-tl from-stone-200/30 via-stone-50/10 to-transparent rounded-full blur-[120px]" 
        />

        <motion.div 
             animate={{ 
                x: [0, 40, -20, 0],
                y: [0, 40, 20, 0],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5
            }}
            className="absolute top-[40%] left-[20%] w-[50vw] h-[50vw] bg-gradient-to-r from-stone-100/20 to-transparent rounded-full blur-[80px] opacity-60" 
        />
      </div>

      {/* Floating Header */}
      <div className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="pointer-events-auto bg-surface/80 backdrop-blur-xl border border-white/50 shadow-soft rounded-full px-6 py-3 flex items-center gap-6 max-w-2xl w-full justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="bg-ink text-white p-1.5 rounded-lg">
                <Library className="w-4 h-4" />
            </div>
            <h1 className="font-serif font-semibold text-lg tracking-tight text-ink">Kinetic Quotes</h1>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="relative group">
                <input 
                    type="file" 
                    id="import-file" 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleImport}
                />
                <label 
                    htmlFor="import-file"
                    className="p-2 text-subtle hover:text-ink hover:bg-stone-100 rounded-full cursor-pointer transition-colors block"
                    title="Import JSON"
                >
                    <Upload size={18} strokeWidth={2} />
                </label>
             </div>
             
             <button 
                onClick={handleExport}
                className="p-2 text-subtle hover:text-ink hover:bg-stone-100 rounded-full transition-colors"
                title="Export JSON"
             >
                <Download size={18} strokeWidth={2} />
             </button>
          </div>
        </motion.header>
      </div>

      {/* Main Content - Masonry Layout */}
      <main className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        {!quotes ? (
             <div className="flex justify-center py-20 opacity-50">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-ink"></div>
             </div>
        ) : quotes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6"
          >
            <div className="mb-8 p-8 bg-white shadow-soft rounded-3xl text-subtle ring-1 ring-stone-100 relative overflow-hidden">
                <Sparkles size={48} strokeWidth={1} className="relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-stone-50 to-white opacity-50" />
            </div>
            <h2 className="text-3xl font-serif text-ink mb-3 font-medium">Begin your collection</h2>
            <p className="text-subtle text-lg max-w-md font-sans font-light leading-relaxed">
              Words have weight. Store the ones that move you in your personal kinetic gallery.
            </p>
          </motion.div>
        ) : (
          /* Masonry using CSS Columns */
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            <AnimatePresence mode="popLayout">
              {quotes.map((quote) => (
                <div key={quote.id} className="break-inside-avoid mb-8">
                    <QuoteCard 
                        quote={quote} 
                        onDelete={() => handleDeleteQuote(quote.id!)}
                    />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 w-16 h-16 bg-ink text-white rounded-full shadow-soft-hover hover:shadow-2xl flex items-center justify-center z-30 transition-all hover:bg-stone-800"
      >
        <Plus size={32} strokeWidth={1.5} />
      </motion.button>

      <AddQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddQuote}
      />
    </div>
  );
};

export default App;