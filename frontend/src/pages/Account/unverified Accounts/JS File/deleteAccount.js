import React, { useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from "axios";
import '../Css File/DeleteAccount.css';
import {url} from '../../../../config' 


const DeleteAccount =  () => {

  const [account, setAccount] = useState();
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


    const verify = async (data) => {
    const response = await axios.post(`${url}/removeAccountCreationRequest`,data);
    if (response.status === 200) {
        console.log(response)
    }
    
  }; 


  return (
    <div style={{ marginTop: "150px" }} >

      <div className='Delete-card-transactiondetails'>
        <div className='Delete-header-transactiondetails'>
             <h1><p>Account has Been Deleted</p></h1> 

        </div>
        <div className='Delete-container-transactiondetails'>
      
          <Link to ="/unverifiedAccounts">
            <button className='Delete-button-transactiondetails' onSubmit={verify(data)}><h2>OK</h2></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount