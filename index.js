const fs = require('fs');

const hello = 'Hello World!';

console.log(hello);

const text = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(text);