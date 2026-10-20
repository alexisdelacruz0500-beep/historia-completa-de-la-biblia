/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  BIBLICAL_EVENTS,
  BIBLICAL_CHARACTERS,
  BIBLICAL_ERAS,
  BiblicalEvent,
  BiblicalCharacter,
  BiblicalEra
} from '@/src/data/biblicalData';
import { Search, X, BookOpen, User, Calendar, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (char: BiblicalCharacter) => void;
  onSelectEvent: (event: BiblicalEvent) => void;
  onSelectEra: (eraOrder: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCharacter,
  onSelectEvent,
  onSelectEra
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingCharacters = q
    ? BIBLICAL_CHARACTERS.filter(
        c =>
          c.name.toLowerCase().includes(q) ||
          c.meaning.toLowerCase().includes(q) ||
          c.shortBio.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      )
    : [];

  const matchingEvents = q
    ? BIBLICAL_EVENTS.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.scriptureReference.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
      )
    : [];

  const matchingEras = q
    ? BIBLICAL_ERAS.filter(
        era =>
          era.title.toLowerCase().includes(q) ||
          era.subtitle.toLowerCase().includes(q) ||
          era.summary.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchingCharacters.length + matchingEvents.length + matchingEras.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E7DECD] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#9A3412] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar por personaje, versículo, acontecimiento o época..."
            className="w-full text-sm sm:text-base bg-transparent text-[#271E16] placeholder:text-[#9C8F80] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#8C7D6D] hover:text-[#271E16] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[#EFE8DD] text-[#6B5E4F] rounded">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!q && (
            <div className="text-center py-10 text-[#736352]">
              <BookOpen className="w-8 h-8 text-[#9A3412] mx-auto mb-2 opacity-80" />
              <p className="text-sm font-serif">
                Escribe para buscar en toda la línea cronológica y biografías
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
                {['Abraham', 'Moisés', 'David', 'Jesucristo', 'Éxodo', 'Pentecostés'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="cursor-pointer px-3 py-1 bg-white hover:bg-[#F2EAE0] rounded-lg border border-[#E0D5C3] text-[#5C4F41]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="text-center py-10 text-[#736352]">
              <p className="text-sm font-serif">No se encontraron resultados para "{query}".</p>
              <p className="text-xs text-[#8C7D6D] mt-1">Prueba con otro personaje, libro o palabra clave.</p>
            </div>
          )}

          {/* Matching Characters */}
          {matchingCharacters.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Personajes Bíblicos ({matchingCharacters.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingCharacters.map(char => (
                  <div
                    key={char.id}
                    onClick={() => {
                      onClose();
                      onSelectCharacter(char);
                    }}
                    className="cursor-pointer p-3 rounded-xl bg-white hover:bg-[#F5EDE1] border border-[#E7DECD] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#271E16] flex items-center gap-2">
                        <span>{char.name}</span>
                        <span className="text-xs font-serif font-normal text-[#8B5E3C] italic">
                          ({char.meaning})
                        </span>
                      </div>
                      <div className="text-xs text-[#736352] line-clamp-1">{char.shortBio}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A3412] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Events */}
          {matchingEvents.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Acontecimientos Históricos ({matchingEvents.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingEvents.map(evt => (
                  <div
                    key={evt.id}
                    onClick={() => {
                      onClose();
                      onSelectEvent(evt);
                    }}
                    className="cursor-pointer p-3 rounded-xl bg-white hover:bg-[#F5EDE1] border border-[#E7DECD] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#271E16] flex items-center gap-2">
                        <span>{evt.title}</span>
                        <span className="text-xs font-mono text-[#9A3412]">{evt.approxDate}</span>
                      </div>
                      <div className="text-xs text-[#736352] line-clamp-1">
                        {evt.scriptureReference} — {evt.summary}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A3412] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Eras */}
          {matchingEras.length > 0 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Capítulos y Épocas Bíblicas ({matchingEras.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchingEras.map(era => (
                  <div
                    key={era.id}
                    onClick={() => {
                      onClose();
                      onSelectEra(era.order);
                    }}
                    className="cursor-pointer p-3 rounded-xl bg-white hover:bg-[#F5EDE1] border border-[#E7DECD] transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-bold text-sm text-[#271E16]">
                        {era.title} ({era.timeframe})
                      </div>
                      <div className="text-xs text-[#736352] line-clamp-1">{era.subtitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#9A3412] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
