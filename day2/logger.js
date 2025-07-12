// logger.js
const fs = require('fs');
const LOG_FILE = 'log.txt';

function log(message) {
  const formatted = `[LOG]: ${message}\n`;
  fs.appendFileSync(LOG_FILE, formatted); // Appends log to log.txt
  console.log(formatted.trim()); // Also prints to console
}

module.exports = log;
