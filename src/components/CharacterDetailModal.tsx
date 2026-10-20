/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BiblicalCharacter, BIBLICAL_ERAS, BIBLICAL_EVENTS } from '@/src/data/biblicalData';
import {
  X,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  BookOpen,
  Calendar,
  Sparkles,
  Check,
  Award
} from 'lucide-react';
import { speechNarrator } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface CharacterDetailModalProps {
  character: BiblicalCharacter | null;
  onClose: () => void;
  onBookmarksUpdated: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({
  character,
  onClose,
  onBookmarksUpdated,
  onSelectEvent
}) => {
  const [copied, setCopied] = useState(false);

  if (!character) return null;

  const era = BIBLICAL_ERAS.find(e => e.id === character.eraId);
  const bookmarked = isBookmarked(character.id, 'character');

  const handleSpeak = () => {
    const text = `${character.name}. ${character.meaning}. ${character.category} del ${character.testament} Testamento. ${character.shortBio} Su momento decisivo: ${character.decisiveMoment}. Lección espiritual: ${character.spiritualLesson}.`;
    speechNarrator.speak(text);
  };

  const handleToggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(character.id, 'character');
    } else {
      saveBookmark({
        id: character.id,
        type: 'character',
        title: character.name,
        subtitle: `${character.category} · ${character.meaning}`
      });
    }
    onBookmarksUpdated();
  };

  const handleCopyQuote = () => {
    const text = `"${character.bibleVerse}" — ${character.name} (${character.scriptureBook})`;
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
        {/* Header Visual with Portrait */}
        <div className="relative h-64 sm:h-72 bg-[#ECE4D5] overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1812] via-[#1F1812]/50 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Character Main Header Info */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#D8B98B] font-cinzel mb-1">
              <span>{character.category}</span>
              <span aria-hidden="true">·</span>
              <span>{character.testament} Testamento</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{character.approxDate}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {character.name}
            </h2>
            <div className="text-sm font-serif italic text-stone-300">
              {character.originalName} — <span className="text-[#F5E6CA]">"{character.meaning}"</span>
            </div>
          </div>
        </div>

        {/* Action Ribbon */}
        <div className="bg-[#2B2117] px-6 py-2.5 flex items-center justify-between text-xs text-[#EFE7DA]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30] transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Escuchar Biografía</span>
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
              onClick={handleCopyQuote}
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#3D3125] text-[#D8B98B] hover:bg-[#4E3F30] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Cita'}</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Key Verse Highlight */}
          <blockquote className="p-4 bg-[#F5EEE2] rounded-xl border-l-4 border-[#9A3412] text-sm sm:text-base font-serif italic text-[#2E241B]">
            "{character.bibleVerse}"
            <div className="mt-1 text-xs font-sans font-semibold text-[#8B5E3C] not-italic">
              — {character.scriptureBook}
            </div>
          </blockquote>

          {/* Biografia Resumida */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel mb-2">
              Biografía y Vocación
            </h3>
            <p className="text-sm sm:text-base text-[#3E3226] font-serif leading-relaxed">
              {character.shortBio}
            </p>
          </div>

          {/* Decisive Moment */}
          <div className="p-4 bg-white rounded-xl border border-[#E7DECD]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#9A3412]" />
              <span>El Momento Decisivo</span>
            </h3>
            <p className="text-sm text-[#3E3226] font-serif leading-relaxed">
              {character.decisiveMoment}
            </p>
          </div>

          {/* Virtudes y Lección Espiritual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Virtudes */}
            <div className="p-4 bg-white rounded-xl border border-[#E7DECD]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#9A3412]" />
                <span>Virtudes y Rasgos Clave</span>
              </h3>
              <ul className="space-y-1.5 text-xs text-[#4A3C2F]">
                {character.keyVirtues.map((v, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A3412]" />
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lección Espiritual */}
            <div className="p-4 bg-white rounded-xl border border-[#E7DECD]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#9A3412]" />
                <span>Lección para Nuestra Vida</span>
              </h3>
              <p className="text-xs text-[#4A3C2F] leading-relaxed">
                {character.spiritualLesson}
              </p>
            </div>
          </div>

          {/* Hitos y Pasajes */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B5E3C] font-cinzel mb-2">
              Hitos Trascendentales en las Escrituras
            </h3>
            <div className="flex flex-wrap gap-2">
              {character.keyEvents.map((evt, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 bg-[#F2EAE0] text-[#4A3C2F] rounded-lg border border-[#E3D7C5]"
                >
                  {evt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F0] border-t border-[#E7DECD] px-6 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-[#2B2117] text-white rounded-xl text-xs font-medium hover:bg-[#433527] transition-colors"
          >
            Cerrar Biografía
          </button>
        </div>
      </div>
    </div>
  );
};
