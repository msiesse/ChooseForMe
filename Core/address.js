const axios = require('axios');
const { UEClient } = require('./client');

class Address {
    constructor (client) {
        this.token = client.token;
        this.url = 'https://ios-api-gateway.frichti.co';
    }

    async findAddress(number, street_name) {
        const address_name = number + ' ' + street_name;
        const street_array = street_name.split(' ');

        // Peut-être pas obligatoire, mais c'est comme ça que les recherches se font selon l'API
        street_array.forEach((word, index, array) => {
            array[index] = number + word;
        })
        const address_search = street_array.join(' ').replace(/ +/g, '%');
        const address = await axios.get(`${this.url}/addresses/search?q=${address_search}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }).catch(function (error) {
            console.log(error);
        });

        if (address !== undefined) {
            console.log(`Find an address for ${address_name}`);
        }
        return (address.data[0]);
    }
}

exports.Address = Address;