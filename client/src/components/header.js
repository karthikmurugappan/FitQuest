import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import '../styles/app.scss';



function NavBar() {
    const [currentPage, setCurrentPage] = useState('Home');
    const location = useLocation();

    useEffect(() => {
        const pathname = location.pathname;
        const titleCasePage =
            pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);
        setCurrentPage(pathname === '/' ? 'Home' : titleCasePage);
    }, [location.pathname]);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="rpgui-content">
        <Nav className="justify-content-right">
            
                <h1>FitQuest</h1>
                <Link
                    onClick={() => handlePageChange('Home')}
                    className={currentPage === 'Home' ? 'rpgui-button text-center py-3' : 'rpgui-button text-center py-3'}
                    to="/"
                >
                    Home
                </Link>
                <Link
                    onClick={() => handlePageChange('signUp')}
                    className={currentPage === 'signUp' ? 'rpgui-button text-center py-3' : 'rpgui-button text-center py-3'}
                    to="/signup"
                >
                    Sign Up
                </Link>
                <Link
                    onClick={() => handlePageChange('Profile')}
                    className={currentPage === 'Profile' ? 'rpgui-button text-center py-3' : 'rpgui-button text-center py-3'}
                    to="/profile"
                >
                    Profile
                </Link>
                <Link
                    onClick={() => handlePageChange('login')}
                    className={currentPage === 'login' ? 'rpgui-button text-center py-3' : 'rpgui-button text-center py-3'}
                    to="/login"
                >
                    Login
                </Link>
            
        </Nav>
    </div>
    );
}

export default NavBar;