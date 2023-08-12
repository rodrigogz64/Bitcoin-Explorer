import { useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import TxDetails from "../components/TxDetails";
import { decodeTransaction } from "../views/Decoder";
import testnet from '../assets/liquidn.png'

const Testnet = () => {
  const [txId, setTxId] = useState("");
  const [decodedTransaction, setDecodedTransaction] = useState({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    decodeTransaction("liquidtestnet/api", txId, setDecodedTransaction); //network, ...
  };

  return (
    <>
      <>
        <Navbar
          txId={txId}
          handleInputChange={handleInputChange}
          handleDecodeTransaction={handleDecodeTransaction}
          image={testnet}
          network="Liquid Testnet"
        />
        <main>
        {txId.trim() !== '' ? ( <TxDetails decodedTransaction={decodedTransaction} />) : (null)}
          <Menu />
        </main>
      </>
    </>
  );
};

export default Testnet;