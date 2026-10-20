/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string | null;
}

class BiblicalVoiceNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: ((state: SpeechState) => void)[] = [];
  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: null,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (state: SpeechState) => void) {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l(this.state));
  }

  public speak(text: string) {
    if (!this.synth) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Spanish narration
    utterance.rate = 0.95; // slightly deliberate cadence for solemnity
    utterance.pitch = 1.0;

    // Pick a natural Spanish voice if available
    const voices = this.synth.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Castilian')));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onstart = () => {
      this.state = { isPlaying: true, isPaused: false, currentText: text };
      this.notify();
    };

    utterance.onend = () => {
      this.state = { isPlaying: false, isPaused: false, currentText: null };
      this.notify();
    };

    utterance.onerror = () => {
      this.state = { isPlaying: false, isPaused: false, currentText: null };
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.state = { isPlaying: false, isPaused: false, currentText: null };
      this.notify();
    }
  }

  public getState(): SpeechState {
    return this.state;
  }
}

export const speechNarrator = new BiblicalVoiceNarrator();
