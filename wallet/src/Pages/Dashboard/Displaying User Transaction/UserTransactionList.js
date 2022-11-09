import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTransactionList.css";
import { Scrollbars } from "react-custom-scrollbars";
import { useAuthValue } from "../../../Login Authentication/Authentication/AuthContext";

const UserTransactionList = () => {
  const [data, setData] = useState([]);
  const [transactionExist, setTransactionExist] = useState(false);
  const [address, setAddress] = useState("");
  const { currentUser } = useAuthValue();
  const [puKey, setPuKey] = useState();

  // console.log(currentUser?.email)

  // useEffect(() => {
  //   getBlocks();
  // }, []);

    const userEmail = currentUser?.email;

    
    if(userEmail !== undefined){
      console.log(userEmail)
      const data = {email: userEmail}
      axios.post(`http://localhost:3001/getData`, data).then((response) => {
        console.log("dfjhkfhskf", data);
        // console.log(response.data)
        const publicKey = response.data.publicKey;
        // console.log(publicKey)
        setPuKey(publicKey);
      });
    }

    // const data = { address: puKey };
    const response =  axios.post(`http://localhost:3001/gt`, {address: puKey});
    console.log(response.data);
    if (response.data.length > 0) {
      setTransactionExist(true);
    }
    if (response.status === 200) {
      console.log(response.data)
      setData(response.data);
    }

  return (
    <div style={{ marginTop: "150px" }} className="Explorer-TransactionList">
      <h2>Transaction List</h2>
      <hr />
      <table className="styled-table-TransactionList">
        <Scrollbars style={{ width: 1000, height: 300 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "Center" }}>
                <h2>Amount</h2>
              </th>
              <th style={{ textAlign: "Center" }}>
                <h2>hash</h2>
              </th>
              <th style={{ textAlign: "Center" }}>
                <h2>TimeStamp</h2>
              </th>
            </tr>
          </thead>
          {transactionExist && (
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.input.amount}</td>
                      <td className="TransactionListData">{item.hash}</td>
                      <td>{item.input.timestamp}</td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </Scrollbars>
      </table>
    </div>
  );
};

export default UserTransactionList;
