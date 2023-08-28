import { ChangeEvent, FormEvent, MouseEventHandler } from 'react';
import './Navbar.css';

interface NavbarProps {
  txId: string;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDecodeTransaction: () => void;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
  image: string;
  network: string;
  toggleDarkMode: MouseEventHandler<HTMLButtonElement>;
}

export default function Navbar({ txId, handleInputChange, handleDecodeTransaction, image, network, 
  onButtonClick, toggleDarkMode } : NavbarProps){
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleDecodeTransaction();
  };

  return (
    <nav>
        <ul className="navbar-menu">
          <a href='/'> <img className="logoimg" src={image} alt="" /> </a>
          <h6>{network}</h6>
        </ul>
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <div className="search-wrapper">
              <input
                className="search-input"
                type="text"
                placeholder="Enter Block Height, Hash, Transaction ID or Address"
                value={txId}
                onChange={handleInputChange}
              />
              <button type="submit" onClick={onButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg"  className="svg"  fill="none" stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="theme-toggle">
            <button onClick={toggleDarkMode}>Light</button>
          </div>
        </div>
    </nav>
  );
}
