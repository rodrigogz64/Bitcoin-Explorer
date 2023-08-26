import { useState } from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { decodeTransaction, identifyData, DecodedTransaction, fetchBlockHash} from "../views/Decoder";
import TxDetails from "../components/TxDetails";
import white from "../assets/bitcoin-white.svg";
import BlockHashDetails from "../components/BlockHashDetails";
import AddressDetails from "../components/AddressDetails";

interface Props {
  decodedTransaction: DecodedTransaction;
  network: string;
}

export default function Mainnet() {
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
    decodeTransaction("testnet/api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
    setTxId("");
  };

  const handleButtonClick = async () => {
    const identifyResult = identifyData(txId, "testnet/api");

    if (identifyResult === "tx" || identifyResult === "block" || identifyResult == "block-height" || identifyResult === "address") {
      setComponentSelected(identifyResult);
      if (identifyResult == "block-height") {
        try {
          const blockInput = await fetchBlockHash(Number(txId), "testnet/api");
          decodeTransaction("testnet/api", blockInput, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
        } catch (error) {error}
      }
    } else {
      setComponentSelected(null);
    }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === "tx") return (<TxDetails decodedTransaction={decodedTransaction} network="testnet/api" />);
    if (componentSelected === "block" || componentSelected === "block-height") return <BlockHashDetails decodedTransaction={decodedTransaction} />;
    if (componentSelected === "address") return <AddressDetails decodedTransaction={decodedTransaction} />;
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
      <div>{renderComponent()}</div>
    </>
  );
}
