import { gql } from '@apollo/client';

// Can view all profiles basic data.
export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      stats {
        _id
        strength
        stamina
        agility
        exercises {
          _id
          exercise_name
        }
      }
    }
  }
`;

// Can see the detailed data for a single user.
export const QUERY_SINGLE_USER = gql`
  query singleUser($username: String!) {
    user(username: $username) {
      _id
      username
      stats {
        _id
        strength
        stamina
        agility
        exercises {
          _id
          exercise_name
        }
      }
    }
  }
`;

// Display user stats
export const QUERY_STATS = gql`
  query allStats {
    stats {
      _id
      strength
      stamina
      agility
      exercises {
        _id
        exercise_name
      }
    }
  }
`;

// Displays all exercises.
export const QUERY_EXERCISES = gql`
  query allExercises {
    exercises {
      _id
      exercise_name
      type
      description
      points
    }
  }
`;

// Displays a single exercise.
export const QUERY_SINGLE_EXERCISE = gql`
  query singleExercise($exercise_name: String!) {
    exercise(exercise_name: $exercise_name) {
      _id
      exercise_name
      type
      description
      points
    }
  }
`;

// Displays the user's profile and detailed data.
export const QUERY_ME = gql`
query Query {
  me {
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

export const QUERY_ALL_STATS = gql`
query Query {
  allStats {
    agility
    stamina
    strength
    exercises {
      _id
      exercise_name
    }
    user_id {
      _id
      username
      email
    }
  }
}
`;