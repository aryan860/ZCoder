const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const authMiddleware = require('../middleware/auth');

// Get all problems, with optional filtering by tags
router.get('/', async (req, res) => {
  try {
    const { tags } = req.query;
    let filter = {};

    if (tags) {
      const tagsArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      filter.tags = { $all: tagsArray };
    }

    const problems = await Problem.find(filter).sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get a single problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(500).send('Server error');
  }
});

// Create a new problem (protected route)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, input, output, constraints, tags, difficulty } = req.body;

  try {
    const newProblem = new Problem({
      title,
      description,
      input,
      output,
      constraints,
      tags: tags.map(tag => tag.toLowerCase()),
      difficulty,
      createdBy: req.user,
    });

    const problem = await newProblem.save();
    res.status(201).json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a problem by ID (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, input, output, constraints, tags, difficulty } = req.body;

  const updatedFields = {};
  if (title) updatedFields.title = title;
  if (description) updatedFields.description = description;
  if (input) updatedFields.input = input;
  if (output) updatedFields.output = output;
  if (constraints) updatedFields.constraints = constraints;
  if (tags) updatedFields.tags = tags.map(tag => tag.toLowerCase());
  if (difficulty) updatedFields.difficulty = difficulty;

  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Optional: only allow the creator or admins to update
    if (problem.createdBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(problem);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(500).send('Server error');
  }
});

// Delete a problem by ID (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Optional: only allow the creator or admins to delete
    if (problem.createdBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await problem.remove();
    res.json({ message: 'Problem removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
