import React, { ChangeEvent } from 'react';
import './Navbar.css';
import img from '../assets/bitcoin-white.svg'

interface NavbarProps {
  txId: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDecodeTransaction: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ txId, handleInputChange, handleDecodeTransaction }) => {

  return (
    <nav>
      <div className="navbar-container">
        <ul className="navbar-menu">
          <a href='/'> <img className="logoimg" src={img} alt="" /> </a>
        </ul>
        <div className="search-container">
          <div className="search-wrapper">
            <input 
            className="search-input" 
            type="text"
            placeholder="Enter Block Height, Hash, Transaction ID or Address"
            value={txId}
            onChange={handleInputChange}/>
            <svg xmlns="http://www.w3.org/2000/svg"  onClick={handleDecodeTransaction} width="25" height="25" fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-search" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
