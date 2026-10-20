/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/src/components/Header';
import { BookReader } from '@/src/components/BookReader';
import { TimelineView } from '@/src/components/TimelineView';
import { CharactersGallery } from '@/src/components/CharactersGallery';
import { EventsCatalog } from '@/src/components/EventsCatalog';
import { BiblicalQuiz } from '@/src/components/BiblicalQuiz';
import { CharacterDetailModal } from '@/src/components/CharacterDetailModal';
import { EventDetailModal } from '@/src/components/EventDetailModal';
import { SearchModal } from '@/src/components/SearchModal';
import { BookmarksModal } from '@/src/components/BookmarksModal';
import {
  BiblicalCharacter,
  BiblicalEvent,
  BIBLICAL_CHARACTERS,
  BIBLICAL_EVENTS,
  BIBLICAL_ERAS
} from '@/src/data/biblicalData';
import { getBookmarks } from '@/src/utils/storage';
import { BookOpen, Scroll, Users, Clock, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'book' | 'timeline' | 'characters' | 'events' | 'quiz'>('book');
  const [selectedCharacter, setSelectedCharacter] = useState<BiblicalCharacter | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<BiblicalEvent | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const refreshBookmarks = () => {
    setBookmarkCount(getBookmarks().length);
  };

  useEffect(() => {
    refreshBookmarks();
  }, []);

  const handleSelectCharacterByName = (name: string) => {
    const found = BIBLICAL_CHARACTERS.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSelectedCharacter(found);
    } else {
      setActiveTab('characters');
    }
  };

  const handleSelectEra = (eraOrder: number) => {
    setActiveTab('book');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#27211B] flex flex-col font-sans selection:bg-[#EBDDC8] selection:text-[#241C15]">
      {/* Top Header conforming to 3-zone contract */}
      <Header
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'book' && (
          <BookReader
            onSelectCharacter={char => setSelectedCharacter(char)}
            onSelectEvent={evt => setSelectedEvent(evt)}
            onBookmarksUpdated={refreshBookmarks}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineView
            onSelectEvent={evt => setSelectedEvent(evt)}
            onBookmarksUpdated={refreshBookmarks}
          />
        )}

        {activeTab === 'characters' && (
          <CharactersGallery
            onSelectCharacter={char => setSelectedCharacter(char)}
            onBookmarksUpdated={refreshBookmarks}
          />
        )}

        {activeTab === 'events' && (
          <EventsCatalog
            onSelectEvent={evt => setSelectedEvent(evt)}
            onBookmarksUpdated={refreshBookmarks}
          />
        )}

        {activeTab === 'quiz' && <BiblicalQuiz />}
      </main>

      {/* Character Profile Modal */}
      <CharacterDetailModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
        onBookmarksUpdated={refreshBookmarks}
      />

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onBookmarksUpdated={refreshBookmarks}
        onSelectCharacterByName={handleSelectCharacterByName}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCharacter={char => setSelectedCharacter(char)}
        onSelectEvent={evt => setSelectedEvent(evt)}
        onSelectEra={handleSelectEra}
      />

      {/* Bookmarks Modal */}
      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        onSelectCharacter={char => setSelectedCharacter(char)}
        onSelectEvent={evt => setSelectedEvent(evt)}
        onSelectEra={handleSelectEra}
        onBookmarksUpdated={refreshBookmarks}
      />

      {/* Dignified Curatorial Footer */}
      <footer className="bg-[#241D17] text-[#D8CEBF] border-t border-[#382D24] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-xs sm:text-sm">
          {/* Brand and Mission */}
          <div className="md:col-span-5 space-y-3">
            <div className="font-cinzel text-xl font-bold text-white tracking-wide">
              Cronos Bíblico
            </div>
            <p className="font-serif text-[#C4B7A5] leading-relaxed max-w-md">
              Libro digital interactivo consagrado al estudio cronológico, biográfico y teológico de las
              Sagradas Escrituras. Desde el pacto de fe con los patriarcas hasta la revelación profética
              de la victoria final.
            </p>
            <div className="pt-2 font-serif italic text-xs text-[#E3D4BE]">
              "Toda la Escritura es inspirada por Dios y útil para enseñar, para redargüir, para
              corregir, para instruir en justicia." — 2 Timoteo 3:16
            </div>
          </div>

          {/* Quick Navigation Sections */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-cinzel uppercase text-xs tracking-wider text-[#E8C596] font-semibold">
              Módulos del Libro
            </div>
            <ul className="space-y-1.5 text-xs text-[#B8AA98]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('book');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Capítulos del Libro Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('timeline');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Línea de Tiempo Continua
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('characters');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Biografías Ilustradas de Personajes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('events');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resumen de Acontecimientos Clave
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cuestionario y Autoevaluación
                </button>
              </li>
            </ul>
          </div>

          {/* Chronological Eras Summary */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-cinzel uppercase text-xs tracking-wider text-[#E8C596] font-semibold">
              Épocas Bíblicas Principales
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#B8AA98]">
              <span>· Creación y Patriarcas</span>
              <span>· Éxodo y Conquista</span>
              <span>· Tiempo de los Jueces</span>
              <span>· Reino Unido Davídico</span>
              <span>· Reino Dividido y Exilio</span>
              <span>· Retorno y Silencio</span>
              <span>· Jesucristo y Evangelios</span>
              <span>· Iglesia Primitiva</span>
            </div>
          </div>
        </div>

        {/* Quiet copyright without telemetry or fake engines */}
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#382D24] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E907E] gap-2">
          <span>Cronos Bíblico — Guía Cronológica de las Sagradas Escrituras</span>
          <span>Basado en textos bíblicos canónicos (Antiguo y Nuevo Testamento)</span>
        </div>
      </footer>
    </div>
  );
}
