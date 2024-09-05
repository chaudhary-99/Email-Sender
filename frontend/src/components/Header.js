// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Email Designer</h1>
        <nav>
          <ul className="nav-links">
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Design Email</Link>
            </li>
            <li className={location.pathname === '/send' ? 'active' : ''}>
              <Link to="/send">Send Email</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
