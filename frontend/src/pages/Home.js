import { useEffect, useState} from 'react';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
    const [workouts, setWorkouts] = useState([]);
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
                    setWorkouts(data);
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
        </div>
    );
    }

    export default Home