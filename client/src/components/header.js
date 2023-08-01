import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function ActiveNavBar() {
    const isLoggedIn = !!localStorage.getItem('id_token');
  
    const handleLogout = () => {
      // Clear the token from localStorage to log the user out
      localStorage.removeItem('id_token');
      // Reload the page to update the login status in the navbar
      window.location.reload();
    };
  
    return (
      <Nav className="justify-content-right">
        <h1>FitQuest</h1>
  
        <NavLink
          exact
          activeClassName="active"
          className="rpgui-button text-center py-3"
          to="/"
        >
          Home
        </NavLink>
  
        {!isLoggedIn && (
          <>
            <NavLink
              activeClassName="active"
              className="rpgui-button text-center py-3"
              to="/signup"
            >
              Sign Up
            </NavLink>
  
            <NavLink activeClassName="active" className="rpgui-button text-center py-3" to="/login">
              Login
            </NavLink>
          </>
        )}
  
        {isLoggedIn && (
          <>
            <NavLink
              activeClassName="active"
              className="rpgui-button text-center py-3"
              to="/profile"
            >spsp
            </NavLink>
  
            <button
              className="rpgui-button text-center py-3"
              onClick={handleLogout}
            >
              Logout
            </button>

            <h1>Hello</h1>
          </>
        )}
      </Nav>
    );
  }
  
  export default ActiveNavBar;