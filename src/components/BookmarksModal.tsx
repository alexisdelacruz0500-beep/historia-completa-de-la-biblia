/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  getBookmarks,
  removeBookmark,
  saveBookmark,
  SavedBookmark
} from '@/src/utils/storage';
import {
  X,
  Bookmark,
  Trash2,
  Edit3,
  Check,
  BookOpen,
  ArrowRight,
  User,
  Calendar
} from 'lucide-react';
import {
  BIBLICAL_CHARACTERS,
  BIBLICAL_EVENTS,
  BIBLICAL_ERAS,
  BiblicalCharacter,
  BiblicalEvent
} from '@/src/data/biblicalData';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (char: BiblicalCharacter) => void;
  onSelectEvent: (event: BiblicalEvent) => void;
  onSelectEra: (eraOrder: number) => void;
  onBookmarksUpdated: () => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  onSelectCharacter,
  onSelectEvent,
  onSelectEra,
  onBookmarksUpdated
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  if (!isOpen) return null;

  const bookmarks = getBookmarks();

  const handleDelete = (id: string, type: 'event' | 'character' | 'era') => {
    removeBookmark(id, type);
    onBookmarksUpdated();
  };

  const handleStartEdit = (b: SavedBookmark) => {
    setEditingId(b.id);
    setNoteText(b.personalNote || '');
  };

  const handleSaveNote = (b: SavedBookmark) => {
    saveBookmark({
      id: b.id,
      type: b.type,
      title: b.title,
      subtitle: b.subtitle,
      personalNote: noteText.trim() || undefined
    });
    setEditingId(null);
    onBookmarksUpdated();
  };

  const handleNavigate = (b: SavedBookmark) => {
    onClose();
    if (b.type === 'character') {
      const char = BIBLICAL_CHARACTERS.find(c => c.id === b.id);
      if (char) onSelectCharacter(char);
    } else if (b.type === 'event') {
      const evt = BIBLICAL_EVENTS.find(e => e.id === b.id);
      if (evt) onSelectEvent(evt);
    } else if (b.type === 'era') {
      const era = BIBLICAL_ERAS.find(e => e.id === b.id);
      if (era) onSelectEra(era.order);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2B2117] text-[#FAF6EE] p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#D8B98B]" />
            <h2 className="text-lg font-serif font-bold text-white">
              Mis Marcadores y Notas de Estudio
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12 text-[#736352]">
              <Bookmark className="w-10 h-10 mx-auto text-[#D5C5AE] mb-3 stroke-1" />
              <p className="text-sm font-serif font-medium">Aún no has guardado marcadores</p>
              <p className="text-xs text-[#8C7D6D] mt-1 max-w-sm mx-auto">
                Puedes guardar capítulos, personajes bíblicos y acontecimientos clave pulsando el ícono
                de marcador mientras exploras la aplicación.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map(b => (
                <div
                  key={`${b.type}-${b.id}`}
                  className="bg-white p-4 rounded-xl border border-[#E7DECD] space-y-2 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      onClick={() => handleNavigate(b)}
                      className="cursor-pointer flex-1 group"
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#9A3412] font-cinzel">
                        {b.type === 'character' && <User className="w-3 h-3" />}
                        {b.type === 'event' && <Calendar className="w-3 h-3" />}
                        {b.type === 'era' && <BookOpen className="w-3 h-3" />}
                        <span>
                          {b.type === 'character'
                            ? 'Personaje'
                            : b.type === 'event'
                            ? 'Acontecimiento'
                            : 'Capítulo'}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#271E16] group-hover:text-[#9A3412] transition-colors">
                        {b.title}
                      </h3>
                      {b.subtitle && (
                        <p className="text-xs text-[#736352] italic">{b.subtitle}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(b)}
                        className="cursor-pointer p-1 text-[#736352] hover:text-[#271E16]"
                        title="Añadir/editar nota personal"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id, b.type)}
                        className="cursor-pointer p-1 text-[#736352] hover:text-red-700"
                        title="Eliminar marcador"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Note Editing or Display */}
                  {editingId === b.id ? (
                    <div className="pt-2 border-t border-[#F2EBDE] space-y-2">
                      <textarea
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        placeholder="Escribe tu reflexión o nota personal sobre este pasaje..."
                        className="w-full text-xs p-2.5 bg-[#FAF7F0] border border-[#DACFBF] rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#9A3412] text-[#271E16]"
                        rows={2}
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-xs text-[#736352] hover:text-[#271E16] cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleSaveNote(b)}
                          className="px-3 py-1 bg-[#2B2117] text-white rounded-md text-xs font-medium cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Guardar Nota</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    b.personalNote && (
                      <div className="pt-2 border-t border-[#F2EBDE] text-xs text-[#524436] bg-[#FAF7F0] p-2.5 rounded-lg border border-[#EAE0D0] italic">
                        "{b.personalNote}"
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#F4ECE0] p-4 border-t border-[#E7DECD] flex items-center justify-between text-xs text-[#736352]">
          <span>{bookmarks.length} elementos guardados en este dispositivo</span>
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-1.5 bg-[#2B2117] text-white rounded-lg font-medium hover:bg-[#433527] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
