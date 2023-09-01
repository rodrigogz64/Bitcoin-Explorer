import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { decodeTransaction, identifyData, DecodedTransaction, fetchBlockHash } from '../assets/Decoder';
import orange from '../assets/bitcoin-orange.svg';
import SplashScreen from '../components/SplashScreen';
//import ErrorModal from "../components/ErrorModal";
import TxDetails from '../components/Details/TxDetails';
import BlockHashDetails from '../components/Details/BlockHashDetails';
import AddressDetails from '../components/Details/AddressDetails';

interface Props {
  decodedTransaction: DecodedTransaction;
  network: string;
}

export default function Mainnet() {

  const [txId, setTxId] = useState<string>('');
  const [decodedTransaction, setDecodedTransaction] = useState<Props['decodedTransaction'] | null>();
  const [componentSelected, setComponentSelected] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
/*   const [error, setError] = useState<string | null>(null); */


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid Input");
      return;
    }
    decodeTransaction("api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
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
        } catch (error) { error}
      }
    } else { setComponentSelected(null); }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === 'tx') return <TxDetails decodedTransaction={decodedTransaction} network="api" />;
    if (componentSelected === 'block' || componentSelected === 'block-height') return <BlockHashDetails decodedTransaction={decodedTransaction}  network="api"/>;
    if (componentSelected === 'address') return <AddressDetails decodedTransaction={decodedTransaction} />;
  };

/*   const handleCloseErrorModal = () => { setError(null); }; */

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="app-container">
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
          <div className="content">{renderComponent()}</div>
        </>
      ) : (
        <SplashScreen />
        )}
    </div>
  );
}

/* {error && (<ErrorModal errorMessage={error} onClose={handleCloseErrorModal} />)} */