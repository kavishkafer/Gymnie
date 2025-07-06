const mongoose = require('mongoose')

const Schema = mongoose.Schema
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true
    },
    workoutName: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
    

},{
    timestamps: true
})


module.exports = mongoose.model('Workout', workoutSchema)

