# SeekhSetu — Learn Today Lead Tomorrow

> A sophisticated, AI-inspired personal learning operating system engineered specifically for **Full Stack Developer Associate** technical interview preparation. *Learn Today Lead Tomorrow.*

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Recharts** according to the **Obsidian Aurora** design language.

---

## 🎨 Creative Direction: Obsidian Aurora

The aesthetic merges developer workspace precision, premium productivity UX, and immersive ambient lighting:

- **Primary Background**: `#090B14`
- **Secondary Background**: `#0D1120`
- **Elevated Surfaces**: `#14192A`
- **Interactive Indigo**: `#7667F8`
- **Violet Accent**: `#A78BFA`
- **Cyan Accent**: `#67E8F9`
- **Success**: `#6EE7B7`
- **Warning**: `#FBBF24`
- **Primary Text**: `#F5F7FF`
- **Secondary Text**: `#A1ABC0`
- **Subtle Borders**: `rgba(148, 163, 184, 0.14)`
- **Typography**: Inter (UI), JetBrains Mono (Code & Metadata)

---

## 🚀 Core Platform Features

### 1. Dashboard
- **Editorial Welcome Section**: Contextual greeting, study mission, and user status.
- **Hero Continue Learning Action**: Real progress ring, current day status, and 1-click continuation.
- **Asymmetric Metric Cards**: Today's study time, weekly study duration, completed topics vs pending, and empirical quiz accuracy.
- **Visual Roadmap Preview**: 8-module progress overview with direct navigation.
- **Interactive Focus Engine**: Live timer widget with 25m, 45m, 60m presets and break toggles.
- **Recent Activity Timeline & Revision Backlog Checklist**.

### 2. Learning Roadmap
- **Complete 30-Day Technical Curriculum**:
  1. **JavaScript Core & Advanced** (Days 1–6)
  2. **React.js & Frontend Architecture** (Days 7–11)
  3. **Node.js & Express.js Backend Architecture** (Days 12–16)
  4. **SQL & PostgreSQL Database Engineering** (Days 17–20)
  5. **Data Structures & Algorithms** (Days 21–24)
  6. **Git, Testing & DevOps** (Days 25–26)
  7. **Full-Stack Projects & Architecture** (Days 27–28)
  8. **Technical & HR Interview Mastery** (Days 29–30)
- **7-Day Intensive Revision Track**: High-yield fast track for last-minute revision.
- **Filters & Search**: All, Not Started, In Progress, Completed, Starred.
- **Independent Star Action**: Quick favorite toggling with persistent state.

### 3. Dedicated Learning Workspace
- **Topic Navigation Sidebar**: Progress percentage, completion checkboxes, and Day completion status.
- **Ultra-Deep Day 1 Curriculum**: Variables, Stack vs Heap, Type Coercion (`ToPrimitive`), Short-circuiting, Loops, Execution Context, Scope Chain, Hoisting, Array transformations, and polyfills.
- **Interactive Code Blocks**: Copy code with visual feedback, execution inputs, and expected engine outputs.
- **Step-by-Step Architectural Stepper**: Visual phase-by-phase trace of engine mechanics.
- **Common Pitfalls & Debugging Labs**: Buggy anti-patterns side-by-side with fixed production code.
- **Interview Q&A Bank**: Expandable cards with key points to state to the interviewer.
- **Knowledge Checkpoints**: Interactive MCQs with non-color-exclusive feedback.
- **Coding Challenges**: Starter code, progressive hints, verified solutions, and test cases.
- **Personal Notes & Bookmarks**: Persistent notes and concept bookmarks per topic.
- **Day Assessment Modal**: Timed quiz with automatic score calculation, error tracking, and celebratory confetti.

### 4. Practice Arena
- **Comprehensive Question Bank**: Tricky JavaScript output predictions, React Fiber lifecycle questions, Express middleware bugs, PostgreSQL NULL nuances, and DSA complexity questions.
- **Mode Toggle**: Self-paced practice vs Timed Blitz.
- **Progressive Hints**: Elicitation hints before revealing the answer.
- **Weak Topic Detection**: Prompts alerting the user when accuracy drops below 75%.

### 5. Precision Focus Timer
- **Real Timestamp Tracking**: Calculates elapsed time using timestamps rather than interval countdowns alone.
- **Paused Time Protection**: Paused time is never logged as focused study time.
- **Study vs Break Modes**: Configurable durations (15m, 25m, 45m, 60m, 90m).
- **Distraction-Free Mode**: Immersive full-screen focus view with glowing typography.
- **Goal Tracking**: Daily study target tracking (60m, 120m, 180m).

### 6. Revision Center
- **Starred Study Days**: Quick jump to pinned high-yield days.
- **Bookmarked Concepts**: Direct links back to original lessons.
- **Incorrect Questions Queue**: Review and re-attempt missed questions with 1-click clearance upon mastery.
- **Saved Notes & Mnemonics Archive**.
- **Revision Tasks**: Custom tasks with priority, due date, and completion toggle.

### 7. Empirical Analytics
- **Daily Study Duration**: 7-day rolling area chart.
- **Subject Distribution**: Donut chart analyzing time distribution across curriculum modules.
- **Topic Completion by Module**: Bar chart contrasting finished topics against scope.
- **Quiz Accuracy Trend**: Assessment performance progression over attempts.

---

## ⚡ Studley AI Design & Learning Inspiration

PrepPilot draws core UX and visual patterns from **Studley AI**, adapting them into a developer-focused interview preparation workspace:

1. **Unified Study Sets**:
   - Rather than fragmenting lessons, flashcards, quizzes, and notes into detached silos, every topic operates as an integrated **Study Set**.
   - Seamlessly toggle between `[Interactive Lesson]`, `[Active Recall Deck]`, `[Practice Quiz]`, `[AI Coach]`, and `[Notes]` with an animated shared-indicator bar.
2. **3D Active Recall Flashcards**:
   - Realistic 3D card flipping with spring physics.
   - 4-Tier mastery model: `Unfamiliar` (1), `Learning` (2), `Familiar` (3), and `Mastered` (4).
   - Fast-flow keyboard shortcuts: `Space` / `Enter` to flip; `1`, `2`, `3`, `4` to classify recall mastery; `Arrow Left` / `Arrow Right` to navigate cards.
   - Dynamic mastery progress bar & celebratory confetti on deck completion.
3. **AI Technical Interview Coach**:
   - In-workspace interactive interviewer persona tailored for Full Stack Associate requirements.
   - Contextual coaching chips: *"Quiz me on this concept"*, *"Give me a senior interview curveball"*, *"Review my explanation"*, and *"Break this down simply"*.
4. **Active Recall Dashboard Widget**:
   - Direct active recall deck launcher on the main dashboard displaying real-time mastery counts across your entire technical deck.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS 3.4 with custom Obsidian Aurora design tokens
- **Animations**: Framer Motion 14
- **Charts**: Recharts 3
- **Icons**: Lucide React
- **Persistence Layer**: `localStorage` Repository pattern with JSON export/import and zero data loss on refresh.

---

## 💻 Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://127.0.0.1:5173](http://127.0.0.1:5173) in your browser.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle in `/dist`.

### 4. Preview Production Build
```bash
npm run preview
```
