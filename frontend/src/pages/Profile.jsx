import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <h2>Your Profile</h2>
      {user ? (
        <div>
          <p>Email: <strong>{user.email}</strong></p>
          <h3>Bookmarked Problems:</h3>
          <ul>
            {user.bookmarks.map(id => (
              <li key={id}>
                <a href={`/problems/${id}`}>{id}</a>
              </li>
            ))}
          </ul>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
