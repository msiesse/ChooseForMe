const axios = require('axios');
const fs = require('fs');

async function main() {
    const login = await (axios.post('https://ios-api-gateway.frichti.co/auth/token', {
        email: 'martinsiesse@gmail.com',
        password: 'testAPI1',
        grant_type: 'password'
    }));

  //  console.log(login);

   const response = await axios.get('https://ios-api-gateway.frichti.co/customers/524693', {
       headers: {
        'Authorization': `Bearer ${Buffer.from(login.data.token).toString('base64')}`
       }
   }).catch(function(error) { console.log(error.response) });

   const items = await axios.get('https://ios-api-gateway.frichti.co/v6/menu/hubs/4/slugs/homepage-group?rootslug=live', {
    headers: {
        'Authorization': `Bearer ${Buffer.from(login.data.token).toString('base64')}`
       }
   }).catch(function(error) { console.log(error.response) });

   console.log(items.data);
}

main();
            