import { useState, useEffect, useCallback } from 'react';
import type { AppView, ReadingSession, ProgressData, PassageCompletion, Passage } from './types';
import { starterPassages } from './data/starterPassages';
import { FieldGuide, loadFieldGuideProgress, saveFieldGuideProgress } from './components/FieldGuide';
import { fieldGuideEntries } from './data/fieldGuideEntries';

// ============================================================================
// LOCALSTORAGE HELPERS
// ============================================================================
const PROGRESS_KEY = 'reading-companion-progress';
const CUSTOM_PASSAGES_KEY = 'reading-companion-custom-passages';

function loadProgress(): ProgressData {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  return { completions: [], totalPassagesRead: 0, lastReadDate: '' };
}

function saveProgress(progress: ProgressData): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function loadCustomPassages(): Passage[] {
  try {
    const data = localStorage.getItem(CUSTOM_PASSAGES_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load custom passages:', e);
  }
  return [];
}

function saveCustomPassages(passages: Passage[]): void {
  try {
    localStorage.setItem(CUSTOM_PASSAGES_KEY, JSON.stringify(passages));
  } catch (e) {
    console.error('Failed to save custom passages:', e);
  }
}

// Parent password (simple word for now)
const PARENT_PASSWORD = 'dragon';

/**
 * Main App Component
 */
function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [session, setSession] = useState<ReadingSession | null>(null);
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [customPassages, setCustomPassages] = useState<Passage[]>(loadCustomPassages);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [parentPassword, setParentPassword] = useState('');
  const [parentError, setParentError] = useState('');
  const [fieldGuideProgress, setFieldGuideProgress] = useState(loadFieldGuideProgress);

  // Retell activity state
  const [retellSelections, setRetellSelections] = useState<Record<string, string>>({});

  // Parent panel form state
  const [newPassageTitle, setNewPassageTitle] = useState('');
  const [newPassageText, setNewPassageText] = useState('');
  const [newPassageType, setNewPassageType] = useState<'fiction' | 'facts'>('fiction');
  const [newPassageLevel, setNewPassageLevel] = useState<'emergent' | 'early' | 'developing'>('emergent');

  // Combine starter and custom passages
  const allPassages = [...starterPassages, ...customPassages];

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Save custom passages whenever they change
  useEffect(() => {
    saveCustomPassages(customPassages);
  }, [customPassages]);

  // Text-to-speech function
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower for young readers
      utterance.pitch = 1.1;
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

  // Record a passage completion
  const recordCompletion = useCallback((sessionData: ReadingSession) => {
    const completion: PassageCompletion = {
      passageId: sessionData.passage.id,
      completedAt: Date.now(),
      questionAttempts: sessionData.questionAttempts,
      retellCompleted: sessionData.retellCompleted,
      rereadCount: sessionData.rereadCount,
    };
    setProgress(prev => ({
      completions: [...prev.completions, completion],
      totalPassagesRead: prev.totalPassagesRead + 1,
      lastReadDate: new Date().toISOString().split('T')[0],
    }));
  }, []);

  // Check if a passage has been completed
  const isPassageCompleted = useCallback((passageId: string) => {
    return progress.completions.some(c => c.passageId === passageId);
  }, [progress.completions]);

  // Handle answer selection
  const handleAnswerSelect = (answerId: string, isCorrect: boolean) => {
    if (showFeedback || !session) return; // Prevent double-clicking

    setSelectedAnswer(answerId);
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    // Record the attempt
    const question = session.passage.questions[session.currentQuestionIndex];
    const attempt = {
      questionId: question.id,
      answerId,
      isCorrect,
      timestamp: Date.now(),
    };
    setSession({
      ...session,
      questionAttempts: [...session.questionAttempts, attempt],
    });
  };

  // Move to next question or celebration
  const handleNextQuestion = () => {
    if (!session) return;

    setSelectedAnswer(null);
    setShowFeedback(false);

    const nextIndex = session.currentQuestionIndex + 1;
    if (nextIndex >= session.passage.questions.length) {
      // All questions done - record completion and celebrate!
      recordCompletion(session);
      setCurrentView('celebration');
    } else {
      setSession({
        ...session,
        currentQuestionIndex: nextIndex,
      });
    }
  };

  // Handle parent login
  const handleParentLogin = () => {
    if (parentPassword.toLowerCase() === PARENT_PASSWORD) {
      setCurrentView('parent-panel');
      setParentPassword('');
      setParentError('');
    } else {
      setParentError('That\'s not the magic word! Hint: It\'s a mythical creature.');
    }
  };

  // Add a new custom passage
  const handleAddPassage = () => {
    if (!newPassageTitle.trim() || !newPassageText.trim()) return;

    const newPassage: Passage = {
      id: `custom-${Date.now()}`,
      title: newPassageTitle.trim(),
      text: newPassageText.trim(),
      type: newPassageType,
      level: newPassageLevel,
      questions: [], // Parent can add questions later
    };

    setCustomPassages(prev => [...prev, newPassage]);
    setNewPassageTitle('');
    setNewPassageText('');
  };

  // Delete a custom passage
  const handleDeletePassage = (id: string) => {
    setCustomPassages(prev => prev.filter(p => p.id !== id));
  };

  // Calculate stats for parent panel
  const totalCompleted = progress.completions.length;
  const correctAnswers = progress.completions.reduce(
    (sum, c) => sum + c.questionAttempts.filter(a => a.isCorrect).length,
    0
  );
  const totalAnswers = progress.completions.reduce(
    (sum, c) => sum + c.questionAttempts.length,
    0
  );

  // If we're in Field Guide mode, render that component instead
  if (currentView === 'field-guide') {
    return (
      <FieldGuide
        onBack={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-blue-500 text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1
            className="text-3xl font-bold cursor-pointer"
            onClick={() => {
              stopSpeaking();
              setCurrentView('home');
              setSession(null);
              setSelectedAnswer(null);
              setShowFeedback(false);
            }}
          >
            Learning Trail
          </h1>
          <button
            onClick={() => setCurrentView('parent-login')}
            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Parent
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-6">

        {/* ================================================================ */}
        {/* HOME VIEW */}
        {/* ================================================================ */}
        {currentView === 'home' && (
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              What would you like to do today?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Reading Trail Card */}
              <div
                onClick={() => setCurrentView('library')}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-4 border-blue-200 hover:border-blue-400"
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  Reading Trail
                </h3>
                <p className="text-gray-600">
                  Read stories and learn new things!
                </p>
                {progress.totalPassagesRead > 0 && (
                  <p className="text-sm text-blue-500 mt-2">
                    {progress.totalPassagesRead} stories read
                  </p>
                )}
              </div>

              {/* Hyrule Field Guide Card */}
              <div
                onClick={() => setCurrentView('field-guide')}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow border-4 border-emerald-200 hover:border-emerald-400"
              >
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">
                  Hyrule Field Guide
                </h3>
                <p className="text-gray-600">
                  Discover creatures, items, and heroes!
                </p>
                <p className="text-sm text-emerald-500 mt-2">
                  Sound & Reading Quests
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* LIBRARY VIEW */}
        {/* ================================================================ */}
        {currentView === 'library' && (
          <div>
            {/* Progress Trail */}
            {progress.totalPassagesRead > 0 && (
              <div className="bg-white rounded-lg shadow p-4 mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-2">Your Reading Trail</h3>
                <div className="flex flex-wrap gap-2">
                  {allPassages.map((passage) => (
                    <div
                      key={passage.id}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                        isPassageCompleted(passage.id)
                          ? 'bg-yellow-400'
                          : 'bg-gray-200'
                      }`}
                      title={passage.title}
                    >
                      {isPassageCompleted(passage.id) ? '⭐' : '○'}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {progress.totalPassagesRead} stories read!
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentView('home')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
              >
                ← Home
              </button>
              <h2 className="text-4xl font-bold text-gray-800">
                Choose a Story!
              </h2>
              <div className="w-24"></div> {/* Spacer for centering */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPassages.map((passage) => (
                <div
                  key={passage.id}
                  className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer relative ${
                    isPassageCompleted(passage.id) ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  onClick={() => {
                    setSession({
                      passage,
                      currentView: 'reading',
                      currentQuestionIndex: 0,
                      questionAttempts: [],
                      retellCompleted: false,
                      rereadCount: 0,
                    });
                    setCurrentView('reading');
                  }}
                >
                  {isPassageCompleted(passage.id) && (
                    <div className="absolute top-2 right-2 text-2xl">⭐</div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {passage.title}
                  </h3>
                  <div className="flex gap-2 mb-3">
                    <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {passage.type === 'fiction' ? 'Story' : 'Facts'}
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {passage.level}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {passage.text.substring(0, 100)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* READING VIEW */}
        {/* ================================================================ */}
        {currentView === 'reading' && session && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {session.passage.title}
            </h2>

            {/* Read Aloud Button */}
            <div className="flex justify-center mb-4">
              {isSpeaking ? (
                <button
                  onClick={stopSpeaking}
                  className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <span className="text-xl">🔇</span> Stop Reading
                </button>
              ) : (
                <button
                  onClick={() => speakText(session.passage.text)}
                  className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <span className="text-xl">🔊</span> Read to Me
                </button>
              )}
            </div>

            <div className="text-2xl leading-relaxed text-gray-700 mb-8 p-4 bg-amber-50 rounded-lg">
              {session.passage.text}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => {
                  speakText(session.passage.text);
                  setSession({ ...session, rereadCount: session.rereadCount + 1 });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-4 px-8 rounded-lg text-xl"
              >
                Read It Again
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  // Go to retell if available, otherwise questions, otherwise celebration
                  if (session.passage.retellElements && session.passage.retellElements.length > 0) {
                    setRetellSelections({});
                    setCurrentView('retell');
                  } else if (session.passage.questions.length > 0) {
                    setCurrentView('questions');
                  } else {
                    recordCompletion(session);
                    setCurrentView('celebration');
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
              >
                I'm Ready!
              </button>
            </div>

            <button
              onClick={() => {
                stopSpeaking();
                setCurrentView('library');
                setSession(null);
              }}
              className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg block mx-auto"
            >
              Back to Library
            </button>
          </div>
        )}

        {/* ================================================================ */}
        {/* RETELL VIEW */}
        {/* ================================================================ */}
        {currentView === 'retell' && session && session.passage.retellElements && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Let's Retell the Story!
            </h2>
            <p className="text-lg text-gray-600 mb-6 text-center">
              Pick the right answer for each part of the story.
            </p>

            {/* Retell categories */}
            <div className="space-y-6">
              {/* WHO */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  Who is in the story?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {session.passage.retellElements
                    .filter(el => el.category === 'who')
                    .map(el => (
                      <button
                        key={el.id}
                        onClick={() => setRetellSelections(prev => ({ ...prev, who: el.id }))}
                        className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                          retellSelections.who === el.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white hover:bg-blue-100 border-2 border-blue-200'
                        }`}
                      >
                        <span className="text-2xl mr-2">{el.icon}</span>
                        {el.text}
                      </button>
                    ))}
                </div>
              </div>

              {/* WHERE */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-green-800 mb-3">
                  Where does it happen?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {session.passage.retellElements
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
                        <span className="text-2xl mr-2">{el.icon}</span>
                        {el.text}
                      </button>
                    ))}
                </div>
              </div>

              {/* SEQUENCE: Beginning, Middle, End */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="text-xl font-bold text-purple-800 mb-3">
                  What happened? (Put in order)
                </h3>

                {/* Beginning */}
                <div className="mb-4">
                  <p className="text-md font-medium text-purple-700 mb-2">First...</p>
                  <div className="flex flex-wrap gap-3">
                    {session.passage.retellElements
                      .filter(el => el.category === 'beginning')
                      .map(el => (
                        <button
                          key={el.id}
                          onClick={() => setRetellSelections(prev => ({ ...prev, beginning: el.id }))}
                          className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                            retellSelections.beginning === el.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-white hover:bg-purple-100 border-2 border-purple-200'
                          }`}
                        >
                          <span className="text-2xl mr-2">{el.icon}</span>
                          {el.text}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Middle */}
                <div className="mb-4">
                  <p className="text-md font-medium text-purple-700 mb-2">Then...</p>
                  <div className="flex flex-wrap gap-3">
                    {session.passage.retellElements
                      .filter(el => el.category === 'middle')
                      .map(el => (
                        <button
                          key={el.id}
                          onClick={() => setRetellSelections(prev => ({ ...prev, middle: el.id }))}
                          className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                            retellSelections.middle === el.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-white hover:bg-purple-100 border-2 border-purple-200'
                          }`}
                        >
                          <span className="text-2xl mr-2">{el.icon}</span>
                          {el.text}
                        </button>
                      ))}
                  </div>
                </div>

                {/* End */}
                <div>
                  <p className="text-md font-medium text-purple-700 mb-2">At the end...</p>
                  <div className="flex flex-wrap gap-3">
                    {session.passage.retellElements
                      .filter(el => el.category === 'end')
                      .map(el => (
                        <button
                          key={el.id}
                          onClick={() => setRetellSelections(prev => ({ ...prev, end: el.id }))}
                          className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                            retellSelections.end === el.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-white hover:bg-purple-100 border-2 border-purple-200'
                          }`}
                        >
                          <span className="text-2xl mr-2">{el.icon}</span>
                          {el.text}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Summary of selections */}
            {Object.keys(retellSelections).length > 0 && (
              <div className="mt-6 bg-yellow-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Your Story Summary:</h3>
                <p className="text-lg text-gray-700">
                  {retellSelections.who && (
                    <>
                      <span className="font-medium">
                        {session.passage.retellElements.find(e => e.id === retellSelections.who)?.icon}{' '}
                        {session.passage.retellElements.find(e => e.id === retellSelections.who)?.text}
                      </span>
                      {retellSelections.where && ' was '}
                    </>
                  )}
                  {retellSelections.where && (
                    <span className="font-medium">
                      {session.passage.retellElements.find(e => e.id === retellSelections.where)?.icon}{' '}
                      {session.passage.retellElements.find(e => e.id === retellSelections.where)?.text}
                    </span>
                  )}
                  {retellSelections.where && '. '}
                  {retellSelections.beginning && (
                    <>
                      First, {session.passage.retellElements.find(e => e.id === retellSelections.beginning)?.text?.toLowerCase()}.{' '}
                    </>
                  )}
                  {retellSelections.middle && (
                    <>
                      Then, {session.passage.retellElements.find(e => e.id === retellSelections.middle)?.text?.toLowerCase()}.{' '}
                    </>
                  )}
                  {retellSelections.end && (
                    <>
                      At the end, {session.passage.retellElements.find(e => e.id === retellSelections.end)?.text?.toLowerCase()}.
                    </>
                  )}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => setCurrentView('reading')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg"
              >
                Read Again
              </button>
              <button
                onClick={() => {
                  // Mark retell as completed
                  setSession({ ...session, retellCompleted: true });
                  // Go to questions or celebration
                  if (session.passage.questions.length > 0) {
                    setCurrentView('questions');
                  } else {
                    recordCompletion({ ...session, retellCompleted: true });
                    setCurrentView('celebration');
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
              >
                {session.passage.questions.length > 0 ? 'Answer Questions!' : 'All Done!'}
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* QUESTIONS VIEW */}
        {/* ================================================================ */}
        {currentView === 'questions' && session && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Progress indicator */}
            <div className="flex justify-center gap-2 mb-6">
              {session.passage.questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full ${
                    idx < session.currentQuestionIndex
                      ? 'bg-green-500'
                      : idx === session.currentQuestionIndex
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Question {session.currentQuestionIndex + 1} of {session.passage.questions.length}
            </h2>

            {(() => {
              const question = session.passage.questions[session.currentQuestionIndex];
              return (
                <div>
                  {/* Question text */}
                  <p className="text-xl text-gray-700 mb-6 text-center p-4 bg-blue-50 rounded-lg">
                    {question.text}
                  </p>

                  {/* Answer choices */}
                  <div className="space-y-4 mb-6">
                    {question.choices.map((choice) => {
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
                          <span className="text-2xl mr-3">{choice.icon}</span>
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
                          ? question.feedback.correct
                          : question.feedback.incorrect}
                      </p>
                    </div>
                  )}

                  {/* Next button */}
                  {showFeedback && (
                    <div className="text-center">
                      <button
                        onClick={handleNextQuestion}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
                      >
                        {session.currentQuestionIndex < session.passage.questions.length - 1
                          ? 'Next Question'
                          : 'Finish!'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Option to go back to story */}
            {!showFeedback && (
              <button
                onClick={() => setCurrentView('reading')}
                className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg block mx-auto"
              >
                Read the Story Again
              </button>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* CELEBRATION VIEW */}
        {/* ================================================================ */}
        {currentView === 'celebration' && session && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-8xl mb-6 animate-bounce">
              🎉
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Great Job!
            </h2>
            <p className="text-2xl text-gray-600 mb-4">
              You finished reading "{session.passage.title}"!
            </p>

            {/* Stats for this session */}
            {session.questionAttempts.length > 0 && (
              <div className="bg-yellow-100 rounded-lg p-4 mb-6 inline-block">
                <p className="text-xl">
                  You got{' '}
                  <span className="font-bold text-green-600">
                    {session.questionAttempts.filter(a => a.isCorrect).length}
                  </span>{' '}
                  out of{' '}
                  <span className="font-bold">
                    {session.questionAttempts.length}
                  </span>{' '}
                  questions right!
                </p>
              </div>
            )}

            <div className="text-6xl mb-6">
              ⭐ ⭐ ⭐
            </div>

            <p className="text-xl text-gray-600 mb-8">
              You've read {progress.totalPassagesRead} {progress.totalPassagesRead === 1 ? 'story' : 'stories'}!
            </p>

            <button
              onClick={() => {
                setCurrentView('library');
                setSession(null);
                setSelectedAnswer(null);
                setShowFeedback(false);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              Read Another Story!
            </button>
          </div>
        )}

        {/* ================================================================ */}
        {/* PARENT LOGIN VIEW */}
        {/* ================================================================ */}
        {currentView === 'parent-login' && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Parent Area
            </h2>
            <p className="text-gray-600 mb-6">
              Enter the magic word to continue:
            </p>
            <input
              type="text"
              value={parentPassword}
              onChange={(e) => setParentPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleParentLogin()}
              placeholder="Magic word..."
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg mb-4"
            />
            {parentError && (
              <p className="text-red-500 mb-4">{parentError}</p>
            )}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentView('library');
                  setParentPassword('');
                  setParentError('');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleParentLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Enter
              </button>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* PARENT PANEL VIEW */}
        {/* ================================================================ */}
        {currentView === 'parent-panel' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Parent Panel
              </h2>
              <button
                onClick={() => setCurrentView('library')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
              >
                Back to Library
              </button>
            </div>

            {/* Progress Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Reading Progress
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-600">{totalCompleted}</div>
                  <div className="text-sm text-gray-600">Stories Completed</div>
                </div>
                <div className="bg-green-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-green-600">
                    {totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Questions Correct</div>
                </div>
                <div className="bg-purple-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-purple-600">
                    {progress.lastReadDate || 'Never'}
                  </div>
                  <div className="text-sm text-gray-600">Last Read</div>
                </div>
              </div>

              {/* Completion history */}
              {progress.completions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold text-gray-700 mb-2">Recent Activity:</h4>
                  <div className="max-h-40 overflow-y-auto">
                    {progress.completions.slice(-5).reverse().map((completion, idx) => {
                      const passage = allPassages.find(p => p.id === completion.passageId);
                      const correct = completion.questionAttempts.filter(a => a.isCorrect).length;
                      const total = completion.questionAttempts.length;
                      return (
                        <div key={idx} className="text-sm text-gray-600 py-1 border-b">
                          {passage?.title || 'Unknown'} - {correct}/{total} correct
                          {' '}({new Date(completion.completedAt).toLocaleDateString()})
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Field Guide Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Hyrule Field Guide Progress
              </h3>
              {(() => {
                const fgProgress = fieldGuideProgress;
                const entriesUnlocked = Object.values(fgProgress.entries).filter(e => e.fullyUnlocked).length;
                const imagesUnlocked = Object.values(fgProgress.entries).filter(e => e.imageUnlocked).length;
                const totalEntries = fieldGuideEntries.length;
                const phonemeAccuracy = fgProgress.phonemeProgress.totalAttempts > 0
                  ? Math.round((fgProgress.phonemeProgress.correctAttempts / fgProgress.phonemeProgress.totalAttempts) * 100)
                  : 0;
                const readingAccuracy = fgProgress.readingProgress.totalQuestions > 0
                  ? Math.round((fgProgress.readingProgress.correctAnswers / fgProgress.readingProgress.totalQuestions) * 100)
                  : 0;

                return (
                  <>
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div className="bg-emerald-100 rounded-lg p-4">
                        <div className="text-3xl font-bold text-emerald-600">{entriesUnlocked}/{totalEntries}</div>
                        <div className="text-sm text-gray-600">Entries Unlocked</div>
                      </div>
                      <div className="bg-amber-100 rounded-lg p-4">
                        <div className="text-3xl font-bold text-amber-600">{imagesUnlocked}/{totalEntries}</div>
                        <div className="text-sm text-gray-600">Images Discovered</div>
                      </div>
                      <div className="bg-purple-100 rounded-lg p-4">
                        <div className="text-3xl font-bold text-purple-600">
                          {fgProgress.lastActivityDate || 'Never'}
                        </div>
                        <div className="text-sm text-gray-600">Last Activity</div>
                      </div>
                    </div>

                    {/* Phoneme & Reading accuracy */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-amber-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-amber-700">{phonemeAccuracy}%</div>
                        <div className="text-sm text-gray-600">Sound Quest Accuracy</div>
                        <div className="text-xs text-gray-400">{fgProgress.phonemeProgress.totalAttempts} attempts</div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-emerald-700">{readingAccuracy}%</div>
                        <div className="text-sm text-gray-600">Reading Quest Accuracy</div>
                        <div className="text-xs text-gray-400">{fgProgress.readingProgress.totalQuestions} questions</div>
                      </div>
                    </div>

                    {/* Entry breakdown */}
                    {entriesUnlocked > 0 && (
                      <div className="mt-4">
                        <h4 className="font-bold text-gray-700 mb-2">Unlocked Entries:</h4>
                        <div className="flex flex-wrap gap-2">
                          {fieldGuideEntries.map(entry => {
                            const state = fgProgress.entries[entry.id];
                            if (!state?.fullyUnlocked) return null;
                            return (
                              <span key={entry.id} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                                {entry.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Reset Field Guide button */}
              <button
                onClick={() => {
                  if (confirm('Reset all Field Guide progress? This cannot be undone.')) {
                    const freshProgress = {
                      entries: Object.fromEntries(
                        fieldGuideEntries.map(e => [e.id, { entryId: e.id, imageUnlocked: false, fullyUnlocked: false }])
                      ),
                      phonemeProgress: { totalAttempts: 0, correctAttempts: 0, wordAttempts: {} },
                      readingProgress: { totalQuestions: 0, correctAnswers: 0, entriesCompleted: [] },
                      lastActivityDate: '',
                    };
                    saveFieldGuideProgress(freshProgress);
                    setFieldGuideProgress(freshProgress);
                  }
                }}
                className="mt-4 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-lg text-sm"
              >
                Reset Field Guide Progress
              </button>
            </div>

            {/* Add New Passage */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Add New Passage
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newPassageTitle}
                  onChange={(e) => setNewPassageTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg"
                />
                <textarea
                  value={newPassageText}
                  onChange={(e) => setNewPassageText(e.target.value)}
                  placeholder="Passage text (2-5 sentences work best)"
                  rows={4}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg"
                />
                <div className="flex gap-4">
                  <select
                    value={newPassageType}
                    onChange={(e) => setNewPassageType(e.target.value as 'fiction' | 'facts')}
                    className="p-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="fiction">Story (Fiction)</option>
                    <option value="facts">Facts (Informational)</option>
                  </select>
                  <select
                    value={newPassageLevel}
                    onChange={(e) => setNewPassageLevel(e.target.value as 'emergent' | 'early' | 'developing')}
                    className="p-3 border-2 border-gray-300 rounded-lg"
                  >
                    <option value="emergent">Emergent</option>
                    <option value="early">Early</option>
                    <option value="developing">Developing</option>
                  </select>
                </div>
                <button
                  onClick={handleAddPassage}
                  disabled={!newPassageTitle.trim() || !newPassageText.trim()}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Add Passage
                </button>
                <p className="text-sm text-gray-500">
                  Note: Custom passages won't have comprehension questions yet.
                  They can still be used for read-aloud practice.
                </p>
              </div>
            </div>

            {/* Custom Passages List */}
            {customPassages.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Your Custom Passages
                </h3>
                <div className="space-y-3">
                  {customPassages.map((passage) => (
                    <div key={passage.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium">{passage.title}</span>
                        <span className="text-sm text-gray-500 ml-2">({passage.type}, {passage.level})</span>
                      </div>
                      <button
                        onClick={() => handleDeletePassage(passage.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Progress */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Data Management
              </h3>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                    setProgress({ completions: [], totalPassagesRead: 0, lastReadDate: '' });
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Reset All Progress
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
