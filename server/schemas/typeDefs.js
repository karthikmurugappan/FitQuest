const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Exercise {
    _id: ID
    exercise_name: String
    type: String
    description: String
    points: Int
    }

  type Stats {
      _id: ID
      strength: Int
      stamina: Int
      agility: Int
      user_id: User
      exercises: [Exercise]
    }

  type Auth {
      token: String
      user: User
    }


  type Query {
        users: [User]
        userStats: Stats
        stats(user_id: ID!): Stats
        exercises: [Exercise]
        exercise(_id: ID!): Exercise
        me: Stats
    }


  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      updateStats(strength: Int, stamina: Int, agility: Int, user_id: ID): Stats

      addExerciseToStats(exercise_id:String, type:String, points:Int): Stats

      removeExerciseFromStats(exercise_id: ID!, user_id: ID!): Stats
      addStats(strength: Int, stamina: Int, agility: Int, user_id: ID): Stats
      addExercise(exercise_name: String!, type: String!, description: String!, points: Int!): Exercise
    }

`;

module.exports = typeDefs;