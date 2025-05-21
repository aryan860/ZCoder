import React from 'react';
import { useParams } from 'react-router-dom';

const mockProblems = {
  1: {
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    tags: ['Array', 'HashMap'],
    input: 'nums = [2,7,11,15], target = 9',
    output: '[0,1]',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ]
  },
  // Add more problems here
};

const ProblemDetails = () => {
  const { id } = useParams();
  const problem = mockProblems[id];

  if (!problem) return <div className="container">Problem not found.</div>;

  return (
    <div className="container">
      <h2>{problem.title}</h2>
      <p><strong>Description:</strong> {problem.description}</p>
      <p><strong>Input:</strong> {problem.input}</p>
      <p><strong>Output:</strong> {problem.output}</p>
      <p><strong>Constraints:</strong></p>
      <ul>
        {problem.constraints.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <p><strong>Tags:</strong> {problem.tags.join(', ')}</p>
    </div>
  );
};

export default ProblemDetails;
