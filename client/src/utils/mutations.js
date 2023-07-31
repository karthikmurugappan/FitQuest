import { gql } from '@apollo/client';

// Creates a profile.
export const ADD_PROFILE = gql`
mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// Logs in a user.
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

// Adds an exercise to a user.
export const ADD_EXERCISE = gql`
mutation addExercise($profileId: ID!, $exercise: String!) {
    addExercise(profileId: $profileId, exercise: $excerise) {
      _id
      name
      exercises
    }
  }
`;

// Removes an exercise from a user.
export const REMOVE_EXERCISE = gql`
mutation removeExercise($exercise: String!) {
    removeSkill(exercise: $exercise) {
      _id
      name
      exercises 
    }
  }
`;