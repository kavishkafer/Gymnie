const express = require('express');
const { models } = require('mongoose');
const { createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout } = require('../controllers/workoutController');
const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id',deleteWorkout);

router.patch('/:id', updateWorkout);

module.exports = router;