const { User, Stats, Exercise } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        }
    },





    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            return user;
        },
        addStats: async (parent, { strength, stamina, agility, user_id }) => {
            const stats = await Stats.create({ strength, stamina, agility, user_id });
            return stats;
        },
        addExercise: async (parent, { exercise_name, type, description, points }) => {
            const exercise = await Exercise.create({ exercise_name, type, description, points });
            return exercise;
        }
    }









};

module.exports = resolvers;