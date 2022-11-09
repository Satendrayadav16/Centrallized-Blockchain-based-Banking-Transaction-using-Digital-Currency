import React from 'react'
import image from '../../Image/landing.png'
import './Landingpage.css'
import { Link } from "react-router-dom";


const Landingpage = () => {
  return (
   <div className='Landing-Page'>
     <div style={{ backgroundImage:`url('${image}')`,backgroundRepeat:"no-repeat",backgroundSize:"contain", height:610  }} >
    </div>
    <div>
    <Link to="/register">
            <button className="button-Register"><h3>Register</h3></button>
          </Link>
          <Link to="/login">
            <button className="button-login"><h3>Login</h3></button>
          </Link>   
    </div>

   </div>
  )
}

export default Landingpage