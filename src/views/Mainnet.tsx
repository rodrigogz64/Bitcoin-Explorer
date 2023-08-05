import { useState, useEffect   } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import TxDetails from '../components/TxDetails';
import SplashScreen from '../components/SplashScreen';
import { decodeTransaction } from '../views/Decoder';


const Mainnet = () => {
  const [txId, setTxId] = useState('');
  const [decodedTransaction, setDecodedTransaction] = useState('');
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTxId(event.target.value);
  };

  const handleDecodeTransaction = () => {
    decodeTransaction('api', txId, setDecodedTransaction);//network, ...
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showNavbar ? (
        <>
          <Navbar
            txId={txId}
            handleInputChange={handleInputChange}
            handleDecodeTransaction={handleDecodeTransaction}
          />
          <main>
            <TxDetails decodedTransaction={decodedTransaction} />
            <Menu/>
          </main>
        </>
      ) : (
        <SplashScreen />
      )}
    </>
  );
};

export default Mainnet;