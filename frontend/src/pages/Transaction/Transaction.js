import React, { useState} from 'react';
import { useNavigate} from "react-router-dom";
import axios from "axios";
import "./Transaction.css";
import { toast } from "react-toastify";
import {url} from '../../config' 


const initialState = {
  sender: "",
  recipient: "",
  amount: "",
  signature: "",
  balance: "",
  remarks: ""
};
const Transactions = () => {
  const [state, setState] = useState(initialState);

  const {  sender,
    recipient,
    amount,
    signature,
    balance,
    remarks} = initialState;
  // const [ setData] = useState([]);

const Navigate = useNavigate();
const addTransaction = async (data) => {
  const response = await axios.post(`${url}/SM`);
    if (response.status === 200) {
      toast.success(response.data);
    }
};  
  
const handleSumbit = (e) => {
  e.preventDefault();
  if (!sender || !recipient || !amount || !signature || !balance || !remarks){
    toast.error("Provide the Value in Field")
  }else{
  addTransaction(state);
  Navigate.push("/SM");
}
};

const handleInputChange = (e) => {
  let{sender, value} =e.target;
  setState({...state, [sender]: value})
};


  // useEffect(() => {
  //   getBlocks();
  // }, []);

  //   const getBlocks = async () => {
  //   const response = await axios.get("http://localhost:3001/blocks");
  //   if (response.status === 200) {
  //     setData(response.data);
  //   }
  // }; 

//   console.log("data=>", data)

  return (
    
    <div className='MakeTransaction'>
    
      <form 
     
      style={{
        margin: "auto", 
        padding: "15px", 
        maxwidth: "400px", 
        alignContent: "center", 
        }}
        onSubmit={handleSumbit}
      >
         <h2 className='TransactionDetails'>Make Transaction</h2>
  
         <label htmlFor='sender' className='FormLabel'>sender</label>
         <input className='transactioninfo'
            type="text"
            id="sender"
            name="sender"
            placeholder="Sender Id......."
            onChange={handleInputChange}
            // value={sender}
            required
         />
         <label htmlFor='recipient'className='FormLabel'>recipient</label>
         <input className='transactioninfo'
            type="text"
            id="recipient"
            name="recipient"
            placeholder="recipient Id......."
            onChange={handleInputChange}
            // value={recipient}
            required
         />
         <label htmlFor='amount'className='FormLabel'>amount</label>
         <input className='transactioninfo'
            type="text"
            id="amount"
            name="amount"
            placeholder="Total amount"
            onChange={handleInputChange}
            // value={amount}
            required
         />
         <label htmlFor='signature'className='FormLabel'>signature</label>
         <input className='transactioninfo'
            type="text"
            id="signature"
            name="signature"
            placeholder=" Digital Signature "
            onChange={handleInputChange}
            // value={signature}
            required
         />
          <label htmlFor='remarks'className='FormLabel'>remarks</label>
         <input className='transactioninfo'
            type="text"
            id="remarks"
            name="remarks"
            placeholder="remarks......."
            onChange={handleInputChange}
            // value={remarks}
            required
         />
      <input type= "submit" value="Send" />
      </form>

    </div>
  )

}
export default Transactions;