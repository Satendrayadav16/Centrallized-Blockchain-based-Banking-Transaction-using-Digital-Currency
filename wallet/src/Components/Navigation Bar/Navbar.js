import React, { Component } from 'react'
import {  NavLink } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'
import './Navbar.css';

class Navbar extends Component {

 
 
    render() {

        return (

            <>

                <div className="navbar-header">
                    <div className="navbar-container-header container">
                        <NavLink to='/' className='navbar-logo-header' onClick={this.closeMobileMenu}>
                            <AiFillSafetyCertificate className='navbar-icon-header' />
                            Wallet
                        </NavLink>

                        <ul className={this.click ? 'nav-menu-header active' : 'nav-menu-header'} >
                        {/* <li className='nav-item-header-login'>
                                <NavLink to='/login' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header'>Login</p>
                                </NavLink>
                            </li>

                            <li className='nav-item-header-register'>
                                <NavLink to='/register' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header'>Register</p>
                                </NavLink>
                            </li>
                             */}
                            </ul>
                    </div>
                </div>     
    
            </>
        )
    }
}
export default Navbar;