const { User, Stats, Exercise } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('stats');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('stats');
        },
        stats: async (parent, { user_id }) => {
            return Stats.findOne({ user_id }).populate('exercises');
        },
        exercises: async () => {
            return Exercise.find();
        },
        exercise: async (parent, { _id }) => {
            return Exercise.findOne({ _id });
        },
    },


    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {throw new AuthenticationError('No user found with this email address');}

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) { throw new AuthenticationError('Incorrect credentials');}

            const token = signToken(user);
            return { token, user };
        },

        //add new user to the database
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        //add new exercises to the database
        addExercise: async (parent, { exercise_name, type, description, points }) => {
            const exercise = await Exercise.create({ exercise_name, type, description, points });
            return exercise;
        },

        //add a new State to the new User
        addStats: async (parent, { strength, stamina, agility, user_id }) => {
            const stats = await Stats.create({ strength, stamina, agility, user_id });
            return stats;
        },

        //update user stats
        updateStats: async (parent, { strength, stamina, agility, user_id }) => {
            const stats = await Stats.findOneAndUpdate(
                { user_id },
                { $set: { strength, stamina, agility } },
                { new: true }
            );
            return stats;
        },

        //add exercise to users stats array
        addExerciseToStats: async (parent, { exercise_id, user_id }) => {
            const updatedStats = await Stats.findOneAndUpdate(
                { user_id },
                { $addToSet: { exercises: exercise_id } },
                { new: true }
            );
            return updatedStats;
        },
        removeExerciseFromStats: async (parent, { exercise_id, user_id }) => {
            const updatedStats = await Stats.findOneAndUpdate(
                { user_id },
                { $pull: { exercises: exercise_id } },
                { new: true }
            );
            return updatedStats;
        },

}


};

module.exports = resolvers;