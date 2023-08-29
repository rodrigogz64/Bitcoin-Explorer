import orange from "../assets/bitcoin-orange.svg";
import white from "../assets/bitcoin-white.svg";
import liquid from "../assets/liquid.png";
import blue from "../assets/bitcoin-blue.svg";
import "./Menu.css";

export default function Menu() {
  return (
    <div className="floating-menu">
      <input type="checkbox" />
      <div className="circle">
        <div className="wave"></div>
      </div>

      <ul className="floating-nav">
        <li>
          <div className="custom-tooltip">
            <a href="/"> <img src={orange} alt="" /> <span className="tooltip-text">Mainnet</span></a>
          </div>
        </li>
        <li>
          <div className="custom-tooltip">
            <a href="/Testnet"> <img src={white} alt="" /> <span className="tooltip-text">Testnet</span></a>
          </div>
        </li>
        <li>
          <div className="custom-tooltip">
            <a href="/Signet"><img src={blue} alt="" /><span className="tooltip-text">Signet</span></a>
          </div>
        </li>
        <li>
          <div className="custom-tooltip">
            <a href="/Liquid"><img src={liquid} alt="" /><span className="tooltip-text">Liquid</span></a>
          </div>
        </li>
      </ul>
    </div>
  );
}
