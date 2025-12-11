import { useState, useEffect, useCallback } from 'react';
import type {
  FieldGuideView,
  FieldGuideProgress,
  EntryUnlockState,
  SoundQuestSession,
  ReadingQuestSession,
  FieldGuideEntry,
} from '../../types/fieldGuide';
import type { PhonemeAttempt } from '../../types/fieldGuide';
import { fieldGuideEntries } from '../../data/fieldGuideEntries';
import { CollectionView } from './CollectionView';
import { EntryDetailView } from './EntryDetailView';
import { SoundQuest } from './SoundQuest';
import { ReadingQuest } from './ReadingQuest';

// ============================================================================
// LOCALSTORAGE HELPERS
// ============================================================================
const FIELD_GUIDE_PROGRESS_KEY = 'field-guide-progress';

function createInitialProgress(): FieldGuideProgress {
  const entries: Record<string, EntryUnlockState> = {};
  fieldGuideEntries.forEach(entry => {
    entries[entry.id] = {
      entryId: entry.id,
      imageUnlocked: false,
      fullyUnlocked: false,
    };
  });

  return {
    entries,
    phonemeProgress: {
      totalAttempts: 0,
      correctAttempts: 0,
      wordAttempts: {},
    },
    readingProgress: {
      totalQuestions: 0,
      correctAnswers: 0,
      entriesCompleted: [],
    },
    lastActivityDate: '',
  };
}

