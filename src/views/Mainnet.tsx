import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { decodeTransaction, identifyData, DecodedTransaction, fetchBlockHash} from '../views/Decoder';
import orange from '../assets/bitcoin-orange.svg';
import TxDetails from '../components/TxDetails';
import SplashScreen from '../components/SplashScreen';
import BlockHashDetails from '../components/BlockHashDetails';
import AddressDetails from '../components/AddressDetails';

interface Props {
  decodedTransaction: DecodedTransaction;
  network: string;
}

export default function Mainnet() {
  const [txId, setTxId] = useState<string>('');
  const [decodedTransaction, setDecodedTransaction] = useState<Props['decodedTransaction'] | null>();
  const [componentSelected, setComponentSelected] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }
    decodeTransaction("api", txId, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);
    setTxId("");
  };

  const handleButtonClick = async () => {
    const identifyResult = identifyData(txId, 'api');
  
    if (identifyResult === 'tx' || identifyResult === 'block' || identifyResult == 'block-height' || identifyResult === 'address') {
    setComponentSelected(identifyResult);
    if(identifyResult == 'block-height'){
        try {
          const blockHash = await fetchBlockHash(Number(txId), 'api');
          decodeTransaction("api", blockHash, setDecodedTransaction as React.Dispatch<React.SetStateAction<DecodedTransaction | null>>);

        } catch (error) {error}
      }
    } else {
      setComponentSelected(null);
    }
  };

  const renderComponent = () => {
    if (!decodedTransaction) return null;
    if (componentSelected === 'tx') return <TxDetails decodedTransaction={decodedTransaction} network="api"/>;
    if (componentSelected === 'block' || componentSelected === 'block-height') return <BlockHashDetails decodedTransaction={decodedTransaction} />;
    if (componentSelected === 'address') return <AddressDetails decodedTransaction={decodedTransaction} />;
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
          <div>{renderComponent()}</div>
        </>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
