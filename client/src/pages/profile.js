import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ExerciseList from '../components/ExerciseList';
import { QUERY_SINGLE_USER, QUERY_ME } from '../utils/queries';
import AuthService from '../utils/auth';

const Profile = () => {


    return (
        <div>
            <h2 className="">
                hello world
            </h2>
        </div>
    );


    //   const { username: userParam } = useParams();

    //   console.log({ userParam }); // Updated variable name

    //   const { loading, data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, {
    //     variables: { id: userParam }, // Updated variable name
    //   });

    //   const profile = data?.me || data?.user || {};

    //   if (AuthService.loggedIn() && AuthService.getProfile()._id === profile._id) {
    //     // Updated property name
    //     return <Navigate to="/profile" />;
    //   }

    //   if (loading) {
    //     return <div>Loading...</div>;
    //   }

    //   if (!profile?.name) {
    //     return (
    //       <h4>
    //         You need to be logged in to view your profile. Please use the navigation links above to sign up or log in and continue your FitQuest!
    //       </h4>
    //     );
    //   }

    //   return (
    //     <div>
    //       <h2 className="">
    //         {userParam ? `${profile.name}'s` : 'Your'} exercise list:
    //       </h2>
    //       <ExerciseList /> {/* Render the ExerciseList component */}
    //     </div>
    //   );
};

export default Profile;