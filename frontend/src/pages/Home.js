import { useEffect} from 'react';
import {useWorkoutContext} from '../hooks/useWorkoutContext';
import WorkoutDetails from '../components/WorkoutDetails';
import Workoutform from '../components/Workoutform';

const Home = () => {
    // const [workouts, setWorkouts] = useState([]);
    const {workouts, dispatch} = useWorkoutContext();
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch('/api/workouts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                if(response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data });
                }
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        fetchWorkouts();

    }, []);
    return (
        <div className="home">
        
       <div className="workouts">
        {workouts && workouts.map((workout) => (
               <WorkoutDetails key={workout._id} workout={workout} />

        ))}
  </div>
    <Workoutform />
        </div>
    );
    }

    export default Home