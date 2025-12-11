import { useState, useCallback, useEffect } from 'react';
import type { FieldGuideEntry, PhonemeAttempt } from '../../types/fieldGuide';

interface SoundQuestProps {
  entry: FieldGuideEntry;
  onComplete: (attempts: PhonemeAttempt[]) => void;
  onBack: () => void;
}

type Phase = 'intro' | 'counting' | 'feedback' | 'word-complete' | 'quest-complete';

export function SoundQuest({ entry, onComplete, onBack }: SoundQuestProps) {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [attempts, setAttempts] = useState<PhonemeAttempt[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentWord = entry.phonemeWords[currentWordIndex];
  const correctCount = currentWord?.phonemes.length || 0;
  const totalWords = entry.phonemeWords.length;
  const wordsCompleted = attempts.filter(a => a.correct).length;

  // Speak the word using speech synthesis
  const speakWord = useCallback((word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.7; // Slower for clarity
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  // Auto-speak when entering counting phase
  useEffect(() => {
    if (phase === 'counting' && currentWord) {
      const timer = setTimeout(() => speakWord(currentWord.word), 300);
      return () => clearTimeout(timer);
    }
  }, [phase, currentWord, speakWord]);

  // Handle rupee tap
  const handleRupeeTap = (index: number) => {
    if (phase !== 'counting') return;
    // Toggle: if tapping the same count, deselect; otherwise select up to that count
    if (selectedCount === index + 1) {
      setSelectedCount(index);
    } else {
      setSelectedCount(index + 1);
    }
  };

  // Check the answer
  const handleCheck = () => {
    const correct = selectedCount === correctCount;

    const attempt: PhonemeAttempt = {
      word: currentWord.word,
      expectedCount: correctCount,
      givenCount: selectedCount,
      correct,
      timestamp: Date.now(),
    };
    setAttempts(prev => [...prev, attempt]);

    if (correct) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setPhase('word-complete');
      }, 1500);
    } else {
      setPhase('feedback');
    }
  };

  // Retry after incorrect
  const handleRetry = () => {
    setSelectedCount(0);
    setPhase('counting');
    speakWord(currentWord.word);
  };

  // Move to next word
  const handleNextWord = () => {
    if (currentWordIndex + 1 >= totalWords) {
      // All words done!
      setPhase('quest-complete');
    } else {
      setCurrentWordIndex(prev => prev + 1);
      setSelectedCount(0);
      setPhase('counting');
    }
  };

  // Start the quest
  const handleStart = () => {
    setPhase('counting');
  };

  // Complete the quest
  const handleFinish = () => {
    onComplete(attempts);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>🔊</span> Sound Quest
          </h2>
          <div className="text-sm bg-amber-600 px-3 py-1 rounded-full">
            {wordsCompleted} / {totalWords} words
          </div>
        </div>
        <p className="text-amber-100 mt-1">{entry.name}</p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-amber-100">
        <div
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${(wordsCompleted / totalWords) * 100}%` }}
        />
      </div>

      {/* Main content area */}
      <div className="p-6">
        {/* ============================================================ */}
        {/* INTRO PHASE */}
        {/* ============================================================ */}
        {phase === 'intro' && (
          <div className="text-center py-8">
            <div className="text-8xl mb-6">👂</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Listen for Sounds!
            </h3>
            <p className="text-xl text-gray-600 mb-2">
              You'll hear a word.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Tap one rupee for each <span className="font-bold text-amber-600">sound</span> you hear!
            </p>

            {/* Example */}
            <div className="bg-amber-50 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-gray-700 mb-2">Example: "cat" has 3 sounds:</p>
              <div className="flex justify-center gap-2">
                <span className="text-2xl">/c/</span>
                <span className="text-2xl">/a/</span>
                <span className="text-2xl">/t/</span>
              </div>
            </div>

            <button
              onClick={handleStart}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-transform hover:scale-105"
            >
              Let's Go!
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* COUNTING PHASE */}
        {/* ============================================================ */}
        {phase === 'counting' && currentWord && (
          <div className="text-center py-6">
            {/* Word display */}
            <div className="mb-8">
              <p className="text-gray-500 text-lg mb-2">Listen to this word:</p>
              <div className="text-6xl font-bold text-gray-800 mb-4">
                {currentWord.word}
              </div>

              {/* Hear it button */}
              <button
                onClick={() => speakWord(currentWord.word)}
                disabled={isSpeaking}
                className={`
                  px-6 py-3 rounded-lg font-bold text-lg transition-all
                  ${isSpeaking
                    ? 'bg-purple-300 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105'
                  }
                `}
              >
                {isSpeaking ? '🔊 Playing...' : '🔊 Hear It Again'}
              </button>
            </div>

            {/* Rupee selection */}
            <div className="mb-8">
              <p className="text-gray-600 text-lg mb-4">
                Tap one rupee for each sound you hear:
              </p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleRupeeTap(num - 1)}
                    className={`
                      w-16 h-16 rounded-lg text-3xl font-bold transition-all duration-200
                      ${num <= selectedCount
                        ? 'bg-green-400 text-white scale-110 shadow-lg'
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                      }
                    `}
                  >
                    💎
                  </button>
                ))}
              </div>
              <p className="text-2xl font-bold text-gray-700 mt-4">
                {selectedCount === 0 ? 'Tap the rupees!' : `${selectedCount} sound${selectedCount !== 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Check button */}
            <button
              onClick={handleCheck}
              disabled={selectedCount === 0}
              className={`
                px-8 py-4 rounded-lg font-bold text-xl transition-all
                ${selectedCount === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
                }
              `}
            >
              Check My Answer!
            </button>

            {/* Celebration overlay */}
            {showCelebration && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
                  <div className="text-8xl mb-4">🎉</div>
                  <p className="text-3xl font-bold text-green-600">Correct!</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* FEEDBACK PHASE (incorrect) */}
        {/* ============================================================ */}
        {phase === 'feedback' && currentWord && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Let's try again!
            </h3>
            <p className="text-xl text-gray-600 mb-2">
              You said <span className="font-bold text-amber-600">{selectedCount}</span> sounds.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Listen carefully to "<span className="font-bold">{currentWord.word}</span>" one more time.
            </p>

            <button
              onClick={handleRetry}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              🔊 Listen Again
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* WORD COMPLETE PHASE */}
        {/* ============================================================ */}
        {phase === 'word-complete' && currentWord && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              Great job!
            </h3>
            <p className="text-xl text-gray-700 mb-2">
              "<span className="font-bold">{currentWord.word}</span>" has{' '}
              <span className="font-bold text-green-600">{correctCount}</span> sounds:
            </p>

            {/* Show the phonemes */}
            <div className="flex justify-center gap-3 mb-6">
              {currentWord.phonemes.map((phoneme, idx) => (
                <div
                  key={idx}
                  className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-xl font-bold text-green-700 border-2 border-green-300"
                >
                  /{phoneme}/
                </div>
              ))}
            </div>

            <p className="text-gray-500 mb-6">
              {currentWordIndex + 1 < totalWords
                ? `${totalWords - currentWordIndex - 1} more word${totalWords - currentWordIndex - 1 !== 1 ? 's' : ''} to go!`
                : 'That was the last word!'}
            </p>

            <button
              onClick={handleNextWord}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              {currentWordIndex + 1 < totalWords ? 'Next Word!' : 'See My Discovery!'}
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* QUEST COMPLETE PHASE */}
        {/* ============================================================ */}
        {phase === 'quest-complete' && (
          <div className="text-center py-8">
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <h3 className="text-3xl font-bold text-amber-600 mb-4">
              Sound Quest Complete!
            </h3>
            <p className="text-xl text-gray-700 mb-6">
              You discovered the image for:
            </p>

            {/* Reveal the image */}
            <div className="bg-gradient-to-br from-amber-100 to-emerald-100 rounded-xl p-6 mb-6 max-w-sm mx-auto">
              <img
                src={entry.imageUrl}
                alt={entry.name}
                className="w-48 h-48 object-contain mx-auto mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <h4 className="text-2xl font-bold text-gray-800">{entry.name}</h4>
            </div>

            <p className="text-gray-600 mb-6">
              Complete the Reading Quest to unlock the full entry!
            </p>

            <button
              onClick={handleFinish}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              Back to Field Guide
            </button>
          </div>
        )}
      </div>

      {/* Footer with back/skip options */}
      <div className="border-t border-gray-200 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ← Back to Collection
        </button>

        {/* Dev skip button */}
        <button
          onClick={() => {
            // Create fake successful attempts for all words
            const fakeAttempts: PhonemeAttempt[] = entry.phonemeWords.map(pw => ({
              word: pw.word,
              expectedCount: pw.phonemes.length,
              givenCount: pw.phonemes.length,
              correct: true,
              timestamp: Date.now(),
            }));
            onComplete(fakeAttempts);
          }}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          [Dev: Skip]
        </button>
      </div>
    </div>
  );
}
