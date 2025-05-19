import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">ZCoder</Link>
      <div>
        <Link style={styles.link} to="/problems">Problems</Link>
        <Link style={styles.link} to="/editor">Editor</Link>
        <Link style={styles.link} to="/rooms">Rooms</Link>
        <Link style={styles.link} to="/profile">Profile</Link>
        {user ? (
          <>
            <span style={styles.userEmail}>{user.email}</span>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '10px 20px',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff'
  },
  link: {
    marginLeft: '15px',
    textDecoration: 'none',
    color: '#61dafb'
  },
  logoutButton: {
    marginLeft: '15px',
    background: 'transparent',
    color: '#ff4d4d',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  userEmail: {
    marginLeft: '15px',
    color: '#fff'
  }
};

export default Navbar;
