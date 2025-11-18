import { useState } from 'react';
import { useHabitStore } from './store';
import { Stats } from './components/Stats';
import { HabitCard } from './components/HabitCard';
import { HabitsManager } from './components/HabitsManager';

export default function App() {
  const [showManager, setShowManager] = useState(false);
  const habits = useHabitStore((state) => state.habits);

  if (showManager) {
    return <HabitsManager onBack={() => setShowManager(false)} />;
  }

  const dailyHabits = habits.filter((h) => h.frequency === 'daily');
  const weeklyHabits = habits.filter((h) => h.frequency === 'weekly');

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#fff',
                margin: 0
              }}
            >
              Lean Into It
            </h1>
            <button
              onClick={() => setShowManager(true)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              ⚙️ Manage
            </button>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}
          >
            Small improvements, consistent direction
          </p>
        </div>

        {/* Stats */}
        <Stats />

        {/* Daily Habits Section */}
        {dailyHabits.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <h2
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '12px',
                marginTop: '24px',
                opacity: 0.9
              }}
            >
              📅 Daily
            </h2>
            <div
              style={{
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {dailyHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </div>
        )}

        {/* Weekly Habits Section */}
        {weeklyHabits.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '12px',
                marginTop: '16px'
              }}
            >
              📊 Weekly
            </h2>
            <div
              style={{
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                opacity: 0.8
              }}
            >
              {weeklyHabits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <p>
            "A tree falls in the direction it leans."
          </p>
          <p style={{ margin: '8px 0 0 0' }}>
            What direction are you leaning today?
          </p>
        </div>
      </div>
    </div>
  );
}
