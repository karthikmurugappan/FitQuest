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
        <Nav variant="tabs"
            activeKey="/"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <h1>FitQuest</h1>
            <Link
                onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'rpgui-button' : 'rpgui-button'}
                to="/"
            >
                Home
            </Link>
            <Link
                onClick={() => handlePageChange('signUp')}
                className={currentPage === 'signUp' ? 'rpgui-button' : 'rpgui-button'}
                to="/signup"
            >
                Sign up
            </Link>
            <Link
                onClick={() => handlePageChange('Profile')}
                className={currentPage === 'Profile' ? 'rpgui-button' : 'rpgui-button'}
                to="/profile"
            >
                Profile
            </Link>
            <Link
                onClick={() => handlePageChange('Login')}
                className={currentPage === 'Login' ? 'rpgui-button' : 'rpgui-button'}
                to="/login"
            >
                Login
            </Link>
        </Nav>
    );
}

export default NavBar;