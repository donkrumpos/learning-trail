import type { FieldGuideEntry, EntryUnlockState } from '../../types/fieldGuide';

interface EntryDetailViewProps {
  entry: FieldGuideEntry;
  unlockState: EntryUnlockState;
  onBack: () => void;
  onStartSoundQuest: () => void;
  onStartReadingQuest: () => void;
}

export function EntryDetailView({
  entry,
  unlockState,
  onBack,
  onStartSoundQuest,
  onStartReadingQuest,
}: EntryDetailViewProps) {
  const { imageUnlocked, fullyUnlocked } = unlockState;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with image */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-amber-100 flex items-center justify-center">
        {imageUnlocked ? (
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="text-8xl">${getCategoryEmoji(entry.category)}</div>
              `;
            }}
          />
        ) : (
          <div className="text-center">
            <div className="text-8xl opacity-20 blur-sm">
              {getCategoryEmoji(entry.category)}
            </div>
            <p className="text-gray-500 mt-2">Complete Sound Quest to reveal!</p>
          </div>
        )}

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-800 px-3 py-1 rounded-lg shadow"
        >
          ← Back
        </button>

        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-lg shadow">
          <span className="capitalize text-sm font-medium text-gray-700">
            {entry.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {imageUnlocked ? entry.name : '???'}
        </h2>

        {/* Unlock status */}
        <div className="flex justify-center gap-4 mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            imageUnlocked ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <span>{imageUnlocked ? '✓' : '○'}</span>
            <span className="text-sm font-medium">Sound Quest</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            fullyUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
          }`}>
            <span>{fullyUnlocked ? '✓' : '○'}</span>
            <span className="text-sm font-medium">Reading Quest</span>
          </div>
        </div>

        {/* Entry content (only show if fully unlocked) */}
        {fullyUnlocked ? (
          <div className="space-y-6">
            {/* Passage */}
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-xl leading-relaxed text-gray-700">
                {entry.passage}
              </p>
            </div>

            {/* Vocabulary */}
            {entry.vocabulary.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Key Words:</h3>
                <div className="flex flex-wrap gap-2">
                  {entry.vocabulary.map(word => (
                    <span
                      key={word}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Re-read options */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={onStartSoundQuest}
                className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-bold py-2 px-4 rounded-lg"
              >
                🔊 Practice Sounds Again
              </button>
              <button
                onClick={onStartReadingQuest}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                📖 Read Again
              </button>
            </div>
          </div>
        ) : imageUnlocked ? (
          // Image unlocked but not fully unlocked
          <div className="text-center">
            <div className="bg-amber-50 rounded-lg p-6 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                You've discovered the image! Now complete the Reading Quest to unlock the full entry.
              </p>
              <div className="text-6xl mb-4">📖</div>
            </div>
            <button
              onClick={onStartReadingQuest}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
            >
              Start Reading Quest!
            </button>
          </div>
        ) : (
          // Fully locked
          <div className="text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-lg text-gray-600 mb-4">
                This entry is locked! Complete the Sound Quest to start discovering it.
              </p>
              <div className="text-6xl mb-4">🔒</div>
            </div>
            <button
              onClick={onStartSoundQuest}
              className="bg-amber-400 hover:bg-amber-500 text-gray-800 font-bold py-4 px-8 rounded-lg text-xl"
            >
              Start Sound Quest!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryEmoji(category: FieldGuideEntry['category']): string {
  switch (category) {
    case 'creature':
      return '👹';
    case 'item':
      return '📦';
    case 'character':
      return '🧝';
    case 'place':
      return '🏰';
    default:
      return '❓';
  }
}
