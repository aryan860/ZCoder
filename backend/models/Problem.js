// backend/models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String]
});

module.exports = mongoose.model('Problem', problemSchema);
