"use client";

import { useState } from "react";

export default function Home() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const sampleQuestion = {
    prompt: "The North Pole _______ a latitude of 90 degrees north.",
    options: [
      { id: "A", text: "it has" },
      { id: "B", text: "is having" },
      { id: "C", text: "which is having" },
      { id: "D", text: "has" },
    ],
    correctAnswer: "D",
    explanation:
      "Kalimat ini sudah memiliki Subjek ('The North Pole'), namun belum memiliki Kata Kerja Inti (Verb). Pilihan (D) 'has' melengkapi kalimat dengan Verb tunggal yang benar. Pilihan (A) keliru karena menimbulkan subjek ganda ('it').",
  };

  const handleSelect = (id: string) => {
    setSelectedAnswer(id);
    setShowExplanation(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header Platform */}
        <header className="border-b border-slate-200 pb-5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              TOEFL Prep Engine
            </span>
            <span className="text-sm font-medium text-slate-500">Target Skor: 550+</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-3">
            Structure & Written Expression
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Modul 01: Identifikasi Subjek dan Predikat Utama
          </p>
        </header>

        {/* Kotak Soal Latihan */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
          <div className="flex justify-between text-xs font-medium text-slate-400">
            <span>Soal No. 1 dari 1</span>
            <span>Skill 1: Subject-Verb</span>
          </div>

          <p className="text-lg font-medium text-slate-900 leading-relaxed">
            {sampleQuestion.prompt}
          </p>

          {/* Opsi Jawaban */}
          <div className="space-y-3">
            {sampleQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === sampleQuestion.correctAnswer;
              
              let btnStyle = "border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700";
              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "border-rose-400 bg-rose-50 text-rose-800";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg border text-sm transition-colors flex items-center gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                    {option.id}
                  </span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Pembahasan Otomatis */}
          {showExplanation && (
            <div className={`p-4 rounded-lg text-sm border leading-relaxed ${
              selectedAnswer === sampleQuestion.correctAnswer
                ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                : "bg-amber-50 border-amber-200 text-amber-950"
            }`}>
              <div className="font-semibold mb-1">
                {selectedAnswer === sampleQuestion.correctAnswer
                  ? "✓ Jawaban Benar!"
                  : `✕ Belum Tepat. Kunci Jawaban: (${sampleQuestion.correctAnswer})`}
              </div>
              <p className="text-xs text-slate-700">{sampleQuestion.explanation}</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}