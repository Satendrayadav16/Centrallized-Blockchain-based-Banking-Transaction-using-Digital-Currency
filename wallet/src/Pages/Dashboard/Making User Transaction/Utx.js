import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../config";
import "./UserTransaction.css";
import "reactjs-popup/dist/index.css";
import { Link, Navigate } from "react-router-dom";
import { useAuthValue } from "../../../Login Authentication/Authentication/AuthContext";

// sender, receiver, amount, priKey, remarks

function Utx() {
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [priKey, setPriKey] = useState("");
  const [remarks, setRemarks] = useState("");
  const { currentUser } = useAuthValue();

  const transaction = async (e) => {
    e.preventDefault();

    const userEmail = currentUser?.email;

    if (userEmail !== undefined) {
      const data = { email: userEmail };

      axios.post(`http://localhost:3001/getData`, data).then((response) => {
        // console.log(response.data)
        const publicKey = response.data.publicKey;
        console.log(publicKey);
        setSender(publicKey);

        let data = {
          sender: publicKey,
          receiver: receiver,
          amount: amount,
          priKey: priKey,
          remarks: remarks,
          email: currentUser?.email,
        };
        console.log(currentUser?.email);
        console.log(sender);
        console.log(data);

        axios
          .post(`${url}/SM`, data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            alert(error);
          });
      });
    }

    setSender("");
    setReceiver("");
    setAmount("");
    setRemarks("");
    Navigate("/dashboard");
  };

  return (
    <div className="MakeTransaction">
      <form
        className="BankTransactionDetails"
        style={{
          margin: "auto",
          padding: "15px",
          maxwidth: "400px",
          alignContent: "center",
        }}
        onSubmit={transaction}
      >
        <h2 className="MakeTransaction-label">Make Transaction</h2>

        <label htmlFor="priKey" className="FormLabel">
          Private Key
        </label>
        <input
          className="Banktransactioninfo"
          type="text"
          id="priKey"
          name="priKey"
          placeholder="Sender Private Key"
          onChange={(e) => setPriKey(e.target.value)}
          value={priKey}
          required
        />

        <label htmlFor="recipient" className="FormLabel">
          receiver
        </label>
        <input
          className="Banktransactioninfo"
          type="text"
          id="receiver"
          name="receiver"
          placeholder="receiver Id......."
          onChange={(e) => setReceiver(e.target.value)}
          value={receiver}
          required
        />
        <label htmlFor="amount" className="FormLabel">
          amount
        </label>
        <input
          className="Banktransactioninfo"
          type="text"
          id="amount"
          name="amount"
          placeholder="Total amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          required
        />
        <label htmlFor="remarks" className="FormLabel">
          Remarks
        </label>
        <input
          className="Banktransactioninfo"
          type="text"
          id="remarks"
          name="remarks"
          placeholder="remarks......."
          onChange={(e) => setRemarks(e.target.value)}
          value={remarks}
          required
        />

        <button type="submit" className="TransactionSumbit">
          {" "}
          Send{" "}
        </button>
      </form>
      <Link to={`/dashboard`}>
        <button type="submit" className="UserTransaction-Back_button">
          <h2>Back</h2>
        </button>
      </Link>
    </div>
  );
}

export default Utx;
