import type { FieldGuideEntry } from '../types/fieldGuide';

/**
 * Hyrule Field Guide Starter Entries
 *
 * PHONEME NOTES:
 * - Phonemes are SOUNDS, not letters
 * - "chest" = /ch/ /e/ /s/ /t/ (4 sounds, not 5 letters)
 * - "shield" = /sh/ /ee/ /l/ /d/ (4 sounds)
 * - Digraphs (ch, sh, th, etc.) count as ONE sound
 *
 * PASSAGE NOTES:
 * - 3-5 simple sentences
 * - Decodable vocabulary where possible
 * - Kid-friendly, exciting descriptions
 */

export const fieldGuideEntries: FieldGuideEntry[] = [
  // ========================================================================
  // CREATURES
  // ========================================================================
  {
    id: 'moblin',
    name: 'Moblin',
    category: 'creature',
    imageUrl: '/images/field-guide/moblin.png',

    phonemeWords: [
      { word: 'pig', phonemes: ['p', 'i', 'g'] },                    // 3 sounds
      { word: 'club', phonemes: ['c', 'l', 'u', 'b'] },              // 4 sounds
      { word: 'fight', phonemes: ['f', 'igh', 't'] },                // 3 sounds
      { word: 'forest', phonemes: ['f', 'or', 'e', 's', 't'] },      // 5 sounds
    ],

    passage: 'A Moblin is a monster. It looks like a big pig. Moblins carry clubs. They like to fight. You can find them in the forest. Watch out!',

    vocabulary: ['monster', 'Moblin', 'club', 'forest'],

    retellElements: [
      { id: 'mob-what', category: 'what', text: 'A pig monster', icon: '🐷' },
      { id: 'mob-where', category: 'where', text: 'In the forest', icon: '🌲' },
      { id: 'mob-does', category: 'does', text: 'Fights with a club', icon: '🪵' },
    ],

    comprehensionQuestions: [
      {
        id: 'moblin-q1',
        type: 'literal',
        text: 'What does a Moblin look like?',
        choices: [
          { id: 'a', text: 'A big pig', icon: '🐷', isCorrect: true },
          { id: 'b', text: 'A small bird', icon: '🐦', isCorrect: false },
          { id: 'c', text: 'A fish', icon: '🐟', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! A Moblin looks like a big pig!',
          incorrect: 'Look at the second sentence. What does it look like?',
        },
      },
      {
        id: 'moblin-q2',
        type: 'literal',
        text: 'What do Moblins carry?',
        choices: [
          { id: 'a', text: 'Clubs', icon: '🪵', isCorrect: true },
          { id: 'b', text: 'Shields', icon: '🛡️', isCorrect: false },
          { id: 'c', text: 'Books', icon: '📚', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Moblins carry clubs!',
          incorrect: 'Read again. What do they carry?',
        },
      },
      {
        id: 'moblin-q3',
        type: 'vocabulary',
        text: 'What is a "club"?',
        choices: [
          { id: 'a', text: 'A big stick to hit with', icon: '🪵', isCorrect: true },
          { id: 'b', text: 'A type of food', icon: '🍖', isCorrect: false },
          { id: 'c', text: 'A place to play', icon: '🏠', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! A club is a big stick used to hit things!',
          incorrect: 'A club is something Moblins use to fight.',
        },
      },
      {
        id: 'moblin-q4',
        type: 'inference',
        text: 'Why should you watch out for Moblins?',
        choices: [
          { id: 'a', text: 'They might try to fight you', icon: '⚔️', isCorrect: true },
          { id: 'b', text: 'They are very loud', icon: '📢', isCorrect: false },
          { id: 'c', text: 'They smell bad', icon: '👃', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! Moblins like to fight, so be careful!',
          incorrect: 'Think about what Moblins like to do.',
        },
      },
    ],
  },

  {
    id: 'keese',
    name: 'Keese',
    category: 'creature',
    imageUrl: '/images/field-guide/keese.png',

    phonemeWords: [
      { word: 'bat', phonemes: ['b', 'a', 't'] },                    // 3 sounds
      { word: 'cave', phonemes: ['c', 'a', 'v'] },                   // 3 sounds (silent e)
      { word: 'dark', phonemes: ['d', 'ar', 'k'] },                  // 3 sounds
      { word: 'wing', phonemes: ['w', 'i', 'ng'] },                  // 3 sounds
    ],

    passage: 'A Keese is a bat. It lives in caves and dark places. Keese have big wings. They fly at Link to hurt him. Swing your sword to stop them!',

    vocabulary: ['Keese', 'cave', 'wing', 'sword'],

    retellElements: [
      { id: 'keese-what', category: 'what', text: 'A bat monster', icon: '🦇' },
      { id: 'keese-where', category: 'where', text: 'In caves and dark places', icon: '🕳️' },
      { id: 'keese-does', category: 'does', text: 'Flies at you to hurt you', icon: '💨' },
    ],

    comprehensionQuestions: [
      {
        id: 'keese-q1',
        type: 'literal',
        text: 'What kind of animal is a Keese?',
        choices: [
          { id: 'a', text: 'A bat', icon: '🦇', isCorrect: true },
          { id: 'b', text: 'A bird', icon: '🐦', isCorrect: false },
          { id: 'c', text: 'A bug', icon: '🐛', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! A Keese is a bat!',
          incorrect: 'The first sentence tells us what a Keese is.',
        },
      },
      {
        id: 'keese-q2',
        type: 'literal',
        text: 'Where do Keese live?',
        choices: [
          { id: 'a', text: 'In caves and dark places', icon: '🕳️', isCorrect: true },
          { id: 'b', text: 'In trees', icon: '🌳', isCorrect: false },
          { id: 'c', text: 'In water', icon: '💧', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! They live in caves and dark places!',
          incorrect: 'Where does the passage say Keese live?',
        },
      },
      {
        id: 'keese-q3',
        type: 'literal',
        text: 'How can you stop a Keese?',
        choices: [
          { id: 'a', text: 'Swing your sword', icon: '⚔️', isCorrect: true },
          { id: 'b', text: 'Run away', icon: '🏃', isCorrect: false },
          { id: 'c', text: 'Throw food at it', icon: '🍎', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Swing your sword to stop them!',
          incorrect: 'Look at the last sentence for the answer.',
        },
      },
      {
        id: 'keese-q4',
        type: 'inference',
        text: 'Why do Keese live in dark places?',
        choices: [
          { id: 'a', text: 'Bats like the dark', icon: '🌙', isCorrect: true },
          { id: 'b', text: 'It\'s warmer there', icon: '🔥', isCorrect: false },
          { id: 'c', text: 'There\'s more food', icon: '🍖', isCorrect: false },
        ],
        feedback: {
          correct: 'Great thinking! Bats are animals that like dark places!',
          incorrect: 'Think about what real bats like.',
        },
      },
    ],
  },

  {
    id: 'fairy',
    name: 'Fairy',
    category: 'creature',
    imageUrl: '/images/field-guide/fairy.png',

    phonemeWords: [
      { word: 'glow', phonemes: ['g', 'l', 'ow'] },                  // 3 sounds
      { word: 'heal', phonemes: ['h', 'ea', 'l'] },                  // 3 sounds
      { word: 'wish', phonemes: ['w', 'i', 'sh'] },                  // 3 sounds
      { word: 'pink', phonemes: ['p', 'i', 'n', 'k'] },              // 4 sounds
    ],

    passage: 'A Fairy is a tiny friend. It glows pink. If Link is hurt, a Fairy can heal him. You can catch a Fairy in a jar. Let it out when you need help!',

    vocabulary: ['Fairy', 'glow', 'heal', 'jar'],

    retellElements: [
      { id: 'fairy-what', category: 'what', text: 'A tiny glowing friend', icon: '✨' },
      { id: 'fairy-where', category: 'where', text: 'Caught in a jar', icon: '🫙' },
      { id: 'fairy-does', category: 'does', text: 'Heals Link when hurt', icon: '💖' },
    ],

    comprehensionQuestions: [
      {
        id: 'fairy-q1',
        type: 'literal',
        text: 'What color does a Fairy glow?',
        choices: [
          { id: 'a', text: 'Pink', icon: '💗', isCorrect: true },
          { id: 'b', text: 'Blue', icon: '💙', isCorrect: false },
          { id: 'c', text: 'Green', icon: '💚', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Fairies glow pink!',
          incorrect: 'Look at the second sentence.',
        },
      },
      {
        id: 'fairy-q2',
        type: 'literal',
        text: 'What can a Fairy do for Link?',
        choices: [
          { id: 'a', text: 'Heal him', icon: '💖', isCorrect: true },
          { id: 'b', text: 'Give him money', icon: '💰', isCorrect: false },
          { id: 'c', text: 'Make him fly', icon: '🦋', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! A Fairy can heal Link!',
          incorrect: 'What does a Fairy do when Link is hurt?',
        },
      },
      {
        id: 'fairy-q3',
        type: 'vocabulary',
        text: 'What does "heal" mean?',
        choices: [
          { id: 'a', text: 'Make better when hurt', icon: '🩹', isCorrect: true },
          { id: 'b', text: 'Make bigger', icon: '📏', isCorrect: false },
          { id: 'c', text: 'Make faster', icon: '💨', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Heal means to make someone better when they\'re hurt!',
          incorrect: 'Think about what happens when Link is hurt.',
        },
      },
      {
        id: 'fairy-q4',
        type: 'inference',
        text: 'Why would you keep a Fairy in a jar?',
        choices: [
          { id: 'a', text: 'To save it for when you need help', icon: '🫙', isCorrect: true },
          { id: 'b', text: 'Because it\'s pretty', icon: '🌸', isCorrect: false },
          { id: 'c', text: 'To sell it', icon: '💰', isCorrect: false },
        ],
        feedback: {
          correct: 'Great thinking! You save the Fairy for when you need healing!',
          incorrect: 'The last sentence gives a hint about this.',
        },
      },
    ],
  },

  {
    id: 'octorok',
    name: 'Octorok',
    category: 'creature',
    imageUrl: '/images/field-guide/octorok.png',

    phonemeWords: [
      { word: 'rock', phonemes: ['r', 'o', 'ck'] },                  // 3 sounds
      { word: 'spit', phonemes: ['s', 'p', 'i', 't'] },              // 4 sounds
      { word: 'hide', phonemes: ['h', 'ī', 'd'] },                   // 3 sounds
      { word: 'red', phonemes: ['r', 'e', 'd'] },                    // 3 sounds
    ],

    passage: 'An Octorok is a small monster. It is red or blue. Octoroks spit rocks at Link. They can hide in the grass. Use your shield to block the rocks!',

    vocabulary: ['Octorok', 'spit', 'shield', 'block'],

    retellElements: [
      { id: 'octo-what', category: 'what', text: 'A small rock-spitting monster', icon: '🐙' },
      { id: 'octo-where', category: 'where', text: 'Hiding in grass', icon: '🌿' },
      { id: 'octo-does', category: 'does', text: 'Spits rocks at Link', icon: '🪨' },
    ],

    comprehensionQuestions: [
      {
        id: 'octorok-q1',
        type: 'literal',
        text: 'What color can an Octorok be?',
        choices: [
          { id: 'a', text: 'Red or blue', icon: '🔴', isCorrect: true },
          { id: 'b', text: 'Green or yellow', icon: '🟢', isCorrect: false },
          { id: 'c', text: 'Black or white', icon: '⚫', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Octoroks can be red or blue!',
          incorrect: 'The second sentence tells us the colors.',
        },
      },
      {
        id: 'octorok-q2',
        type: 'literal',
        text: 'What do Octoroks spit?',
        choices: [
          { id: 'a', text: 'Rocks', icon: '🪨', isCorrect: true },
          { id: 'b', text: 'Water', icon: '💧', isCorrect: false },
          { id: 'c', text: 'Fire', icon: '🔥', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Octoroks spit rocks!',
          incorrect: 'What does the third sentence say they spit?',
        },
      },
      {
        id: 'octorok-q3',
        type: 'vocabulary',
        text: 'What does "block" mean?',
        choices: [
          { id: 'a', text: 'Stop something from hitting you', icon: '🛡️', isCorrect: true },
          { id: 'b', text: 'Run away fast', icon: '🏃', isCorrect: false },
          { id: 'c', text: 'Jump over', icon: '🦘', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Block means to stop something from hitting you!',
          incorrect: 'Think about what a shield does.',
        },
      },
      {
        id: 'octorok-q4',
        type: 'inference',
        text: 'Why do Octoroks hide in the grass?',
        choices: [
          { id: 'a', text: 'To surprise Link', icon: '😮', isCorrect: true },
          { id: 'b', text: 'To sleep', icon: '😴', isCorrect: false },
          { id: 'c', text: 'To eat', icon: '🍽️', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! They hide to surprise Link and attack!',
          incorrect: 'Think about why a monster would want to hide.',
        },
      },
    ],
  },

  {
    id: 'tektite',
    name: 'Tektite',
    category: 'creature',
    imageUrl: '/images/field-guide/tektite.png',

    phonemeWords: [
      { word: 'jump', phonemes: ['j', 'u', 'm', 'p'] },              // 4 sounds
      { word: 'leg', phonemes: ['l', 'e', 'g'] },                    // 3 sounds
      { word: 'lake', phonemes: ['l', 'ā', 'k'] },                   // 3 sounds
      { word: 'fast', phonemes: ['f', 'a', 's', 't'] },              // 4 sounds
    ],

    passage: 'A Tektite is a jumping bug. It has four long legs. Tektites hop around very fast. Some live near water. They are hard to hit because they jump so much!',

    vocabulary: ['Tektite', 'hop', 'legs', 'hard'],

    retellElements: [
      { id: 'tek-what', category: 'what', text: 'A jumping bug monster', icon: '🦗' },
      { id: 'tek-where', category: 'where', text: 'Near water and lakes', icon: '🌊' },
      { id: 'tek-does', category: 'does', text: 'Hops around very fast', icon: '💨' },
    ],

    comprehensionQuestions: [
      {
        id: 'tektite-q1',
        type: 'literal',
        text: 'How many legs does a Tektite have?',
        choices: [
          { id: 'a', text: 'Four', icon: '4️⃣', isCorrect: true },
          { id: 'b', text: 'Two', icon: '2️⃣', isCorrect: false },
          { id: 'c', text: 'Eight', icon: '8️⃣', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Tektites have four long legs!',
          incorrect: 'The second sentence tells us how many legs.',
        },
      },
      {
        id: 'tektite-q2',
        type: 'literal',
        text: 'How do Tektites move?',
        choices: [
          { id: 'a', text: 'They hop', icon: '🦘', isCorrect: true },
          { id: 'b', text: 'They fly', icon: '🦋', isCorrect: false },
          { id: 'c', text: 'They swim', icon: '🏊', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Tektites hop around!',
          incorrect: 'What does the third sentence say they do?',
        },
      },
      {
        id: 'tektite-q3',
        type: 'vocabulary',
        text: 'What does "hop" mean?',
        choices: [
          { id: 'a', text: 'Jump from place to place', icon: '🐸', isCorrect: true },
          { id: 'b', text: 'Walk slowly', icon: '🚶', isCorrect: false },
          { id: 'c', text: 'Roll on the ground', icon: '⚽', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Hop means to jump from place to place!',
          incorrect: 'Think about how a frog or rabbit moves.',
        },
      },
      {
        id: 'tektite-q4',
        type: 'inference',
        text: 'Why are Tektites hard to hit?',
        choices: [
          { id: 'a', text: 'They jump and move too fast', icon: '💨', isCorrect: true },
          { id: 'b', text: 'They are too small', icon: '🔍', isCorrect: false },
          { id: 'c', text: 'They are invisible', icon: '👻', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! They jump so much it\'s hard to hit them!',
          incorrect: 'The last sentence gives us a hint.',
        },
      },
    ],
  },

  // ========================================================================
  // ITEMS
  // ========================================================================
  {
    id: 'map',
    name: 'Map',
    category: 'item',
    imageUrl: '/images/field-guide/map.png',

    phonemeWords: [
      { word: 'find', phonemes: ['f', 'ī', 'n', 'd'] },              // 4 sounds
      { word: 'lost', phonemes: ['l', 'o', 's', 't'] },              // 4 sounds
      { word: 'path', phonemes: ['p', 'a', 'th'] },                  // 3 sounds
      { word: 'room', phonemes: ['r', 'oo', 'm'] },                  // 3 sounds
    ],

    passage: 'A Map helps Link find his way. Dungeons are dark and confusing. The Map shows every room. Look for the Map in a hidden spot. Now you will not get lost!',

    vocabulary: ['map', 'dungeon', 'room', 'hidden'],

    retellElements: [
      { id: 'map-what', category: 'what', text: 'Shows rooms in a dungeon', icon: '🗺️' },
      { id: 'map-where', category: 'where', text: 'Found in dungeons', icon: '🏰' },
      { id: 'map-does', category: 'does', text: 'Helps Link find his way', icon: '🧭' },
    ],

    comprehensionQuestions: [
      {
        id: 'map-q1',
        type: 'literal',
        text: 'What does a Map help Link do?',
        choices: [
          { id: 'a', text: 'Find his way', icon: '🧭', isCorrect: true },
          { id: 'b', text: 'Fight monsters', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'Open doors', icon: '🚪', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! A Map helps Link find his way!',
          incorrect: 'The first sentence tells us what a Map does.',
        },
      },
      {
        id: 'map-q2',
        type: 'literal',
        text: 'What does the Map show?',
        choices: [
          { id: 'a', text: 'Every room', icon: '🗺️', isCorrect: true },
          { id: 'b', text: 'Monsters', icon: '👹', isCorrect: false },
          { id: 'c', text: 'Treasure', icon: '💎', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The Map shows every room!',
          incorrect: 'What does the third sentence say the Map shows?',
        },
      },
      {
        id: 'map-q3',
        type: 'vocabulary',
        text: 'What does "hidden" mean?',
        choices: [
          { id: 'a', text: 'Hard to find', icon: '🔍', isCorrect: true },
          { id: 'b', text: 'Very big', icon: '📏', isCorrect: false },
          { id: 'c', text: 'Broken', icon: '💔', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Hidden means hard to find or secret!',
          incorrect: 'If something is hidden, can you see it easily?',
        },
      },
      {
        id: 'map-q4',
        type: 'inference',
        text: 'Why are dungeons confusing without a Map?',
        choices: [
          { id: 'a', text: 'There are many rooms that look the same', icon: '🏰', isCorrect: true },
          { id: 'b', text: 'They are too small', icon: '📦', isCorrect: false },
          { id: 'c', text: 'They have too much light', icon: '💡', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! Dungeons have many rooms and it\'s easy to get lost!',
          incorrect: 'Think about why you would need to see every room.',
        },
      },
    ],
  },

  {
    id: 'rupee',
    name: 'Rupee',
    category: 'item',
    imageUrl: '/images/field-guide/rupee.png',

    phonemeWords: [
      { word: 'gem', phonemes: ['g', 'e', 'm'] },                    // 3 sounds
      { word: 'green', phonemes: ['g', 'r', 'ee', 'n'] },            // 4 sounds
      { word: 'red', phonemes: ['r', 'e', 'd'] },                    // 3 sounds
      { word: 'shop', phonemes: ['sh', 'o', 'p'] },                  // 3 sounds
    ],

    passage: 'A Rupee is a gem. It is money in Hyrule. Green rupees are worth one. Red rupees are worth more. Link uses rupees to buy things at shops.',

    vocabulary: ['Rupee', 'gem', 'money', 'worth'],

    retellElements: [
      { id: 'rupee-what', category: 'what', text: 'A colorful gem', icon: '💎' },
      { id: 'rupee-where', category: 'where', text: 'Found all over Hyrule', icon: '🗺️' },
      { id: 'rupee-does', category: 'does', text: 'Used as money to buy things', icon: '🛒' },
    ],

    comprehensionQuestions: [
      {
        id: 'rupee-q1',
        type: 'literal',
        text: 'What is a Rupee?',
        choices: [
          { id: 'a', text: 'A gem', icon: '💎', isCorrect: true },
          { id: 'b', text: 'A sword', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'A food', icon: '🍎', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! A Rupee is a gem!',
          incorrect: 'The first sentence tells us what a Rupee is.',
        },
      },
      {
        id: 'rupee-q2',
        type: 'literal',
        text: 'What color rupee is worth the most?',
        choices: [
          { id: 'a', text: 'Red', icon: '🔴', isCorrect: true },
          { id: 'b', text: 'Green', icon: '🟢', isCorrect: false },
          { id: 'c', text: 'Blue', icon: '🔵', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Red rupees are worth more!',
          incorrect: 'Which color is worth more than green?',
        },
      },
      {
        id: 'rupee-q3',
        type: 'vocabulary',
        text: 'What does "worth" mean?',
        choices: [
          { id: 'a', text: 'How much something counts for', icon: '💰', isCorrect: true },
          { id: 'b', text: 'How big something is', icon: '📏', isCorrect: false },
          { id: 'c', text: 'How heavy something is', icon: '⚖️', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Worth means how much something counts for!',
          incorrect: 'Think about money and how much things cost.',
        },
      },
      {
        id: 'rupee-q4',
        type: 'inference',
        text: 'Where would Link use rupees?',
        choices: [
          { id: 'a', text: 'At shops to buy things', icon: '🏪', isCorrect: true },
          { id: 'b', text: 'To fight monsters', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'To open doors', icon: '🚪', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Link uses rupees at shops to buy things!',
          incorrect: 'The last sentence tells us how Link uses rupees.',
        },
      },
    ],
  },

  {
    id: 'sword',
    name: 'Sword',
    category: 'item',
    imageUrl: '/images/field-guide/sword.png',

    phonemeWords: [
      { word: 'blade', phonemes: ['b', 'l', 'ā', 'd'] },             // 4 sounds
      { word: 'cut', phonemes: ['c', 'u', 't'] },                    // 3 sounds
      { word: 'swing', phonemes: ['s', 'w', 'i', 'ng'] },            // 4 sounds
      { word: 'sharp', phonemes: ['sh', 'ar', 'p'] },                // 3 sounds
    ],

    passage: 'The Sword is Link\'s best weapon. It has a sharp blade. Link swings his sword to cut down enemies. Some swords shoot beams! The Master Sword is the strongest.',

    vocabulary: ['sword', 'blade', 'weapon', 'beam'],

    retellElements: [
      { id: 'sword-what', category: 'what', text: 'A sharp weapon', icon: '⚔️' },
      { id: 'sword-where', category: 'where', text: 'In Link\'s hand', icon: '✋' },
      { id: 'sword-does', category: 'does', text: 'Cuts down enemies', icon: '💥' },
    ],

    comprehensionQuestions: [
      {
        id: 'sword-q1',
        type: 'literal',
        text: 'What does Link use his sword for?',
        choices: [
          { id: 'a', text: 'To cut down enemies', icon: '⚔️', isCorrect: true },
          { id: 'b', text: 'To dig holes', icon: '🕳️', isCorrect: false },
          { id: 'c', text: 'To cook food', icon: '🍳', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Link swings his sword to cut down enemies!',
          incorrect: 'The third sentence tells us what Link does with his sword.',
        },
      },
      {
        id: 'sword-q2',
        type: 'literal',
        text: 'What is the strongest sword called?',
        choices: [
          { id: 'a', text: 'The Master Sword', icon: '🗡️', isCorrect: true },
          { id: 'b', text: 'The Big Sword', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'The Fire Sword', icon: '🔥', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The Master Sword is the strongest!',
          incorrect: 'The last sentence tells us the name.',
        },
      },
      {
        id: 'sword-q3',
        type: 'vocabulary',
        text: 'What does "sharp" mean?',
        choices: [
          { id: 'a', text: 'Has an edge that can cut', icon: '🔪', isCorrect: true },
          { id: 'b', text: 'Very heavy', icon: '🏋️', isCorrect: false },
          { id: 'c', text: 'Makes loud sounds', icon: '📢', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Sharp means it has an edge that can cut things!',
          incorrect: 'Think about what a blade needs to be to cut.',
        },
      },
      {
        id: 'sword-q4',
        type: 'inference',
        text: 'Why would Link want the Master Sword?',
        choices: [
          { id: 'a', text: 'It\'s the strongest so it helps him win', icon: '🏆', isCorrect: true },
          { id: 'b', text: 'It\'s the prettiest', icon: '✨', isCorrect: false },
          { id: 'c', text: 'It\'s the lightest', icon: '🪶', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! The strongest sword helps Link defeat tough enemies!',
          incorrect: 'Why would a hero want the strongest weapon?',
        },
      },
    ],
  },

  {
    id: 'bomb',
    name: 'Bomb',
    category: 'item',
    imageUrl: '/images/field-guide/bomb.png',

    phonemeWords: [
      { word: 'blast', phonemes: ['b', 'l', 'a', 's', 't'] },        // 5 sounds
      { word: 'boom', phonemes: ['b', 'oo', 'm'] },                  // 3 sounds
      { word: 'wall', phonemes: ['w', 'a', 'l'] },                   // 3 sounds
      { word: 'throw', phonemes: ['th', 'r', 'ow'] },                // 3 sounds
    ],

    passage: 'A Bomb goes boom! It can blast through walls. Link can throw bombs at enemies. Be careful! Bombs explode after a few seconds. Run away before it goes off!',

    vocabulary: ['bomb', 'blast', 'explode', 'throw'],

    retellElements: [
      { id: 'bomb-what', category: 'what', text: 'An exploding tool', icon: '💣' },
      { id: 'bomb-where', category: 'where', text: 'In Link\'s bag', icon: '🎒' },
      { id: 'bomb-does', category: 'does', text: 'Blasts through walls', icon: '💥' },
    ],

    comprehensionQuestions: [
      {
        id: 'bomb-q1',
        type: 'literal',
        text: 'What can a Bomb blast through?',
        choices: [
          { id: 'a', text: 'Walls', icon: '🧱', isCorrect: true },
          { id: 'b', text: 'Water', icon: '💧', isCorrect: false },
          { id: 'c', text: 'Air', icon: '💨', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Bombs can blast through walls!',
          incorrect: 'The second sentence tells us what bombs blast through.',
        },
      },
      {
        id: 'bomb-q2',
        type: 'literal',
        text: 'What should you do after throwing a bomb?',
        choices: [
          { id: 'a', text: 'Run away', icon: '🏃', isCorrect: true },
          { id: 'b', text: 'Stand still', icon: '🧍', isCorrect: false },
          { id: 'c', text: 'Pick it up', icon: '✋', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Run away before it explodes!',
          incorrect: 'The last sentence tells us what to do.',
        },
      },
      {
        id: 'bomb-q3',
        type: 'vocabulary',
        text: 'What does "explode" mean?',
        choices: [
          { id: 'a', text: 'Blow up with a big bang', icon: '💥', isCorrect: true },
          { id: 'b', text: 'Melt slowly', icon: '🫠', isCorrect: false },
          { id: 'c', text: 'Float away', icon: '🎈', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Explode means to blow up with a big bang!',
          incorrect: 'Think about what "boom" sounds like.',
        },
      },
      {
        id: 'bomb-q4',
        type: 'inference',
        text: 'Why would Link use a bomb on a wall?',
        choices: [
          { id: 'a', text: 'To make a new path or find secrets', icon: '🚪', isCorrect: true },
          { id: 'b', text: 'To paint it', icon: '🎨', isCorrect: false },
          { id: 'c', text: 'To climb it', icon: '🧗', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! Blasting walls can reveal hidden paths and secrets!',
          incorrect: 'If you blast through a wall, what happens?',
        },
      },
    ],
  },

  // ========================================================================
  // CHARACTERS
  // ========================================================================
  {
    id: 'link',
    name: 'Link',
    category: 'character',
    imageUrl: '/images/field-guide/link.png',

    phonemeWords: [
      { word: 'hero', phonemes: ['h', 'ear', 'o'] },                 // 3 sounds
      { word: 'sword', phonemes: ['s', 'or', 'd'] },                 // 3 sounds
      { word: 'shield', phonemes: ['sh', 'ee', 'l', 'd'] },          // 4 sounds
      { word: 'brave', phonemes: ['b', 'r', 'a', 'v'] },             // 4 sounds
    ],

    passage: 'Link is the hero. He is brave and kind. Link uses a sword and shield to fight. He saves Princess Zelda. He saves all of Hyrule!',

    vocabulary: ['hero', 'brave', 'sword', 'shield'],

    retellElements: [
      { id: 'link-what', category: 'what', text: 'The brave hero', icon: '🦸' },
      { id: 'link-where', category: 'where', text: 'All over Hyrule', icon: '🗺️' },
      { id: 'link-does', category: 'does', text: 'Saves Zelda and Hyrule', icon: '👑' },
    ],

    comprehensionQuestions: [
      {
        id: 'link-q1',
        type: 'literal',
        text: 'Who is Link?',
        choices: [
          { id: 'a', text: 'The hero', icon: '🦸', isCorrect: true },
          { id: 'b', text: 'A monster', icon: '👹', isCorrect: false },
          { id: 'c', text: 'A princess', icon: '👸', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Link is the hero!',
          incorrect: 'The first sentence tells us who Link is.',
        },
      },
      {
        id: 'link-q2',
        type: 'literal',
        text: 'What does Link use to fight?',
        choices: [
          { id: 'a', text: 'A sword and shield', icon: '⚔️', isCorrect: true },
          { id: 'b', text: 'A bow and arrow', icon: '🏹', isCorrect: false },
          { id: 'c', text: 'Magic spells', icon: '✨', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Link uses a sword and shield!',
          incorrect: 'What weapons does Link use?',
        },
      },
      {
        id: 'link-q3',
        type: 'vocabulary',
        text: 'What does "brave" mean?',
        choices: [
          { id: 'a', text: 'Not scared, even when things are hard', icon: '💪', isCorrect: true },
          { id: 'b', text: 'Very fast', icon: '💨', isCorrect: false },
          { id: 'c', text: 'Very smart', icon: '🧠', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Brave means not being scared even when things are hard!',
          incorrect: 'Think about what a hero needs to be.',
        },
      },
      {
        id: 'link-q4',
        type: 'literal',
        text: 'Who does Link save?',
        choices: [
          { id: 'a', text: 'Princess Zelda and all of Hyrule', icon: '👑', isCorrect: true },
          { id: 'b', text: 'Only himself', icon: '🧍', isCorrect: false },
          { id: 'c', text: 'The monsters', icon: '👹', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Link saves Princess Zelda and all of Hyrule!',
          incorrect: 'The last two sentences tell us who Link saves.',
        },
      },
    ],
  },

  {
    id: 'darknut',
    name: 'Darknut',
    category: 'creature',
    imageUrl: '/images/field-guide/darknut.png',

    phonemeWords: [
      { word: 'knight', phonemes: ['n', 'ī', 't'] },                 // 3 sounds (silent k)
      { word: 'armor', phonemes: ['ar', 'm', 'er'] },                // 3 sounds
      { word: 'strong', phonemes: ['s', 't', 'r', 'o', 'ng'] },      // 5 sounds
      { word: 'slow', phonemes: ['s', 'l', 'ow'] },                  // 3 sounds
    ],

    passage: 'A Darknut is a knight in armor. It is very strong. Darknuts carry big swords. They move slow but hit hard. Attack from behind to beat them!',

    vocabulary: ['Darknut', 'knight', 'armor', 'attack'],

    retellElements: [
      { id: 'dark-what', category: 'what', text: 'A knight in armor', icon: '🛡️' },
      { id: 'dark-where', category: 'where', text: 'In dungeons', icon: '🏰' },
      { id: 'dark-does', category: 'does', text: 'Swings a big sword', icon: '⚔️' },
    ],

    comprehensionQuestions: [
      {
        id: 'darknut-q1',
        type: 'literal',
        text: 'What does a Darknut wear?',
        choices: [
          { id: 'a', text: 'Armor', icon: '🛡️', isCorrect: true },
          { id: 'b', text: 'A cape', icon: '🧥', isCorrect: false },
          { id: 'c', text: 'Nothing', icon: '❌', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! A Darknut is a knight in armor!',
          incorrect: 'The first sentence tells us what it wears.',
        },
      },
      {
        id: 'darknut-q2',
        type: 'literal',
        text: 'How do Darknuts move?',
        choices: [
          { id: 'a', text: 'Slow', icon: '🐢', isCorrect: true },
          { id: 'b', text: 'Fast', icon: '💨', isCorrect: false },
          { id: 'c', text: 'They fly', icon: '🦅', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Darknuts move slow but hit hard!',
          incorrect: 'The fourth sentence tells us how they move.',
        },
      },
      {
        id: 'darknut-q3',
        type: 'vocabulary',
        text: 'What is "armor"?',
        choices: [
          { id: 'a', text: 'Metal clothes that protect you', icon: '🛡️', isCorrect: true },
          { id: 'b', text: 'A type of weapon', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'A kind of food', icon: '🍖', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Armor is metal clothes that protect you in battle!',
          incorrect: 'Think about what knights wear to stay safe.',
        },
      },
      {
        id: 'darknut-q4',
        type: 'inference',
        text: 'Why should you attack a Darknut from behind?',
        choices: [
          { id: 'a', text: 'The armor doesn\'t protect its back', icon: '🎯', isCorrect: true },
          { id: 'b', text: 'It can\'t hear you', icon: '👂', isCorrect: false },
          { id: 'c', text: 'It\'s sleeping', icon: '😴', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! The armor is weaker from behind!',
          incorrect: 'Think about where armor might not protect.',
        },
      },
    ],
  },

  {
    id: 'oldman',
    name: 'Old Man',
    category: 'character',
    imageUrl: '/images/field-guide/oldman.png',

    phonemeWords: [
      { word: 'cave', phonemes: ['k', 'ā', 'v'] },                   // 3 sounds
      { word: 'hint', phonemes: ['h', 'i', 'n', 't'] },              // 4 sounds
      { word: 'help', phonemes: ['h', 'e', 'l', 'p'] },              // 4 sounds
      { word: 'gift', phonemes: ['g', 'i', 'f', 't'] },              // 4 sounds
    ],

    passage: 'The Old Man lives in a cave. He gives Link his first sword. The Old Man shares wise hints. "It\'s dangerous to go alone!" he says. He helps Link start his quest.',

    vocabulary: ['cave', 'hint', 'dangerous', 'quest'],

    retellElements: [
      { id: 'old-what', category: 'what', text: 'A wise helper', icon: '🧙' },
      { id: 'old-where', category: 'where', text: 'In a cave', icon: '🕳️' },
      { id: 'old-does', category: 'does', text: 'Gives Link his first sword', icon: '⚔️' },
    ],

    comprehensionQuestions: [
      {
        id: 'oldman-q1',
        type: 'literal',
        text: 'Where does the Old Man live?',
        choices: [
          { id: 'a', text: 'In a cave', icon: '🕳️', isCorrect: true },
          { id: 'b', text: 'In a castle', icon: '🏰', isCorrect: false },
          { id: 'c', text: 'In a tree', icon: '🌳', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! The Old Man lives in a cave!',
          incorrect: 'The first sentence tells us where he lives.',
        },
      },
      {
        id: 'oldman-q2',
        type: 'literal',
        text: 'What does the Old Man give Link?',
        choices: [
          { id: 'a', text: 'His first sword', icon: '⚔️', isCorrect: true },
          { id: 'b', text: 'A map', icon: '🗺️', isCorrect: false },
          { id: 'c', text: 'Food', icon: '🍖', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The Old Man gives Link his first sword!',
          incorrect: 'The second sentence tells us what he gives.',
        },
      },
      {
        id: 'oldman-q3',
        type: 'vocabulary',
        text: 'What is a "hint"?',
        choices: [
          { id: 'a', text: 'A clue to help you figure something out', icon: '💡', isCorrect: true },
          { id: 'b', text: 'A type of weapon', icon: '⚔️', isCorrect: false },
          { id: 'c', text: 'A kind of monster', icon: '👹', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! A hint is a clue that helps you figure something out!',
          incorrect: 'Think about what helps you solve a puzzle.',
        },
      },
      {
        id: 'oldman-q4',
        type: 'inference',
        text: 'Why does the Old Man say "It\'s dangerous to go alone"?',
        choices: [
          { id: 'a', text: 'He wants Link to take the sword for protection', icon: '🛡️', isCorrect: true },
          { id: 'b', text: 'He wants to come with Link', icon: '🚶', isCorrect: false },
          { id: 'c', text: 'He is scared of Link', icon: '😨', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! The Old Man gives Link a sword so he can protect himself!',
          incorrect: 'Think about why someone would give you a weapon.',
        },
      },
    ],
  },
];

/**
 * Get all entries by category
 */
export function getEntriesByCategory(category: FieldGuideEntry['category']): FieldGuideEntry[] {
  return fieldGuideEntries.filter(entry => entry.category === category);
}

/**
 * Get a single entry by ID
 */
export function getEntryById(id: string): FieldGuideEntry | undefined {
  return fieldGuideEntries.find(entry => entry.id === id);
}
