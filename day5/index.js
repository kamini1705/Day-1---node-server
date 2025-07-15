const express = require('express');
const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
  res.send('Welcome to Day 5 Express Server!');
});

// POST /register route
app.post('/register', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and email are required.');
  }

  res.send(`User ${name} with email ${email} registered.`);
});

app.listen(PORT, () => {
  console.log(`Day 5 server running on http://localhost:${PORT}`);
});
