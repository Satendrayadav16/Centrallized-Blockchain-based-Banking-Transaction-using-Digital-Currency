import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthValue } from "../Authentication/AuthContext";
import axios from "axios";
import {url} from '../../config'

// import "./CreateAccount.css";

function CreateAccount() {
  const [name, setName] = useState("");
  const [citizenshipNumber, setCitizenshipNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuthValue();
 


  const downloadTxtFile = (userData) => {
    let data = 
    '\r Name : '+ userData.UserName+ '\r\n' +
    '\r Citizenship Number : '+ userData.CitizenshipNumber+ '\r\n' +
    '\r Email : '+ userData.Email+ '\r\n' +
    '\r\n' +
    '\r Public Key : '+ userData.PublcKey+ '\r\n' +
    '\r\n' +
    '\r Private Key : '+ userData.PrivateKey+ '\r\n' +
    '\r\n' +
    '\r Info:  These Key Pairs are one time generated and cannot be recovered once lost, so keep it safe and donot share your Private Key.';

    const element = document.createElement("a");
    const file =  new Blob([data], {
        type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Keys.txt";
    document.body.appendChild(element);
    element.click();

  }
 


  const register = async (e) => {
    e.preventDefault();
    let data = {
        username: name,
        email: currentUser?.email,
        citizenshipNumber: citizenshipNumber
    }
    console.log(currentUser?.email)
console.log(data)
    axios.post(`${url}/CA`, data)
    .then(response => {
        console.log(response.data)

      //alert or message

      // download call
      const userData = {
        UserName: name,
        Email: currentUser?.email,
        CitizenshipNumber: citizenshipNumber,
        PublcKey: response.data.publicKey,
        PrivateKey: response.data.privateKey
      }
      console.log(userData)
      downloadTxtFile(userData)
      })
    .catch(error => {
        alert(error)
    })
    
    setName("");
    setCitizenshipNumber("");
    navigate("/dashboard");

  };

  return (
    <div className="Register-center">
      <div className="auth-register">
        <h2>Create Account</h2>
        {error && <div className="auth__error">{error}</div>}
        <form onSubmit={register} name="registration_form">
          <input
            type="name"
            value={name}
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="citizenshipNumber"
            value={citizenshipNumber}
            placeholder="Enter your citizenshipNumber"
            required
            onChange={(e) => setCitizenshipNumber(e.target.value)}
          />
          <div className="agreement">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              value="agreement"
              required
            />
            I agree to accept all the rules and responsibilty
          </div>
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
