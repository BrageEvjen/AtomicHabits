import { useHabitStore } from '../store';

export const HabitCard = ({ habit }) => {
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const isCompletedToday = useHabitStore((state) => state.isCompletedToday);
  const getStreak = useHabitStore((state) => state.getStreak);
  const getCompletionThisWeek = useHabitStore((state) => state.getCompletionThisWeek);

  const completed = isCompletedToday(habit.id);
  const streak = getStreak(habit.id);
  const weekCompletion = getCompletionThisWeek(habit.id);

  const handleToggle = () => {
    toggleHabit(habit.id);
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        backgroundColor: completed ? '#4CAF50' : '#fff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: completed ? 'scale(0.98)' : 'scale(1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: `2px solid ${completed ? '#4CAF50' : '#e0e0e0'}`
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: completed ? '#fff' : '#333',
              margin: '0 0 4px 0'
            }}
          >
            {habit.name}
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: completed ? 'rgba(255,255,255,0.9)' : '#666',
              margin: 0
            }}
          >
            {habit.description}
          </p>
        </div>

        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: completed ? 'rgba(255,255,255,0.3)' : '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}
        >
          {completed ? '✓' : '○'}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          fontSize: '13px',
          color: completed ? 'rgba(255,255,255,0.8)' : '#666'
        }}
      >
        <span>🔥 {streak} day streak</span>
        {habit.frequency === 'weekly' && (
          <span>📊 {weekCompletion}/2 this week</span>
        )}
      </div>
    </div>
  );
};
