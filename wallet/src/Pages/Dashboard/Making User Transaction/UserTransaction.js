import React, { Component } from 'react'
import axios from 'axios'
import { url } from '../../../config'
import './UserTransaction.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Link } from "react-router-dom";

// sender, receiver, amount, priKey, remarks

class UserTransaction extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        sender: '',
        receiver: '',
        amount: '',
        priKey: '',
        remarks: ''
      }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
      e.preventDefault();
        console.log(this.state)
        axios.post(`${url}/SM`, this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        }

  render() {
    const {sender, receiver, amount, remarks} = this.state
    return (
      <div className='MakeTransaction'>
        <form className='BankTransactionDetails'
    style={{
      margin: "auto", 
      padding: "15px", 
      maxwidth: "400px", 
      alignContent: "center", 
      }}
      onSubmit={this.submitHandler}
    >
       <h2 className='MakeTransaction-label'>Make Transaction</h2>

       <label htmlFor='sender'className='FormLabel'>Sender</label>
       <input className='Banktransactioninfo'
          type="text"
          id="sender"
          name="sender"
          placeholder="sender Id......."
          onChange={this.changeHandler}
          value={sender}
          required
       />
       
       <label htmlFor='recipient'className='FormLabel'>receiver</label>
       <input className='Banktransactioninfo'
          type="text"
          id="receiver"
          name="receiver"
          placeholder="receiver Id......."
          onChange={this.changeHandler}
          value={receiver}
          required
       />
       <label htmlFor='amount'className='FormLabel'>amount</label>
       <input className='Banktransactioninfo'
          type="text"
          id="amount"
          name="amount"
          placeholder="Total amount"
          onChange={this.changeHandler}
          value={amount}
          required
       />
       <label htmlFor='remarks'className='FormLabel'>Remarks</label>
       <input className='Banktransactioninfo'
          type="text"
          id="remarks"
          name="remarks"
          placeholder="remarks......."
          onChange={this.changeHandler}
          value={remarks}
          required
       />
        
   <button type='submit' className='TransactionSumbit'> Send </button>
    
    </form>
    <Link to="/dashboard">
      <button className='UserTransaction-Back_button'><h2>Back</h2></button>
      </Link>
      </div>
    )
  }
}

export default UserTransaction