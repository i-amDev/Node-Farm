const fs = require('fs');

const hello = 'Hello World!';

// console.log(hello);

// Blocking, synchronous way
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textInput);

const textOutput = `This is what we know about avocado : ${textInput}. \nCreated on  ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOutput);

// console.log('File written!');

// Non-blocking, asynchronous way

fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
            console.log(data3);
            // Writing data in a file asynchronously.
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', error => {
                console.log('File has been written!');
            })
        });
    });
});
console.log('Reading file...');