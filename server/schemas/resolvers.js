const { User, Stats, Exercise } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        // users: async () => {
        //     return User.find().populate('stats');
        // },
        userStats: async (parent, args, context) => {
            // console.log(context.user._id);
            return Stats.findOne({ user_id: context.user._id }).populate('exercises').populate('user_id');

        },
        // user: async (parent, { username }) => {
        //     return User.findOne({ username }).populate('stats');
        // },
        stats: async (parent, { user_id }) => {
            return Stats.findOne({ user_id }).populate('exercises');
        },

        allStats: async () => {
            return Stats.find().populate('exercises').populate('user_id');
        },

        exercises: async () => {
            return Exercise.find();
        },
        exercise: async (parent, { _id }) => {
            return Exercise.findOne({ _id });
        },
        me: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                return await Stats.findOne({ user_id: context.user._id }).populate('user_id').populate('exercises');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
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


            const defaultStats = {
                strength: 1,
                stamina: 1,
                agility: 1,
                user_id: user._id, // Assuming you have the user's _id after creation
                exercises: [] // You can initialize this as an empty array
              };

            const userStats = await Stats.create(defaultStats);

            return { token, user};
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
        addExerciseToStats: async (parent, { exercise_id, type, points }, context) => {
            if (!context.user) {
                throw new AuthenticationError("User must be logged in to perform this action.");
            }
            // console.log(context.user._id);

            const stats = await Stats.findOne({ user_id: context.user._id });
            // console.log("stats",stats, type);

            // console.log("before points", points);

            const updatedStats = await Stats.findOneAndUpdate(
                { user_id: context.user._id },
                { $push: { exercises: exercise_id }, $set: { [type.toLowerCase()]: stats[type.toLowerCase()]+points} },
                { new: true }
            ).populate('exercises').populate('user_id');
            console.log(updatedStats);



            return updatedStats;
        },



        removeExerciseFromStats: async (parent, { exercise_id, type, points },context) => {
            if (!context.user) {
                throw new AuthenticationError("User must be logged in to perform this action.");
            }
            // console.log(context.user._id);

            const stats = await Stats.findOne({ user_id: context.user._id });
            console.log("stats",stats, type);

            // console.log("before points", points);

            const updatedStats = await Stats.findOneAndUpdate(
                { user_id: context.user._id },
                { $pull: { exercises: exercise_id }, $set: { [type.toLowerCase()]: stats[type.toLowerCase()] - points } },
                { new: true }
            ).populate('exercises').populate('user_id');
            console.log(updatedStats);

            return updatedStats;
        },

}


};
module.exports = resolvers;