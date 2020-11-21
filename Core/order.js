const axios = require('axios');
const { UEClient } = require('./client');

class Order {
    constructor (client) {
        this.token = client.token;
        this.address = client.address.addressId;
        this.clientId = client.id;
    }

    async getCart() {
        const cart = await axios.post('https://ios-api-gateway.frichti.co/carts', {
            addressId: this.address,
            customerId: this.clientId,
            source: 'mobile-ios'
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });

        this.cart = cart.data.id;
    }

    async orderProduct() {

        const ticket = await axios.post(`https://ios-api-gateway.frichti.co/carts/v2/${this.cart}/products/1000918`, {}, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });

        return (ticket);
    }
}

exports.Order = Order