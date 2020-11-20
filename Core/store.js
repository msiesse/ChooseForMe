const axios = require('axios');
const { UEClient } = require('./client');

class Store {
    constructor (client) {
        this.token = client.token;
    }

    async getAllProducts() {
        const products = [];

        const list = await axios.get('https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/homepage-group?rootslug=live', {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });

        Object.keys(list.data.collections).forEach(key => {
            for (let item of list.data.collections[key].items) {
                if (item.product !== undefined) {
                    products.push(item.product);
                }
            }
        });
        return(products);
    }
}

exports.Store = Store;