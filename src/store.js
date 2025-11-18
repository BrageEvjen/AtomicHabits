import { create } from 'zustand';

const STORAGE_KEY = 'atomic_habits_data';

const getInitialState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    habits: [
      {
        id: 'school',
        name: 'School',
        description: '1 Pomodoro',
        frequency: 'daily',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        completedDates: []
      },
      {
        id: 'career',
        name: 'Career',
        description: '20 minutes',
        frequency: 'daily',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        completedDates: []
      },
      {
        id: 'social',
        name: 'Social',
        description: 'Initiate contact',
        frequency: 'weekly',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        completedDates: []
      }
    ]
  };
};

export const useHabitStore = create((set, get) => ({
  habits: getInitialState().habits,

  toggleHabit: (habitId) => {
    set((state) => {
      const today = new Date().toISOString().split('T')[0];
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(today);
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((d) => d !== today)
              : [...habit.completedDates, today]
          };
        }
        return habit;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits: updatedHabits }));
      return { habits: updatedHabits };
    });
  },

  isCompletedToday: (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    const habit = get().habits.find((h) => h.id === habitId);
    return habit?.completedDates.includes(today) || false;
  },

  getStreak: (habitId) => {
    const habit = get().habits.find((h) => h.id === habitId);
    if (!habit || habit.completedDates.length === 0) return 0;

    const sorted = [...habit.completedDates].sort().reverse();
    let streak = 0;
    let currentDate = new Date();

    for (const dateStr of sorted) {
      const checkDate = new Date(dateStr);
      const diffTime = Math.abs(currentDate - checkDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= streak + 1) {
        streak++;
        currentDate = checkDate;
      } else {
        break;
      }
    }

    return streak;
  },

  getCompletionThisWeek: (habitId) => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const habit = get().habits.find((h) => h.id === habitId);

    if (!habit) return 0;

    return habit.completedDates.filter((date) => {
      const d = new Date(date);
      return d >= weekAgo && d <= today;
    }).length;
  },

  addHabit: (name, description, frequency, days) => {
    set((state) => {
      const id = name.toLowerCase().replace(/\s+/g, '-');
      const newHabit = {
        id,
        name,
        description,
        frequency,
        days: days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        completedDates: []
      };
      const updatedHabits = [...state.habits, newHabit];
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits: updatedHabits }));
      return { habits: updatedHabits };
    });
  },

  deleteHabit: (habitId) => {
    set((state) => {
      const updatedHabits = state.habits.filter((h) => h.id !== habitId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits: updatedHabits }));
      return { habits: updatedHabits };
    });
  },

  updateHabit: (habitId, name, description, frequency, days) => {
    set((state) => {
      const updatedHabits = state.habits.map((habit) => {
        if (habit.id === habitId) {
          return { ...habit, name, description, frequency, days: days || habit.days };
        }
        return habit;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits: updatedHabits }));
      return { habits: updatedHabits };
    });
  }
}));
