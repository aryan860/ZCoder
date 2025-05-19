import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Problem = () => {
  const [problems, setProblems] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/problems');
        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error("Failed to fetch problems:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  const tags = [...new Set(problems.flatMap(p => p.tags))];

  const filteredProblems = selectedTag
    ? problems.filter(p => p.tags.includes(selectedTag))
    : problems;

  return (
    <div style={styles.container}>
      <h2>📚 Coding Problems</h2>

      {loading ? (
        <p>Loading problems...</p>
      ) : (
        <>
          <div style={styles.tagBar}>
            <button
              style={selectedTag === null ? styles.activeTag : styles.tag}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {tags.map(tag => (
              <button
                key={tag}
                style={selectedTag === tag ? styles.activeTag : styles.tag}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <ul style={styles.list}>
            {filteredProblems.map(problem => (
              <li key={problem._id} style={styles.card}>
                <div style={{ flex: 1 }}>
                  <h3>{problem.title}</h3>
                  <p>Tags: {problem.tags.join(', ')}</p>
                </div>
                <div style={styles.actions}>
                  <Link to={`/editor?problemId=${problem._id}`} style={styles.button}>
                    Solve
                  </Link>
                  <button style={styles.bookmarkBtn}>🔖</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem'
  },
  tagBar: {
    marginBottom: '1rem',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '5px 12px',
    background: '#eee',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  activeTag: {
    padding: '5px 12px',
    background: '#282c34',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: 'bold'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem'
  },
  button: {
    background: '#61dafb',
    color: '#000',
    padding: '5px 10px',
    textDecoration: 'none',
    borderRadius: '5px'
  },
  bookmarkBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer'
  }
};

export default Problem;
