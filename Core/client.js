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

    authenticate() {
        return (axios.post('https://ios-api-gateway.frichti.co/auth/token', {
            email: this.email,
            password: this.password,
            grant_type: 'password'
        }).then(function (response) {
            console.log("Authentification succesful");
            setToken(response.data.token);
        }).catch(function (error) {
            console.log(error);
        }));
    }

    authenticate(email, password) {
        return (axios.post('https://ios-api-gateway.frichti.co/auth/token', {
            email: email,
            password: password,
            grant_type: 'password'
        }).then(function (response) {
            console.log("Authentification succesful");
            setToken(response.data.token);
        }).catch(function (error) {
            console.log(error);
        })); 
    }

}

exports.UEClient = UEClient;