import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useAuthValue } from "../../../Login Authentication/Authentication/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../Login Authentication/firebase";
import { Scrollbars } from "react-custom-scrollbars";


function Dashboard() {
  const [coin, setCoin] = useState(0);

  //.............................User Details...........................................

  const { currentUser } = useAuthValue();
  const [puKey, setPuKey] = useState();
  const [data, setData] = useState([]);
  const [transactionExist, setTransactionExist] = useState(false);
  // const [address, setAddress] = useState("");

  const userEmail = currentUser?.email;

  if (userEmail !== undefined) {
    const data = { email: userEmail };

    axios.post(`http://localhost:3001/getData`, data).then((response) => {
      // console.log(response.data)
      const publicKey = response.data.publicKey;
      // console.log(publicKey)
      setPuKey(publicKey);
    });
  }

  //......................................................................................

  axios
    .post(`http://localhost:3001/bal`, { address: puKey })
    .then((response) => {
      setCoin(response.data);
    });

  //......................................................................................
  const add = {address: puKey};
  axios
  .post(`http://localhost:3001/gt`, add).then((response) => {
    if (response.data.length > 0) {
      setTransactionExist(true);
    }
      setData(response.data);
    
  
  });


  //..........................................................................................

  return (
    <div className="mainbody">
  {/* .................................................User Address............................................................................. */}
      <div style={{ marginTop: "120px" }}>
        <h5 className="Address-label">
          <strong>Address: </strong>
        </h5>
        <h6 className="Address-hash">{puKey}</h6>
      </div>

      <div className="UserBalance-Details ">{/* <UserBalance /> */}</div>
      {/* .....................................................User Transation History....................................................................... */}

      <div className="Transaction-List-History">
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
            <tbody className = "Table_Data">
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index} >
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
      </div>

      {/* ......................................................User Balance...................................................................       */}

      <h2 className="display-Coin-label">Balance: </h2>
      <div className="display-Coin">
        <h2>{coin / 100}</h2>
      </div>

      {/* ......................................................Making Transaction....................................................................... */}

      <div className="Send-Money-button">
        <Link to="/utx">
          <button>
            <h2>Send Money</h2>
          </button>
        </Link>
      </div>
      {/* .....................................................User LogOut............................................................................. */}

      <span onClick={() => signOut(auth)}>
        <Link to="/">
          <button className="Logout_buuton">
            <h3>Log Out</h3>
          </button>
        </Link>
      </span>
    </div>
  );
}
export default Dashboard;
