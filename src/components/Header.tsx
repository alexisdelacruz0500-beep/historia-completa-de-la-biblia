/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Search, Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'book' | 'timeline' | 'characters' | 'events' | 'quiz';
  onSelectTab: (tab: 'book' | 'timeline' | 'characters' | 'events' | 'quiz') => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F2]/95 backdrop-blur-md border-b border-[#E7DECD] shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('book')}
          className="text-left font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-[#2B2117] hover:text-[#9A3412] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-6 h-6 text-[#9A3412]" />
          <span>Cronos Bíblico</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B5E4F]">
          <button
            onClick={() => onSelectTab('book')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'book'
                ? 'text-[#9A3412] border-[#9A3412] font-semibold'
                : 'text-[#6B5E4F] border-transparent hover:text-[#2B2117]'
            }`}
          >
            Libro Digital
          </button>
          <button
            onClick={() => onSelectTab('timeline')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'timeline'
                ? 'text-[#9A3412] border-[#9A3412] font-semibold'
                : 'text-[#6B5E4F] border-transparent hover:text-[#2B2117]'
            }`}
          >
            Línea de Tiempo
          </button>
          <button
            onClick={() => onSelectTab('characters')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'characters'
                ? 'text-[#9A3412] border-[#9A3412] font-semibold'
                : 'text-[#6B5E4F] border-transparent hover:text-[#2B2117]'
            }`}
          >
            Personajes
          </button>
          <button
            onClick={() => onSelectTab('events')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'events'
                ? 'text-[#9A3412] border-[#9A3412] font-semibold'
                : 'text-[#6B5E4F] border-transparent hover:text-[#2B2117]'
            }`}
          >
            Acontecimientos
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
              activeTab === 'quiz'
                ? 'text-[#9A3412] border-[#9A3412] font-semibold'
                : 'text-[#6B5E4F] border-transparent hover:text-[#2B2117]'
            }`}
          >
            Quiz Bíblico
          </button>
        </nav>

        {/* Zone 3: 1 primary action with quick utilities */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenBookmarks}
            className="relative cursor-pointer p-2 rounded-lg text-[#6B5E4F] hover:text-[#2B2117] hover:bg-[#EFE7D8] transition-colors"
            title="Marcadores y Notas"
            aria-label="Ver marcadores guardados"
          >
            <Bookmark className="w-5 h-5" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#9A3412] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {bookmarkCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            className="cursor-pointer px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-[#2B2117] hover:bg-[#433527] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <Search className="w-4 h-4 text-[#D8B98B]" />
            <span>Buscar</span>
            <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded text-stone-200">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>

      {/* Mobile subnav for compact screens */}
      <div className="flex md:hidden items-center justify-around border-t border-[#E7DECD] px-2 py-1.5 bg-[#F5EFE4] text-xs font-medium">
        <button
          onClick={() => onSelectTab('book')}
          className={`py-1 px-2 rounded ${activeTab === 'book' ? 'text-[#9A3412] font-bold' : 'text-[#6B5E4F]'}`}
        >
          Libro
        </button>
        <button
          onClick={() => onSelectTab('timeline')}
          className={`py-1 px-2 rounded ${activeTab === 'timeline' ? 'text-[#9A3412] font-bold' : 'text-[#6B5E4F]'}`}
        >
          Línea
        </button>
        <button
          onClick={() => onSelectTab('characters')}
          className={`py-1 px-2 rounded ${activeTab === 'characters' ? 'text-[#9A3412] font-bold' : 'text-[#6B5E4F]'}`}
        >
          Personajes
        </button>
        <button
          onClick={() => onSelectTab('events')}
          className={`py-1 px-2 rounded ${activeTab === 'events' ? 'text-[#9A3412] font-bold' : 'text-[#6B5E4F]'}`}
        >
          Eventos
        </button>
        <button
          onClick={() => onSelectTab('quiz')}
          className={`py-1 px-2 rounded ${activeTab === 'quiz' ? 'text-[#9A3412] font-bold' : 'text-[#6B5E4F]'}`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
};
