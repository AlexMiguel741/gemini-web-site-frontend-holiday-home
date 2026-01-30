import React from 'react';
import { SITE_CONFIG, STORY_CONTENT, UI_LABELS } from '../constants';
import { Language } from '../types';
import SmartImage from './SmartImage';

interface StoryProps {
  lang: Language;
}

const Story: React.FC<StoryProps> = ({ lang }) => {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-4xl sm:text-7xl font-bold mb-12 tracking-tighter leading-tight text-center text-[var(--color-text-main)]">{STORY_CONTENT.title[lang]}</h1>
      <p className="text-2xl sm:text-4xl serif italic text-[var(--color-text-main)] mb-16 text-center leading-relaxed">
        {STORY_CONTENT.quote[lang]}
      </p>
      <div className="prose prose-xl text-[var(--color-text-secondary)] space-y-10 text-left mb-16 font-light">
        {STORY_CONTENT.paragraphs[lang].map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <video
        className="w-full rounded-[2.5rem] shadow-2xl h-[400px] sm:h-[600px] object-cover"
        controls
        muted
        loop
        playsInline
      >
        <source src="/videos/lake-maggiore.mp4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <SmartImage src={STORY_CONTENT.image} alt={STORY_CONTENT.title[lang] + " - " + SITE_CONFIG.name} className="w-full h-full object-cover" />
      </video>
    </section>
  );
};

export default Story;
