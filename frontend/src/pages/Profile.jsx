import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>Your Profile</h2>
      {user ? (
        <div className="message-box">
          <p>Email: <strong>{user.email}</strong></p>
          <p>Bookmarks and activity will be shown here.</p>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
