const { UEClient } = require('../Core/client');

class Randominette {
    constructor(products) {
        this.products = products;
    }

    makeMenu(maxMenu) {
        const menu = []
        let price = 0;
        let category;
        let randomProduct;
        let total = 0;

        if (maxMenu < 950)
            maxMenu = 950;

        while (price > maxMenu || category !== 'PLAT') {
            randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
            price = randomProduct.price;
            category = randomProduct.category;
        }
        menu.push(randomProduct);

        total += price;
        price = 0;
        while ((total + price) < 800 || (total + price) >= maxMenu || category === 'PLAT') {
            randomProduct = this.products[Math.floor(Math.random() * this.products.length)];
            price = randomProduct.price;
            category = randomProduct.category;
        }
        menu.push(randomProduct);

        return (menu);
    }
}

exports.Randominette = Randominette;