import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import "../Css File/unverifiedAccountList.css";
import { Scrollbars } from "react-custom-scrollbars";

const UnverifiedAccountList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const response = await axios.get(`http://localhost:3001/UA`);
    if (response.status === 200) {
      setData(response.data);
    }
  };

  return (
    <div>
      <h2 className="UnverifiedAccountListheader">UnverifiedAccountList</h2>

      <div style={{ marginTop: "150px" }} className="UnverifiedAccountList">
        <table className="styled-table-UnverifiedAccountList">
          <Scrollbars style={{ width: 600, height: 280 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "Center" }}>
                  <h2>Name </h2>
                </th>
                <th style={{ textAlign: "Center" }}>
                  <h2>Account Number </h2>
                </th>
                <th style={{ textAlign: "Center" }}>
                  <h2>Citizenship Number </h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.accountAddress.substring(0, 25)}...</td>
                      <td>
                        <Link
                          to={`/unverifiedAccountslistDetails/${item.accountAddress}`}
                        >
                          {item.citizenshipNumber}
                        </Link>
                      </td>
                      <button>
                        <Link
                          to={`/unverifiedAccountslistDetails/${item.accountAddress}`}
                        >
                          View Detail
                        </Link>
                      </button>
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

export default UnverifiedAccountList;
