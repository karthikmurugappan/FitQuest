import React, { useState } from 'react';

// Uses Link for navigating to the home page.
import { Link } from 'react-router-dom';

// Uses the ADD_PROFILE mutation to create the user.
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';

// Auth function uses the token to authorize the user.
import Auth from '../utils/auth';

// SignUp function starts with empty values for the elements.
const SignUp = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

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
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  // The function returns this html and sets the values in the database to the values entered on the form.
  return (
    <main>
      <h4 className="">Sign Up</h4>
      <div className="">
        {data ? (
          <p>
            <Link to="/" />
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="Your username"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
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
            <button
              className=""
              style={{ cursor: 'pointer' }}
              type="submit">
              Submit
            </button>
          </form>
        )}

        {error && (
          <div className="">
            {error.message}
          </div>
        )}
      </div>
    </main>
  );
};

export default SignUp;