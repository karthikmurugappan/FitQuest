// Import the things necessary to render the page.
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import './profile.css'
import bluePotion from '../styles/img/icons/potion-blue.png'
import 'bootstrap/dist/css/bootstrap.min.css';


// This imports the two queries in use on the page.
import { QUERY_ME, QUERY_EXERCISES } from '../utils/queries';
import { ADD_EXERCISE_TO_STATS, REMOVE_EXERCISE_FROM_STATS } from '../utils/mutations';

// Auth function uses the token to identify the "me" user.  Leaving this commented out for use later.
// import Auth from '../utils/auth';

// This retrieves the exercise list.
const Profile = () => {

    const [addExerciseToStats] = useMutation(ADD_EXERCISE_TO_STATS);
    const [removeExerciseFromStats] = useMutation(REMOVE_EXERCISE_FROM_STATS);

    const { loading, data } = useQuery(QUERY_EXERCISES, {
        fetchPolicy: "no-cache"
    });

    const exerciseList = data?.exercises || [];

    const { loading: userDataLoading, data: currentUserData } = useQuery(QUERY_ME, {
        fetchPolicy: "no-cache"
    });

    const userExerciseList = currentUserData?.me.exercises || [];

    const userInfo = currentUserData?.me || {};

    // This is the drop down functionality.
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const filteredCards = selectedCategory === 'All' ? exerciseList : exerciseList.filter(card => card.type === selectedCategory);

    return (

        <Container className="rpgui-container framed-golden">
            <div>
                {userDataLoading ? (<h2>Loading...</h2>) : (


                    <div className="row pt-3 pb-3">
                        <div className="user-name">{userInfo.user_id.username}</div>
                        <div className="stat-list col text-info text-center" >Strength:  {userInfo.strength}</div>
                        <div className="stat-list col text-warning text-center" >Stamina:  {userInfo.stamina}</div>
                        <div className="stat-list col text-danger text-center" >Agility:  {userInfo.agility}</div>
                    </div>
                )}
                <div className="pb-1 scroll" >
                    <Row>
                        <Col xs={3} className="e-header">
                            Name
                        </Col>
                        <Col xs={2} className="e-header">
                            Type
                        </Col>
                        <Col xs={1} className="e-header">
                            Points
                        </Col>
                        <Col xs={5} className="e-header">
                            Description
                        </Col>
                        <Col xs={1} className="e-header">
                            Del
                        </Col>
                    </Row>
                    {userExerciseList.map((exerciseList, _id) =>
                        <div className="p-2 border-bottom text-white">
                            <Row>
                                <Col xs={3}>
                                    {exerciseList.exercise_name}
                                </Col>
                                <Col xs={2}>
                                    {exerciseList.type}
                                </Col>
                                <Col xs={1}>
                                    {exerciseList.points}
                                </Col>
                                <Col xs={5}>
                                    {exerciseList.description}
                                </Col>
                                <Col>
                                    <Button variant='danger' onClick={async () => {
                                        await removeExerciseFromStats({
                                            variables: {
                                                exerciseId: exerciseList._id,
                                                type: exerciseList.type,
                                                points: exerciseList.points
                                            }
                                        })
                                        window.location.assign('/profile')
                                    }} as="button">-
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                    )}
                </div>

                <h1>Choose an Excercise Quest to Complete</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>Filter by Exercise Type:</Form.Label>
                        <Form.Control className=" rpgui-dropdown-imp" as="select" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="All">All</option>
                            <option value="Strength">Strength</option>
                            <option value="Stamina">Stamina</option>
                            <option value="Agility">Agilty</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Row className="flex-wrap overflow-auto">
                    {filteredCards.map((exercise, _id) => (
                        <Col xs={12} md={6} lg={4} key={exercise._id}>
                            <Card className="custom-card">
                                <Card.Body>
                                    <Card.Title className="custom-title">{exercise.exercise_name}</Card.Title>
                                    <div className="custom-type">Type: {exercise.type}</div><br></br>
                                    <div className="custom-description">{exercise.description}</div> <br></br>
                                    <div className="align-items-center">
                                        <img src={bluePotion} className="custom-icon" alt="Blue Potion" />
                                        <div className="custom-points">Potion: {exercise.points}p</div>
                                    </div>
                                </Card.Body>
                                <Button variant='success' onClick={async () => {
                                    await addExerciseToStats({
                                        variables: {
                                            exerciseId: exercise._id,
                                            type: exercise.type,
                                            points: exercise.points
                                        }
                                    })
                                    window.location.assign('/profile')
                                }} as="button">+
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container >
    );
};

export default Profile;