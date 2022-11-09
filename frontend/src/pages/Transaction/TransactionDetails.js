import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./TransactionDetails.css";
import { url } from "../../config";

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState();

  const { hash } = useParams();
  const data = { hash: hash };
  const [amt, setAmt] = useState();
  const [reciever, setReciever] = useState();


  useEffect(() => {
    getSingleTransaction();
    amount();
  }, []);

  const getSingleTransaction = async () => {
    const response = await axios.post(`${url}/getTransactionByHash`, data);
    if (response.status === 200) {
      setTransaction({ ...response.data[0] });
    }
  };

  const amount = async () => {
    axios.post(`${url}/getTransactionByHash`, data)
    .then(response => {
      console.log(response.data)
      let sender = response.data[0].input.sender;
      response.data[0].outputs.forEach(element => {
       if(element.address !== sender){
        let amt = element.amount;
        setAmt(amt);

        let add = element.address.slice(0,60)+'...';
        setReciever(add)
        console.log(add)

        console.log(amt)
      }
      });

      })
    .catch(error => { 
        alert(error)
    })
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card-transactiondetails">
        <div className="card-header-transactiondetails">
          <p>Transaction Detail</p>
        </div>
        <div className="container-transactiondetails">
          <strong>ID: </strong>
          <span>{transaction && transaction.id}</span>
          <br />
          <br />
          <strong>TimeStamp: </strong>
          <span>{transaction && transaction.input.timestamp}</span>
          <br />
          <br />
          <strong>Amount: </strong>
          <span>{ amt}</span>
          <br />
          <br />
          <strong>Sender: </strong>
          <span>
            {transaction && transaction.input.sender.substring(0, 60)}...
          </span>
          <br />
          <br />
          <strong> Reciever: </strong>
          <span>
            {reciever}
          </span>
          <br />
          <br />
          <strong>Remark: </strong>
          <span>{transaction && transaction.remark}</span>
          <br />
          <br />
          <strong>Transaction Hash: </strong>
          <span>{transaction && transaction.hash.substring(0, 55)}...</span>
          <br />
          <br />
          <strong>blockNumber: </strong>
          <Link to={`/blocks/${transaction && transaction.blockNumber}`}>
            <span>{transaction && transaction.blockNumber}</span>
          </Link>
          <br />
          <br />

          <Link to="/">
            <button className="button-transactiondetails">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
