import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';

function ActiveNavBar() {

  const isLoggedIn = AuthService.loggedIn();
  const userName = isLoggedIn ? AuthService.getProfile().username : null;
  // console.log(userName)
  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/'
  };

  return (
    <Nav className="justify-content-right">
      <h1 className="logofitquest">FitQuest</h1>


      <NavLink
        activeClassName="active"
        className="rpgui-button text-center py-3"
        to="/leaderboard"
      >
        Leaderboard
      </NavLink>

      {!isLoggedIn && (
        <>
          <NavLink
            exact
            activeClassName="active"
            className="rpgui-button text-center py-3"
            to="/"
          >
            Home
          </NavLink>
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
          >Profile
          </NavLink>

          <NavLink
            activeClassName="active"
            className="rpgui-button text-center py-3"
            onClick={handleLogout}
          >
            Logout
          </NavLink>
        </>
      )}
    </Nav>

  );
}

export default ActiveNavBar;