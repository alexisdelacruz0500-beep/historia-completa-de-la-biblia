/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BIBLICAL_QUIZ_QUESTIONS, QuizQuestion } from '@/src/data/biblicalData';
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const BiblicalQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = BIBLICAL_QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < BIBLICAL_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold font-cinzel">
          Autoevaluación Bíblica
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#271E16] mt-1 mb-2">
          Pon a Prueba tu Conocimiento
        </h1>
        <p className="text-sm text-[#6B5E4F] font-serif">
          Descubre cuánto recuerdas sobre los periodos históricos, las vidas de los personajes
          y los momentos determinantes de las Sagradas Escrituras.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] p-6 sm:p-10 shadow-sm">
          {/* Progress Strip */}
          <div className="flex items-center justify-between text-xs text-[#736352] mb-6">
            <span className="font-semibold text-[#8B5E3C] uppercase tracking-wide font-cinzel">
              Época: {currentQ.era}
            </span>
            <span className="font-mono tabular-nums">
              Pregunta {currentIndex + 1} de {BIBLICAL_QUIZ_QUESTIONS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-[#EAE0D0] rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-[#9A3412] transition-all duration-300"
              style={{
                width: `${((currentIndex + (isAnswered ? 1 : 0)) / BIBLICAL_QUIZ_QUESTIONS.length) * 100}%`
              }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#271E16] leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, idx) => {
              let btnClass = 'bg-white border-[#E0D5C3] text-[#2B2117] hover:border-[#9A3412]';

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnClass = 'bg-[#F0FDF4] border-emerald-500 text-emerald-950 font-semibold';
                } else if (idx === selectedOption) {
                  btnClass = 'bg-[#FEF2F2] border-red-500 text-red-950';
                } else {
                  btnClass = 'bg-white/60 border-[#E8DFD0] text-[#8C7D6D] opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${btnClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#F3ECE0] text-[#736352] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-serif">{option}</span>
                  </div>

                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box when answered */}
          {isAnswered && (
            <div className="p-5 bg-white rounded-xl border border-[#DFD3C0] mb-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8B5E3C] uppercase tracking-wide font-cinzel">
                <span>Fundamento Bíblico:</span>
                <span className="font-mono text-[#9A3412]">{currentQ.scriptureRef}</span>
              </div>
              <p className="text-sm text-[#4A3C2F] font-serif leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EBE1D0]">
            <div className="text-xs text-[#736352] font-mono tabular-nums">
              Aciertos actuales: {score}
            </div>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="cursor-pointer px-5 py-2.5 bg-[#2B2117] text-white rounded-xl text-sm font-medium hover:bg-[#433527] transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>
                  {currentIndex === BIBLICAL_QUIZ_QUESTIONS.length - 1
                    ? 'Ver Resultados'
                    : 'Siguiente Pregunta'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="bg-[#FAF7F0] rounded-2xl border border-[#E7DECD] p-8 sm:p-12 text-center shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAF0E6] border-2 border-[#9A3412] text-[#9A3412] flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#271E16] mb-2">
            ¡Evaluación Completada!
          </h2>

          <div className="text-4xl sm:text-5xl font-mono font-bold text-[#9A3412] my-4 tabular-nums">
            {score} / {BIBLICAL_QUIZ_QUESTIONS.length}
          </div>

          <p className="text-sm sm:text-base text-[#594B3C] font-serif mb-6 leading-relaxed">
            {score >= 8
              ? '¡Excelente conocimiento! Posees un dominio profundo de los periodos bíblicos y los pactos divinos.'
              : score >= 5
              ? '¡Muy buen desempeño! Conoces los hitos fundamentales; continúa escudriñando las Escrituras.'
              : 'Buen esfuerzo. El libro digital y la línea de tiempo están a tu disposición para seguir profundizando en la historia sagrada.'}
          </p>

          <button
            onClick={handleRestartQuiz}
            className="cursor-pointer px-6 py-3 bg-[#2B2117] text-white rounded-xl text-sm font-medium hover:bg-[#433527] transition-colors inline-flex items-center gap-2 shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir Cuestionario</span>
          </button>
        </div>
      )}
    </div>
  );
};
