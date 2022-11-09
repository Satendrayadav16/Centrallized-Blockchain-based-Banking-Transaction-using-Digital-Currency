
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import {useState, useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'

import { auth } from './Login Authentication/firebase';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './Components/Navigation Bar/Navbar';
import Register from './Login Authentication/Registration/Register';
import Dashboard from './Pages/Dashboard/main Page/Dashboard';
import Landingpage from './Pages/Landing Page/Landingpage';
import UserTransaction from './Pages/Dashboard/Making User Transaction/UserTransaction';
import UserTransactionList from './Pages/Dashboard/Displaying User Transaction/UserTransactionList';
import Login from './Login Authentication/Login/login';
import {AuthProvider} from './Login Authentication/Authentication/AuthContext';
import VerifyEmail from './Login Authentication/Registration/VerifyEmail';
// import PrivateRoute from './Login Authentication/Authentication/PrivateRoute';
import SignUp from './Login Authentication/Registration/signup';
import Reg from './Login Authentication/Registration/reg/reg';
import CreateAccount from './Login Authentication/Registration/CreateAccount';
import Utx from './Pages/Dashboard/Making User Transaction/Utx';


function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])



  return ( 
    
 
      <BrowserRouter>
      <Navbar />
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
      <Routes>
        <Route exact path='/' element = {<Landingpage />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/register' element = {<Register />} />
        <Route path='/verify-email' element ={<VerifyEmail />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/usertransaction' element = {<UserTransaction />} />
        <Route path='/usertransactionlist/:address' element = {<UserTransactionList />} />
        <Route path='/signup' element = {<SignUp />} />
        <Route path='/reg' element = {<Reg />} />
        <Route path='/createAccount' element = {<CreateAccount />} />
        <Route path ='/utx' element = {<Utx />} />
      </Routes>
      </AuthProvider>
      </BrowserRouter>
   
    

  );
}

export default App;
