import { useState } from 'react';
import './Details.css';
import img from '../../assets/icons8-wallet.gif';
import clipboard from '../../assets/clipboard.png';

interface Props{
  decodedTransaction: {
    address: string;
    chain_stats:{ 
      funded_txo_count: number;
      funded_txo_sum: number;
      spent_txo_count: number;
      spent_txo_sum: number;
      tx_count: number;
    };
    mempool_stats:{ 
      funded_txo_count: number;
      funded_txo_sum: number;
      spent_txo_count: number;
      spent_txo_sum: number;
      tx_count: number;
    };
  }
}

export default function AddressDetails({ decodedTransaction }: Props){
  const [copied, setCopied] = useState(false);
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {setCopied(false); }, 2000);
      })
      .catch(err => { console.error(err); });
  };

  const balance = decodedTransaction.chain_stats && decodedTransaction.mempool_stats ? 
  (((decodedTransaction.chain_stats.funded_txo_sum + decodedTransaction.mempool_stats.funded_txo_sum)
    - (decodedTransaction.chain_stats.spent_txo_sum + decodedTransaction.mempool_stats.spent_txo_sum)) 
    / 100000000) : 0;

  function SatToBtc(num: number){ return (num/100000000) }

  const Received = decodedTransaction.chain_stats  !== undefined  && decodedTransaction.mempool_stats !== undefined ? 
  SatToBtc(decodedTransaction.chain_stats.funded_txo_sum + decodedTransaction.mempool_stats.funded_txo_sum) : 0;
  
  const Sent = decodedTransaction.chain_stats !== undefined && decodedTransaction.mempool_stats !== undefined ? 
  SatToBtc(decodedTransaction.chain_stats.spent_txo_sum + decodedTransaction.mempool_stats.spent_txo_sum) : 0;
  
  const Transactions = decodedTransaction.chain_stats !== undefined && decodedTransaction.mempool_stats !== undefined ? 
  (decodedTransaction.chain_stats.tx_count + decodedTransaction.mempool_stats.tx_count) : 0

  return(
    <div className="container">
      <div className="title">
        <img src={img} alt="" style={{borderRadius: "20px", marginRight: "10px" }} />
        <h2>Address</h2>
      </div>
      <div className="subtitle">
        <h4>{decodedTransaction.address}</h4>
        <div className={`button-container ${copied ? "show-tooltip" : ""}`}>
          <button onClick={() => copyTextToClipboard(decodedTransaction.address)}>
            <img className="img-clip" src={clipboard} alt="" />
          </button>
          {copied && <span className="copy-label">Copied!</span>}
        </div>
      </div>
      <div className="table">
        <div>
          <div>Balance</div>
          <div> {balance.toLocaleString()} BTC</div>
        </div>
        <div>
          <div>Total Transactions</div>
          <div>{Transactions}</div>
        </div>
        <div>
          <div>Total Received</div>
          <div>{Received.toLocaleString()} BTC
          </div>
        </div> 
        <div>
          <div>Total Sent</div>
          <div>{Sent.toLocaleString()} BTC
          </div>
        </div>
      </div>
    </div>
  );
}
