import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useState } from 'react';
const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: workout.title,
    load: workout.load,
    reps: workout.reps
  });
    const handleDelete = async () => {
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await response.json();
        console.log('Response:', response);
        console.log('JSON:', json);
        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: workout });
            console.log('Workout deleted:', json);
            // Handle successful deletion (e.g., show a message, redirect, etc.)

        }
    };
     const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const updatedWorkout = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: updatedWorkout });
      setIsEditing(false);
    }
  };

     return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load:</strong> {workout.load} kg</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p><strong>Created at:</strong> {new Date(workout.createdAt).toLocaleDateString()}</p>

      <div className="workout-details-buttons">
        <span onClick={handleDelete} className="material-symbols-outlined">delete</span>
        <span onClick={handleEditClick} className="material-symbols-outlined">edit</span>
      </div>

      {isEditing && (
        <form onSubmit={handleUpdate} className="update-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            type="number"
            name="load"
            value={formData.load}
            onChange={handleChange}
            placeholder="Load (kg)"
          />
          <input
            type="number"
            name="reps"
            value={formData.reps}
            onChange={handleChange}
            placeholder="Reps"
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default WorkoutDetails;
