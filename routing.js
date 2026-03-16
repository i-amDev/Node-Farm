const http = require('http');
const url = require('url');

// Create a server
const server = http.createServer((request, response) => {

    const pathName = request.url;

    if (pathName === '/overview' || pathName === '/') {
        response.end('This is the overview...');
    }
    else if (pathName === '/product') {
        response.end('This is the PRODUCT');
    }
    else {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        response.end('<h1>Page not found!</h1>');
    }
});

// Listen to server
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000.');
});