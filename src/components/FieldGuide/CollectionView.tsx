import type { FieldGuideEntry, FieldGuideProgress } from '../../types/fieldGuide';

interface CollectionViewProps {
  entries: FieldGuideEntry[];
  progress: FieldGuideProgress;
  stats: {
    total: number;
    imagesUnlocked: number;
    fullyUnlocked: number;
  };
  onStartSoundQuest: (entry: FieldGuideEntry) => void;
  onStartReadingQuest: (entry: FieldGuideEntry) => void;
  onViewEntry: (entry: FieldGuideEntry) => void;
}

export function CollectionView({
  entries,
  progress,
  stats,
  onStartSoundQuest,
  onStartReadingQuest,
  onViewEntry,
}: CollectionViewProps) {
  // Group entries by category
  const creatures = entries.filter(e => e.category === 'creature');
  const items = entries.filter(e => e.category === 'item');
  const characters = entries.filter(e => e.category === 'character');
  const places = entries.filter(e => e.category === 'place');

  return (
    <div>
      {/* Progress Banner */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800">Your Collection</h2>
            <p className="text-gray-600">
              {stats.fullyUnlocked} of {stats.total} entries discovered
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">{stats.imagesUnlocked}</div>
              <div className="text-xs text-gray-500">Images</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{stats.fullyUnlocked}</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 transition-all duration-500"
            style={{ width: `${(stats.fullyUnlocked / stats.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Sections */}
      {creatures.length > 0 && (
        <CategorySection
          title="Creatures"
          icon="👹"
          entries={creatures}
          progress={progress}
          onStartSoundQuest={onStartSoundQuest}
          onStartReadingQuest={onStartReadingQuest}
          onViewEntry={onViewEntry}
        />
      )}

      {items.length > 0 && (
        <CategorySection
          title="Items"
          icon="🎁"
          entries={items}
          progress={progress}
          onStartSoundQuest={onStartSoundQuest}
          onStartReadingQuest={onStartReadingQuest}
          onViewEntry={onViewEntry}
        />
      )}

      {characters.length > 0 && (
        <CategorySection
          title="Characters"
          icon="🦸"
          entries={characters}
          progress={progress}
          onStartSoundQuest={onStartSoundQuest}
          onStartReadingQuest={onStartReadingQuest}
          onViewEntry={onViewEntry}
        />
      )}

      {places.length > 0 && (
        <CategorySection
          title="Places"
          icon="🗺️"
          entries={places}
          progress={progress}
          onStartSoundQuest={onStartSoundQuest}
          onStartReadingQuest={onStartReadingQuest}
          onViewEntry={onViewEntry}
        />
      )}
    </div>
  );
}

// ============================================================================
// CATEGORY SECTION
// ============================================================================

interface CategorySectionProps {
  title: string;
  icon: string;
  entries: FieldGuideEntry[];
  progress: FieldGuideProgress;
  onStartSoundQuest: (entry: FieldGuideEntry) => void;
  onStartReadingQuest: (entry: FieldGuideEntry) => void;
  onViewEntry: (entry: FieldGuideEntry) => void;
}

function CategorySection({
  title,
  icon,
  entries,
  progress,
  onStartSoundQuest,
  onStartReadingQuest,
  onViewEntry,
}: CategorySectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {entries.map(entry => (
          <EntryCard
            key={entry.id}
            entry={entry}
            unlockState={progress.entries[entry.id]}
            onStartSoundQuest={() => onStartSoundQuest(entry)}
            onStartReadingQuest={() => onStartReadingQuest(entry)}
            onViewEntry={() => onViewEntry(entry)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// ENTRY CARD
// ============================================================================

interface EntryCardProps {
  entry: FieldGuideEntry;
  unlockState: {
    imageUnlocked: boolean;
    fullyUnlocked: boolean;
  };
  onStartSoundQuest: () => void;
  onStartReadingQuest: () => void;
  onViewEntry: () => void;
}

function EntryCard({
  entry,
  unlockState,
  onStartSoundQuest,
  onStartReadingQuest,
  onViewEntry,
}: EntryCardProps) {
  const { imageUnlocked, fullyUnlocked } = unlockState;

  // Determine what action is available
  const canStartSoundQuest = !imageUnlocked;
  const canStartReadingQuest = imageUnlocked && !fullyUnlocked;
  const canViewEntry = fullyUnlocked;

  const handleClick = () => {
    if (canViewEntry) {
      onViewEntry();
    } else if (canStartReadingQuest) {
      onStartReadingQuest();
    } else {
      onStartSoundQuest();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer
        transition-all duration-200 hover:shadow-lg hover:scale-105
        ${fullyUnlocked ? 'ring-2 ring-emerald-400' : ''}
      `}
    >
      {/* Image Area */}
      <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {imageUnlocked ? (
          <img
            src={entry.imageUrl}
            alt={entry.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              // Show placeholder on error
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `
                <div class="text-6xl opacity-50">${getCategoryEmoji(entry.category)}</div>
              `;
            }}
          />
        ) : (
          // Silhouette / locked state
          <div className="relative">
            <div className="text-6xl opacity-20 blur-sm">
              {getCategoryEmoji(entry.category)}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">❓</span>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          {fullyUnlocked ? (
            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
              ✓ Complete
            </span>
          ) : imageUnlocked ? (
            <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
              📖 Read
            </span>
          ) : (
            <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
              🔒 Locked
            </span>
          )}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-3">
        <h4 className="font-bold text-gray-800 text-center">
          {imageUnlocked ? entry.name : '???'}
        </h4>

        {/* Action hint */}
        <p className="text-xs text-center text-gray-500 mt-1">
          {canStartSoundQuest && 'Tap to start Sound Quest'}
          {canStartReadingQuest && 'Tap to start Reading Quest'}
          {canViewEntry && 'Tap to view entry'}
        </p>
      </div>

      {/* Quest Progress Indicators */}
      <div className="flex justify-center gap-2 pb-3">
        <div
          className={`w-3 h-3 rounded-full ${
            imageUnlocked ? 'bg-amber-400' : 'bg-gray-300'
          }`}
          title="Sound Quest"
        />
        <div
          className={`w-3 h-3 rounded-full ${
            fullyUnlocked ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
          title="Reading Quest"
        />
      </div>
    </div>
  );
}

// ============================================================================
// HELPERS
// ============================================================================

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
