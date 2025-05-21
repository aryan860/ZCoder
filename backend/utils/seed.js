// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const problems = [
  {
    title: 'Two Sum',
    description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    tags: ['Array', 'Hashing']
  },
  {
    title: 'Longest Palindromic Substring',
    description: 'Given a string, return the longest palindromic substring in it.',
    tags: ['DP', 'String']
  },
  {
    title: 'Knapsack Problem',
    description: 'Find the maximum value that can be put in a knapsack of a given capacity.',
    tags: ['DP']
  }
];

async function seed() {
  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  console.log('Problems seeded!');
  mongoose.disconnect();
}

seed();
