import React, { useState } from 'react';

const Rooms = () => {
  const [rooms] = useState([
    { name: 'DP Discussions' },
    { name: 'Graph Theory' },
    { name: 'Beginner Room' },
    { name: 'JavaScript Coders' },
    { name: 'System Design' }
  ]);

  return (
    <div className="container">
      <h2>💬 Interactive Rooms</h2>
      <div style={styles.roomList}>
        {rooms.map((room, i) => (
          <div key={i} style={styles.roomCard}>
            <h3 style={styles.roomTitle}>{room.name}</h3>
            <p style={styles.roomDesc}>
              Join the conversation on {room.name.toLowerCase()}.
            </p>
            <button style={styles.joinBtn}>Enter</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  roomList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  roomCard: {
    flex: '1 1 250px',
    backgroundColor: 'var(--card)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 6px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  roomTitle: {
    fontSize: '1.25rem',
    color: 'var(--accent)',
    marginBottom: '0.5rem'
  },
  roomDesc: {
    flex: 1,
    fontSize: '0.95rem',
    color: 'var(--text)'
  },
  joinBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Rooms;
