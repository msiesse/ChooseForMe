import React from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import { host } from './host.js';

function App() {

    const { search } = useLocation();

    const { api_key } = queryString.parse(search);
    console.log(api_key);
    const onClick = async (event) => {
        event.preventDefault();

        await axios.post(`https://${host}:3001/randomFrichti`, {
            apiKey: api_key
        });

    };

    return (
      <div>
        <button onClick={onClick}>Lancer la commande</button>
      </div>
    )
    
}

export default App;