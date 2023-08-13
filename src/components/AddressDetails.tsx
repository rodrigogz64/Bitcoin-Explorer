import { useState } from 'react';
import './Details.css';
import img from "../assets/bitcoin-btc-flat-icon-isolated-on-white-background-vector-removebg-preview.png";
import clipboard from '../assets/clipboard.png';

export interface Props{
  decodedTransaction: {
    address: string;
    chain_stats:{ funded_txo_count: number;
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

  const balance = ((decodedTransaction.chain_stats.funded_txo_sum - decodedTransaction.chain_stats.spent_txo_sum)/100000000);
  function SatToBtc(num: number){ return (num/1000000000) }

  return(
    <div className="container">
    <div className="title">
      <img src={img} alt="" style={{ width: "80px" }} />
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
        <div> {balance.toFixed(8)} BTC</div>
      </div>
      <div>
        <div>Total Transactions</div>
        <div> {decodedTransaction.chain_stats.tx_count.toLocaleString()} </div>
      </div>
      <div>
        <div>Total Received</div>
        <div> {SatToBtc(decodedTransaction.chain_stats.funded_txo_sum)} BTC</div>
      </div> 
      <div>
        <div>Total Sent</div>
        <div> {SatToBtc(decodedTransaction.chain_stats.spent_txo_sum)} BTC</div>
      </div>
    </div>

  </div>
  );
}
