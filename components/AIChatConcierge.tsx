
import React, { useState, useRef, useEffect } from 'react';
import { getConciergeResponse } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { SITE_CONFIG, UI_LABELS } from '../constants';

interface AIChatConciergeProps {
  lang: Language;
}

const AIChatConcierge: React.FC<AIChatConciergeProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Inizializza il messaggio di benvenuto al cambio lingua
  useEffect(() => {
    setMessages([
      { role: 'model', content: UI_LABELS.chat_welcome[lang] }
    ]);
  }, [lang]);

  // Scroll automatico alla fine della chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await getConciergeResponse(userMsg, messages, lang);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[200]">
      {isOpen ? (
        <div className="bg-white w-[88vw] sm:w-[380px] h-[500px] shadow-2xl flex flex-col rounded-[2.5rem] overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl border border-white/20">
                {SITE_CONFIG.hostName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none mb-1">{SITE_CONFIG.hostName}</h4>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Concierge AI</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-60 transition-opacity p-2 bg-white/10 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 rounded-3xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-500/20' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none shadow-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-bl-none">
                   <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'it' ? 'Scrivi qui...' : lang === 'de' ? 'Nachricht...' : 'Type here...'}
              className="flex-1 bg-slate-100 border-none px-5 py-4 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400 font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-50 disabled:bg-slate-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] flex items-center justify-center shadow-2xl hover:bg-blue-600 transition-all hover:scale-110 active:scale-95 group relative border-4 border-white"
          aria-label="Open chat"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIChatConcierge;
