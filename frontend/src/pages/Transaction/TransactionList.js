import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Transactionlist.css";
import { Scrollbars } from "react-custom-scrollbars";

const TransactionList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getBlocks();
  }, []);

  const getBlocks = async () => {
    const response = await axios.get(
      `http://localhost:3001/getAllTransactions`
    );
    if (response.status === 200) {
      setData(response.data);
    }
  };

  return (
    <div style={{ marginTop: "150px" }} className="Explorer-TransactionList">
      <h2>Transaction List</h2>
      <hr />
      <table className="styled-table-TransactionList">
        <Scrollbars style={{ width: 500, height: 400 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "Center" }}>
                <h2>Block Height</h2>
              </th>
              <th style={{ textAlign: "Center" }}>
                <h2>hash</h2>
              </th>
              <th style={{ textAlign: "Center" }}>
                <h2>TimeStamp</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Link to={`/transactionDetails/${item.hash}`}>
                        {item.blockNumber}
                      </Link>
                    </td>
                    <td className="TransactionListData">
                      <Link to={`/transactionDetails/${item.hash}`}>
                        {item.hash.substring(0, 25)}...
                      </Link>
                    </td>
                    <td>{item.input.timestamp}</td>
                  </tr>
                );
              })}
          </tbody>
        </Scrollbars>
      </table>
    </div>
  );
};

export default TransactionList;
