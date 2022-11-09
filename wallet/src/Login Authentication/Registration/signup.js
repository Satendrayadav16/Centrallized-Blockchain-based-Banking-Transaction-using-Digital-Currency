import React, { Component } from 'react'
import axios from 'axios'
import { url } from '../../config'
import './Register.css'



export class SignUp extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      priKey: '',
      puKey: '',
      name: '',
      citizenshipNumber: ''
    }
  }


  changeHandler = e => {
      this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
      console.log(this.state)
      axios.post(`${url}/CA`, this.state)
          .then(response => {
            console.log(response)
              alert(response)

            })
          .catch(error => {
              alert(error)
          })
      }

  render() {
    const {priKey, puKey, name, citizenshipNumber} = this.state
    return (
      <div className='register_signup'>
        <form 
    style={{
      margin: "auto", 
      padding: "15px", 
      maxwidth: "400px", 
      alignContent: "center", 
      }}
      onSubmit={this.submitHandler}
      className='register__container_form '
      action='/register'
    >
       <h2 className='createAccountLabel'>Create Account</h2>

      
       <label htmlFor='priKey'className='FormLabel'><h3>Private Key: </h3></label>
       <input className='register__textBox'
          type="text"
          id="priKey"
          name="priKey"
          placeholder="Private Key......."
          onChange={this.changeHandler}
          value={priKey}
          required
       />
       <br />
       <label htmlFor='puKey'className='FormLabel'><h3> Public Key: </h3></label>
       <input className='register__textBox'
          type="text"
          id="puKey"
          name="puKey"
          placeholder="Public Key"
          onChange={this.changeHandler}
          value={puKey}
          required
       />
       <br />
       <label htmlFor='name'className='FormLabel'><h3>Name: </h3></label>
       <input className='register__textBox'
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          onChange={this.changeHandler}
          value={name}
          required
       />
       <br />
       
       <label htmlFor='citizenshipNumber'className='FormLabel'><h3>Citizenship Number: </h3></label>
       <input className='register__textBox'
          type="text"
          id="citizenshipNumber"
          name="citizenshipNumber"
          placeholder="Citizenship Number"
          onChange={this.changeHandler}
          value={citizenshipNumber}
          required
       />
       <br />
      

        {/* <a href="/register"><h2>NEXT</h2></a> */}
       {/* <button className='register__btn' type='submit' > Next </button> */}
<input className='register__btn_Form' type='submit' value="Next" />
    </form>
      </div>
    )
  }
  }


export default SignUp