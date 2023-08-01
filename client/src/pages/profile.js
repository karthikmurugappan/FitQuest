import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';


// This imports the Exercise List js file for use on the page.
// import ExerciseList from '../components/ExerciseList';

// This imports the two queries in use on the page.
import { QUERY_ME, QUERY_EXERCISES } from '../utils/queries';

// Auth function uses the token to identify the "me" user.
import Auth from '../utils/auth';

const Profile = () => {

    const { loading, data } = useQuery(QUERY_EXERCISES, {
        fetchPolicy: "no-cache"
    });

    const exerciseList = data?.exercises || [];

    const { loading: userDataLoading, data: currentUserData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });

    const userExerciseList = currentUserData?.exercises || [];
    console.log(userExerciseList);

    console.log(currentUserData);

    const userInfo = currentUserData?.me || {};
    // console.log(userInfo.user_id.email);

    return (
        <div>
            {userDataLoading ? (<h2>Loading...</h2>) : (
                <div className="row">
                    <div className="col text-info text-center" >Strength:{userInfo.strength} </div>
                    <div className="col text-white text-center" >Stamina:{userInfo.strength} </div>
                    <div className="col text-white text-center" >Agility:{userInfo.strength} </div>
                    {/* {userInfo.user_id.username}
                    {userInfo.user_id.email}
                    {userInfo.agility}
                    {userInfo.strength}
                    {userInfo.stamina} */}
                </div>
            )}


            {/* <div className="row">{ userInfo.user_id.email}</div> */}

            <h2>Exercises:</h2>
            <ul className="square">
                <div className="row">
                    <div className="col text-white text-center" >Exercise Name</div>
                    <div className="col text-white text-center">Type</div>
                    <div className="col-5 text-white text-center">Description</div>
                    <div className="col text-white text-center">Points</div>
                </div>
                {exerciseList.map((exercise) => {
                    return (
                        <li key={exercise._id}>
                            <Link to={{ pathname: `/exercise/${exercise._id}` }}>
                                <div className="row">
                                    <div className="col text-center">{exercise.exercise_name}</div>
                                    <div className="col text-center">{exercise.type}</div>
                                    <div className="col-5">{exercise.description}</div>
                                    <div className="col text-center">{exercise.points}</div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
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