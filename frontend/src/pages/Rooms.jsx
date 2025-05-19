import React from 'react';

const Rooms = () => {
  return (
    <div style={styles.container}>
      <h2>Interactive Rooms</h2>
      <p>Join or create a room to collaborate in real time.</p>
      <div style={styles.roomsList}>
        <div style={styles.roomCard}>Room #1 - JavaScript Practice</div>
        <div style={styles.roomCard}>Room #2 - DSA Prep</div>
        <div style={styles.roomCard}>Room #3 - Open Discussion</div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem'
  },
  roomsList: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  roomCard: {
    padding: '1rem',
    background: '#f0f0f0',
    borderRadius: '5px'
  }
};

export default Rooms;
