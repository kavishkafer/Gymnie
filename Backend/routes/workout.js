const express = require('express');
const router = express.Router();

// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: 'Get all workouts' });
});

// GET a single workout
router.get('/:id', (req, res) => {
    res.json({ message: 'Get workout ' + req.params.id });
});

// POST a new workout
router.post('/', (req, res) => {
    res.json({ message: 'Create a new workout' });
});
// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete workout ' + req.params.id });
});

router.patch('/:id', (req, res) => {
    res.json({ message: 'Update workout ' + req.params.id });
});

module.exports = router;