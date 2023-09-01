import { useState } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { decodeTransaction, identifyData, DecodedTransaction, fetchBlockHash} from '../assets/Decoder';
import blue from '../assets/bitcoin-blue.svg';
import TxDetails from '../components/Details/TxDetails';
import BlockHashDetails from '../components/Details/BlockHashDetails';
import AddressDetails from '../components/Details/AddressDetails';

interface Props {
  decodedTransaction: DecodedTransaction;
  network: string;
}

export default function Signet() {
  const [txId, setTxId] = useState<string>('');
  const [decodedTransaction, setDecodedTransaction] = useState<Props['decodedTransaction'] | null>();
  const [componentSelected, setComponentSelected] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }
    decodeTransaction("signet/api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
    setTxId("");
  };

  const handleButtonClick = async () => {
    const identifyResult = identifyData(txId, 'signet/api');
  
    if (identifyResult === 'tx' || identifyResult === 'block' || identifyResult == 'block-height' || identifyResult === 'address') {
    setComponentSelected(identifyResult);
    if(identifyResult == 'block-height'){
        try {
          const blockHash = await fetchBlockHash(Number(txId), 'signet/api');
          decodeTransaction("signet/api", blockHash, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);

        } catch (error) {error}
      }
    } else {
      setComponentSelected(null);
    }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === 'tx') return <TxDetails decodedTransaction={decodedTransaction} network="signet/api"/>;
    if (componentSelected === 'block' || componentSelected === 'block-height') return <BlockHashDetails decodedTransaction={decodedTransaction}  network="signet/api"/>;
    if (componentSelected === 'address') return <AddressDetails decodedTransaction={decodedTransaction} />;
  };
  
  return (
    <div className="app-container">
      <Navbar
        txId={txId}
        handleInputChange={handleInputChange}
        handleDecodeTransaction={handleDecodeTransaction}
        onButtonClick={handleButtonClick}
        image={blue}
        network="Signet"
      />
      <Menu />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", 
        color: "white", height: "100vh", fontSize: "3rem"}}>
        Coming Soon!
      </div>
      <div className="content">{renderComponent()}</div>
    </div>
  );
}
