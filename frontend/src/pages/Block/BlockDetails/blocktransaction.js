import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { url } from "../../../config";
import "./blocktransaction.css";

const Blocktransaction = () => {
  const [transaction, setTransaction] = useState();

  const { blockHeight } = useParams();
  const data = { height: parseInt(blockHeight) };
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    getSingleTransaction(data);
  }, []);

  const getSingleTransaction = async (data) => {
    const response = await axios.post(
      `${url}/getTransactionByBlockHeight`,
      data
    );
    if (response.data.length > 0) {
      setIsPresent(true);
    }

    if (response.status === 200) {
      setTransaction({ ...response.data[0] });
    }
  };

  return (
    <div className="card-blocktransaction">
      <div className="card-header-blocktransaction-label">
        <h3>Transaction List</h3>
      </div>
      <div className="container-blocktransaction">
        <table className="styled-table-TransactionList">
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
          {isPresent && (
            <tbody>
              <tr>
                <td>
                  <Link
                    to={`/transactionDetails/${
                      transaction && transaction.hash
                    }`}
                  >
                    {transaction && transaction.blockNumber}
                  </Link>
                </td>
                <td className="TransactionListData">
                  <Link
                    to={`/transactionDetails/${
                      transaction && transaction.hash
                    }`}
                  >
                    {transaction && transaction.hash.substring(0, 25)}...
                  </Link>
                </td>
                <td>{transaction && transaction.input.timestamp}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Blocktransaction;
