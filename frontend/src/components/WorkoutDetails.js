import { useWorkoutContext } from '../hooks/useWorkoutContext';
const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext();
    const handleClick = async () => {
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

    return (
        <div className="workout-details">
            <h2>Workout Details</h2>
            <h4>Title: {workout.title}</h4>
            <p><strong>Load:</strong> {workout.load} kg</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p><strong>Created at:</strong> {new Date(workout.createdAt).toLocaleDateString()}</p>
            <span onClick={handleClick} className="material-symbols-outlined"> delete </span>   
        </div>
    );
}

export default WorkoutDetails;
