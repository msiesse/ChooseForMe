const axios = require('axios');

async function main() {
    const login = await (axios.post('https://ios-api-gateway.frichti.co/auth/token', {
        email: 'martinsiesse@gmail.com',
        password: 'testAPI1',
        grant_type: 'password'
    }));

  //  console.log(login);

   const response = await axios.get('https://ios-api-gateway.frichti.co/customers/524693', {
       headers: {
        'Authorization': `Bearer ${btoa(login.data.token)}`
       }
   }).catch(function(error) { console.log(error.response) });

   console.log(response);
}

main();
            