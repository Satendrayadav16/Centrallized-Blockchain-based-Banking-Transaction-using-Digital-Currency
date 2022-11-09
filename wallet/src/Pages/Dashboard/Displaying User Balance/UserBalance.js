import React, { useState, useEffect } from 'react'
import {useAuthValue} from '../../../Login Authentication/Authentication/AuthContext'


import axios from 'axios'
// import { url } from '../../config'

import './UserBalance.css';

const UserBalance = () => {

    // const [coin, setCoin] = useState(0);
    const {currentUser} = useAuthValue()



    useEffect(() => {
      getCoins();
    }, []);
  
    const getCoins =() => {
      const email = {email: currentUser?.email}
      axios.post(`http://localhost:3001/getData`, email).then(response => {
        console.log(response.data)
        const publicKey = response.data.publicKey;
        console.log(publicKey)

        })
      .catch(error => {
          alert(error)
      })

  
    };  

  return (
    <div> 
    <div style={{ marginTop: "120px"}} >
    <h4 className='Email-label'>
    <strong >Email: </strong>
          {currentUser?.email}
    </h4>
    <h5 className='Address-label'>
    <strong >Address: </strong>
    {/* {data.puKey} */}
    </h5>
    </div>
    </div>
  )
}

export default UserBalance