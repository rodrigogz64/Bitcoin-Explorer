import { useState } from 'react';
import Menu from '../components/Menu/Menu';
import Navbar from '../components/Navbar/Navbar';
import { decodeTransaction, identifyData, DecodedTransaction, fetchBlockHash } from '../assets/Decoder';
import orange from '../assets/bitcoin-orange.svg';
import TxDetails from '../components/Details/TxDetails';
import BlockHashDetails from '../components/Details/BlockDetails';
import AddressDetails from '../components/Details/AddressDetails';
import Home from '../components/Home/Home';


interface Props {
  decodedTransaction: DecodedTransaction;
  network: string;
}

export default function Mainnet() {

  const [txId, setTxId] = useState<string>('');
  const [decodedTransaction, setDecodedTransaction] = useState<Props['decodedTransaction'] | null>();
  const [componentSelected, setComponentSelected] = useState<string | null>(null);

  
  const handleRectangleClick = async (text: string) => {
    setTxId(text);
    decodeTransaction("api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
    handleButtonClick();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid Input");
      return;
    }
    decodeTransaction("api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null> >);
    setTxId("");
  };

  const handleButtonClick = async () => {
    const identifyResult = identifyData(txId, 'api');

    if (identifyResult === 'tx' || identifyResult === 'block' || identifyResult == 'block-height' || identifyResult === 'address') {
      setComponentSelected(identifyResult);
      if (identifyResult == 'block-height') {
        try {
          const blockHash = await fetchBlockHash(Number(txId), 'api');
          decodeTransaction("api", blockHash, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
        } catch (error) { error }
      }
    } else { setComponentSelected(null); }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === 'tx') return <TxDetails decodedTransaction={decodedTransaction} network="api" />;
    if (componentSelected === 'block' || componentSelected === 'block-height') return <BlockHashDetails decodedTransaction={decodedTransaction}  network="api"/>;
    if (componentSelected === 'address') return <AddressDetails decodedTransaction={decodedTransaction} />;
  };
  
  return (
    <div className="app-container">
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
          {componentSelected === null ? (
          <Home onRectangleClick={handleRectangleClick} />
        ) : (
          <div className="content">{renderComponent()}</div>
        )}
        </>
    </div>
  );
}
