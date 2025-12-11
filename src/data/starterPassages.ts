import type { Passage } from '../types';

/**
 * Starter library of passages for early readers
 *
 * PEDAGOGICAL NOTES:
 * - Fiction passages focus on relatable experiences and simple narratives
 * - Fact passages introduce world knowledge (animals, nature, science)
 * - Text is kept to 2-5 sentences with simple sentence structures
 * - Questions progress from literal → vocabulary → inference
 * - Feedback is positive and reinforcing
 */

export const starterPassages: Passage[] = [
  // ========================================================================
  // FICTION PASSAGES
  // ========================================================================
  {
    id: 'beach-shell',
    title: 'The Beach Shell',
    text: 'Maya went to the beach with her dad. She looked in the sand and found a pretty pink shell. Maya held it up to her ear. She could hear the ocean inside!',
    type: 'fiction',
    level: 'emergent',
    questions: [
      {
        id: 'beach-shell-q1',
        type: 'literal',
        text: 'Who went to the beach?',
        choices: [
          { id: 'a', text: 'Maya and her dad', icon: '👧👨', isCorrect: true },
          { id: 'b', text: 'Maya and her mom', icon: '👧👩', isCorrect: false },
          { id: 'c', text: 'Just Maya', icon: '👧', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Maya went to the beach with her dad.',
          incorrect: 'Let\'s read again. Who did Maya go with?',
        },
      },
      {
        id: 'beach-shell-q2',
        type: 'literal',
        text: 'What color was the shell?',
        choices: [
          { id: 'a', text: 'Blue', icon: '💙', isCorrect: false },
          { id: 'b', text: 'Pink', icon: '💗', isCorrect: true },
          { id: 'c', text: 'Yellow', icon: '💛', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The shell was pink!',
          incorrect: 'Look at the story again. What color was the shell?',
        },
      },
      {
        id: 'beach-shell-q3',
        type: 'vocabulary',
        text: 'Maya "held it up to her ear." What does "held" mean?',
        choices: [
          { id: 'a', text: 'Put in her hand', icon: '✋', isCorrect: true },
          { id: 'b', text: 'Threw away', icon: '🗑️', isCorrect: false },
          { id: 'c', text: 'Buried in sand', icon: '⛱️', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Held means she put it in her hand.',
          incorrect: 'Think about what Maya did with the shell.',
        },
      },
      {
        id: 'beach-shell-q4',
        type: 'inference',
        text: 'How do you think Maya felt when she found the shell?',
        choices: [
          { id: 'a', text: 'Happy and excited', icon: '😊', isCorrect: true },
          { id: 'b', text: 'Sad', icon: '😢', isCorrect: false },
          { id: 'c', text: 'Scared', icon: '😨', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Finding a pretty shell would make her happy!',
          incorrect: 'Think about how you would feel finding something pretty!',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Maya and dad', icon: '👧👨' },
      { id: 're2', category: 'where', text: 'At the beach', icon: '🏖️' },
      { id: 're3', category: 'beginning', text: 'They went to the beach', icon: '🚗' },
      { id: 're4', category: 'middle', text: 'Maya found a pink shell', icon: '🐚' },
      { id: 're5', category: 'end', text: 'She heard the ocean in it', icon: '🌊' },
    ],
  },

  {
    id: 'rainy-day',
    title: 'Rainy Day Fun',
    text: 'It was raining outside. Ben could not go to the park. He felt sad. Then Mom helped him build a fort with blankets. They read books inside the cozy fort.',
    type: 'fiction',
    level: 'early',
    questions: [
      {
        id: 'rainy-q1',
        type: 'literal',
        text: 'Why couldn\'t Ben go to the park?',
        choices: [
          { id: 'a', text: 'It was raining', icon: '🌧️', isCorrect: true },
          { id: 'b', text: 'It was dark', icon: '🌙', isCorrect: false },
          { id: 'c', text: 'It was too hot', icon: '☀️', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! It was raining outside.',
          incorrect: 'Look at the beginning of the story. What was the weather?',
        },
      },
      {
        id: 'rainy-q2',
        type: 'literal',
        text: 'What did Ben and Mom build?',
        choices: [
          { id: 'a', text: 'A fort with blankets', icon: '🏕️', isCorrect: true },
          { id: 'b', text: 'A sandcastle', icon: '🏰', isCorrect: false },
          { id: 'c', text: 'A treehouse', icon: '🌳', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! They built a blanket fort!',
          incorrect: 'What did Mom help Ben build?',
        },
      },
      {
        id: 'rainy-q3',
        type: 'vocabulary',
        text: 'The fort was "cozy." What does cozy mean?',
        choices: [
          { id: 'a', text: 'Warm and comfortable', icon: '🥰', isCorrect: true },
          { id: 'b', text: 'Cold and wet', icon: '🥶', isCorrect: false },
          { id: 'c', text: 'Big and tall', icon: '📏', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Cozy means warm and comfortable!',
          incorrect: 'Think about how a blanket fort would feel.',
        },
      },
      {
        id: 'rainy-q4',
        type: 'inference',
        text: 'How did Ben feel at the END of the story?',
        choices: [
          { id: 'a', text: 'Happy', icon: '😊', isCorrect: true },
          { id: 'b', text: 'Still sad', icon: '😢', isCorrect: false },
          { id: 'c', text: 'Angry', icon: '😠', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! The fort made Ben feel happy again!',
          incorrect: 'Think about what happened after Mom helped.',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Ben and Mom', icon: '👦👩' },
      { id: 're2', category: 'where', text: 'At home', icon: '🏠' },
      { id: 're3', category: 'beginning', text: 'It rained, Ben was sad', icon: '☹️' },
      { id: 're4', category: 'middle', text: 'They built a blanket fort', icon: '🏕️' },
      { id: 're5', category: 'end', text: 'They read books in the fort', icon: '📚' },
    ],
  },

  {
    id: 'lost-mitten',
    title: 'The Lost Mitten',
    text: 'Lily wore her mittens to play in the snow. She made a snowman and threw snowballs. When she went inside, she only had one mitten! The next day, she found her mitten on the snowman\'s hand.',
    type: 'fiction',
    level: 'developing',
    questions: [
      {
        id: 'mitten-q1',
        type: 'literal',
        text: 'What did Lily do in the snow?',
        choices: [
          { id: 'a', text: 'Made a snowman and threw snowballs', icon: '⛄', isCorrect: true },
          { id: 'b', text: 'Went sledding', icon: '🛷', isCorrect: false },
          { id: 'c', text: 'Built an igloo', icon: '🏔️', isCorrect: false },
        ],
        feedback: {
          correct: 'Exactly! She made a snowman and threw snowballs!',
          incorrect: 'Read the second sentence again.',
        },
      },
      {
        id: 'mitten-q2',
        type: 'literal',
        text: 'Where was the lost mitten?',
        choices: [
          { id: 'a', text: 'In her pocket', icon: '👖', isCorrect: false },
          { id: 'b', text: 'On the snowman\'s hand', icon: '☃️', isCorrect: true },
          { id: 'c', text: 'Under her bed', icon: '🛏️', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! The mitten was on the snowman!',
          incorrect: 'Where did she find it the next day?',
        },
      },
      {
        id: 'mitten-q3',
        type: 'inference',
        text: 'How did the mitten get on the snowman?',
        choices: [
          { id: 'a', text: 'Lily put it there while playing', icon: '🧤', isCorrect: true },
          { id: 'b', text: 'The wind blew it there', icon: '💨', isCorrect: false },
          { id: 'c', text: 'Her friend put it there', icon: '👧', isCorrect: false },
        ],
        feedback: {
          correct: 'Good thinking! She probably put it on while making the snowman!',
          incorrect: 'Think about what Lily was doing when she lost it.',
        },
      },
      {
        id: 'mitten-q4',
        type: 'inference',
        text: 'How do you think Lily felt when she found her mitten?',
        choices: [
          { id: 'a', text: 'Happy and relieved', icon: '😌', isCorrect: true },
          { id: 'b', text: 'Angry', icon: '😡', isCorrect: false },
          { id: 'c', text: 'Scared', icon: '😱', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! She was probably so happy to find it!',
          incorrect: 'Think about how you\'d feel finding something you lost.',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Lily', icon: '👧' },
      { id: 're2', category: 'where', text: 'Outside in the snow', icon: '❄️' },
      { id: 're3', category: 'beginning', text: 'Lily played in snow', icon: '⛄' },
      { id: 're4', category: 'middle', text: 'She lost one mitten', icon: '🧤' },
      { id: 're5', category: 'end', text: 'Found it on the snowman', icon: '☃️' },
    ],
  },

  // ========================================================================
  // FACT PASSAGES (World Knowledge)
  // ========================================================================
  {
    id: 'bees-facts',
    title: 'Busy Bees',
    text: 'Bees are insects that fly. They live together in a hive. Bees make honey from flowers. They help flowers grow by moving pollen from flower to flower.',
    type: 'facts',
    level: 'emergent',
    questions: [
      {
        id: 'bees-q1',
        type: 'literal',
        text: 'What do bees make?',
        choices: [
          { id: 'a', text: 'Honey', icon: '🍯', isCorrect: true },
          { id: 'b', text: 'Milk', icon: '🥛', isCorrect: false },
          { id: 'c', text: 'Bread', icon: '🍞', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Bees make honey!',
          incorrect: 'What do bees make from flowers?',
        },
      },
      {
        id: 'bees-q2',
        type: 'literal',
        text: 'Where do bees live?',
        choices: [
          { id: 'a', text: 'In a hive', icon: '🏠', isCorrect: true },
          { id: 'b', text: 'In a nest', icon: '🪹', isCorrect: false },
          { id: 'c', text: 'Underground', icon: '⛏️', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Bees live together in a hive!',
          incorrect: 'Look at the second sentence.',
        },
      },
      {
        id: 'bees-q3',
        type: 'vocabulary',
        text: 'What is "pollen"?',
        choices: [
          { id: 'a', text: 'Powder from flowers', icon: '🌼', isCorrect: true },
          { id: 'b', text: 'Bee food', icon: '🍴', isCorrect: false },
          { id: 'c', text: 'Water', icon: '💧', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Pollen is the powder bees move from flower to flower!',
          incorrect: 'Think about what bees carry from flowers.',
        },
      },
      {
        id: 'bees-q4',
        type: 'inference',
        text: 'Why are bees important?',
        choices: [
          { id: 'a', text: 'They help flowers grow', icon: '🌺', isCorrect: true },
          { id: 'b', text: 'They make loud sounds', icon: '🔊', isCorrect: false },
          { id: 'c', text: 'They fly fast', icon: '💨', isCorrect: false },
        ],
        feedback: {
          correct: 'Exactly! Bees help flowers grow by moving pollen!',
          incorrect: 'What do bees do for flowers?',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Bees', icon: '🐝' },
      { id: 're2', category: 'where', text: 'In a hive and on flowers', icon: '🌸' },
      { id: 're3', category: 'beginning', text: 'Bees are flying insects', icon: '🐝' },
      { id: 're4', category: 'middle', text: 'They make honey', icon: '🍯' },
      { id: 're5', category: 'end', text: 'They help flowers grow', icon: '🌺' },
    ],
  },

  {
    id: 'rain-water',
    title: 'Where Does Rain Come From?',
    text: 'The sun warms up water in lakes and oceans. The warm water goes up into the sky as tiny drops. These drops make clouds. When the clouds get heavy, the water falls back down as rain.',
    type: 'facts',
    level: 'early',
    questions: [
      {
        id: 'rain-q1',
        type: 'literal',
        text: 'What warms up the water?',
        choices: [
          { id: 'a', text: 'The sun', icon: '☀️', isCorrect: true },
          { id: 'b', text: 'The moon', icon: '🌙', isCorrect: false },
          { id: 'c', text: 'The wind', icon: '💨', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! The sun warms up the water!',
          incorrect: 'Look at the first sentence.',
        },
      },
      {
        id: 'rain-q2',
        type: 'literal',
        text: 'What do the tiny drops of water make in the sky?',
        choices: [
          { id: 'a', text: 'Clouds', icon: '☁️', isCorrect: true },
          { id: 'b', text: 'Stars', icon: '⭐', isCorrect: false },
          { id: 'c', text: 'Rainbows', icon: '🌈', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The drops make clouds!',
          incorrect: 'What do the tiny drops make?',
        },
      },
      {
        id: 'rain-q3',
        type: 'vocabulary',
        text: 'What does "heavy" mean in this story?',
        choices: [
          { id: 'a', text: 'Full of water', icon: '💧', isCorrect: true },
          { id: 'b', text: 'Dark colored', icon: '⬛', isCorrect: false },
          { id: 'c', text: 'Very big', icon: '📏', isCorrect: false },
        ],
        feedback: {
          correct: 'Good! Heavy means the clouds are full of water!',
          incorrect: 'Think about what happens when clouds get heavy.',
        },
      },
      {
        id: 'rain-q4',
        type: 'inference',
        text: 'What would happen if the sun didn\'t warm the water?',
        choices: [
          { id: 'a', text: 'There would be no rain', icon: '🌵', isCorrect: true },
          { id: 'b', text: 'It would always rain', icon: '⛈️', isCorrect: false },
          { id: 'c', text: 'The ocean would freeze', icon: '🧊', isCorrect: false },
        ],
        feedback: {
          correct: 'Excellent thinking! No warm water means no clouds or rain!',
          incorrect: 'Think about how rain starts in the story.',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Water', icon: '💧' },
      { id: 're2', category: 'where', text: 'Lakes, oceans, and sky', icon: '🌊' },
      { id: 're3', category: 'beginning', text: 'Sun warms water', icon: '☀️' },
      { id: 're4', category: 'middle', text: 'Water goes up, makes clouds', icon: '☁️' },
      { id: 're5', category: 'end', text: 'Water falls as rain', icon: '🌧️' },
    ],
  },

  {
    id: 'penguin-facts',
    title: 'Penguins',
    text: 'Penguins are birds, but they cannot fly. They use their wings to swim in the cold ocean. Penguins eat fish. They live together in big groups to stay warm.',
    type: 'facts',
    level: 'early',
    questions: [
      {
        id: 'penguin-q1',
        type: 'literal',
        text: 'Can penguins fly?',
        choices: [
          { id: 'a', text: 'No, they cannot fly', icon: '🚫', isCorrect: true },
          { id: 'b', text: 'Yes, they can fly', icon: '✈️', isCorrect: false },
          { id: 'c', text: 'Only baby penguins', icon: '🐣', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Penguins are birds but cannot fly!',
          incorrect: 'Look at the first sentence carefully.',
        },
      },
      {
        id: 'penguin-q2',
        type: 'literal',
        text: 'What do penguins use their wings for?',
        choices: [
          { id: 'a', text: 'Swimming', icon: '🏊', isCorrect: true },
          { id: 'b', text: 'Flying', icon: '✈️', isCorrect: false },
          { id: 'c', text: 'Walking', icon: '🚶', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Penguins use their wings to swim!',
          incorrect: 'What do they do with their wings?',
        },
      },
      {
        id: 'penguin-q3',
        type: 'literal',
        text: 'What do penguins eat?',
        choices: [
          { id: 'a', text: 'Fish', icon: '🐟', isCorrect: true },
          { id: 'b', text: 'Plants', icon: '🌱', isCorrect: false },
          { id: 'c', text: 'Insects', icon: '🐛', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Penguins eat fish!',
          incorrect: 'What does the story say penguins eat?',
        },
      },
      {
        id: 'penguin-q4',
        type: 'inference',
        text: 'Why do penguins live in big groups?',
        choices: [
          { id: 'a', text: 'To stay warm', icon: '🔥', isCorrect: true },
          { id: 'b', text: 'To play games', icon: '🎮', isCorrect: false },
          { id: 'c', text: 'To find food easier', icon: '🍴', isCorrect: false },
        ],
        feedback: {
          correct: 'Exactly! They huddle together to stay warm!',
          incorrect: 'The last sentence tells us why!',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'Penguins', icon: '🐧' },
      { id: 're2', category: 'where', text: 'In cold ocean', icon: '🌊' },
      { id: 're3', category: 'beginning', text: 'Penguins are birds', icon: '🐦' },
      { id: 're4', category: 'middle', text: 'They swim and eat fish', icon: '🐟' },
      { id: 're5', category: 'end', text: 'They huddle to stay warm', icon: '🤗' },
    ],
  },

  {
    id: 'seeds-grow',
    title: 'How Seeds Grow',
    text: 'A seed is planted in the dirt. It needs water and sunlight to grow. First, roots grow down into the soil. Then a little green stem pokes up through the dirt. Soon it becomes a plant!',
    type: 'facts',
    level: 'developing',
    questions: [
      {
        id: 'seeds-q1',
        type: 'literal',
        text: 'What does a seed need to grow?',
        choices: [
          { id: 'a', text: 'Water and sunlight', icon: '💧☀️', isCorrect: true },
          { id: 'b', text: 'Snow and wind', icon: '❄️💨', isCorrect: false },
          { id: 'c', text: 'Rocks and sand', icon: '🪨', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! Seeds need water and sunlight to grow!',
          incorrect: 'Look at the second sentence.',
        },
      },
      {
        id: 'seeds-q2',
        type: 'literal',
        text: 'What grows first from a seed?',
        choices: [
          { id: 'a', text: 'Roots', icon: '🌱', isCorrect: true },
          { id: 'b', text: 'Flowers', icon: '🌸', isCorrect: false },
          { id: 'c', text: 'Leaves', icon: '🍃', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! Roots grow first, down into the soil!',
          incorrect: 'What grows FIRST?',
        },
      },
      {
        id: 'seeds-q3',
        type: 'vocabulary',
        text: 'What does "pokes up" mean?',
        choices: [
          { id: 'a', text: 'Pushes through', icon: '⬆️', isCorrect: true },
          { id: 'b', text: 'Falls down', icon: '⬇️', isCorrect: false },
          { id: 'c', text: 'Stays still', icon: '🛑', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Pokes up means pushes through!',
          incorrect: 'Think about how the stem comes out of the dirt.',
        },
      },
      {
        id: 'seeds-q4',
        type: 'inference',
        text: 'Why do roots grow down into the soil?',
        choices: [
          { id: 'a', text: 'To get water from the ground', icon: '💧', isCorrect: true },
          { id: 'b', text: 'To find animals', icon: '🐛', isCorrect: false },
          { id: 'c', text: 'To make flowers', icon: '🌺', isCorrect: false },
        ],
        feedback: {
          correct: 'Great thinking! Roots grow down to get water!',
          incorrect: 'Think about what plants need from the soil.',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'A seed', icon: '🌰' },
      { id: 're2', category: 'where', text: 'In the dirt', icon: '🌍' },
      { id: 're3', category: 'beginning', text: 'Seed is planted', icon: '🌰' },
      { id: 're4', category: 'middle', text: 'Roots grow, stem pokes up', icon: '🌱' },
      { id: 're5', category: 'end', text: 'It becomes a plant', icon: '🌿' },
    ],
  },

  {
    id: 'moon-night',
    title: 'The Moon at Night',
    text: 'When the sun goes down, the sky gets dark. The moon comes out at night. The moon does not make its own light. It reflects light from the sun, so we can see it glowing in the night sky.',
    type: 'facts',
    level: 'developing',
    questions: [
      {
        id: 'moon-q1',
        type: 'literal',
        text: 'When does the moon come out?',
        choices: [
          { id: 'a', text: 'At night', icon: '🌙', isCorrect: true },
          { id: 'b', text: 'In the morning', icon: '🌅', isCorrect: false },
          { id: 'c', text: 'At lunch time', icon: '🍽️', isCorrect: false },
        ],
        feedback: {
          correct: 'Yes! The moon comes out at night!',
          incorrect: 'When does the story say the moon appears?',
        },
      },
      {
        id: 'moon-q2',
        type: 'literal',
        text: 'Does the moon make its own light?',
        choices: [
          { id: 'a', text: 'No, it doesn\'t', icon: '🚫', isCorrect: true },
          { id: 'b', text: 'Yes, it does', icon: '💡', isCorrect: false },
          { id: 'c', text: 'Only sometimes', icon: '🤔', isCorrect: false },
        ],
        feedback: {
          correct: 'That\'s right! The moon does NOT make its own light!',
          incorrect: 'Look at the third sentence.',
        },
      },
      {
        id: 'moon-q3',
        type: 'vocabulary',
        text: 'What does "reflects" mean?',
        choices: [
          { id: 'a', text: 'Bounces back', icon: '↩️', isCorrect: true },
          { id: 'b', text: 'Makes new light', icon: '💡', isCorrect: false },
          { id: 'c', text: 'Hides away', icon: '🫣', isCorrect: false },
        ],
        feedback: {
          correct: 'Perfect! Reflects means bounces back light!',
          incorrect: 'The moon reflects light from the sun. What might that mean?',
        },
      },
      {
        id: 'moon-q4',
        type: 'inference',
        text: 'Where does the moon\'s light come from?',
        choices: [
          { id: 'a', text: 'From the sun', icon: '☀️', isCorrect: true },
          { id: 'b', text: 'From stars', icon: '⭐', isCorrect: false },
          { id: 'c', text: 'From Earth', icon: '🌍', isCorrect: false },
        ],
        feedback: {
          correct: 'Excellent! The moon reflects the sun\'s light!',
          incorrect: 'The story says the moon reflects light from somewhere.',
        },
      },
    ],
    retellElements: [
      { id: 're1', category: 'who', text: 'The moon', icon: '🌙' },
      { id: 're2', category: 'where', text: 'In the night sky', icon: '🌌' },
      { id: 're3', category: 'beginning', text: 'Sun goes down, sky gets dark', icon: '🌆' },
      { id: 're4', category: 'middle', text: 'Moon comes out', icon: '🌙' },
      { id: 're5', category: 'end', text: 'It reflects sunlight', icon: '☀️' },
    ],
  },
];
