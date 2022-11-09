import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { url } from "../../../../config";
import { Scrollbars } from "react-custom-scrollbars";
import '../Css/AccountList.css'

const AccountList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    const response = await axios.get(`${url}/getAllAccount`);

    if (response.status === 200) {
      setData(response.data);
    }
  }; 

  return (
    <div
      className="Account-container-Block"
      style={{ backgroundColor: "#137EE0", marginTop: "150px" }}
    >
      <div className="AccountList" >
        <h2 className="Accountlist-Label">Account List</h2>
        <hr />
        <table className="styled-table-AccountList">
          <Scrollbars style={{ width: 580, height: 400 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "Center" }}>
                  <h2>name</h2>
                </th>
                <th style={{ textAlign: "Center" }}>
                  <h2>Account Address</h2>
                </th>
                <th style={{ textAlign: "Center" }}>
                  <h2>Citizenship Number</h2>
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                      {item.accountAddress.substring(0, 50)}
                      <br />
                      {item.accountAddress.substring(51, 100)}
                      <br />
                      {item.accountAddress.substring(101, 130)}
                      </td>
                      <td>{item.citizenshipNumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Scrollbars>
        </table>
      </div>
    </div>
  );
};

export default AccountList;
