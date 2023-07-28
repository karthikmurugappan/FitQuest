const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the Class model
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

    type Query {}

    type Mutation {}


`;

module.exports = typeDefs;