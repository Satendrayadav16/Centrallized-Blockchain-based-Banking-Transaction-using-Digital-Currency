import React, { useState, useEffect } from "react";

import axios from "axios";
import { url } from "../../config";

import './TotalCoin.css';

const TotalCoin = () => {
  const [coin, setCoin] = useState(0);

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = async () => {
    async function coin(){
      const response = await axios.get(`${url}/getTotalAmountCirculating`);
      if (response.status === 200) {
        setCoin(response.data);
      }

      setTimeout(coin,2000);

    }

    coin()
    
  };

  return (
    <div className="TotalCoindetail">
      <div style={{ marginTop: "55px" }}>
        <h4 className="coin-metrics">100 coin = Nrs 1</h4>
        <h2 className="totalAmountLabel">Total Amount Circulation In System</h2>

        <h3>Nrs.</h3>
        <h1> {coin}</h1>

        <hr />
      </div>
    </div>
  );
};

export default TotalCoin;
