import axios from "axios";
import { useState, useEffect } from "react";
import "./Details.css";
import img from "../assets/bitcoin-btc-flat-icon-isolated-on-white-background-vector-removebg-preview.png";
import clipboard from "../assets/clipboard.png";

interface Props {
  decodedTransaction: {
    txid: string;
    vin: { prevout: { scriptpubkey_address: string; value: number } }[];
    vout: { scriptpubkey_address: string; value: number }[];
    status: { block_time: number; block_height: number };
    fee: number;
    weight: number;
  };
}

export default function TxDetails({ decodedTransaction }: Props) {
  const [lastBlockHeight, setLastBlockHeight] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchLastBlockHeight() {
      try {
        const response = await axios.get("https://blockstream.info/api/blocks");
        setLastBlockHeight(response.data[0].height);
      } catch (error) {
        error;
      }
    }
    fetchLastBlockHeight();
  }, []);

  let confirmationMessage = "Unconfirmed";

  if (
    decodedTransaction &&
    decodedTransaction.status &&
    decodedTransaction.status.block_height
  ) {
    const confirmationCount =
      lastBlockHeight - decodedTransaction.status.block_height + 1;
    if (confirmationCount > 0) {
      confirmationMessage = `${confirmationCount} Confirmations`;
    }
  }
  const voutDetails = decodedTransaction.vout
    ? decodedTransaction.vout.map((vout) => ({
        scriptpubkey_address: vout.scriptpubkey_address,
        value: vout.value / 100000000,
      }))
    : [];
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        error;
      });
  };

  return (
    <div className="container">
      <div className="title">
        <img src={img} alt="" style={{ width: "80px" }} />
        <h2>Transaction</h2>
      </div>
      <div className="subtitle">
        <h4>{decodedTransaction.txid}</h4>
        <div className={`button-container ${copied ? "show-tooltip" : ""}`}>
          <button onClick={() => copyTextToClipboard(decodedTransaction.txid)}>
            <img className="img-clip" src={clipboard} alt="" />
          </button>
          {copied && <span className="copy-label">Copied!</span>}
        </div>
      </div>

      <div className="table">
        <div>
          <div>Status</div>
          <div> {confirmationMessage} </div>
        </div>
        <div>
          <div>Timestamp</div>
          <div>
            {decodedTransaction.status?.block_time !== undefined
              ? new Date(
                  decodedTransaction.status.block_time * 1000
                ).toLocaleString("es-SV")
              : "N/A"}
          </div>
        </div>

        <div>
          <div>Transaction fees</div>
          <div>
            {decodedTransaction.fee.toLocaleString()} Sats (
            {(decodedTransaction.fee / (decodedTransaction.weight / 4)).toFixed(
              1
            )}{" "}
            sat/vB)
          </div>
        </div>
      </div>
      <div className="table2">
        <div className="Inputs">
          <div className="address">
            {decodedTransaction.vin[0]?.prevout.scriptpubkey_address}
          </div>
          <div className="value">
            {decodedTransaction.vin[0]?.prevout.value / 100000000} BTC
          </div>
        </div>
        <span> {">"} </span>
        <div className="Outputs">
          {voutDetails.map((detail, index) => (
            <div className="address" key={index}>
              {detail.scriptpubkey_address}
              <div className="value">{detail.value} BTC </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
