import { useState } from "react";
import "./Details.css";
import img from '../../assets/3d-cube.gif';
import clipboard from "../../assets/clipboard.png";

interface Props {
  decodedTransaction: {
    id: string;
    height: number;
    timestamp: number;
    tx_count: number;
    size: number;
    difficulty: number;
  };
  network: string;
}

export default function BlockHashDetails ({ decodedTransaction, network}: Props ) {
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
        <img src={img} alt="" style={{ borderRadius: "50px", marginRight: "10px", width: "70px" }} />
        <h2>{decodedTransaction === undefined ? null : decodedTransaction.height === 0 && network === 'api' ? 
        `${'Genesis '}` + decodedTransaction.height : `${'Block '}` + decodedTransaction.height}</h2>
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
          <div> {decodedTransaction && decodedTransaction.tx_count !== undefined ? decodedTransaction.tx_count.toLocaleString() : null} </div>
        </div>
        <div>
          <div>Size</div>
          <div> {decodedTransaction.size !== undefined ? 
            ((decodedTransaction.size.toString()).length <=4 ? decodedTransaction.size + ' B' :
            (decodedTransaction.size.toString()).length <= 5 ? (decodedTransaction.size / 1000).toFixed(2) + ' KB' :
            (decodedTransaction.size.toString()).length <= 8 ? (decodedTransaction.size / 1000000).toFixed(2) + ' MB' : "") : null}
          </div>
        </div>
        <div>
          <div>Timestamp</div>
          <div>
          {decodedTransaction.timestamp !== undefined ? 
            new Date(decodedTransaction.timestamp * 1000).toLocaleString("es-SV") : 'N/A'}
          </div>
        </div>
        <div>
          <div>Difficulty</div>
          <div>{decodedTransaction.difficulty !== undefined ? decodedTransaction.difficulty : null}</div>
        </div>
      </div>
    </div>
  );
}
