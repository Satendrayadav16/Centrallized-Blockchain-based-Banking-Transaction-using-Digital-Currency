import React, { useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from "axios";
import '../Css File/VerifiedAccount.css';
import {url} from '../../../../config' 


const VerifyAccount =  () => {
  console.log("hello")

  const [account, setAccount] = useState();
  
//   const { accountAddress } = useParams();
//   const data = {height : parseInt(accountAddress)};

  const {accountAddress} = useParams();
  const data = {address:accountAddress};  

  useEffect(() => { 
    getAccountDetails(data);
  }, []);

  const getAccountDetails = async (data) => {

    const response = await axios.post(`${url}/getUnverifiedAccountByAddress`,data);
    if (response.status === 200) {
        setAccount({ ...response.data });
    }
    
  }; 
  console.log("hello")


    const verify = async (data) => {
    const response = await axios.post(`${url}/VA`,data);
    if (response.status === 200) {
      console.log("hello")
        console.log(response)
    }
    
  }; 


  return (
    <div style={{ marginTop: "150px" }} >

      <div className='Verify-card-transactiondetails'>
        <div className='Verify-header-transactiondetails'>
             <h1><p>Account has Been Verified</p></h1> 

        </div>
        <div className='Verify-container-transactiondetails'>
      
          <Link to ="/unverifiedAccounts">
            <button className='Verify-button-transactiondetails' onSubmit={verify(data)}><h2>OK</h2></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount