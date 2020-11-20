const axios = require('axios');
const fs = require('fs');
//const readline = require('readline');
const { UEClient } = require('./Core/client');
const { Store } = require ('./Core/store');

/*const rl = readline.createInterface({
    input: fs.createReadStream('./signin.txt'),
    output: process.stdout
});*/

async function main() {

    const client = new UEClient();

    const result = fs.readFileSync('./signin.txt')
    const content = result.toString().split(';');
    client.setEmail(content[0]);
    client.setPassword(content[1]);

    await client.authenticate();
    const store = new Store(client);
    
    products = await store.getAllProducts();
    products.forEach(product => {
        console.log(product.productId);
    })
    console.log(products.length);

   /*const items = await axios.get('https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/homepage-group?rootslug=live', {
    headers: {
        'Authorization': `Bearer ${Buffer.from(login.data.token).toString('base64')}`
       }
   }).catch(function(error) { console.log(error.response) });

   console.log(items.data);*/
}

main();
            