const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/day10db', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

// --- CRUD Endpoints ---

// Create
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Read all (not deleted)
app.get('/users', async (req, res) => {
  const users = await User.find({ isDeleted: false });
  res.json(users);
});

// Update
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Soft Delete
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.send('User soft deleted');
});

// --- Advanced Queries ---

// Users older than 25, sort by name ascending
app.get('/adult-users', async (req, res) => {
  const result = await User.find({ age: { $gt: 25 }, isDeleted: false }).sort({ name: 1 });
  res.json(result);
});

// Limit and Select fields
app.get('/limited-users', async (req, res) => {
  const result = await User.find({ isDeleted: false }).limit(3).select('name email');
  res.json(result);
});

// Pagination (ex: ?page=2&limit=3)
app.get('/paginated-users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const users = await User.find({ isDeleted: false }).skip(skip).limit(limit);
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
