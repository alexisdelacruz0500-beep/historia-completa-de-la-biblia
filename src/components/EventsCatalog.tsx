/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BIBLICAL_EVENTS,
  BIBLICAL_ERAS,
  BiblicalEvent,
  BiblicalCharacter
} from '@/src/data/biblicalData';
import {
  Search,
  BookOpen,
  MapPin,
  Calendar,
  Volume2,
  Bookmark,
  Share2,
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { speechNarrator } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface EventsCatalogProps {
  onSelectEvent: (event: BiblicalEvent) => void;
  onBookmarksUpdated: () => void;
}

export const EventsCatalog: React.FC<EventsCatalogProps> = ({
  onSelectEvent,
  onBookmarksUpdated
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'Todos' | 'Antiguo' | 'Nuevo'>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEvents = BIBLICAL_EVENTS.filter(evt => {
    if (testamentFilter !== 'Todos' && evt.testament !== testamentFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = evt.title.toLowerCase().includes(q);
      const matchSummary = evt.summary.toLowerCase().includes(q);
      const matchVerse = evt.keyVerse.toLowerCase().includes(q);
      const matchRef = evt.scriptureReference.toLowerCase().includes(q);
      const matchChar = evt.associatedCharacters.some(c => c.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchVerse && !matchRef && !matchChar) return false;
    }
    return true;
  });

  const handleSpeak = (evt: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${evt.title}. Referencia: ${evt.scriptureReference}. ${evt.summary} Contexto histórico: ${evt.historicalContext}. Lección espiritual: ${evt.theologicalLesson}`;
    speechNarrator.speak(text);
  };

  const handleToggleBookmark = (evt: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked(evt.id, 'event')) {
      removeBookmark(evt.id, 'event');
    } else {
      saveBookmark({
        id: evt.id,
        type: 'event',
        title: evt.title,
        subtitle: `${evt.scriptureReference} · ${evt.approxDate}`
      });
    }
    onBookmarksUpdated();
  };

  const handleShare = (evt: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `"${evt.title}" (${evt.scriptureReference}): ${evt.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedId(evt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold font-cinzel">
          Compendio de Hechos Sagrados
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#271E16] mt-1 mb-3">
          Acontecimientos Bíblicos Clave
        </h1>
        <p className="text-sm sm:text-base text-[#6B5E4F] font-serif">
          Los hitos más trascendentales de las Escrituras ordenados con su contexto histórico,
          pasajes bíblicos de referencia, lección teológica y aplicación para la vida.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E7DECD] shadow-xs mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7D6D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por milagro, personaje, pasaje o ciudad..."
              className="w-full bg-white border border-[#DACFBF] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#271E16] placeholder:text-[#9B8C7C] focus:outline-hidden focus:ring-1 focus:ring-[#9A3412]"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-[#EFE7D8] rounded-lg shrink-0 self-start md:self-auto">
            {(['Todos', 'Antiguo', 'Nuevo'] as const).map(testament => (
              <button
                key={testament}
                onClick={() => setTestamentFilter(testament)}
                className={`cursor-pointer px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  testamentFilter === testament
                    ? 'bg-[#2B2117] text-white shadow-xs font-semibold'
                    : 'text-[#6B5E4F] hover:text-[#2B2117]'
                }`}
              >
                {testament === 'Todos' ? 'Todos los Testamentos' : `${testament} Testamento`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#736352] pt-2 border-t border-[#EBE1D0]">
          <span>{filteredEvents.length} acontecimientos encontrados</span>
          <span aria-hidden="true">·</span>
          <span>Resúmenes con citas bíblicas directas y lecciones teológicas</span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(evt => {
          const era = BIBLICAL_ERAS.find(e => e.id === evt.eraId);
          const bookmarked = isBookmarked(evt.id, 'event');

          return (
            <article
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="cursor-pointer group bg-white rounded-2xl border border-[#E7DECD] hover:border-[#9A3412] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-[#8B5E3C] font-mono tabular-nums">
                    <span className="font-bold text-[#9A3412]">{evt.approxDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans font-medium text-[#736352]">{era?.title.split(' ')[0]}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={e => handleSpeak(evt, e)}
                      className="cursor-pointer p-1.5 rounded-lg text-[#736352] hover:text-[#9A3412] hover:bg-[#F8F3EA] transition-colors"
                      title="Escuchar narración"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={e => handleToggleBookmark(evt, e)}
                      className={`cursor-pointer p-1.5 rounded-lg transition-colors ${
                        bookmarked ? 'text-[#9A3412] bg-[#FAF0E6]' : 'text-[#736352] hover:text-[#9A3412]'
                      }`}
                      title={bookmarked ? 'Guardado en marcadores' : 'Guardar'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                    <button
                      onClick={e => handleShare(evt, e)}
                      className="cursor-pointer p-1.5 rounded-lg text-[#736352] hover:text-[#9A3412] transition-colors"
                      title="Copiar resumen"
                    >
                      {copiedId === evt.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Title & Scripture Book */}
                <h3 className="text-xl font-serif font-bold text-[#271E16] group-hover:text-[#9A3412] transition-colors leading-snug mb-1">
                  {evt.title}
                </h3>
                <div className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider font-cinzel mb-3">
                  {evt.scriptureReference}
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-[#4A3C2F] leading-relaxed mb-4">
                  {evt.summary}
                </p>

                {/* Key Scripture Verse */}
                <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EBE2D3] text-xs font-serif italic text-[#382D22] mb-4">
                  "{evt.keyVerse}"
                </div>

                {/* Theological Lesson Highlight */}
                <div className="space-y-1 mb-4 text-xs">
                  <span className="font-semibold text-[#8B5E3C] uppercase tracking-wider font-cinzel">
                    Lección Espiritual:
                  </span>
                  <p className="text-[#594B3C] leading-relaxed">{evt.theologicalLesson}</p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-[#F2EBDE] flex items-center justify-between text-xs text-[#736352]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#9A3412]" />
                  <span>{evt.location}</span>
                </div>

                <div className="flex items-center gap-1 text-[#9A3412] font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Detalles completos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
