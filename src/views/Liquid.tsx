import { useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import TxDetails from "../components/TxDetails";
import { decodeTransaction } from "../views/Decoder";

const Testnet = () => {
  const [txId, setTxId] = useState("");
  const [decodedTransaction, setDecodedTransaction] = useState(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    decodeTransaction("liquid/api", txId, setDecodedTransaction); //network,...
  };

  return (
    <>
      <>
        <Navbar
          txId={txId}
          handleInputChange={handleInputChange}
          handleDecodeTransaction={handleDecodeTransaction}
        />
        <main>
          <TxDetails decodedTransaction={decodedTransaction} />
          <Menu />
        </main>
      </>
    </>
  );
};

export default Testnet;