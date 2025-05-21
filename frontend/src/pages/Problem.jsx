import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const allProblems = [
  {
    _id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    tags: ['Array', 'HashMap']
  },
  {
    _id: '2',
    title: 'Longest Palindromic Substring',
    description: 'Find the longest palindromic substring in the given string.',
    tags: ['DP', 'String']
  },
  {
    _id: '3',
    title: 'Median of Two Sorted Arrays',
    description: 'Find the median of two sorted arrays of different sizes.',
    tags: ['Binary Search', 'Divide and Conquer']
  }
];

const Problem = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const { toggleBookmark, isBookmarked } = useAuth();

  const tags = [...new Set(allProblems.flatMap(p => p.tags))];
  const filteredProblems = selectedTag
    ? allProblems.filter(p => p.tags.includes(selectedTag))
    : allProblems;

  return (
    <div className="container">
      <h2>📚 Coding Problems</h2>

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
              <p><em>{problem.description}</em></p>
              <p>Tags: {problem.tags.join(', ')}</p>
            </div>
            <div style={styles.actions}>
              <Link to={`/problems/${problem._id}`} style={styles.button}>View</Link>
              <button
                style={styles.bookmarkBtn}
                onClick={() => toggleBookmark(problem._id)}
              >
                {isBookmarked(problem._id) ? '🔖' : '📑'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  tagBar: {
    marginBottom: '1rem',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  tag: {
    padding: '6px 14px',
    background: '#2d2d2d',
    border: '1px solid #444',
    borderRadius: '20px',
    color: '#00bcd4',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  activeTag: {
    padding: '6px 14px',
    background: '#00bcd4',
    color: '#000',
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
    background: 'var(--card)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.5rem'
  },
  button: {
    background: '#00bcd4',
    color: '#000',
    padding: '5px 10px',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  bookmarkBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.4rem',
    cursor: 'pointer',
    color: 'var(--text)'
  }
};

export default Problem;
