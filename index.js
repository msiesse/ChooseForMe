const axios = require('axios');
const fs = require('fs');
const { UEClient } = require('./Core/client');
const { Store } = require ('./Core/store');
const { Address } = require('./Core/address');
const { Order } = require('./Core/order');

async function main() {

    const client = new UEClient();

    const result = fs.readFileSync('./signin.txt')
    const content = result.toString().split(';');
    client.setEmail(content[0]);
    client.setPassword(content[1]);

    await client.authenticate();

    // Address tests
    const address_search = new Address(client);

    const address = await address_search.findAddress(content[2], content[3]);
    client.setAddress(address);

    // Store tests
    const store = new Store(client);
    
    products = await store.getProducts('live', 'plats-cuisines-group');

    const id = [];
    products.forEach((product, index, array) => {
        if (!id.includes(product.productId)) {
            id.push(product.productId);
        } else {
            array.splice(index, 1);
        }
    });

    let price = 0;
    let category;
    let randomProduct;
    while (category !== 'PLAT') {
        randomProduct = products[Math.floor(Math.random() * products.length)];
        price = randomProduct.price;
        category = randomProduct.category;
    }

    console.log(randomProduct);

    price -= 800;
    if (price < 0) {
        let priceSide = 0;
        while (priceSide >= (-price + 200) || priceSide < -price || category === 'PLAT') {
            randomProduct = products[Math.floor(Math.random() * products.length)];
            priceSide = randomProduct.price;
            category = randomProduct.category;
        }
        console.log(randomProduct);
    }

    // Order tests
    /*const order = new Order(client);

    await order.getCart();

    const slot = await order.getFirstSlot();

    const ticket = await order.orderProduct('1000918');
    const state = await order.checkout();*/




   /*const items = await axios.get('https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/homepage-group?rootslug=live', {
    headers: {
        'Authorization': `Bearer ${Buffer.from(login.data.token).toString('base64')}`
       }
   }).catch(function(error) { console.log(error.response) });

   console.log(items.data);*/
}

main();
            