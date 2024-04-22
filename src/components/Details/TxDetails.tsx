import axios from "axios";
import { useState, useEffect } from "react";
import "./Details.css";
import img from "../../assets/icons8-bitcoin.gif";
import Clipboard from "../../components/Clipboard/Clipboard";

interface Props {
  decodedTransaction: {
    txid: string;
    vin: { prevout: { scriptpubkey_address: string; value: number } }[];
    vout: { scriptpubkey_address: string; value: number }[];
    status: { block_time: number; block_height: number };
    fee: number;
    weight: number;
  };
  network: string;
}

export default function TxDetails({ decodedTransaction, network }: Props) {
  const [lastBlockHeight, setLastBlockHeight] = useState(0);
  const [showAllInputs, setShowAllInputs] = useState(false);
  const [showAllOutputs, setShowAllOutputs] = useState(false);

  useEffect(() => {
    async function fetchLastBlockHeight() {
      try {
        const response = await axios.get(`https://mempool.space/${network}/blocks`);
        setLastBlockHeight(response.data[0].height);
      } catch (e) { console.log(e) }
    }
    fetchLastBlockHeight();
  });

  let confirmationMessage = "Unconfirmed";

  if ( decodedTransaction && decodedTransaction.status && decodedTransaction.status.block_height) {
    const confirmationCount = lastBlockHeight - decodedTransaction.status.block_height + 1;
    if (confirmationCount > 0) { confirmationMessage = `${confirmationCount} Confirmations`; }
  }

  const vinDetails = decodedTransaction.vin
  ? decodedTransaction.vin.map((vin) => {
      if (vin.prevout) {
        return {
          scriptpubkey_address: vin.prevout.scriptpubkey_address,
          value: vin.prevout.value / 100000000,
        };
      } else {return null;}
    })
  : [];


  const voutDetails = decodedTransaction.vout
    ? decodedTransaction.vout.map((vout) => ({
        scriptpubkey_address: vout.scriptpubkey_address,
        value: vout.value / 100000000,
      }))
    : [];

  const displayedVinDetails = showAllInputs ? vinDetails : vinDetails.slice(0, 5);
  const displayedDetails = showAllOutputs ? voutDetails : voutDetails.slice(0, 5);
  return (
    <div className="container">
      <div className="title">
        <img src={img} alt="" style={{ borderRadius: "50px", marginRight: "10px"  }} />
        <h2>Transaction</h2>
      </div>
      <div className="subtitle">
        <h4>{decodedTransaction.txid}</h4>
        <Clipboard input={decodedTransaction.txid}/>
      </div>
      <div className="table">
        <div>
          <div>Status</div>
          <div> {confirmationMessage} </div>
        </div>
        <div>
          <div>Timestamp</div>
          <div>
            {decodedTransaction.status && decodedTransaction.status.block_time !== undefined ? 
            new Date(decodedTransaction.status.block_time * 1000).toLocaleString("es-SV")
            : 'N/A'}
          </div>
        </div>
        <div>
          <div>Transaction fees</div>
          <div>
            {decodedTransaction.fee !== undefined ? 
            `${decodedTransaction.fee.toLocaleString()} Sats (${(decodedTransaction.fee / (decodedTransaction.weight / 4)).toLocaleString()} sat/vB)`
            : 'N/A'}
          </div>
        </div>
      </div>
      <div className="table2">
        <div className="Inputs">
          {displayedVinDetails.map((detail, index) => (
            <div className="Input" key={index}>
              <div className="Input-container">
                <div className="Input-detail">
                  <span>
                    <span>{detail && detail.scriptpubkey_address !== undefined ? detail.scriptpubkey_address : 'Coinbase'}</span>
                  </span>
                  <span className="amount">
                    <span>{detail && detail.value !== undefined ? detail.value + ' BTC' : null}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
          {!showAllInputs && vinDetails.length > 5 && ( 
            <button className="showAllInputs" onClick={() => 
            setShowAllInputs(true)}>Show All {vinDetails.length - 5}</button>
          )}
        </div>
        <div>
          <span> {">"} </span>
        </div>
        <div className="Outputs">
          {displayedDetails.map((detail, index) => (
            <div className="Output" key={index}>
            <div className="Output-container">
              <div className="Output-detail">
                <span>
                  <span>{detail && detail.scriptpubkey_address !== undefined ? (detail.scriptpubkey_address ? detail.scriptpubkey_address : 'OP_RETURN') : 'OP_RETURN'}</span>
                </span>
                <span className="amount">
                  <span>{detail && detail.value !== undefined ? detail.value + ' BTC' : '0 BTC'}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
        {!showAllOutputs && voutDetails.length > 5 && (
          <button className="showAllOutputs" onClick={() => 
          setShowAllOutputs(true)}>Show All {voutDetails.length - 5}</button>
        )}
        </div>
      </div>
    </div>
  );
}
