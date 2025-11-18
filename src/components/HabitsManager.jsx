import { useState } from 'react';
import { useHabitStore } from '../store';

export const HabitsManager = ({ onBack }) => {
  const habits = useHabitStore((state) => state.habits);
  const addHabit = useHabitStore((state) => state.addHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    frequency: 'daily',
    days: [...daysOfWeek]
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      updateHabit(editingId, formData.name, formData.description, formData.frequency, formData.days);
      setEditingId(null);
    } else {
      addHabit(formData.name, formData.description, formData.frequency, formData.days);
    }

    setFormData({ name: '', description: '', frequency: 'daily', days: [...daysOfWeek] });
  };

  const handleEdit = (habit) => {
    setFormData({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      days: habit.days || [...daysOfWeek]
    });
    setEditingId(habit.id);
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', frequency: 'daily', days: [...daysOfWeek] });
    setEditingId(null);
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day]
    }));
  };

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
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              marginBottom: '16px'
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              margin: '0 0 8px 0'
            }}
          >
            Manage Habits
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0
            }}
          >
            Add, edit, or delete your habits
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#fff',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Habit Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Reading"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                color: '#fff',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., 30 minutes"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#fff',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                color: '#fff',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Days
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px'
              }}
            >
              {daysOfWeek.map((day) => (
                <label
                  key={day}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '14px'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.days.includes(day)}
                    onChange={() => toggleDay(day)}
                    style={{
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  {day.slice(0, 3)}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              {editingId ? 'Update Habit' : 'Add Habit'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Habits List */}
        <div style={{ marginTop: '32px' }}>
          <h2
            style={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '16px'
            }}
          >
            Your Habits
          </h2>

          {habits.length === 0 ? (
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
              No habits yet. Add one above!
            </p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333'
                    }}
                  >
                    {habit.name}
                  </h3>
                  <p
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '13px',
                      color: '#666'
                    }}
                  >
                    {habit.description}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      color: '#999'
                    }}
                  >
                    {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(habit)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#2196F3',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
