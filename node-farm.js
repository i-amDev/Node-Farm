const http = require('http');
const fs = require('fs');

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard= fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
};

// Create a server
const server = http.createServer((request, response) => {

    const pathName = request.url;

    // Overview page
    if (pathName === '/overview' || pathName === '/') {
        response.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(element => replaceTemplate(templateCard, element)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        
        response.end(output);
    }

    // Product page
    else if (pathName === '/product') {
        response.end('This is the PRODUCT');
    }

    // API
    else if (pathName === '/api') {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.end(data);
    }

    // Not found
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