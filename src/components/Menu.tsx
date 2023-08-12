
import orange from "../assets/bitcoin-orange.svg";
import white from "../assets/bitcoin-white.svg";
import liquid from "../assets/liquid.png";
import testnet from "../assets/liquidn.png";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="floating-menu">
      <input type="checkbox" />
      <div className="circle">
        <div className="wave"></div>
      </div>

      <ul className="floating-nav">
        <li><a href="/"><img src={orange} alt="" /></a></li>
        <li><a href="/Testnet"><img src={white} alt="" /></a></li>
        <li><a href="/Liquid"><img src={liquid} alt="" /></a></li>
        <li><a href="/Liquidtestnet"><img src={testnet} alt="" /></a></li>
      </ul>
    </div>
  );
};

export default Menu;
