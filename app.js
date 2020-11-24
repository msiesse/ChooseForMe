const express = require('express');
const bodyParser = require('body-parser');
const { TheMaker } = require('./maker');
const fs = require('fs');
const https = require('https');
const http = require('http');


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

const app = express();
app.use(bodyParser.json());

const apiKey = fs.readFileSync('./api_key.txt').toString();

console.log();

app.get(`/randomFrichti`, async function (req, res) {
    const launch = new TheMaker();
    if (req.query.API_KEY === apiKey) {
        const result = await res.send(launch.mainMaker());
    } else {
        console.log('Bye');
    }
})

const result = fs.readFileSync('./host.txt')
const host = result.toString();

https.createServer(options, app).listen(3000, host, () => {
    console.log(`${host} listening on port 3000`);
})