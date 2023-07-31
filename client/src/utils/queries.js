import { gql } from '@apollo/client';

// Can view all profiles basic data.
export const QUERY_PROFILES = gql`
query allUsers {
    profiles {
      _id
      name
    }
  }

`;

// Can see the detailed data for a single profile.
export const QUERY_SINGLE_PROFILE = gql`
query user(userId: ID!) {
    user(userId: ID!) {
      _id
      name
      
    }
  }
`;

// Displays the user's profile and detailed data.
export const QUERY_ME = gql`
query me {
    me {
      _id
      name
    }
  }
`;