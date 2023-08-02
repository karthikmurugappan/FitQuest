import React, { useState } from 'react';

// Uses Link for navigating to the home page.
import { Link } from 'react-router-dom';

// Uses the LOGIN_USER mutation to create the user.
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

// Auth function uses the token to authorize the user.
import AuthService from '../utils/auth';

  
  

// Login function starts with empty values for the elements.
const Login = (props) => {
  const containerStyle = {
    position: 'relative',
    top: '-500px',
    left: '25px',
    width: '260px',
    height: '325px',
    zIndex: 10,
    overflow: 'auto',
  }
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // This empties the form once the form has been submitted.
    setFormState({
      email: '',
      password: '',
    });
  };

  // The function returns this html and logs in the user.
  return (
    
      <main className = "rpgui-content">
      <div className="rpgui-container framed" style={containerStyle}>
        <h4>Login</h4>"
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Your email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
          />
          <input
            className="form-input"
            placeholder="********"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange}
          />
          <button className="rpgui-button text-center py-3"  type="submit">
          Submit
        </button>
        </form>

        {error && <div className="error-message">{error.message}</div>}
      </div>
    </main>
    
  );
};

export default Login;