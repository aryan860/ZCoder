import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ZCoder</Link>
      <div className="nav-right">
        <Link to="/problems">Problems</Link>
        <Link to="/editor">Editor</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/profile">Profile</Link>
        {user ? (
          <>
            <span style={{ color: '#ccc', marginLeft: '1rem' }}>{user.email}</span>
            <button onClick={logout} style={{ marginLeft: '1rem', background: 'none', color: 'red' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
