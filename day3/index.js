// index.js
const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Express!');
});

// About route
app.get('/about', (req, res) => {
  res.send('This is the About page.');
});

// Contact route
app.get('/contact', (req, res) => {
  res.send('Contact us at: contact@example.com');
});

// Services route
app.get('/services', (req, res) => {
  res.send('Our Services: Web Development, Training, Support');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
