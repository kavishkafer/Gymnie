import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Workoutform = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [muscleGroup, setMuscleGroup] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [day, setDay] = useState('');
    const [sets, setSets] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useWorkoutContext();

const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps, muscleGroup, workoutName, day, sets, notes };
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
        setMuscleGroup('');
        setWorkoutName(''); 
        setDay('');
        setSets('');    
        setNotes('');
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
        <label>Muscle Group:</label>
        <input 
            type="text" 
            onChange={(e) => setMuscleGroup(e.target.value)} 
            value={muscleGroup} 
            className={emptyFields.includes('muscleGroup') ? 'error' : ''}
        />
        <label>Workout Name:</label>
        <input 
            type="text" 
            onChange={(e) => setWorkoutName(e.target.value)} 
            value={workoutName} 
            className={emptyFields.includes('workoutName') ? 'error' : ''}
        />
        <label>Day:</label>
        <input 
            type="text" 
            onChange={(e) => setDay(e.target.value)} 
            value={day} 
            className={emptyFields.includes('day') ? 'error' : ''}
        />
        <label>Sets:</label>
        <input 
            type="number" 
            onChange={(e) => setSets(e.target.value)} 
            value={sets} 
            className={emptyFields.includes('sets') ? 'error' : ''}
        />
        <label>Notes:</label>
        <input 
            type="text" 
            onChange={(e) => setNotes(e.target.value)} 
            value={notes}  //notes can be optional, so no error class
            className={emptyFields.includes('notes') ? 'error' : ''} //optional

        />
        <button type="submit">Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
);

}

export default Workoutform;