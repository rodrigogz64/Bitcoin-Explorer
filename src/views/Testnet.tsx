import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { decodeTransaction, identifyData } from "../views/Decoder";
import Detalles from "./detalles";
import TxDetails from "../components/TxDetails";
import white from "../assets/bitcoin-white.svg";

export default function Testnet(){
  const [txId, setTxId] = useState("");
  const [decodedTransaction, setDecodedTransaction] = useState(null);
  const [componenteSeleccionado, setComponenteSeleccionado] = useState(null);

  const handleInputChange = (event) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    decodeTransaction("testnet/api", txId, setDecodedTransaction);
    setTxId("");
  };

  const variable = identifyData(txId, "testnet/api");

  const handleButtonClick = () => {
    if (variable === "tx" || variable === "block") {
      setComponenteSeleccionado(variable);
    } else {
      setComponenteSeleccionado(null);
    }
  };

  const renderComponente = () => {
    if (!decodedTransaction) {
      return null;
    } else if (componenteSeleccionado === "tx") {
      return <TxDetails decodedTransaction={decodedTransaction} />;
    } else if (componenteSeleccionado === "block") {
      return <Detalles decodedTransaction={decodedTransaction} />;
    } else {
      return <div>Ingresa un componente válido</div>;
    }
  };

  return (
    <>
      <Navbar
        txId={txId}
        handleInputChange={handleInputChange}
        handleDecodeTransaction={handleDecodeTransaction}
        onButtonClick={handleButtonClick}
        image={white}
        network="Testnet"
      />
      <Menu />
      <div>{renderComponente()}</div>
    </>
  );
};
