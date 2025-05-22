import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container">🔒 Please log in to view your profile.</div>;
  }

  return (
    <div className="container">
      <h2>👤 Profile</h2>
      <p>Email: {user.email}</p>

      <h3 style={{ marginTop: '2rem' }}>📌 Bookmarked Problems</h3>

      {(!user.bookmarks || user.bookmarks.length === 0) && (
        <p>You haven't bookmarked any problems yet.</p>
      )}

      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
        {user.bookmarks?.map((problem, i) => {
          const valid = problem && problem.title && problem.slug;
          return (
            <li key={i} style={{ marginBottom: '0.5rem' }}>
              {valid ? (
                <Link to={`/problems/${problem.slug}`} style={styles.link}>
                  {problem.title}
                </Link>
              ) : (
                <span style={styles.missing}>⚠️ Problem not found</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const styles = {
  link: {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  missing: {
    color: '#d9534f',
    fontStyle: 'italic'
  }
};

export default Profile;
