const mongoose = require('mongoose');

const { Schema } = mongoose;



const exerciseSchema = new Schema({
    exercise_name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },

});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

