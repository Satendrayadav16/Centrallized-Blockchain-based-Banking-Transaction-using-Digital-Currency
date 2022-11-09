import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './block.css';
import {url} from '../../../config' 
import { Scrollbars } from 'react-custom-scrollbars';



const Home = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    const response = await axios.get(`${url}/blocks`);
   
    if (response.status === 200) {
      setData(response.data);
    }
  }; 


  return (
    <div className='container-Block' style={{ backgroundColor: '#137EE0' , marginTop:"150px"}}  >
    <div  className="BlockList" style={{  marginTop:"150px"}}  >

    <h2>Block List</h2>
    <hr />
      <table className="styled-table-BlockList">
      <Scrollbars style={{ width: 500, height: 400 }}>
        <thead>
          <tr>
            <th style ={{ textAlign: "Center" }}><h2>Block Height</h2></th>
            <th style ={{ textAlign: "Center" }}><h2>Block Hash</h2></th>
            <th style ={{ textAlign: "Center" }}><h2>TimeStamp</h2></th>
          </tr>
        </thead>
        

        <tbody>
       
          {
            data && data.map((item, index) => {
              return(
                <tr key={index}>
                  <td><Link to ={`/blocks/${item.blockHeight}`}>
                  {item.blockHeight}
                  </Link></td>
                  <td><Link to ={`/blocks/${item.blockHeight}`}>
                  {item.hash.substring(0, 25)}...
                  </Link></td>
                  <td>{item.timestamp}</td> 
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

export default Home