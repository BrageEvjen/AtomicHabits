import { useHabitStore } from './store';
import { Stats } from './components/Stats';
import { HabitCard } from './components/HabitCard';

export default function App() {
  const habits = useHabitStore((state) => state.habits);

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
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              margin: '0 0 8px 0'
            }}
          >
            Lean Into It
          </h1>
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

        {/* Habits */}
        <div>
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>

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
