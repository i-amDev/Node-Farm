const http = require('http');

// Create a server
const server = http.createServer((request, response) => {
    response.end('Hello from the server!');
});

// Listen to server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000.');
});