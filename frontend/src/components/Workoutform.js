import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Workoutform = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useWorkoutContext();

const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
    });
    const json = await response.json();
    if (response.ok) {
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
        console.log('New workout added:', json);
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
        setEmptyFields([]);
    } else {
        console.error('Error adding workout:', json);
        setError(json.error || 'Failed to add workout');
        setEmptyFields(json.emptyFields || []);
    }
};

return(
    <form className="workout-form" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title} 
            className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Load (in kg):</label>
        <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)} 
            value={load} 
            className={emptyFields.includes('load') ? 'error' : ''}
        />
        <label>Reps:</label>
        <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)} 
            value={reps} 
            className={emptyFields.includes('reps') ? 'error' : ''}
        />
        <button type="submit">Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
);

}

export default Workoutform;