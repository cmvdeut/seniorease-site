'use client';

import { useEffect, useRef, useState } from 'react';
import PuzzleDoneBanner from './PuzzleDoneBanner';
import { getDailyQuizQuestions, getTodayKey } from './quiz-data';

type Props = {
  canStartNew: boolean;
  onCompleted: () => void;
  puzzlesLeftThisHour: number;
  minutesUntilNext: number;
  socialTip: string;
};

type SavedQuiz = {
  index: number;
  score: number;
  answered: boolean;
  selected: number | null;
  completed: boolean;
};

export default function Quiz({
  canStartNew,
  onCompleted,
  puzzlesLeftThisHour,
  minutesUntilNext,
  socialTip,
}: Props) {
  const questions = getDailyQuizQuestions();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [ready, setReady] = useState(false);
  const countedRef = useRef(false);

  useEffect(() => {
    const key = `quiz-${getTodayKey()}`;
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw) as SavedQuiz;
        setIndex(data.index ?? 0);
        setScore(data.score ?? 0);
        setSelected(data.selected ?? null);
        setAnswered(Boolean(data.answered));
        setCompleted(Boolean(data.completed));
        countedRef.current = Boolean(data.completed);
      }
    } catch {
      /* ignore corrupt save */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      `quiz-${getTodayKey()}`,
      JSON.stringify({ index, score, answered, selected, completed })
    );
  }, [index, score, answered, selected, completed, ready]);

  useEffect(() => {
    if (completed && !countedRef.current) {
      countedRef.current = true;
      onCompleted();
    }
  }, [completed, onCompleted]);

  function resetQuiz() {
    if (!canStartNew) return;
    setIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setCompleted(false);
    countedRef.current = false;
    localStorage.removeItem(`quiz-${getTodayKey()}`);
  }

  function choose(optionIndex: number) {
    if (answered || completed) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === questions[index].correctIndex) {
      setScore((s) => s + 1);
    }
  }

  function next() {
    if (!answered) return;
    if (index + 1 >= questions.length) {
      setCompleted(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  if (!ready) {
    return <div className="text-senior-lg text-center py-12">Laden...</div>;
  }

  const q = questions[index];
  const isLast = index + 1 >= questions.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-senior-base text-gray-700 flex-wrap gap-2">
        <span>
          <strong>Vraag</strong> {Math.min(index + 1, questions.length)} van {questions.length}
        </span>
        <span>
          <strong>Goed:</strong> {score}
        </span>
      </div>

      {!completed ? (
        <>
          <div className="rounded-xl border-2 border-gray-200 bg-neutral-cream/50 p-5 sm:p-6">
            <p className="text-senior-lg font-semibold text-primary m-0 leading-relaxed">
              {q.question}
            </p>
          </div>

          <div className="grid gap-3">
            {q.options.map((option, i) => {
              const isCorrect = i === q.correctIndex;
              const isChosen = selected === i;
              let style =
                'bg-white border-2 border-gray-300 text-gray-800 hover:border-primary hover:bg-blue-50';
              if (answered) {
                if (isCorrect) {
                  style = 'bg-green-100 border-2 border-green-600 text-green-900';
                } else if (isChosen) {
                  style = 'bg-red-50 border-2 border-red-400 text-red-800';
                } else {
                  style = 'bg-gray-50 border-2 border-gray-200 text-gray-500';
                }
              }
              return (
                <button
                  key={`${index}-${option}`}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  className={`w-full text-left py-4 px-5 rounded-xl text-senior-base font-semibold transition-colors disabled:cursor-default ${style}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={next}
                className="py-3 px-8 bg-primary text-white rounded-lg text-senior-base font-bold hover:bg-primary-dark"
              >
                {isLast ? 'Bekijk resultaat' : 'Volgende vraag'}
              </button>
            </div>
          )}
        </>
      ) : (
        <PuzzleDoneBanner
          title="Quiz afgerond!"
          detail={`U had ${score} van de ${questions.length} vragen goed.`}
          socialTip={socialTip}
          puzzlesLeftThisHour={puzzlesLeftThisHour}
          minutesUntilNext={minutesUntilNext}
        />
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={resetQuiz}
          disabled={!canStartNew}
          className="py-3 px-8 bg-gray-600 text-white rounded-lg text-senior-base font-bold
                   hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🔄 Nieuwe quiz
        </button>
      </div>
    </div>
  );
}
