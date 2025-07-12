// index.js
const log = require('./logger');
const fs = require('fs');

// Use the logger (logs to file and console)
log("Server started.");
log("User logged in.");
log("Error: Invalid input.");

// Write to a file
fs.writeFileSync('data.txt', 'Hello Kamini!');

// Read from the file
const content = fs.readFileSync('data.txt', 'utf8');
console.log(content);
