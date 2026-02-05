# Atomic Habits Tracker

A simple, clean habit tracker app built with React and Vite. Track your three core habits: School, Career, and Social.

## Features

- **Daily Progress**: Visual overview of completed habits
- **Streak Tracking**: See how many consecutive days you've maintained each habit
- **Local Storage**: All data saved locally on your device
- **Mobile Friendly**: Works great on phones and tablets
- **Simple UI**: Click to complete, no complicated flows

## Your Habits

1. **School**: 1 Pomodoro/day
2. **Career**: 20 minutes/day

## Setup & Run

### Prerequisites
- Node.js 16+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## How to Use

1. Open the app on your phone or desktop
2. Click on a habit card to mark it complete for today
3. Watch your streaks grow
4. Your progress is saved automatically

## Tech Stack

- React 18
- Vite
- Zustand (state management)
- LocalStorage (persistence)

## Notes

- All your data is stored locally - nothing is sent to a server
- Your data persists even if you close the app
- You can reset by clearing your browser's local storage

---

"A tree falls in the direction it leans." — James Clear
