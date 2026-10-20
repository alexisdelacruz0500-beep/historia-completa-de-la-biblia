/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BiblicalEvent,
  BIBLICAL_ERAS,
  BIBLICAL_CHARACTERS,
  BiblicalCharacter
} from '@/src/data/biblicalData';
import {
  X,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  BookOpen,
  MapPin,
  Calendar,
  Sparkles,
  Check,
  User
} from 'lucide-react';
import { speechNarrator } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface EventDetailModalProps {
  event: BiblicalEvent | null;
  onClose: () => void;
  onBookmarksUpdated: () => void;
  onSelectCharacterByName?: (name: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onBookmarksUpdated,
  onSelectCharacterByName
}) => {
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const era = BIBLICAL_ERAS.find(e => e.id === event.eraId);
  const bookmarked = isBookmarked(event.id, 'event');

  const handleSpeak = () => {
    const text = `${event.title}. Fecha aproximada: ${event.approxDate}. Referencia: ${event.scriptureReference}. Lugar: ${event.location}. Resumen: ${event.summary}. Contexto histórico: ${event.historicalContext}. Lección espiritual: ${event.theologicalLesson}. Versículo: ${event.keyVerse}.`;
    speechNarrator.speak(text);
  };

  const handleToggleBookmark = () => {
    if (bookmarked) {
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

  const handleCopy = () => {
    const text = `"${event.title}" (${event.scriptureReference}, ${event.approxDate}): ${event.summary} Versículo clave: "${event.keyVerse}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] shadow-2xl max-w-3xl w-full overflow-hidden my-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Banner if available, or dignified header */}
        <div className="relative bg-[#2B2117] text-[#FAF6EE] p-6 sm:p-8 border-b border-[#3E3123]">
          {event.bannerImage && (
            <div className="absolute inset-0 opacity-25 overflow-hidden">
              <img
                src={event.bannerImage}
                alt={event.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#D8B98B] font-cinzel mb-2">
              <span className="font-mono text-sm font-bold text-white">{event.approxDate}</span>
              <span aria-hidden="true">·</span>
              <span>{era?.title}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D8B98B]" />
                {event.location}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-2">
              {event.title}
            </h2>

            <div className="text-xs sm:text-sm font-semibold text-[#E5D2BA] font-cinzel">
              {event.scriptureReference}
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="bg-[#1F1812] px-6 py-2.5 flex items-center justify-between text-xs text-[#EFE7DA]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Escuchar Resumen</span>
            </button>
            <button
              onClick={() => speechNarrator.stop()}
              className="cursor-pointer px-2 py-1 rounded-md bg-[#3D3125] text-stone-400 hover:text-white transition-colors"
              title="Silenciar voz"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleBookmark}
              className={`cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${
                bookmarked ? 'bg-[#9A3412] text-white' : 'bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>{bookmarked ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Verse */}
          <blockquote className="p-4 bg-[#F5EEE2] rounded-xl border-l-4 border-[#9A3412] text-sm sm:text-base font-serif italic text-[#2E241B]">
            "{event.keyVerse}"
            <div className="mt-1 text-xs font-sans font-semibold text-[#8B5E3C] not-italic">
              — {event.scriptureReference}
            </div>
          </blockquote>

          {/* Resumen Narrativo */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel mb-2">
              Relato y Resumen Bíblico
            </h3>
            <p className="text-sm sm:text-base text-[#3E3226] font-serif leading-relaxed">
              {event.summary}
            </p>
          </div>

          {/* Contexto Histórico & Arqueológico */}
          <div className="p-4 bg-white rounded-xl border border-[#E7DECD]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-1 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#9A3412]" />
              <span>Contexto Histórico y Cultural</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3C2F] font-serif leading-relaxed">
              {event.historicalContext}
            </p>
          </div>

          {/* Lección Teológica */}
          <div className="p-4 bg-white rounded-xl border border-[#E7DECD]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#9A3412]" />
              <span>Lección Teológica y Práctica</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#4A3C2F] font-serif leading-relaxed">
              {event.theologicalLesson}
            </p>
          </div>

          {/* Associated Characters */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#9A3412]" />
              <span>Personajes Protagonistas</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {event.associatedCharacters.map((charName, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onClose();
                    onSelectCharacterByName?.(charName);
                  }}
                  className="cursor-pointer text-xs px-3 py-1.5 bg-[#FAF6EE] text-[#2B2117] hover:bg-[#9A3412] hover:text-white rounded-lg border border-[#DACFBF] transition-colors font-medium"
                >
                  {charName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF7F0] border-t border-[#E7DECD] px-6 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-[#2B2117] text-white rounded-xl text-xs font-medium hover:bg-[#433527] transition-colors"
          >
            Cerrar Acontecimiento
          </button>
        </div>
      </div>
    </div>
  );
};
