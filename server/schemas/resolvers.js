const { User, Stats, Exercise } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return User.find();
        },

        // Get the stats for the currently logged-in user
        userStats: async (parent, args, context) => {
            return Stats.findOne({ user_id: context.user._id }).populate('exercises').populate('user_id');
        },

        // Get the stats for a specific user by user_id
        stats: async (parent, { user_id }) => {
            return Stats.findOne({ user_id }).populate('exercises');
        },

        // Get all stats for all users
        allStats: async () => {
            return Stats.find().populate('exercises').populate('user_id');
        },

        // Get all exercises
        exercises: async () => {
            return Exercise.find();
        },

        // Get a specific exercise by _id
        exercise: async (parent, { _id }) => {
            return Exercise.findOne({ _id });
        },

        // Get the user's own profile and detailed data
        me: async (parent, args, context) => {
            if (context.user) {
                return await Stats.findOne({ user_id: context.user._id }).populate('user_id').populate('exercises');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // User login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        // Add a new user to the database
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            const defaultStats = {
                strength: 1,
                stamina: 1,
                agility: 1,
                user_id: user._id,
                exercises: []
            };

            const userStats = await Stats.create(defaultStats);

            return { token, user };
        },

        // Add a new exercise to the database
        addExercise: async (parent, { exercise_name, type, description, points }) => {
            const exercise = await Exercise.create({ exercise_name, type, description, points });
            return exercise;
        },

        // Add a new state to a user
        addStats: async (parent, { strength, stamina, agility, user_id }) => {
            const stats = await Stats.create({ strength, stamina, agility, user_id });
            return stats;
        },

        // Update user stats
        updateStats: async (parent, { strength, stamina, agility, user_id }) => {
            const stats = await Stats.findOneAndUpdate(
                { user_id },
                { $set: { strength, stamina, agility } },
                { new: true }
            );
            return stats;
        },

        // Add exercise to users stats array
        addExerciseToStats: async (parent, { exercise_id, type, points }, context) => {
            if (!context.user) {
                throw new AuthenticationError('User must be logged in to perform this action.');
            }

            const stats = await Stats.findOne({ user_id: context.user._id });

            const updatedStats = await Stats.findOneAndUpdate(
                { user_id: context.user._id },
                { $push: { exercises: exercise_id }, $set: { [type.toLowerCase()]: stats[type.toLowerCase()] + points } },
                { new: true }
            ).populate('exercises').populate('user_id');

            return updatedStats;
        },

        // Remove exercise from users stats array
        removeExerciseFromStats: async (parent, { exercise_id, type, points }, context) => {
            if (!context.user) {
                throw new AuthenticationError('User must be logged in to perform this action.');
            }

            const stats = await Stats.findOne({ user_id: context.user._id });

            const updatedStats = await Stats.findOneAndUpdate(
                { user_id: context.user._id },
                { $pull: { exercises: exercise_id }, $set: { [type.toLowerCase()]: stats[type.toLowerCase()] - points } },
                { new: true }
            ).populate('exercises').populate('user_id');

            return updatedStats;
        },
    },
};

module.exports = resolvers;
