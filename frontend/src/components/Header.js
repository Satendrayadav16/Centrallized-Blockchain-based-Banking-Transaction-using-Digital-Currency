import React, { Component } from 'react'
import {  NavLink } from 'react-router-dom';
import { AiFillSafetyCertificate } from 'react-icons/ai'
import './Header.css';
// import { logout } from "../Login Authentication/firebase";

class Header extends Component {

 

    render() {

        return (

            <>

                <div className="navbar-header">
                    <div className="navbar-container-header container">
                        <NavLink to='/' className='navbar-logo-header' onClick={this.closeMobileMenu}>
                            <AiFillSafetyCertificate className='navbar-icon-header' />
                            BLOCKEXPLORER - For Bank Use Only
                        </NavLink>

                        <ul className={this.click ? 'nav-menu-header active' : 'nav-menu-header'} >                        
                       

                         <li className='nav-item-header'>
                                <NavLink to='/unverifiedAccounts' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header' onClick={this.unverifiedAccounts}>UnverifiedAccounts</p>
                                </NavLink>
                            </li>
                            <li className='nav-item-header'>
                                <NavLink to='/accountList' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header' onClick={this.accountList}>Account List</p>
                                </NavLink>
                            </li>
                            <li className='nav-item-header'>
                                <NavLink to='/searchTransaction' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header' onClick={this.searchTransaction}>SearchTransaction</p>
                                </NavLink>
                            </li>
                            <li className='nav-item-header'>
                                <NavLink to='/firstTransaction' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header' onClick={this.firstTransaction}>FirstTransaction</p>
                                </NavLink>
                            </li>
                            <li className='nav-item-header'>
                                <NavLink to='/coindetails' className='nav-links-header' onClick={this.closeMobileMenu}>
                                    <p className='texts-header' onClick={this.coindetails}>CoinDetails</p>
                                </NavLink>
                            </li>
                            </ul>
                    </div>
                </div>     
    
            </>
        )
    }
}
export default Header;