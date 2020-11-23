const express = require('express');
const bodyParser = require('body-parser');
const { TheMaker } = require('./maker');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/randomFrichti', async function (req, res) {
    const launch = new TheMaker();
    const result = await res.send(launch.mainMaker());
})

const result = fs.readFileSync('./host.txt')
const host = result.toString();

app.listen(3000, host, () => {
    console.log(`Listening host: ${host} on port 3000`);
});