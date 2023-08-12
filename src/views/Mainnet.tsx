import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { decodeTransaction, identifyData } from "../views/Decoder";
import orange from '../assets/bitcoin-orange.svg';
import Detalles from "./detalles";
import TxDetails from "../components/TxDetails";
import SplashScreen from "../components/SplashScreen";

export default function Mainnet () {
  const [txId, setTxId] = useState("");
  const [decodedTransaction, setDecodedTransaction] = useState(null);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const handleInputChange = (event) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    decodeTransaction("api", txId, setDecodedTransaction);
    setTxId("");
  };

  const variable = identifyData(txId, 'api');

  const handleButtonClick = () => {
    if (variable === 'tx' || variable === 'block') {
      setComponenteSeleccionado(variable);
    } else {
      setComponenteSeleccionado(null);
    }
  };

  const renderComponente = () => {
    if (!decodedTransaction) {
      return null;
    } else if (componenteSeleccionado === 'tx') {
      return <TxDetails decodedTransaction={decodedTransaction} />;
    } else if (componenteSeleccionado === 'block') {
      return <Detalles decodedTransaction={decodedTransaction} />;
    } else {
      return <div>Ingresa un componente válido</div>;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showContent ? (
        <>
          <Navbar
            txId={txId}
            handleInputChange={handleInputChange}
            handleDecodeTransaction={handleDecodeTransaction}
            onButtonClick={handleButtonClick}
            image={orange}
            network="Mainnet"
          />
          <Menu />
          <div>{renderComponente()}</div>
        </>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
