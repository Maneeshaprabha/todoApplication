const Workout = require('../models/workoutModel')

const mongoose =require('mongoose')

//get all workout
const getWorkouts =async(req,res)=>{

    const workouts = await Workout.find({}).sort({createdAt:-1});
    try {
        
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get a single workout
const getWorkout =async(req,res)=>{

    const{id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }
    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout);
}


// create a new workout
const createWorkout = async (req, res) => {
    const {title, description} = req.body
  
    let emptyFields = []
  
    if (!title) {
      emptyFields.push('title')
    }
  

    if (!description) {
        emptyFields.push('description');
      }

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    // add to the database
    try {
      const workout = await Workout.create({ title, description })
      res.status(200).json(workout)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
  
  
//delete a workout

const deleteWorkout=async(req,res)=>{
    const{id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Workout not found'})
    }

    const workout = await Workout.findByIdAndDelete({_id:id});

    if(!workout){
        return res.status(404).json({error: 'Workout not found'})
    }

    res.status(200).json(workout);
}


//update a workout

const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }

    // Get the update data from the request body
    const updateData = req.body;

    try {
        // Find and update the workout
        const workout = await Workout.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return the updated document
        );

        // Check if the workout was found and updated
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        // Send the updated workout data as a response
        res.status(200).json(workout);
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};


module.exports={
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}