const express = require('express');
const Workout = require('../models/workoutModel');


const{
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}= require('../controllers/workoutController')
const router = express.Router();

// Get all workouts
router.get('/', getWorkouts);

// Get a single workout by ID
router.get('/:id', getWorkout);

// Create a new workout
router.post('/', createWorkout);

// Delete a workout by ID
router.delete('/:id',deleteWorkout);



// Update a workout by ID
router.patch('/:id', updateWorkout);

module.exports = router;
