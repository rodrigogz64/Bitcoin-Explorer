import { useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import {decodeTransaction,identifyData,DecodedTransaction,hashBloque,} from "../views/Decoder";
import TxDetails from "../components/TxDetails";
import BlockHashDetails from "../components/BlockDetails";
import AddressDetails from "../components/AddressDetails";
import testnet from "../assets/liquidn.png";

interface Props {
  decodedTransaction: DecodedTransaction;
}

export default function LiquidTestnet() {
  const [txId, setTxId] = useState<string>("");
  const [decodedTransaction, setDecodedTransaction] = useState<Props["decodedTransaction"] | null>();
  const [componentSelected, setComponentSelected] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }
    decodeTransaction( "liquidtestnet/api/", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>
    );
    setTxId("");
  };

  const identify = identifyData(txId, "liquidtestnet/api/");

  const handleButtonClick = async () => {
    if (
      identify === "tx" ||
      identify === "block" ||
      identify === "block-height" ||
      identify === "address"
    ) {
      if (identify === "block-height") {
        try {
          const newTxId = await hashBloque(txId); 
          setTxId(newTxId);
        } catch (error) { console.error("Error getting block data:", error); }
      }
      setComponentSelected(identify);
    } else {
      setComponentSelected(null);
    }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === "tx")
      return <TxDetails decodedTransaction={decodedTransaction} />;
    if (componentSelected === "block")
      return <BlockHashDetails decodedTransaction={decodedTransaction} />;
    if (componentSelected === "address")
      return <AddressDetails decodedTransaction={decodedTransaction} />;
    return null;
  };

  return (
    <>
      <Navbar
        txId={txId}
        handleInputChange={handleInputChange}
        handleDecodeTransaction={handleDecodeTransaction}
        onButtonClick={handleButtonClick}
        image={testnet}
        network="Liquid Testnet"
      />
      <Menu />
      <div>{renderComponent()}</div>
    </>
  );
}
