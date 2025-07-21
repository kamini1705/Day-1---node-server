const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/User');

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/day9db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//////////////// ROUTES BELOW ///////////////////

// Create a user
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get all non-deleted users
app.get('/users', async (req, res) => {
  const users = await User.find({ isDeleted: false });
  res.json(users);
});

// Update user
app.put('/users/:id', async (req, res) => {
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Soft delete user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.send('User soft deleted');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
