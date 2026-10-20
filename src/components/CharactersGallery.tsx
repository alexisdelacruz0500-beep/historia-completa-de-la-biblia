/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BIBLICAL_CHARACTERS,
  BIBLICAL_ERAS,
  BiblicalCharacter
} from '@/src/data/biblicalData';
import {
  Search,
  Filter,
  Bookmark,
  Volume2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Heart,
  Award
} from 'lucide-react';
import { speechNarrator } from '@/src/utils/speechSynthesis';
import { isBookmarked, saveBookmark, removeBookmark } from '@/src/utils/storage';

interface CharactersGalleryProps {
  onSelectCharacter: (char: BiblicalCharacter) => void;
  onBookmarksUpdated: () => void;
}

export const CharactersGallery: React.FC<CharactersGalleryProps> = ({
  onSelectCharacter,
  onBookmarksUpdated
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [testamentFilter, setTestamentFilter] = useState<'Todos' | 'Antiguo' | 'Nuevo'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Todos los Personajes' },
    { id: 'Patriarca', label: 'Patriarcas' },
    { id: 'Libertador', label: 'Libertadores' },
    { id: 'Rey', label: 'Reyes' },
    { id: 'Profeta', label: 'Profetas' },
    { id: 'Mujer de Fe', label: 'Mujeres de Fe' },
    { id: 'Mesías', label: 'El Mesías' },
    { id: 'Apóstol', label: 'Apóstoles' }
  ];

  const filteredCharacters = BIBLICAL_CHARACTERS.filter(char => {
    if (testamentFilter !== 'Todos' && char.testament !== testamentFilter) return false;
    if (selectedCategory !== 'all' && char.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = char.name.toLowerCase().includes(q);
      const matchMeaning = char.meaning.toLowerCase().includes(q);
      const matchBio = char.shortBio.toLowerCase().includes(q);
      if (!matchName && !matchMeaning && !matchBio) return false;
    }
    return true;
  });

  const handleSpeak = (char: BiblicalCharacter, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${char.name}. Significado: ${char.meaning}. Rol: ${char.category}. ${char.shortBio} Momento decisivo: ${char.decisiveMoment}. Lección espiritual: ${char.spiritualLesson}`;
    speechNarrator.speak(text);
  };

  const handleToggleBookmark = (char: BiblicalCharacter, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isBookmarked(char.id, 'character')) {
      removeBookmark(char.id, 'character');
    } else {
      saveBookmark({
        id: char.id,
        type: 'character',
        title: char.name,
        subtitle: `${char.category} · ${char.meaning}`
      });
    }
    onBookmarksUpdated();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold font-cinzel">
          Héroes y Testigos de la Fe
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#271E16] mt-1 mb-3">
          Galería de Personajes Bíblicos
        </h1>
        <p className="text-sm sm:text-base text-[#6B5E4F] font-serif">
          Hombres y mujeres llamados en su tiempo para ser instrumentos del propósito eterno.
          Descubre sus orígenes etimológicos, biografías resumidas, momentos decisivos y lecciones de vida.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#E7DECD] shadow-xs mb-10 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7D6D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar personaje por nombre, significado o biografía..."
              className="w-full bg-white border border-[#DACFBF] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#271E16] placeholder:text-[#9B8C7C] focus:outline-hidden focus:ring-1 focus:ring-[#9A3412]"
            />
          </div>

          {/* Testament Segmented Controls */}
          <div className="flex items-center gap-1 p-1 bg-[#EFE7D8] rounded-lg shrink-0 self-start md:self-auto">
            {(['Todos', 'Antiguo', 'Nuevo'] as const).map(testament => (
              <button
                key={testament}
                onClick={() => setTestamentFilter(testament)}
                className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  testamentFilter === testament
                    ? 'bg-[#2B2117] text-white shadow-xs font-semibold'
                    : 'text-[#6B5E4F] hover:text-[#2B2117]'
                }`}
              >
                {testament === 'Todos' ? 'Todos' : `${testament} T.`}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#EBE1D0]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#9A3412] text-white shadow-xs'
                  : 'bg-white text-[#6B5E4F] hover:bg-[#F2EBDE] border border-[#E4D9C5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Unboxed Metadata Summary */}
        <div className="flex items-center gap-2 text-xs text-[#736352] pt-2">
          <span>Mostrando {filteredCharacters.length} personajes</span>
          <span aria-hidden="true">·</span>
          <span>Filtro activo: {categories.find(c => c.id === selectedCategory)?.label}</span>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map(char => {
          const era = BIBLICAL_ERAS.find(e => e.id === char.eraId);
          const bookmarked = isBookmarked(char.id, 'character');

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className="cursor-pointer group bg-white rounded-2xl border border-[#E7DECD] hover:border-[#9A3412] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Artwork Portrait Frame */}
                <div className="relative aspect-4/3 bg-[#ECE4D5] overflow-hidden border-b border-[#E7DECD]">
                  <img
                    src={char.image}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end justify-between p-3.5">
                    <span className="text-[11px] font-mono text-[#EFE7DA] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      {char.approxDate}
                    </span>
                    <span className="text-[11px] font-semibold text-[#D8B98B] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      {char.category}
                    </span>
                  </div>
                </div>

                {/* Character Meta and Names */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#271E16] group-hover:text-[#9A3412] transition-colors leading-snug">
                        {char.name}
                      </h3>
                      <div className="text-xs text-[#8B5E3C] font-serif italic">
                        {char.originalName}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={e => handleSpeak(char, e)}
                        className="cursor-pointer p-1 text-[#736352] hover:text-[#9A3412] transition-colors"
                        title="Escuchar biografía"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={e => handleToggleBookmark(char, e)}
                        className={`cursor-pointer p-1 transition-colors ${
                          bookmarked ? 'text-[#9A3412]' : 'text-[#736352] hover:text-[#9A3412]'
                        }`}
                        title={bookmarked ? 'Guardado en marcadores' : 'Guardar personaje'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Meaning of Name */}
                  <div className="text-xs text-[#9A3412] font-medium mb-3">
                    Significado: "{char.meaning}"
                  </div>

                  {/* Bio Summary */}
                  <p className="text-xs text-[#524436] line-clamp-3 leading-relaxed mb-4">
                    {char.shortBio}
                  </p>

                  {/* Scripture Quote Box */}
                  <div className="p-3 bg-[#FAF7F0] rounded-xl border border-[#EBE2D3] text-xs font-serif italic text-[#4A3C2F] line-clamp-2 mb-3">
                    "{char.bibleVerse}"
                  </div>
                </div>
              </div>

              {/* Card Footer: Spiritual lesson teaser and Action */}
              <div className="p-4 bg-[#FBF8F2] border-t border-[#F0E6D5] flex items-center justify-between text-xs font-medium text-[#9A3412]">
                <span className="truncate pr-2 text-[#736352]">
                  {era?.title.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1 shrink-0 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Ver biografía</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
