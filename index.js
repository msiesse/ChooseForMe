const axios = require('axios');
const fs = require('fs');
const readline = require('readline');
const { UEClient } = require('./Core');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {

    const client = new UEClient();

    rl.question("Email: ", async email => {
        rl.question("Password: ", async password => {
            await client.authenticate(email, password);
            rl.close();
        });
    });

    rl.on("close", function () {
        console.log("Exit Programm");
        process.exit(0);
    })

   /*const items = await axios.get('https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/homepage-group?rootslug=live', {
    headers: {
        'Authorization': `Bearer ${Buffer.from(login.data.token).toString('base64')}`
       }
   }).catch(function(error) { console.log(error.response) });

   console.log(items.data);*/
}

main();
            