const fs = require('fs');
const axios = require('axios');

class UEClient {

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

    setToken(token) {
        this.token = Buffer.from(token).toString('base64');
    }

    setAddress(address) {
        this.address = address;
    }

    setId(id) {
        this.id = id;
    }

    authenticate() {
        const $this = this;

        return (axios.post('https://ios-api-gateway.frichti.co/auth/token', {
            email: this.email,
            password: this.password,
            grant_type: 'password'
        }).then(function (response) {
            console.log("Authentification succesful");
            $this.setToken(response.data.token);
            $this.setId(response.data.id);
        }).catch(function (error) {
            console.log(error.response.data.error);
        }));
    }

}

exports.UEClient = UEClient;