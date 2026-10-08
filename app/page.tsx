"use client";

import { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const toeflQuestions: Question[] = [
  {
    id: 1,
    question: "The North Platte River ______ from Wyoming into Nebraska.",
    options: ["it flowed", "flows", "flowing", "with flowing motion"],
    correctAnswer: 1,
    explanation: "Kalimat ini membutuhkan kata kerja utama (finite verb) tunggal untuk melengkapi subjek 'The North Platte River'. Pilihan yang tepat adalah 'flows'.",
  },
  {
    id: 2,
    question: "______ Biloxi received its name from a Sioux word meaning 'first people'.",
    options: ["The city of", "Located in", "It is of", "The tour includes"],
    correctAnswer: 0,
    explanation: "Kalimat ini sudah memiliki kata kerja 'received', sehingga hanya memerlukan Subjek utama. 'The city of' membentuk subjek lengkap 'The city of Biloxi'.",
  },
  {
    id: 3,
    question: "A pride of lions ______ up to forty lions, including one to three males, several females, and their cubs.",
    options: ["can contain", "it can contain", "containing", "contain"],
    correctAnswer: 0,
    explanation: "Subjeknya adalah 'A pride' (kolektif/tunggal). Pilihan 'can contain' memberikan kata kerja modal yang lengkap dan tepat secara tata bahasa.",
  },
];

export default function ToeflApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const currentQ = toeflQuestions[currentIdx];

  const handleSelect = (optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionIdx,
    });
  };

  const calculateScore = () => {
    let score = 0;
    toeflQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return Math.round((score / toeflQuestions.length) * 100);
  };

  const restartQuiz = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResult(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 text-slate-800 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <header className="border-b border-slate-100 pb-5 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">TOEFL Preparation Platform</h1>
            <p className="text-sm text-slate-500">Section 2: Structure & Written Expression</p>
          </div>
          {!showResult && (
            <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
              Soal {currentIdx + 1} dari {toeflQuestions.length}
            </span>
          )}
        </header>

        {!showResult ? (
          <div>
            <div className="mb-6">
              <p className="text-lg font-medium text-slate-800 leading-relaxed mb-6">
                {currentQ.question}
              </p>

              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIdx] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium flex items-center justify-between ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-semibold shadow-xs"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 text-slate-700"
                      }`}
                    >
                      <span>
                        <span className="inline-block w-6 text-slate-400 font-normal">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-8">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Kembali
              </button>

              {currentIdx < toeflQuestions.length - 1 ? (
                <button
                  disabled={selectedAnswers[currentIdx] === undefined}
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Lanjut
                </button>
              ) : (
                <button
                  disabled={selectedAnswers[currentIdx] === undefined}
                  onClick={() => setShowResult(true)}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Lihat Hasil
                </button>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center py-6 border-b border-slate-100">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Skor Evaluasi</span>
              <div className="text-5xl font-black text-slate-900 mt-2 mb-1">{calculateScore()} / 100</div>
              <p className="text-sm text-slate-500">
                Kamu menjawab benar {toeflQuestions.filter((q, i) => selectedAnswers[i] === q.correctAnswer).length} dari {toeflQuestions.length} pertanyaan.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <h3 className="font-semibold text-slate-900 text-sm">Pembahasan Kunci Jawaban:</h3>
              {toeflQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2 text-sm">
                    <p className="font-medium text-slate-800">{idx + 1}. {q.question}</p>
                    <p className={isCorrect ? "text-emerald-700" : "text-rose-700"}>
                      Jawabanmu: <span className="font-semibold">{String.fromCharCode(65 + userAns)}. {q.options[userAns]}</span> {isCorrect ? "✓ (Benar)" : "✗ (Salah)"}
                    </p>
                    {!isCorrect && (
                      <p className="text-slate-600">
                        Kunci: <span className="font-semibold">{String.fromCharCode(65 + q.correctAnswer)}. {q.options[q.correctAnswer]}</span>
                      </p>
                    )}
                    <p className="text-xs text-slate-500 pt-1 border-t border-slate-200/60 mt-2">
                      💡 {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={restartQuiz}
              className="w-full mt-8 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
            >
              Ulangi Latihan
            </button>
          </div>
        )}
      </div>
    </main>
  );
}