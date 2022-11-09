import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from "axios";
import './SearchTransaction.css'
import { Scrollbars } from 'react-custom-scrollbars';


const SearchTransaction = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
 
  useEffect(() => {
    getBlocks();
  }, []); 

  const getBlocks = async () => {
    
    const response = await axios.get(`http://localhost:3001/getAllTransactions`);
    if (response.status === 200) {
      setData(response.data);
    }
  }; 
  
  console.log("data=>", data) 

//   const maxChar = 20
//     if (data.text.length > maxChar) {
//     data.text = data.text.substring(0, maxChar) + " . . ."
// }
             

  return (
    <div >
        <input className="SearchBar" type="text" placeholder="Search by Sender Account Address..." onChange={event => {setSearchTerm(event.target.value)}}/>
    <div  className="SearchTransactionList"> 
        <h2>Transaction List</h2>
    <hr />
      <table className="styled-table-TransactionList">
      <Scrollbars style={{ width: 1000, height: 400 }}>
        <thead>
          <tr>
          <th style ={{ textAlign: "Center" }}><h2>BlockNumber</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>ID</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>TimeStamp</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>Amount</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>Sender</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>remark</h2></th>
          <th style ={{ textAlign: "Center" }}><h2>hash</h2></th>
          </tr>
        </thead>
        <tbody>
          {
            data && data.filter((val)=>{
                if (searchTerm == "") {
                    return val
                } else if (val.input.sender.includes(searchTerm)) {
                    return val
                }
            }).map((item, index) => {
              return(
                <tr key={index}>
                     <td>
                  {item.blockNumber}
                  </td>
                   <td>
                  {item.id.substring(0, 10)}...
                  </td>
                  <td>
                  {item.input.timestamp}
                  </td>
                  <td>
                  {item.input.amount}
                  </td>
                  <td className='TransactionListData'>
                  {item.input.sender.substring(0, 10)}...
                  </td>
                  <td>
                  {item.remark}
                  </td>
                  <td>
                  {item.hash.substring(0, 10)}...
                  </td>
                  
                </tr> 
              )
            })
          }
        </tbody>
        </Scrollbars>
      </table>
    </div>
    </div>
  )

}

export default SearchTransaction