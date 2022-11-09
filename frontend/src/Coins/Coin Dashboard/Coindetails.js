import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { url } from '../../config'

import './Coindetails.css';

const Coindetails = () => {

    const [coin, setCoin] = useState(0);
  
    useEffect(() => {
      getCoins();
    }, []);
  
    const getCoins = async () => {
      const response = await axios.get(`${url}/getTotalAmountCirculating`);
      if (response.status === 200) {
        setCoin(response.data);
      }
    };  

  return (
    <div className='coinDashboard'> 
    <div style={{ marginTop: "120px"}} >
      <h4 className='coin-metrics'>100 coin = Nrs 1</h4>
    <h2 className='coinDashboard-TotalAmount'>Total Amount Circulated In System</h2>
    <br/>
    <h3 className='coinDashboard-Nrs'>Nrs.</h3>
    <h1 className='coinDashboard-TotalCoinAmount'> {coin/100}</h1>
    
    <div className='coinDashboard-TotalCoins'>
    <br/>
    <hr/>
    <h2 >Total Number of Coins Circulating: {coin}</h2>
    </div>
   <div className='coinDashboard-Message'>
   <hr/>
    <hr/>
    <p>This is the total amount in NRS created by Bank. It is the amount in Nrs being circulated as digital money. </p>
      <hr />
   </div>
    </div>
    </div>
  )
}

export default Coindetails