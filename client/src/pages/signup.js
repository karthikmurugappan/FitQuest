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
    } catch (e) {
      console.error(e);
    }
  };

  // The function returns this html and sets the values in the database to the values entered on the form.
//   return (
//     <main className = "">
//       <h4 className="">Sign Up</h4>
//       <div className="">
//         {data ? (
//           <p>
//             <Link to="/" />
//           </p>
//         ) : (
//           <form onSubmit={handleFormSubmit}>
//             <input
//               className="form-input"
//               placeholder="Your username"
//               name="username"
//               type="text"
//               value={formState.username}
//               onChange={handleChange}
//             />
//             <input
//               className="form-input"
//               placeholder="Your email"
//               name="email"
//               type="email"
//               value={formState.email}
//               onChange={handleChange}
//             />
//             <input
//               className="form-input"
//               placeholder="********"
//               name="password"
//               type="password"
//               value={formState.password}
//               onChange={handleChange}
//             />
//             <button
//               className=""
//               style={{ cursor: 'pointer' }}
//               type="submit">
//               Submit
//             </button>
//           </form>
//         )}

//         {error && (
//           <div className="">
//             {error.message}
//           </div>
//         )}
//       </div>
//     </main>
//   );
// };

// export default SignUp;

return (


  <main className = "rpgui-content">
    <div className="rpgui-container framed">
      <h4>Sign Up</h4>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.username}
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