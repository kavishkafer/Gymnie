const WorkoutDetails = ({ workout }) => {
    return (
        <div className="workout-details">
            <h2>Workout Details</h2>
            <h4>Title: {workout.title}</h4>
            <p><strong>Load:</strong> {workout.load} kg</p>
            <p><strong>Reps:</strong> {workout.reps}</p>
            <p><strong>Created at:</strong> {new Date(workout.createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default WorkoutDetails;
