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
        const cart = await axios.post(`${this.url}/carts`, {
            addressId: this.address,
            customerId: this.clientId,
            source: 'mobile-ios'
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error.response);
        });

      //  this.cart = 'c82617fe-fbc7-4ee4-89b8-926b8e9e24b0';
        this.cart = cart.data.id;
    }

    async getFirstSlot() {
        const slots = await axios.get(`${this.url}/slots?cart=${this.cart}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error.response);
        });

        this.slot = slots.data.find(slot => slot.type === 'DEFAULT');
    }

    async setSlot() {
        const modifSlot = await axios.put(`${this.url}/carts/${this.cart}`, {
            deliveryDate: this.slot.day,
            deliverySlotId: this.slot.id
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error.response);
        });
    }

    async getPaymentMethod() {
        const userInfos = await axios.get(`${this.url}/customers/${this.clientId}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error.response);
        });

        return (userInfos.data.paymentMethods[0].id);
    }

    async setPaymentMethod(type, idCredit) {
        //Some verification with a card with not enough fund
            if (idCredit !== 628410)
                idCredit = 628410;
        const pMethod = await axios.post(`${this.url}/carts/${this.cart}/payment?type=${type}`, {
            id: idCredit
        }, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch((error) => {
            console.log(error.response);
        })
    }

    async orderProduct(productId) {

        const ticket = await axios.post(`${this.url}/carts/v2/${this.cart}/products/${productId}`, {}, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error.response);
        });

        return (ticket);
    }

    async getContentCart() {
        const data = await axios.get(`${this.url}/carts/${this.cart}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function(error) {
            console.log(error.response);
        })

        return (data);
    }

    async checkout() {
        await this.setPaymentMethod('creditCards', this.getPaymentMethod());

        const state = await axios.post(`${this.url}/orders/checkout/${this.cart}`, {}, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error.response);
        });

        return (state);
    }
}

exports.Order = Order