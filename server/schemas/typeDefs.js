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
        user_id: ID
        exercises: [Exercise]
    }
   
    type Auth {
      # Add the fields relevant to your authentication process
      token: String
      user: User
    }

    type Query {
        users: [User]!
        user(userId: ID!): User
        me: User

    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        
        addStats(strength: Int, stamina: Int, agility: Int, user_id: ID): Stats
        updateStats(strength: Int, stamina: Int, agility: Int, user_id: ID): Stats
        addExercise(exercise_name: String!, type: String!, description: String!, points: Int!): Exercise


    }


`;

module.exports = typeDefs;