import testnet from '../assets/liquid.png'
import liquid from '../assets/liquidn.png'
import dropdown from '../assets/drop.svg'
import img from '../assets/bitcoin-white.svg'

import './Menu.css';

const Menu = () => {
    return (
        <div className="floating-menu">
            <input type="checkbox" />
            <span className="plus-icon">
            <img className='imgb' src={dropdown} alt="" />
            </span>
            <ul className="floating-nav">
                <li>
                    <a href="/">
                        <img src="https://genotipia.com/wp-content/uploads/2018/03/Bitcoin.png" alt="" />
                    </a>
                </li>
                <li>
                    <a href="/Testnet">
                        <img src={img} alt="" />
                    </a>
                </li>
                <li>
                    <a href="/Liquid">
                        <img src={liquid} alt="" />
                    </a>
                </li>
                <li>
                    <a href="/Liquidtestnet">
                        <img src={testnet} alt="" />
                    </a>
                </li>
            </ul>
            <div id="cat-top-shadow"></div>
        </div>
        
    );
};

export default Menu;