function loadProgress(): FieldGuideProgress {
  try {
    const data = localStorage.getItem(FIELD_GUIDE_PROGRESS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      // Ensure all entries exist (in case new entries were added)
      fieldGuideEntries.forEach(entry => {
        if (!parsed.entries[entry.id]) {
          parsed.entries[entry.id] = {
            entryId: entry.id,
            imageUnlocked: false,
            fullyUnlocked: false,
          };
        }
      });
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load field guide progress:', e);
  }
  return createInitialProgress();
}

function saveProgress(progress: FieldGuideProgress): void {
  try {
    localStorage.setItem(FIELD_GUIDE_PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save field guide progress:', e);
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface FieldGuideProps {
  onBack: () => void;
}

export function FieldGuide({ onBack }: FieldGuideProps) {
  const [view, setView] = useState<FieldGuideView>('collection');
  const [progress, setProgress] = useState<FieldGuideProgress>(loadProgress);
  const [selectedEntry, setSelectedEntry] = useState<FieldGuideEntry | null>(null);
  const [soundQuestSession, setSoundQuestSession] = useState<SoundQuestSession | null>(null);
  const [readingQuestSession, setReadingQuestSession] = useState<ReadingQuestSession | null>(null);

  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Unlock image for an entry (after Sound Quest)
  const unlockImage = useCallback((entryId: string) => {
    setProgress(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
        [entryId]: {
          ...prev.entries[entryId],
          imageUnlocked: true,
          soundQuestCompletedAt: Date.now(),
        },
      },
      lastActivityDate: new Date().toISOString().split('T')[0],
    }));
  }, []);

  // Fully unlock entry (after Reading Quest)
  const unlockFully = useCallback((entryId: string) => {
    setProgress(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
        [entryId]: {
          ...prev.entries[entryId],
          fullyUnlocked: true,
          readingQuestCompletedAt: Date.now(),
        },
      },
      readingProgress: {
        ...prev.readingProgress,
        entriesCompleted: [...prev.readingProgress.entriesCompleted, entryId],
      },
      lastActivityDate: new Date().toISOString().split('T')[0],
    }));
  }, []);

  // Start Sound Quest for an entry
  const startSoundQuest = useCallback((entry: FieldGuideEntry) => {
    setSelectedEntry(entry);
    setSoundQuestSession({
      entry,
      currentWordIndex: 0,
      phase: 'intro',
      attempts: [],
      wordsCompleted: 0,
    });
    setView('sound-quest');
  }, []);

  // Start Reading Quest for an entry
  const startReadingQuest = useCallback((entry: FieldGuideEntry) => {
    setSelectedEntry(entry);
    setReadingQuestSession({
      entry,
      phase: 'reading',
      currentQuestionIndex: 0,
      questionAttempts: [],
      retellCompleted: false,
    });
    setView('reading-quest');
  }, []);

  // View entry details
  const viewEntry = useCallback((entry: FieldGuideEntry) => {
    setSelectedEntry(entry);
    setView('entry-detail');
  }, []);

  // Go back to collection
  const goToCollection = useCallback(() => {
    setView('collection');
    setSelectedEntry(null);
    setSoundQuestSession(null);
    setReadingQuestSession(null);
  }, []);

  // Calculate stats
  const stats = {
    total: fieldGuideEntries.length,
    imagesUnlocked: Object.values(progress.entries).filter(e => e.imageUnlocked).length,
    fullyUnlocked: Object.values(progress.entries).filter(e => e.fullyUnlocked).length,
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1
            className="text-3xl font-bold cursor-pointer flex items-center gap-2"
            onClick={goToCollection}
          >
            <span className="text-2xl">📖</span>
            Hyrule Field Guide
          </h1>
          <button
            onClick={onBack}
            className="text-sm bg-emerald-700 hover:bg-emerald-800 px-3 py-1 rounded"
          >
            Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {view === 'collection' && (
          <CollectionView
            entries={fieldGuideEntries}
            progress={progress}
            stats={stats}
            onStartSoundQuest={startSoundQuest}
            onStartReadingQuest={startReadingQuest}
            onViewEntry={viewEntry}
          />
        )}

        {view === 'entry-detail' && selectedEntry && (
          <EntryDetailView
            entry={selectedEntry}
            unlockState={progress.entries[selectedEntry.id]}
            onBack={goToCollection}
            onStartSoundQuest={() => startSoundQuest(selectedEntry)}
            onStartReadingQuest={() => startReadingQuest(selectedEntry)}
          />
        )}

        {view === 'sound-quest' && soundQuestSession && (
          <SoundQuest
            entry={soundQuestSession.entry}
            onComplete={(attempts: PhonemeAttempt[]) => {
              // Record phoneme progress
              setProgress(prev => ({
                ...prev,
                phonemeProgress: {
                  totalAttempts: prev.phonemeProgress.totalAttempts + attempts.length,
                  correctAttempts: prev.phonemeProgress.correctAttempts + attempts.filter(a => a.correct).length,
                  wordAttempts: {
                    ...prev.phonemeProgress.wordAttempts,
                    ...attempts.reduce((acc, a) => ({
                      ...acc,
                      [a.word]: [...(prev.phonemeProgress.wordAttempts[a.word] || []), a],
                    }), {}),
                  },
                },
              }));
              // Unlock the image
              unlockImage(soundQuestSession.entry.id);
              goToCollection();
            }}
            onBack={goToCollection}
          />
        )}

        {view === 'reading-quest' && readingQuestSession && (
          <ReadingQuest
            entry={readingQuestSession.entry}
            onComplete={(questionAttempts) => {
              // Record reading progress
              setProgress(prev => ({
                ...prev,
                readingProgress: {
                  totalQuestions: prev.readingProgress.totalQuestions + questionAttempts.length,
                  correctAnswers: prev.readingProgress.correctAnswers + questionAttempts.filter(a => a.isCorrect).length,
                  entriesCompleted: [...prev.readingProgress.entriesCompleted, readingQuestSession.entry.id],
                },
              }));
              // Fully unlock the entry
              unlockFully(readingQuestSession.entry.id);
              goToCollection();
            }}
            onBack={goToCollection}
          />
        )}
      </main>
    </div>
  );
}

export { loadProgress as loadFieldGuideProgress, saveProgress as saveFieldGuideProgress };
