import { useState } from "react";
import clipboard from "../../assets/clipboard.png"
import './Clipboard.css';

interface Props{ input: string }

export default function Clipboard({input} : Props) {
  const [copied, setCopied] = useState(false);

  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => { setCopied(true);
        setTimeout(() => { setCopied(false); }, 2000);
      })
      .catch((e) => { console.error(e) });
  };

  return (
    <div className={`button-container ${copied ? "show-tooltip" : ""}`}>
      <button onClick={() => copyTextToClipboard(input)}>
        <img className="img-clip" src={clipboard} alt="" />
      </button>
      {copied && <span className="copy-label">Copied!</span>}
    </div>
  );
}
