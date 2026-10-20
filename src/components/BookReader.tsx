/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BIBLICAL_ERAS,
  BIBLICAL_EVENTS,
  BIBLICAL_CHARACTERS,
  BiblicalEra,
  BiblicalEvent,
  BiblicalCharacter
} from '@/src/data/biblicalData';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  BookOpen,
  Bookmark,
  Share2,
  Calendar,
  Compass,
  Scroll,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { speechNarrator, SpeechState } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface BookReaderProps {
  onSelectCharacter: (char: BiblicalCharacter) => void;
  onSelectEvent: (event: BiblicalEvent) => void;
  onBookmarksUpdated: () => void;
}

export const BookReader: React.FC<BookReaderProps> = ({
  onSelectCharacter,
  onSelectEvent,
  onBookmarksUpdated
}) => {
  const [currentEraIndex, setCurrentEraIndex] = useState(0);
  const [speechState, setSpeechState] = useState<SpeechState>(speechNarrator.getState());
  const [copiedQuote, setCopiedQuote] = useState(false);

  const era = BIBLICAL_ERAS[currentEraIndex];
  const eraEvents = BIBLICAL_EVENTS.filter(e => e.eraId === era.id);
  const eraCharacters = BIBLICAL_CHARACTERS.filter(c => c.eraId === era.id);
  const bookmarked = isBookmarked(era.id, 'era');

  useEffect(() => {
    const unsubscribe = speechNarrator.subscribe(setSpeechState);
    return () => {
      unsubscribe();
      speechNarrator.stop();
    };
  }, []);

  const handleToggleAudio = () => {
    if (speechState.isPlaying) {
      speechNarrator.stop();
    } else {
      const speechText = `${era.title}. ${era.subtitle}. Periodo: ${era.timeframe}. ${era.summary} Pasajes clave: ${era.keyScriptures}.`;
      speechNarrator.speak(speechText);
    }
  };

  const handleNextEra = () => {
    if (currentEraIndex < BIBLICAL_ERAS.length - 1) {
      speechNarrator.stop();
      setCurrentEraIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevEra = () => {
    if (currentEraIndex > 0) {
      speechNarrator.stop();
      setCurrentEraIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(era.id, 'era');
    } else {
      saveBookmark({
        id: era.id,
        type: 'era',
        title: era.title,
        subtitle: era.timeframe
      });
    }
    onBookmarksUpdated();
  };

  const handleShareQuote = () => {
    const text = `"${era.title}" - ${era.subtitle} (${era.timeframe}). Cronos Bíblico.`;
    navigator.clipboard.writeText(text);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Chapter Index Ribbon */}
      <div className="mb-8 p-3 sm:p-4 bg-[#F2EBDE] rounded-xl border border-[#E4D9C5] shadow-xs">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5E3C] tracking-wide uppercase">
            <Scroll className="w-4 h-4 text-[#9A3412]" />
            <span>Índice del Libro Sagrado</span>
          </div>
          <span className="text-xs text-[#736352] tabular-nums">
            Capítulo {currentEraIndex + 1} de {BIBLICAL_ERAS.length}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-1.5 sm:gap-2">
          {BIBLICAL_ERAS.map((e, idx) => (
            <button
              key={e.id}
              onClick={() => {
                speechNarrator.stop();
                setCurrentEraIndex(idx);
              }}
              className={`cursor-pointer px-2 py-1.5 rounded-lg text-left text-xs transition-all ${
                idx === currentEraIndex
                  ? 'bg-[#2B2117] text-[#FAF7EE] shadow-sm font-semibold'
                  : 'bg-[#FAF6EE] text-[#5C4F41] hover:bg-white hover:text-[#2B2117] border border-[#E9E0CE]'
              }`}
            >
              <div className="text-[10px] opacity-75 font-mono">0{e.order}</div>
              <div className="truncate font-serif leading-tight">{e.title.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Digital Codex Spread */}
      <article className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] shadow-md overflow-hidden relative">
        {/* Top Decorative Header Strip */}
        <div className="bg-[#2B2117] text-[#EFE7DA] px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#3D3125]">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-serif text-[#D8B98B]">
            <span>{era.testament} Testamento</span>
            <span aria-hidden="true">·</span>
            <span>{era.timeframe}</span>
            <span aria-hidden="true">·</span>
            <span>Duración: {era.durationYears}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                speechState.isPlaying
                  ? 'bg-[#9A3412] text-white'
                  : 'bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30]'
              }`}
              title="Escuchar narración en español"
            >
              {speechState.isPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Detener</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar</span>
                </>
              )}
            </button>

            <button
              onClick={handleToggleBookmark}
              className={`cursor-pointer p-1.5 rounded-lg transition-colors ${
                bookmarked
                  ? 'bg-[#9A3412] text-white'
                  : 'bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30]'
              }`}
              title={bookmarked ? 'Guardado en marcadores' : 'Guardar capítulo'}
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={handleShareQuote}
              className="cursor-pointer p-1.5 rounded-lg bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30] transition-colors"
              title="Copiar referencia"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedQuote && (
              <span className="text-[11px] text-[#A3E635] font-mono">¡Copiado!</span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 lg:p-12">
          {/* Chapter Title & Subtitle */}
          <header className="mb-8 border-b border-[#E7DECD] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold font-cinzel">
              Capítulo 0{era.order}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#271E16] tracking-tight mt-1 mb-2 leading-tight">
              {era.title}
            </h1>
            <p className="text-base sm:text-lg font-serif italic text-[#736352] max-w-3xl">
              {era.subtitle}
            </p>
          </header>

          {/* Featured Visual Canvas & Editorial Narrative Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
            {/* Left: Dominant Classical Sacred Art */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-[#D5C6AF] shadow-sm bg-[#ECE4D5] aspect-4/3">
                {era.bannerImage ? (
                  <img
                    src={era.bannerImage}
                    alt={era.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-[#736352]">
                    <BookOpen className="w-12 h-12 mb-2 text-[#9A3412]" />
                    <span className="font-serif italic">Manuscrito Histórico</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-serif italic">
                    Representación artística de la época bíblica
                  </div>
                </div>
              </div>

              {/* Theme tags unboxed (anti-slop clean metadata) */}
              <div className="bg-[#F4ECE0] p-4 rounded-xl border border-[#E5DAC6]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B5A47] mb-2 font-cinzel">
                  Ejes Teológicos de la Época
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#524436]">
                  {era.dominantThemes.map((theme, i) => (
                    <React.Fragment key={theme}>
                      <span className="font-medium">{theme}</span>
                      {i < era.dominantThemes.length - 1 && (
                        <span className="text-[#9A3412]" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Key Scripture Reference Card */}
              <div className="p-4 bg-white/70 rounded-xl border border-[#E5DAC6] text-xs text-[#5C4F41]">
                <div className="font-semibold text-[#8B5E3C] uppercase tracking-wide mb-1 flex items-center gap-1.5 font-cinzel">
                  <BookOpen className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>Libros Bíblicos Clave</span>
                </div>
                <div className="font-serif text-sm text-[#271E16]">{era.keyScriptures}</div>
              </div>
            </div>

            {/* Right: Editorial Narrative with Drop-Cap and Historical Insight */}
            <div className="lg:col-span-7 space-y-6 text-[#2E251D]">
              <div className="text-base sm:text-lg leading-relaxed text-[#3B3026] font-serif">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9A3412]">
                  {era.summary}
                </p>
              </div>

              {/* Pull quote from this era */}
              <blockquote className="my-6 p-6 bg-[#F6EFE3] rounded-xl border-y border-[#DFCDB7] relative">
                <div className="font-serif italic text-lg sm:text-xl text-[#2B2117] leading-snug">
                  {eraEvents[0]?.keyVerse ||
                    'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'}
                </div>
                <footer className="mt-2 text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider font-cinzel">
                  — {eraEvents[0]?.scriptureReference || 'Salmos 119:105'}
                </footer>
              </blockquote>

              {/* Historical & Chronological Overview */}
              <div className="space-y-3 text-sm text-[#4E4133] leading-relaxed">
                <h3 className="text-base font-semibold text-[#271E16] font-cinzel">
                  Significado en la Historia de la Salvación
                </h3>
                <p>
                  Esta etapa cronológica representa un eslabón indispensable en el despliegue progresivo
                  de la revelación divina. Dios interviene directamente en la geografía del Cercano Oriente
                  y el mundo grecorromano, tratando con reyes, profetas y personas sencillas para forjar
                  un pueblo de fe y manifestar Su justicia y fidelidad.
                </p>
              </div>
            </div>
          </div>

          {/* Events Spotlight in this Era */}
          <section className="mb-12 border-t border-[#E7DECD] pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#271E16]">
                  Acontecimientos Estelares del Capítulo
                </h2>
                <p className="text-xs text-[#736352] mt-0.5">
                  Hechos históricos y bíblicos que definieron esta época
                </p>
              </div>
              <span className="text-xs font-mono text-[#8B5E3C] tabular-nums">
                {eraEvents.length} hitos registrados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eraEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onSelectEvent(event)}
                  className="cursor-pointer group p-5 bg-white rounded-xl border border-[#E7DECD] hover:border-[#9A3412] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8B5E3C] mb-2 font-mono tabular-nums">
                      <span>{event.approxDate}</span>
                      <span className="text-[#9A3412] font-semibold">{event.scriptureReference}</span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#271E16] group-hover:text-[#9A3412] transition-colors leading-snug mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs text-[#5C4F41] line-clamp-3 leading-relaxed mb-3">
                      {event.summary}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#F2EBDE] flex items-center justify-between text-xs text-[#9A3412] font-medium">
                    <span>Ver relato y contexto bíblico</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Characters in this Era */}
          {eraCharacters.length > 0 && (
            <section className="border-t border-[#E7DECD] pt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#271E16]">
                    Personajes Bíblicos de la Época
                  </h2>
                  <p className="text-xs text-[#736352] mt-0.5">
                    Hombres y mujeres protagonistas del plan divino
                  </p>
                </div>
                <span className="text-xs font-mono text-[#8B5E3C] tabular-nums">
                  {eraCharacters.length} biografías
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eraCharacters.map(char => (
                  <div
                    key={char.id}
                    onClick={() => onSelectCharacter(char)}
                    className="cursor-pointer group p-4 bg-white rounded-xl border border-[#E7DECD] hover:border-[#9A3412] hover:shadow-md transition-all flex items-start gap-4"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#DFCDB7] bg-[#F2EBDE]">
                      <img
                        src={char.image}
                        alt={char.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-[#9A3412] uppercase tracking-wide">
                        {char.category}
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#271E16] group-hover:text-[#9A3412] truncate">
                        {char.name}
                      </h4>
                      <p className="text-[11px] text-[#736352] italic truncate mb-1">
                        {char.meaning}
                      </p>
                      <p className="text-xs text-[#5C4F41] line-clamp-2 leading-relaxed">
                        {char.shortBio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Book Navigation Footer */}
        <footer className="bg-[#F4ECE0] border-t border-[#E7DECD] px-6 py-4 flex items-center justify-between gap-4">
          <button
            onClick={handlePrevEra}
            disabled={currentEraIndex === 0}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentEraIndex === 0
                ? 'opacity-40 cursor-not-allowed text-[#8C7D6D]'
                : 'text-[#2B2117] hover:bg-[#EAE0D0]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Capítulo Anterior</span>
            <span className="sm:hidden">Anterior</span>
          </button>

          <span className="text-xs text-[#6B5A47] font-serif italic text-center">
            Página {currentEraIndex + 1} de {BIBLICAL_ERAS.length}
          </span>

          <button
            onClick={handleNextEra}
            disabled={currentEraIndex === BIBLICAL_ERAS.length - 1}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentEraIndex === BIBLICAL_ERAS.length - 1
                ? 'opacity-40 cursor-not-allowed text-[#8C7D6D]'
                : 'bg-[#2B2117] text-white hover:bg-[#433527] shadow-xs'
            }`}
          >
            <span className="hidden sm:inline">Siguiente Capítulo</span>
            <span className="sm:hidden">Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </article>
    </div>
  );
};
