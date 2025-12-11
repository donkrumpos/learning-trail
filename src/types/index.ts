/**
 * Core type definitions for the Reading Companion app
 */

// ============================================================================
// PASSAGE TYPES
// ============================================================================

/**
 * Type of passage content
 * - fiction: Story-based passages with characters and plot
 * - facts: Informational passages about the world (science, nature, etc.)
 */
export type PassageType = 'fiction' | 'facts';

/**
 * Reading level indicator
 * Can be used to filter/sort passages by difficulty
 */
export type ReadingLevel = 'emergent' | 'early' | 'developing';

/**
 * A reading passage shown to the child
 */
export interface Passage {
  id: string;
  title: string;
  text: string;
  type: PassageType;
  level: ReadingLevel;
  questions: Question[];
  retellElements?: RetellElement[]; // Optional: predefined story elements for retelling
}

// ============================================================================
// QUESTION TYPES
// ============================================================================

/**
 * Type of comprehension question
 * - literal: Direct recall from text ("Who found the shell?")
 * - inference: Reasoning beyond text ("Why do you think they were excited?")
 * - vocabulary: Word meaning in context ("What does 'shivered' mean?")
 */
export type QuestionType = 'literal' | 'inference' | 'vocabulary';

/**
 * Answer choice for multiple-choice questions
 */
export interface AnswerChoice {
  id: string;
  text: string;
  icon?: string; // Optional emoji or icon identifier
  isCorrect: boolean;
}

/**
 * A comprehension question
 */
export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  choices: AnswerChoice[];
  feedback: {
    correct: string;   // Shown when answer is correct
    incorrect: string; // Shown when answer is incorrect
  };
}

// ============================================================================
// RETELLING TYPES
// ============================================================================

/**
 * Category of story element for retelling
 */
export type RetellCategory = 'who' | 'where' | 'beginning' | 'middle' | 'end';

/**
 * An element that can be used in retelling the story
 */
export interface RetellElement {
  id: string;
  category: RetellCategory;
  text: string;
  icon?: string; // Emoji or icon identifier
}

// ============================================================================
// PROGRESS TRACKING TYPES
// ============================================================================

/**
 * Record of a single question answer
 */
export interface QuestionAttempt {
  questionId: string;
  answerId: string;
  isCorrect: boolean;
  timestamp: number;
}

/**
 * Record of completing a passage
 */
export interface PassageCompletion {
  passageId: string;
  completedAt: number; // Unix timestamp
  questionAttempts: QuestionAttempt[];
  retellCompleted: boolean;
  rereadCount: number; // How many times they reread the passage
}

/**
 * Overall progress data stored in localStorage
 */
export interface ProgressData {
  completions: PassageCompletion[];
  totalPassagesRead: number;
  lastReadDate: string; // ISO date string
}

// ============================================================================
// APP STATE TYPES
// ============================================================================

/**
 * Current view in the app
 */
export type AppView =
  | 'library'        // Choose a passage
  | 'reading'        // Read the passage
  | 'retell'         // Retell activity
  | 'questions'      // Answer comprehension questions
  | 'celebration'    // Success screen after completion
  | 'parent-login'   // Parent password gate
  | 'parent-panel';  // Parent management interface

/**
 * Reading session state
 */
export interface ReadingSession {
  passage: Passage;
  currentView: AppView;
  currentQuestionIndex: number;
  questionAttempts: QuestionAttempt[];
  retellCompleted: boolean;
  rereadCount: number;
}
