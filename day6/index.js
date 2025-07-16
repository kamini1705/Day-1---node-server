const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/kaminiDB')
  .then(() => {
    console.log('✅ MongoDB Connected');
  })
  .catch((err) => {
    console.error('❌ Connection error:', err);
  });
