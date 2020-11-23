const express = require('express');
const bodyParser = require('body-parser');
const { TheMaker } = require('./maker');

const app = express();
app.use(bodyParser.json());

app.get('/someTest', async function (req, res) {
    const launch = new TheMaker();
    const result = await res.send(launch.mainMaker());
    console.log(result.data);
})

app.listen(3000, '192.168.1.164', () => {
    console.log("Listening on port 3000");
});