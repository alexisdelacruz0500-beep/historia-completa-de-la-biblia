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
  Calendar,
  MapPin,
  BookOpen,
  ArrowRight,
  Filter,
  Volume2,
  Bookmark,
  Share2,
  Layers,
  Sparkles
} from 'lucide-react';
import { speechNarrator } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface TimelineViewProps {
  onSelectEvent: (event: BiblicalEvent) => void;
  onSelectCharacterName?: (name: string) => void;
  onBookmarksUpdated: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  onSelectEvent,
  onBookmarksUpdated
}) => {
  const [testamentFilter, setTestamentFilter] = useState<'Todos' | 'Antiguo' | 'Nuevo'>('Todos');
  const [selectedEraId, setSelectedEraId] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEvents = BIBLICAL_EVENTS.filter(e => {
    if (testamentFilter !== 'Todos' && e.testament !== testamentFilter) return false;
    if (selectedEraId !== 'all' && e.eraId !== selectedEraId) return false;
    return true;
  });

  const handleSpeakEvent = (event: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${event.title}. Fecha aproximada: ${event.approxDate}. Pasaje: ${event.scriptureReference}. ${event.summary} Lección: ${event.theologicalLesson}.`;
    speechNarrator.speak(text);
  };

  const handleToggleBookmark = (event: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked(event.id, 'event')) {
      removeBookmark(event.id, 'event');
    } else {
      saveBookmark({
        id: event.id,
        type: 'event',
        title: event.title,
        subtitle: `${event.scriptureReference} · ${event.approxDate}`
      });
    }
    onBookmarksUpdated();
  };

  const handleShare = (event: BiblicalEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `"${event.title}" (${event.scriptureReference}, ${event.approxDate}): ${event.summary}`;
    navigator.clipboard.writeText(text);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold font-cinzel">
          Cronología de la Revelación
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#271E16] mt-1 mb-3">
          Línea de Tiempo de la Biblia
        </h1>
        <p className="text-sm sm:text-base text-[#6B5E4F] font-serif">
          Desde la Creación del Génesis hasta la gloriosa consumación del Apocalipsis.
          Explora los hitos donde la mano de Dios intervino en la historia humana.
        </p>
      </div>

      {/* Control and Filters Bar */}
      <div className="bg-[#FAF6EE] p-4 sm:p-5 rounded-2xl border border-[#E7DECD] shadow-xs mb-10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Testament Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#EFE7D8] rounded-lg">
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

          {/* Era Dropdown Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#736352] hidden sm:inline">Época:</span>
            <select
              value={selectedEraId}
              onChange={e => setSelectedEraId(e.target.value)}
              className="bg-white border border-[#DACFBF] rounded-lg px-3 py-1.5 text-xs text-[#2B2117] focus:outline-hidden focus:ring-1 focus:ring-[#9A3412]"
            >
              <option value="all">Todas las Épocas Bíblicas ({BIBLICAL_ERAS.length})</option>
              {BIBLICAL_ERAS.map(era => (
                <option key={era.id} value={era.id}>
                  {era.order}. {era.title} ({era.timeframe})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Unboxed Metadata Stats */}
        <div className="flex items-center gap-2 text-xs text-[#736352] pt-2 border-t border-[#EBE1D0]">
          <span>Mostrando {filteredEvents.length} acontecimientos históricos</span>
          <span aria-hidden="true">·</span>
          <span>Cobertura: ~4000 a.C. a 100 d.C.</span>
        </div>
      </div>

      {/* Vertical Illuminated Chronological Pathway */}
      <div className="relative pl-6 sm:pl-10 before:content-[''] before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#D5C5AE]">
        <div className="space-y-8 sm:space-y-12">
          {filteredEvents.map((event, index) => {
            const era = BIBLICAL_ERAS.find(e => e.id === event.eraId);
            const bookmarked = isBookmarked(event.id, 'event');

            return (
              <div key={event.id} className="relative group">
                {/* Pathway Milestone Node */}
                <div className="absolute -left-6 sm:-left-10 top-5 w-6 sm:w-10 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FAF7F0] border-2 border-[#9A3412] group-hover:scale-125 transition-transform" />
                </div>

                {/* Event Card */}
                <div
                  onClick={() => onSelectEvent(event)}
                  className="cursor-pointer bg-white rounded-2xl border border-[#E7DECD] hover:border-[#9A3412] p-5 sm:p-7 shadow-xs hover:shadow-md transition-all"
                >
                  {/* Top Bar of the Event Card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-[#8B5E3C] font-mono tabular-nums">
                      <span className="font-bold text-[#9A3412] text-sm">{event.approxDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-sans font-medium text-[#736352]">{era?.title}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-[#6B5E4F]">
                        <MapPin className="w-3 h-3 text-[#9A3412]" />
                        {event.location}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => handleSpeakEvent(event, e)}
                        className="cursor-pointer p-1.5 rounded-lg text-[#736352] hover:text-[#9A3412] hover:bg-[#F6EFE3] transition-colors"
                        title="Escuchar audio resumen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={e => handleToggleBookmark(event, e)}
                        className={`cursor-pointer p-1.5 rounded-lg transition-colors ${
                          bookmarked
                            ? 'text-[#9A3412] bg-[#FAF0E6]'
                            : 'text-[#736352] hover:text-[#9A3412] hover:bg-[#F6EFE3]'
                        }`}
                        title={bookmarked ? 'Guardado en marcadores' : 'Guardar marcador'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={e => handleShare(event, e)}
                        className="cursor-pointer p-1.5 rounded-lg text-[#736352] hover:text-[#9A3412] hover:bg-[#F6EFE3] transition-colors"
                        title="Copiar resumen"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                      {copiedId === event.id && (
                        <span className="text-[10px] text-green-700 font-mono">¡Copiado!</span>
                      )}
                    </div>
                  </div>

                  {/* Title & Scripture Reference */}
                  <div className="mb-3">
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#271E16] group-hover:text-[#9A3412] transition-colors">
                      {event.title}
                    </h2>
                    <div className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wider font-cinzel mt-0.5">
                      {event.scriptureReference}
                    </div>
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-sm text-[#4E4133] leading-relaxed mb-4">
                    {event.summary}
                  </p>

                  {/* Key Scripture Verse Box */}
                  <div className="p-3.5 bg-[#FAF7F0] rounded-xl border border-[#E9DFCF] mb-4 text-xs sm:text-sm font-serif italic text-[#382D22]">
                    "{event.keyVerse}"
                  </div>

                  {/* Bottom Strip: Associated Characters & Theological Note */}
                  <div className="pt-3 border-t border-[#F2EBDE] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[#736352] font-medium">Personajes:</span>
                      <div className="flex flex-wrap items-center gap-1.5 text-[#2B2117] font-semibold">
                        {event.associatedCharacters.map((c, i) => (
                          <span key={c}>
                            {c}
                            {i < event.associatedCharacters.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#9A3412] font-semibold group-hover:translate-x-0.5 transition-transform">
                      <span>Explorar acontecimiento a fondo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
