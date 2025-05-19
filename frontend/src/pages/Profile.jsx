import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <h3 style={styles.center}>Please log in to view your profile.</h3>;

  return (
    <div style={styles.container}>
      <h2>👤 {user.email}</h2>
      <p>Saved Problems: (Coming Soon)</p>
      <p>Solutions Submitted: (Coming Soon)</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem'
  },
  center: {
    padding: '2rem',
    textAlign: 'center'
  }
};

export default Profile;
