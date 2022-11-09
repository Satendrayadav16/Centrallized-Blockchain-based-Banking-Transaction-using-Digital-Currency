import React, { Component } from "react";
import axios from "axios";
import { url } from "../../config";
import TotalCoin from "./TotalCoin";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Link } from "react-router-dom";
import "./FirstTransaction.css";

class FirstTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiver: "",
      amount: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  

  submitHandler = async(e) => {
    e.preventDefault();
    console.log(this.state);
    await axios
      .post(`${url}/MIT`, this.state)
      .then((response) => {
        console.log(response);
        this.setState.receiver("")
        this.setState.amount("")
        return "Transaction Completed"
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { receiver, amount } = this.state;
    return (
      <div className="transactionPlatform">
       <div className="TotalCoins">
       <TotalCoin />
       </div>
        <div className="BankTransactionDetails">
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxwidth: "400px",
            alignContent: "center",
          }}
          onSubmit={this.submitHandler}
        >
          <h2 className="BankTransactionDetailslabel">Make Transaction</h2>

          <label htmlFor="recipient" className="FormLabel">
            receiver
          </label>
          <input
            className="Banktransactioninfo"
            type="text"
            id="receiver"
            name="receiver"
            placeholder="receiver Id......."
            onChange={this.changeHandler}
            value={receiver}
            required
          />
          <label htmlFor="amount" className="FormLabel">
            amount
          </label>
          <input
            className="Banktransactioninfo"
            type="number"
            id="amount"
            name="amount"
            placeholder="Total amount"
            onChange={this.changeHandler}
            value={amount}
            required
          />
          <Popup trigger={<button type="submit"> Send </button>} position="top">
            <div>Transaction Sent</div>
            <Link to="/firstTransaction">
              <button
                className="ButtonTransaction"
                onClick={() => window.location.reload(false)}
              >
                OK 
              </button>
            </Link>
          </Popup>
        </form>
        </div>
      </div>
    );
  }
}

export default FirstTransaction;
