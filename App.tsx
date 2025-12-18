
import React, { useState } from 'react';
import { APARTMENTS } from './constants';
import { Apartment } from './types';
import ApartmentCard from './components/ApartmentCard';
import PropertyModal from './components/PropertyModal';

type View = 'home' | 'story' | 'privacy' | 'terms';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  const navigateTo = (newView: View, anchor?: string) => {
    setView(newView);
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInquiryFromModal = () => {
    setSelectedApartment(null);
    navigateTo('home', 'contact');
  };

  const HomeView = () => (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-6 lake-gradient overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=2000" 
            alt="Lake Maggiore Vista"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">Boutique Lake Maggiore Stays</span>
          <h1 className="text-5xl lg:text-8xl font-bold text-slate-900 mb-8 leading-[1]">
            The beauty of <br />
            <span className="serif italic font-normal text-blue-600 tracking-tight">Laveno Mombello.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
            Independent, family-run holiday homes designed for travelers seeking the authentic Italian lake experience. 
            Directly from the hosts, no booking fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => navigateTo('home', 'stays')}
              className="inline-block bg-slate-900 text-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Explore Stays
            </button>
            <button 
              onClick={() => navigateTo('story')}
              className="inline-block bg-white border border-slate-200 text-slate-900 px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:border-slate-400 transition-all shadow-sm transform hover:-translate-y-1"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Property Section */}
      <section id="stays" className="py-32 px-6 max-w-6xl mx-auto w-full scroll-mt-20">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">The Collection</h2>
          <p className="text-slate-500 serif italic text-xl">Four unique perspectives of Lake Maggiore life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {APARTMENTS.map(apt => (
            <ApartmentCard 
              key={apt.id} 
              apartment={apt} 
              onSelect={setSelectedApartment}
            />
          ))}
        </div>
      </section>

      {/* Local Experience */}
      <section id="location" className="py-32 bg-white border-y border-slate-100 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Your Gateway to the Lake</h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Laveno is the only town on Lake Maggiore with a direct train to Milan and a car ferry to the western shore. It's the perfect hub for explorers and dreamers alike.
              </p>
              <div className="space-y-8">
                {[
                  { title: "Sasso del Ferro", desc: "Rise above the clouds with the open-air cable car for a 360° view of the Alps." },
                  { title: "Ceramic Heritage", desc: "Visit the MIDeC museum to see why Laveno has been the capital of ceramics for centuries." },
                  { title: "Island Hopping", desc: "Board a ferry to the Borromean Islands or the botanical gardens of Villa Taranto." }
                ].map(item => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 order-1 lg:order-2">
              <div className="space-y-6">
                <img src="https://images.unsplash.com/photo-1558239027-63a566735398?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-96 w-full object-cover shadow-2xl" alt="Laveno" />
                <img src="https://images.unsplash.com/photo-151833153ec36-076135891e4b?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-56 w-full object-cover shadow-lg" alt="Lake Life" />
              </div>
              <div className="pt-16 space-y-6">
                <img src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-64 w-full object-cover shadow-lg" alt="Village" />
                <img src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&q=80&w=600" className="rounded-3xl h-80 w-full object-cover shadow-2xl" alt="Laveno Coast" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-slate-900 text-white scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-10 text-3xl font-bold shadow-2xl">E</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to book?</h2>
          <p className="text-slate-400 mb-16 text-xl leading-relaxed max-w-2xl mx-auto">
            Contact Elena directly for rates and availability. We prefer the personal touch to ensure your stay is exactly what you imagine.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href="mailto:elena@lavenoshores.com" className="bg-white/5 border border-white/10 px-10 py-8 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-white/10 transition-all group backdrop-blur-sm">
              <div className="p-4 bg-blue-600 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl mb-1">Send an Email</p>
                <p className="text-sm text-slate-500">elena@lavenoshores.com</p>
              </div>
            </a>
            <a href="https://wa.me/393331234567" target="_blank" rel="noopener noreferrer" className="bg-green-600 px-10 py-8 rounded-[2rem] flex flex-col items-center gap-4 hover:bg-green-500 transition-all shadow-xl group">
              <div className="p-4 bg-white/20 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl mb-1">WhatsApp Chat</p>
                <p className="text-sm opacity-80">Instant Responses</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );

  const OurStoryView = () => (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen">
      <button onClick={() => navigateTo('home')} className="mb-12 flex items-center gap-3 text-blue-600 font-bold uppercase text-xs tracking-[0.3em] hover:text-blue-700 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        Back to Home
      </button>
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-12">Our Story</h1>
      <div className="prose prose-slate lg:prose-xl max-w-none text-slate-600 leading-relaxed space-y-8">
        <p className="text-2xl serif italic text-slate-800 leading-snug">Founded on the shores of Lake Maggiore, Laveno Shores is a labor of love.</p>
        <p>
          It began with a single property—'Il Borghetto'—a 300-year-old stone house in Mombello that has been in our family for generations. After a painstaking restoration, we realized that visitors to our lake were looking for something different: not a sterile hotel, but a home.
        </p>
        <p>
          Today, we manage four exclusive residences. Each is a reflection of our family’s commitment to quality and Italian hospitality. We live here, we love it here, and we can’t wait to share it with you.
        </p>
        <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200" alt="Lake Sunset" className="rounded-[2.5rem] shadow-2xl my-16 w-full h-[500px] object-cover" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div onClick={() => navigateTo('home')} className="flex items-center gap-2 cursor-pointer group">
            <span className="text-2xl font-bold tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">Laveno Shores</span>
          </div>
          <nav className="hidden md:flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <button onClick={() => navigateTo('home', 'stays')} className="hover:text-slate-900 transition-colors">Collection</button>
            <button onClick={() => navigateTo('home', 'location')} className="hover:text-slate-900 transition-colors">Guide</button>
            <button onClick={() => navigateTo('home', 'contact')} className="text-blue-600 hover:text-blue-700 font-extrabold">Inquire Now</button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {view === 'home' && <HomeView />}
        {view === 'story' && <OurStoryView />}
        {view === 'privacy' && <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen"><h1>Privacy</h1></div>}
        {view === 'terms' && <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen"><h1>Terms</h1></div>}
      </main>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            <div className="max-w-sm">
              <p onClick={() => navigateTo('home')} className="text-3xl font-bold text-slate-900 mb-4 cursor-pointer">Laveno Shores</p>
              <p className="text-slate-400 leading-relaxed mb-6">Authentic boutique rentals in the heart of Laveno Mombello, Lake Maggiore.</p>
              <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">Via Roma 12, 21014 Laveno (VA)</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Explore</p>
                <button onClick={() => navigateTo('home', 'stays')} className="block text-slate-500 hover:text-slate-900 transition-colors text-sm">Our Stays</button>
                <button onClick={() => navigateTo('story')} className="block text-slate-500 hover:text-slate-900 transition-colors text-sm">Our Story</button>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Support</p>
                <button onClick={() => navigateTo('home', 'contact')} className="block text-slate-500 hover:text-slate-900 transition-colors text-sm">Contact</button>
                <a href="https://wa.me/393331234567" className="block text-slate-500 hover:text-slate-900 transition-colors text-sm">WhatsApp</a>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">Social</p>
                <span className="block text-slate-300 text-sm">Instagram</span>
                <span className="block text-slate-300 text-sm">Facebook</span>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col sm:flex-row justify-between gap-6 text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
            <p>© 2024 Laveno Shores Stays</p>
            <div className="flex gap-8">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      <PropertyModal 
        apartment={selectedApartment} 
        onClose={() => setSelectedApartment(null)} 
        onInquiry={handleInquiryFromModal}
      />
    </div>
  );
};

export default App;
