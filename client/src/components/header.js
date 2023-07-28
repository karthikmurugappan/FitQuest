import Nav from 'react-bootstrap/Nav';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
            <Link
                onClick={() => handlePageChange('Home')}
                className={currentPage === 'Home' ? 'nav-link active' : 'rpgui-button'}
                to="/"
            >
                Home
            </Link>
            <Link
                onClick={() => handlePageChange('SignUp')}
                className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
                to="/signup"
            >
                Sign up
            </Link>
            <Link
                onClick={() => handlePageChange('Profile')}
                className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
                to="/profile"
            >
                Profile
            </Link>
            <Link
                onClick={() => handlePageChange('Login')}
                className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
                to="/login"
            >
                Login
            </Link>
        </Nav>
    );
}

export default NavBar;