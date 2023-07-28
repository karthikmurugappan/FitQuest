const mongoose = require('mongoose');

const { Schema } = mongoose;

const statsSchema = new Schema({
    strength: {
        type: Number,
        default: 0,
    },
    stamina: {
        type: Number,
        default: 0,
    },
    agility: {
        type: Number,
        default: 0,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise',
        },
    ],
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;







