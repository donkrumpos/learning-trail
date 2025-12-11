/**
 * Hyrule Field Guide Type Definitions
 *
 * A collectible bestiary/encyclopedia system where children unlock entries
 * by completing phoneme (Sound Quest) and reading (Reading Quest) activities.
 */

// ============================================================================
// PHONEME TYPES
// ============================================================================

/**
 * A word broken down into its phonemes (sounds, not letters)
 * Example: "chest" → phonemes: ['ch', 'e', 's', 't'] (4 sounds)
 */
export interface PhonemeWord {
  word: string;
  phonemes: string[];      // Individual sounds: ['ch', 'e', 's', 't']
  audioHint?: string;      // Optional pronunciation guide
}

/**
 * Result of a single phoneme activity attempt
 */
export interface PhonemeAttempt {
  word: string;
  expectedCount: number;
  givenCount: number;
  correct: boolean;
  timestamp: number;
}

// ============================================================================
// COMPREHENSION TYPES (reusing patterns from reading module)
// ============================================================================

export type FieldGuideQuestionType = 'literal' | 'inference' | 'vocabulary';

export interface FieldGuideAnswerChoice {
  id: string;
  text: string;
  icon?: string;
  isCorrect: boolean;
}

export interface FieldGuideQuestion {
  id: string;
  type: FieldGuideQuestionType;
  text: string;
  choices: FieldGuideAnswerChoice[];
  feedback: {
    correct: string;
    incorrect: string;
  };
}

// ============================================================================
// RETELL TYPES
// ============================================================================

export type FieldGuideRetellCategory = 'what' | 'where' | 'does';

export interface FieldGuideRetellElement {
  id: string;
  category: FieldGuideRetellCategory;
  text: string;
  icon?: string;
}

// ============================================================================
// FIELD GUIDE ENTRY
// ============================================================================

export type EntryCategory = 'creature' | 'item' | 'character' | 'place';

/**
 * A single Field Guide entry (creature, item, character, or place)
 */
export interface FieldGuideEntry {
  id: string;
  name: string;                           // Display name: "Moblin"
  category: EntryCategory;
  imageUrl: string;                       // Path to image: "/images/field-guide/moblin.png"

  // Phoneme activity content (Sound Quest)
  phonemeWords: PhonemeWord[];            // 3-4 words for sound counting

  // Reading content (Reading Quest)
  passage: string;                        // 3-5 sentence kid-level description
  vocabulary: string[];                   // Key words to highlight
  retellElements?: FieldGuideRetellElement[];
  comprehensionQuestions: FieldGuideQuestion[];
}

// ============================================================================
// PROGRESS & UNLOCK STATE
// ============================================================================

/**
 * Unlock state for a single entry
 */
export interface EntryUnlockState {
  entryId: string;
  imageUnlocked: boolean;                 // Unlocked by completing Sound Quest
  fullyUnlocked: boolean;                 // Unlocked by completing Reading Quest
  soundQuestCompletedAt?: number;         // Timestamp
  readingQuestCompletedAt?: number;       // Timestamp
}

/**
 * Detailed progress for phoneme activities
 */
export interface PhonemeProgress {
  totalAttempts: number;
  correctAttempts: number;
  wordAttempts: Record<string, PhonemeAttempt[]>;  // By word
}

/**
 * Detailed progress for reading activities
 */
export interface ReadingProgress {
  totalQuestions: number;
  correctAnswers: number;
  entriesCompleted: string[];             // Entry IDs
}

/**
 * Overall Field Guide progress stored in localStorage
 */
export interface FieldGuideProgress {
  entries: Record<string, EntryUnlockState>;  // By entry ID
  phonemeProgress: PhonemeProgress;
  readingProgress: ReadingProgress;
  lastActivityDate: string;               // ISO date
}

// ============================================================================
// ACTIVITY SESSION STATE
// ============================================================================

export type SoundQuestPhase = 'intro' | 'counting' | 'elkonin' | 'complete';

export interface SoundQuestSession {
  entry: FieldGuideEntry;
  currentWordIndex: number;
  phase: SoundQuestPhase;
  attempts: PhonemeAttempt[];
  wordsCompleted: number;
}

export type ReadingQuestPhase = 'reading' | 'retell' | 'questions' | 'complete';

export interface ReadingQuestSession {
  entry: FieldGuideEntry;
  phase: ReadingQuestPhase;
  currentQuestionIndex: number;
  questionAttempts: {
    questionId: string;
    answerId: string;
    isCorrect: boolean;
    timestamp: number;
  }[];
  retellCompleted: boolean;
}

// ============================================================================
// VIEW TYPES
// ============================================================================

export type FieldGuideView =
  | 'collection'          // Browse all entries
  | 'entry-detail'        // View a single unlocked entry
  | 'sound-quest'         // Phoneme activity
  | 'reading-quest';      // Reading comprehension activity
