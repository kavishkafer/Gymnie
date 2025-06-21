const { default: mongoose } = require('mongoose');
const Workout = require('../models/workoutModel');


// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 }); // Sort by creation date, newest first
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
 if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }
    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


// Create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
//add doc to db
    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    // Add other exported functions here for getting, deleting, and updating workouts
}

// Delete a workout


// Update a workout