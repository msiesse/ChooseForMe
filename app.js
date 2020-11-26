const express = require('express');
const bodyParser = require('body-parser');
const { TheMaker } = require('./maker');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiKey = fs.readFileSync('./api_key.txt').toString();

app.post(`/randomFrichti`, async function (req, res) {
    const launch = new TheMaker();
    console.log(req);
    if (req.body.apiKey === apiKey) {
        const result = await launch.mainMaker();
        res.send("It's good");
    } else {
        console.log('Bye');
        res.send("Dommage, c'est perdu");
    }
})

const result = fs.readFileSync('./host.txt')
const host = result.toString();

https.createServer(options, app).listen(3001, host, () => {
    console.log(`${host} listening on port 3001`);
})