const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// 👇 Add this route
app.get('/', (req, res) => {
  res.send('Welcome to Kamini\'s CRUD API 🚀');
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/kaminiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB Connected');
}).catch(err => {
  console.error('❌ Connection Error:', err);
});

// Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// 🔹 POST: Create new user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 GET: Fetch all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// 🔹 BONUS: Get user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
