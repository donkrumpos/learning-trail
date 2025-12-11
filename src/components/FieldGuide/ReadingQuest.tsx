import { useState, useCallback, useEffect } from 'react';
import type { FieldGuideEntry, FieldGuideQuestion } from '../../types/fieldGuide';

interface ReadingQuestProps {
  entry: FieldGuideEntry;
  onComplete: (questionAttempts: QuestionAttempt[]) => void;
  onBack: () => void;
}

interface QuestionAttempt {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  timestamp: number;
}

type Phase = 'reading' | 'retell' | 'questions' | 'complete';

export function ReadingQuest({ entry, onComplete, onBack }: ReadingQuestProps) {
  const [phase, setPhase] = useState<Phase>('reading');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [retellSelections, setRetellSelections] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionAttempts, setQuestionAttempts] = useState<QuestionAttempt[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);

  const currentQuestion: FieldGuideQuestion | undefined = entry.comprehensionQuestions[currentQuestionIndex];
  const totalQuestions = entry.comprehensionQuestions.length;
  const hasRetell = entry.retellElements && entry.retellElements.length > 0;

  // Text-to-speech
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Auto-speak passage when entering reading phase
  useEffect(() => {
    if (phase === 'reading') {
      const timer = setTimeout(() => speakText(entry.passage), 500);
      return () => {
        clearTimeout(timer);
        stopSpeaking();
      };
    }
  }, [phase, entry.passage, speakText, stopSpeaking]);

  // Handle moving from reading to next phase
  const handleReadingDone = () => {
    stopSpeaking();
    if (hasRetell) {
      setPhase('retell');
    } else if (totalQuestions > 0) {
      setPhase('questions');
    } else {
      setPhase('complete');
    }
  };

  // Handle moving from retell to questions
  const handleRetellDone = () => {
    if (totalQuestions > 0) {
      setPhase('questions');
    } else {
      setPhase('complete');
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answerId: string, isCorrect: boolean) => {
    if (showFeedback || !currentQuestion) return;

    setSelectedAnswer(answerId);
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    const attempt: QuestionAttempt = {
      questionId: currentQuestion.id,
      answerId,
      isCorrect,
      timestamp: Date.now(),
    };
    setQuestionAttempts(prev => [...prev, attempt]);
  };

  // Move to next question or complete
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex + 1 >= totalQuestions) {
      setPhase('complete');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  // Complete the quest
  const handleFinish = () => {
    onComplete(questionAttempts);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>📖</span> Reading Quest
          </h2>
          <div className="text-sm bg-emerald-600 px-3 py-1 rounded-full">
            {entry.name}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-emerald-100 flex">
        <div
          className={`h-full transition-all duration-300 ${phase === 'reading' || phase === 'retell' || phase === 'questions' || phase === 'complete' ? 'bg-emerald-400' : 'bg-emerald-100'}`}
          style={{ width: '33%' }}
        />
        <div
          className={`h-full transition-all duration-300 ${phase === 'retell' || phase === 'questions' || phase === 'complete' ? 'bg-emerald-500' : 'bg-emerald-100'}`}
          style={{ width: '33%' }}
        />
        <div
          className={`h-full transition-all duration-300 ${phase === 'questions' || phase === 'complete' ? 'bg-emerald-600' : 'bg-emerald-100'}`}
          style={{ width: '34%' }}
        />
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* ============================================================ */}
        {/* READING PHASE */}
        {/* ============================================================ */}
        {phase === 'reading' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Read About {entry.name}
            </h3>

            {/* Image */}
            <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl flex items-center justify-center">
              <img
                src={entry.imageUrl}
                alt={entry.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Read aloud button */}
            <div className="flex justify-center mb-4">
              {isSpeaking ? (
                <button
                  onClick={stopSpeaking}
                  className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <span className="text-xl">🔇</span> Stop
                </button>
              ) : (
                <button
                  onClick={() => speakText(entry.passage)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <span className="text-xl">🔊</span> Read to Me
                </button>
              )}
            </div>

            {/* Passage */}
            <div className="bg-amber-50 rounded-lg p-6 mb-6 text-left">
              <p className="text-2xl leading-relaxed text-gray-700">
                {entry.passage}
              </p>
            </div>

            {/* Vocabulary */}
            {entry.vocabulary.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Key Words:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {entry.vocabulary.map(word => (
                    <span
                      key={word}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Continue button */}
            <button
              onClick={handleReadingDone}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              I'm Ready!
            </button>
          </div>
        )}

        {/* ============================================================ */}
        {/* RETELL PHASE */}
        {/* ============================================================ */}
        {phase === 'retell' && entry.retellElements && (
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              What Did You Learn?
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Pick the right answer for each question about {entry.name}.
            </p>

            {/* WHAT */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="text-lg font-bold text-blue-800 mb-3">
                What is it?
              </h4>
              <div className="flex flex-wrap gap-3">
                {entry.retellElements
                  .filter(el => el.category === 'what')
                  .map(el => (
                    <button
                      key={el.id}
                      onClick={() => setRetellSelections(prev => ({ ...prev, what: el.id }))}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        retellSelections.what === el.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white hover:bg-blue-100 border-2 border-blue-200'
                      }`}
                    >
                      {el.icon && <span className="text-2xl mr-2">{el.icon}</span>}
                      {el.text}
                    </button>
                  ))}
              </div>
            </div>

            {/* WHERE */}
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <h4 className="text-lg font-bold text-green-800 mb-3">
                Where can you find it?
              </h4>
              <div className="flex flex-wrap gap-3">
                {entry.retellElements
                  .filter(el => el.category === 'where')
                  .map(el => (
                    <button
                      key={el.id}
                      onClick={() => setRetellSelections(prev => ({ ...prev, where: el.id }))}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        retellSelections.where === el.id
                          ? 'bg-green-500 text-white'
                          : 'bg-white hover:bg-green-100 border-2 border-green-200'
                      }`}
                    >
                      {el.icon && <span className="text-2xl mr-2">{el.icon}</span>}
                      {el.text}
                    </button>
                  ))}
              </div>
            </div>

            {/* DOES */}
            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-bold text-purple-800 mb-3">
                What does it do?
              </h4>
              <div className="flex flex-wrap gap-3">
                {entry.retellElements
                  .filter(el => el.category === 'does')
                  .map(el => (
                    <button
                      key={el.id}
                      onClick={() => setRetellSelections(prev => ({ ...prev, does: el.id }))}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        retellSelections.does === el.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-white hover:bg-purple-100 border-2 border-purple-200'
                      }`}
                    >
                      {el.icon && <span className="text-2xl mr-2">{el.icon}</span>}
                      {el.text}
                    </button>
                  ))}
              </div>
            </div>

            {/* Summary */}
            {Object.keys(retellSelections).length > 0 && (
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <h4 className="text-lg font-bold text-yellow-800 mb-2">Your Summary:</h4>
                <p className="text-lg text-gray-700">
                  {retellSelections.what && (
                    <>
                      {entry.name} is{' '}
                      <span className="font-medium">
                        {entry.retellElements?.find(e => e.id === retellSelections.what)?.text?.toLowerCase()}
                      </span>
                      .{' '}
                    </>
                  )}
                  {retellSelections.where && (
                    <>
                      You can find it{' '}
                      <span className="font-medium">
                        {entry.retellElements?.find(e => e.id === retellSelections.where)?.text?.toLowerCase()}
                      </span>
                      .{' '}
                    </>
                  )}
                  {retellSelections.does && (
                    <>
                      It{' '}
                      <span className="font-medium">
                        {entry.retellElements?.find(e => e.id === retellSelections.does)?.text?.toLowerCase()}
                      </span>
                      .
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setPhase('reading')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg"
              >
                Read Again
              </button>
              <button
                onClick={handleRetellDone}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                {totalQuestions > 0 ? 'Answer Questions!' : 'Finish!'}
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* QUESTIONS PHASE */}
        {/* ============================================================ */}
        {phase === 'questions' && currentQuestion && (
          <div>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {entry.comprehensionQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full ${
                    idx < currentQuestionIndex
                      ? 'bg-emerald-500'
                      : idx === currentQuestionIndex
                      ? 'bg-emerald-400'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </h3>

            {/* Question text */}
            <p className="text-xl text-gray-700 mb-6 text-center p-4 bg-emerald-50 rounded-lg">
              {currentQuestion.text}
            </p>

            {/* Answer choices */}
            <div className="space-y-4 mb-6">
              {currentQuestion.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.id;
                const showCorrectness = showFeedback;

                let bgColor = 'bg-gray-100 hover:bg-gray-200';
                if (showCorrectness && isSelected) {
                  bgColor = choice.isCorrect ? 'bg-green-200' : 'bg-red-200';
                } else if (showCorrectness && choice.isCorrect) {
                  bgColor = 'bg-green-100';
                }

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleAnswerSelect(choice.id, choice.isCorrect)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-lg text-left text-xl font-medium transition-colors ${bgColor} ${
                      showFeedback ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    {choice.icon && <span className="text-2xl mr-3">{choice.icon}</span>}
                    {choice.text}
                    {showCorrectness && isSelected && (
                      <span className="float-right text-2xl">
                        {choice.isCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className={`p-4 rounded-lg mb-6 ${
                feedbackCorrect ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <p className="text-lg text-center">
                  {feedbackCorrect
                    ? currentQuestion.feedback.correct
                    : currentQuestion.feedback.incorrect}
                </p>
              </div>
            )}

            {/* Next button */}
            {showFeedback && (
              <div className="text-center">
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
                >
                  {currentQuestionIndex < totalQuestions - 1
                    ? 'Next Question'
                    : 'See My Discovery!'}
                </button>
              </div>
            )}

            {/* Go back to reading */}
            {!showFeedback && (
              <button
                onClick={() => setPhase('reading')}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg block mx-auto"
              >
                Read Again
              </button>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* COMPLETE PHASE */}
        {/* ============================================================ */}
        {phase === 'complete' && (
          <div className="text-center py-8">
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <h3 className="text-3xl font-bold text-emerald-600 mb-4">
              Reading Quest Complete!
            </h3>
            <p className="text-xl text-gray-700 mb-2">
              You fully unlocked:
            </p>

            {/* Show the entry */}
            <div className="bg-gradient-to-br from-emerald-100 to-amber-100 rounded-xl p-6 mb-6 max-w-sm mx-auto">
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

            {/* Score */}
            {questionAttempts.length > 0 && (
              <div className="bg-yellow-100 rounded-lg p-4 mb-6 inline-block">
                <p className="text-xl">
                  You got{' '}
                  <span className="font-bold text-emerald-600">
                    {questionAttempts.filter(a => a.isCorrect).length}
                  </span>{' '}
                  out of{' '}
                  <span className="font-bold">{questionAttempts.length}</span>{' '}
                  questions right!
                </p>
              </div>
            )}

            <div className="text-4xl mb-6">⭐ ⭐ ⭐</div>

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
            // Create fake successful attempts for all questions
            const fakeAttempts: QuestionAttempt[] = entry.comprehensionQuestions.map(q => ({
              questionId: q.id,
              answerId: q.choices.find(c => c.isCorrect)?.id || 'a',
              isCorrect: true,
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
