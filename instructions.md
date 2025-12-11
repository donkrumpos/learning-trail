# Reading Companion - User Guide

A browser-based app to support early reading and comprehension for young children (ages 4-6).

## Quick Start

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

## For Children

### Reading a Story

1. **Choose a Story** - Tap any card on the main screen to pick a story
2. **Read or Listen** - Read the story yourself, or tap "Read to Me" to hear it aloud
3. **Read Again** - Tap "Read It Again" as many times as you want
4. **When Ready** - Tap "I'm Ready!" to continue

### Retelling the Story

After reading, you'll help retell the story by picking:
- **Who** is in the story
- **Where** it happens
- **What happened** - beginning, middle, and end

Watch your story summary build as you make selections!

### Answering Questions

- Tap the answer you think is correct
- You'll see right away if you got it right
- If you need help, you can go back and read the story again
- Keep going until you finish all questions

### Celebration!

When you're done, you'll see:
- How many questions you got right
- Stars for completing the story
- Your total stories read

### Progress Trail

On the main screen, you'll see circles for each story:
- **Gray circle (○)** - Not read yet
- **Gold star (⭐)** - Completed!

## For Parents

### Accessing the Parent Panel

1. Tap "Parent" in the top-right corner
2. Enter the magic word: **dragon**
3. You're in!

### What You'll See

**Reading Progress**
- Total stories completed
- Percentage of questions answered correctly
- Last reading date
- Recent activity log showing each completed passage and score

### Adding Custom Passages

1. Go to "Add New Passage"
2. Enter a title
3. Type or paste the passage text (2-5 sentences work best)
4. Select type: Story (fiction) or Facts (informational)
5. Select reading level: Emergent, Early, or Developing
6. Tap "Add Passage"

Note: Custom passages won't have comprehension questions - they're for read-aloud practice.

### Managing Data

- **Delete custom passages** - Find them under "Your Custom Passages" and tap Delete
- **Reset all progress** - Use the red "Reset All Progress" button (cannot be undone)

## Reading Levels

| Level | Description |
|-------|-------------|
| Emergent | Simplest sentences, very common words |
| Early | Slightly longer sentences, some new vocabulary |
| Developing | More complex sentences, inference questions |

## Included Stories

### Fiction (Stories)
- The Beach Shell - Maya finds a shell at the beach
- Rainy Day Fun - Ben builds a blanket fort
- The Lost Mitten - Lily loses her mitten in the snow

### Facts (Informational)
- Busy Bees - How bees make honey and help flowers
- Where Does Rain Come From? - The water cycle
- Penguins - Birds that swim instead of fly
- How Seeds Grow - From seed to plant
- The Moon at Night - Why the moon glows

## Question Types

Each story includes a mix of:
- **Literal** - Direct recall ("Who found the shell?")
- **Vocabulary** - Word meanings in context ("What does 'cozy' mean?")
- **Inference** - Thinking beyond the text ("How do you think she felt?")

## Tips for Parents

1. **No pressure** - Let your child set the pace
2. **Read together** - Use "Read to Me" and follow along
3. **Celebrate effort** - Focus on participation, not just correct answers
4. **Re-read favorites** - Repetition builds confidence
5. **Add your own** - Use custom passages for topics your child loves

## Technical Notes

- All data is stored locally in your browser (localStorage)
- Works offline after first load
- No account or internet required
- Text-to-speech uses your browser's built-in voice

## Building for Production

```bash
npm run build
```

The `dist` folder can be hosted on any static file server.
