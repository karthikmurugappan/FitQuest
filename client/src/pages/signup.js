import React, { useState } from 'react';
import NavBar from '../components/header';
// Uses Link for navigating to the home page.
import { Link } from 'react-router-dom';

// Uses the ADD_USER mutation to create the user.
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// Auth function uses the token to authorize the user.
import AuthService from '../utils/auth';

// SignUp function starts with empty values for the elements.
const SignUp = () => {
  const containerStyle = {
    position: 'relative',
    top: '50px',
    left: '50px',
    width: '500px',
    height: '600px',
    zIndex: 20,
    overflow: 'auto',
  }
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // This updates the state based on changes to the form.
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // This function submits the form.
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
      window.location.href="/profile"
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  };

return (

  <main className = "rpgui-content">
    <div className="rpgui-container framed login-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <h3>UserName</h3>
        <input
          className="form-input"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
        <h3>Email</h3>
        <input
          className="form-input"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <h3>Password</h3>
        <input
          className="form-input"
          placeholder="********"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button className="rpgui-button text-center py-3" style={{ cursor: '' }} type="submit">
          Submit
        </button>
      </form>

      {error && <div className="error-message">{error.message}</div>}
    </div>
  </main>

);
};

export default SignUp;