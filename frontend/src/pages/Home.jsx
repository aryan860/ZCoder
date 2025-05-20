import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to ZCoder</h1>
      <p>
        ZCoder is a collaborative coding platform where you can solve problems, bookmark them, and interact with peers in real-time rooms.
      </p>
      <Link to="/signup">
        <button style={{ marginTop: '1rem' }}>Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
