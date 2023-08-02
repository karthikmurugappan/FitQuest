import { gql } from '@apollo/client';

// Creates a profile.
export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// Logs in a user.
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
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

// Add exercise to stats
export const ADD_EXERCISE_TO_STATS = gql`
mutation AddExerciseToStats($exerciseId: String, $type: String, $points: Int) {
  addExerciseToStats(exercise_id: $exerciseId, type: $type, points: $points) {
    _id
    agility
    stamina
    strength
    exercises {
      _id
      description
      exercise_name
      points
      type
    }
    user_id {
      email
      username
      _id
    }
  }
}
`;

// Remove exercise from stats
export const REMOVE_EXERCISE_FROM_STATS = gql`
mutation removeExerciseFromStats($exerciseId: String, $type: String, $points: Int) {
  removeExerciseFromStats(exercise_id: $exerciseId, type: $type, points: $points) {
    exercises {
      _id
      exercise_name
    }
    stamina
    strength
    agility
    user_id {
      _id
      username
    }
  }
}
`;