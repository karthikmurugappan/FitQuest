import { gql } from '@apollo/client';

// Can view all profiles basic data.
export const QUERY_PROFILES = gql`
query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }

`;

// Can see the detailed data for a single profile.
export const QUERY_SINGLE_PROFILE = gql`
query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

// Displays the user's profile and detailed data.
export const QUERY_ME = gql`
query me {
    me {
      _id
      name
      skills
    }
  }
`;