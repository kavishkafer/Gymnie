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
    const { title, reps, load, muscleGroup, workoutName, day, sets, notes } = req.body;
    let emptyFields = []
    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!muscleGroup){
        emptyFields.push('muscleGroup');
    }
    if(!workoutName){
        emptyFields.push('workoutName');
    }
    if(!day){
        emptyFields.push('day');
    }
    if(!sets){
        emptyFields.push('sets');
    }
    
    if(emptyFields.length > 0){
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }
//add doc to db
    try {
        const workout = await Workout.create({ title, reps, load, muscleGroup, workoutName, day, sets, notes });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }
    try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid workout ID' });
    }
    try {
        const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
    // Add other exported functions here for getting, deleting, and updating workouts
}

