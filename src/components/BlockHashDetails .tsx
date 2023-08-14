import { useState } from "react";
import "./Details.css";
import img from "../assets/bitcoin-btc-flat-icon-isolated-on-white-background-vector-removebg-preview.png";
import clipboard from "../assets/clipboard.png";

interface Props {
  decodedTransaction: {
    id: string;
    height: number;
    timestamp: number;
    tx_count: number;
    size: number;
    difficulty: number;
  };
}

export default function BlockHashDetails ({ decodedTransaction}: Props ) {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => { setCopied(false); }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <div className="title">
        <img src={img} alt="" style={{ width: "80px" }} />
        <h2>Block {decodedTransaction.height}</h2>
      </div>
      <div className="subtitle">
        <h4>{decodedTransaction.id}</h4>
        <div className={`button-container ${copied ? "show-tooltip" : ""}`}>
          <button onClick={() => copyTextToClipboard(decodedTransaction.id)}>
            <img className="img-clip" src={clipboard} alt="" />
          </button>
          {copied && <span className="copy-label">Copied!</span>}
        </div>
      </div>

      <div className="table">
        <div>
          <div>Transactions</div>
          <div> {decodedTransaction.tx_count} </div>
        </div>
        <div>
          <div>Size</div>
          <div> {(decodedTransaction.size / 1000000).toFixed(2)} MB</div>
        </div>
        <div>
          <div>Timestamp</div>
          <div>
            {new Date(decodedTransaction.timestamp * 1000).toLocaleString(
              "es-SV"
            )}
          </div>
        </div>
        <div>
          <div>Difficulty</div>
          <div>{decodedTransaction.difficulty}</div>
        </div>
      </div>
    </div>
  );
}
