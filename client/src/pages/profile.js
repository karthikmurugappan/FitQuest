import React from 'react';

//===================================================
// Alot of the stuff on this page will need to match
// what is in the queries file. I believe the "me" and
// "profile" on line 37 below  will need to match the 
// names right above the fields contained in the query.
//===================================================


import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


// This imports the Exercise List js file for use on the page.
// import ExerciseList from '../components/ExerciseList';

// This imports the two queries in use on the page.
import { QUERY_SINGLE_USER, QUERY_ME} from '../utils/queries';

// Auth function uses the token to identify the "me" user.
import Auth from '../utils/auth';

const Profile = () => {
  const { profileId } = useParams();

  console.log({ profileId });

  // This runs one of two queries.  If an id is passed, the query single profile is run, if no id, it runs the query for the user's data.
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // This checks to see if data is returned by the query.
  const profile = data?.me || data?.profile || {};

  // If the user is logged in and the auth id matches the profile id navigate to the "me" page.
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // If there isn't a profile name returned by the auth file, tell them to log in.
  if (!profile?.name) {
    return (
      <h4>
        You need to be logged in to view your profile. Please Use the navigation links above to sign up or log in and continue your FitQuest!
      </h4>
    );
  }

  return (
    <div>
      <h2 className="">
        {profileId ? `${profile.name}'s` : 'Your'} exercise list:
      </h2>

      {/* {profile.exercises?.length > 0 && (
        <ExerciseList
          exercise={profile.exercise}
          isLoggedInUser={!profileId && true}
        />
      )} */}
    </div>
  );
};

export default Profile;
