/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SavedBookmark {
  id: string;
  type: 'event' | 'character' | 'era';
  title: string;
  subtitle?: string;
  timestamp: number;
  personalNote?: string;
}

const STORAGE_KEY = 'cronos_biblico_bookmarks_v1';

export function getBookmarks(): SavedBookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(bookmark: Omit<SavedBookmark, 'timestamp'>): SavedBookmark[] {
  const current = getBookmarks();
  const exists = current.find(b => b.id === bookmark.id && b.type === bookmark.type);
  let updated: SavedBookmark[];
  if (exists) {
    updated = current.map(b => (b.id === bookmark.id && b.type === bookmark.type ? { ...b, ...bookmark } : b));
  } else {
    updated = [{ ...bookmark, timestamp: Date.now() }, ...current];
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
  return updated;
}

export function removeBookmark(id: string, type: 'event' | 'character' | 'era'): SavedBookmark[] {
  const current = getBookmarks();
  const updated = current.filter(b => !(b.id === id && b.type === type));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota
  }
  return updated;
}

export function isBookmarked(id: string, type: 'event' | 'character' | 'era'): boolean {
  const current = getBookmarks();
  return current.some(b => b.id === id && b.type === type);
}
