import { SetStateAction, useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { decodeTransaction, identifyData } from '../views/Decoder';
import orange from '../assets/bitcoin-orange.svg';
import TxDetails from '../components/TxDetails';
import SplashScreen from '../components/SplashScreen';
import BlockDetails from '../components/BlockDetails';
import AddressDetails from '../components/AddressDetails';

export default function Mainnet() {
  const [txId, setTxId] = useState("");
  const [decodedTransaction, setDecodedTransaction] = useState(null);
  const [componentSelected, setComponentSelected] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTxId(event.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDecodeTransaction = () => {
    if (!txId.trim()) {
      alert("Please enter a valid transaction ID.");
      return;
    }

    // Identify the data type and set the componentSelected state here
    const identify = identifyData(txId, 'api');
    if (identify === 'tx' || identify === 'block' || identify === 'blocks' || identify === 'address') {
      setComponentSelected(identify);
    } else {
      setComponentSelected(null);
    }

    decodeTransaction("api", txId, setDecodedTransaction);
    setTxId("");
  };

  return (
    <>
      {showContent ? (
        <>
          <Navbar
            txId={txId}
            handleInputChange={handleInputChange}
            handleDecodeTransaction={handleDecodeTransaction}
            onButtonClick={() => {}}
            image={orange}
            network="Mainnet"
          />
          <Menu />
          <div>
            {componentSelected === 'tx' && decodedTransaction && <TxDetails decodedTransaction={decodedTransaction} />}
            {componentSelected === 'block' && decodedTransaction && <BlockDetails decodedTransaction={decodedTransaction} />}
            {componentSelected === 'address' && decodedTransaction && <AddressDetails decodedTransaction={decodedTransaction} />}
          </div>
        </>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}
