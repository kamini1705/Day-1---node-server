const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.write('Welcome to the Node.js Server!');
    res.end();
  } else if (req.url === '/about') {
    res.write('This is the About page');
    res.end();
  } else if (req.url === '/contact') {
    res.write('This is the Contact page');
    res.end();
  } else {
    res.statusCode = 404;
    res.write('404: Page not found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});