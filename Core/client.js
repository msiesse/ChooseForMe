const fs = require('fs');

class UEClient {

    setEmail(email) {
        this.email = email;
    }

    setPassword(password) {
        this.password = password;
    }

}

exports.UEClient = UEClient;