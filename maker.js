const axios = require('axios');
const fs = require('fs');
const { UEClient } = require('./Core/client');
const { Store } = require ('./Core/store');
const { Address } = require('./Core/address');
const { Order } = require('./Core/order');
const { Randominette } = require('./Random/random');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

class TheMaker {

    async mainMaker() {

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
    
        const products = await store.getProducts('live', 'plats-cuisines-group');

        const id = [];
        products.forEach((product, index, array) => {
            if (!id.includes(product.productId)) {
                id.push(product.productId);
            } else {
                array.splice(index, 1);
            }
        });

        const maker = new Randominette(products);

        const menu = maker.makeMenu(1200);

        // Cart tests

        const order = new Order(client);

        await order.getCart();

        for (let i = 0; i < menu.length; i++) {
            await order.orderProduct(menu[i].productId);
        }

        await order.getFirstSlot();
        await order.setSlot();

        const checkout = await order.checkout();

        if (checkout)
            console.log(checkout.data);
    }
}  

async function main() {
    const theMaker = new TheMaker();

    await theMaker.mainMaker();
}

//main();

module.exports.TheMaker = TheMaker;