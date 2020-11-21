const axios = require('axios');
const { UEClient } = require('./client');

class Order {
    constructor (client) {
        this.token = client.token;
        this.address = client.address.addressId;
        this.clientId = client.id;
        this.url = 'https://ios-api-gateway.frichti.co';
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

    async getFirstSlot() {
        const slots = await axios.get(`${this.url}/slots?cart=${this.cart}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error);
        });

        this.slot = slots.data.find(slot => slot.type === 'DEFAULT');
    }

    static async setSlot() {
        const modifSlot = await axios.put(`${this.url}/carts/${this.cart}`, {
            deliveryDate: this.slot.day,
            deliverySlotId: this.slot.id
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error);
        });

        console.log(modifSlot.data.payment);
    }

    async orderProduct(productId) {

        const ticket = await axios.post(`${this.url}/carts/v2/${this.cart}/products/${productId}`, {}, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });

        await this.setSlot();
        return (ticket);
    }
}

exports.Order = Order