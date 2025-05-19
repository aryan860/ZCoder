import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to ZCoder</h1>
      <p>A collaborative coding platform to learn, practice, and grow together.</p>
      <Link to="/signup" style={styles.button}>Get Started</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center'
  },
  button: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px'
  }
};

export default Home;
