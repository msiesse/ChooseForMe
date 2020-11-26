import React from 'react';
import { useLocation } from "react-router-dom";
import queryString from 'query-string';
import axios from 'axios';
import { host } from './host'

function App() {

    const search = useLocation();
    const reader = new FileReader()

    const { api_key } = queryString.parse(search);
    const onClick = async (event) => {
        event.preventDefault();

        await axios.post(`http://${host}:3001/randomFrichti`, {
            api_key
        });

    };

    return (
      <div>
        <button onClick={onClick}>Lancer la commande</button>
      </div>
    )
    
}

export default App;