require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// Connect to MongoDB
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start listening on the specified port
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// Home route
app.get('/', (req, res) => {
    res.json({ msg: "Welcome to the app" });
});
