const axios = require('axios');
const { UEClient } = require('./client');

class Order {
    constructor (client) {
        this.token = client.token;
    }

    async orderProduct() {

        const list = await axios.get(`https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/${type}?rootslug=${store}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}