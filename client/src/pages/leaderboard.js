import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { Card, Col, Container, Table, Form } from 'react-bootstrap';


// This imports the two queries in use on the page.
import { QUERY_USERS } from '../utils/queries';


// Auth function uses the token to identify the "me" user.
import Auth from '../utils/auth';

function Leaderboard() {
    const { loading, error, data } = useQuery(QUERY_USERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <Container>
        <h1>Leaderboard</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Strength</th>
              <th>Stamina</th>
              <th>Agility</th>
              <th>Exercises</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.stats.strength}</td>
                <td>{user.stats.stamina}</td>
                <td>{user.stats.agility}</td>
                <td>
                  {user.stats.exercises.map((exercise) => (
                    <span key={exercise._id}>{exercise.exercise_name}, </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }

  export default Leaderboard;