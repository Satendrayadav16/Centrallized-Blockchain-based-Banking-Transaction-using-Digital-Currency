import React, { useState, useEffect } from 'react';
import {useParams, Link } from 'react-router-dom';
import axios from "axios";
import '../Css File/UnverifiedAccountListDetails.css';
import {url} from '../../../../config' 


const UnverifiedAccountListDetails =  () => {
  
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
  

  return (
    <div style={{ marginTop: "150px" }} >

      <div className='Unverified-card-transactiondetails'>
      <div className="Unverified-header-userdetails" style={{ textAlign: "Center" }}>
        <h2>Account Detail</h2>
      </div>
       
        <div className='Unverified-container-transactiondetails'>
          
          <strong>Name: </strong>
          <span>{account && account.name}</span>
          <br />
          <br />
          <strong>CitizenshipNumber: </strong>
          <span>{account && account.citizenshipNumber}</span>
          <br />
          <br />
          <strong>Account Address: </strong>
          <span>{account && account.accountAddress.substring(0, 35)}</span>
          <br />
          <span>{account && account.accountAddress.substring(36, 90)}</span>
          <br />
          <span>{account && account.accountAddress.substring(91, 130)}</span>
          <br />
          <br />
          <strong>Role: </strong>
          <span>{account && account.role}</span>
          <br />
          <br />         
          <Link to ={`/verifyAccount/${account && account.accountAddress}`}>
            <button className='Unverified-button-transactiondetails'>verify</button>
          </Link>
          <Link to ={`/deleteAccount/${account && account.accountAddress}`}>
            <button className='delete-button-transactiondetails'>Delete</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UnverifiedAccountListDetails