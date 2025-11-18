import { useHabitStore } from '../store';

export const Stats = () => {
  const habits = useHabitStore((state) => state.habits);
  const isCompletedToday = useHabitStore((state) => state.isCompletedToday);

  const dailyHabits = habits.filter((h) => h.frequency === 'daily');
  const completedToday = dailyHabits.filter((h) => isCompletedToday(h.id)).length;
  const total = dailyHabits.length;
  const percentage = total > 0 ? Math.round((completedToday / total) * 100) : 0;

  return (
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          margin: '0 0 16px 0'
        }}
      >
        Today's Progress
      </h2>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#667eea',
            }}
          >
            {completedToday}/{total}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1.5'
            }}
          >
            habits
            <br />
            completed
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#667eea',
            color: '#fff',
            fontSize: '32px',
            fontWeight: '700'
          }}
        >
          {percentage}%
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e0e0e0',
          borderRadius: '4px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: '#667eea',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};
