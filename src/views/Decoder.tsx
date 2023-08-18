import axios from "axios";

function isBlockHash(input: string): boolean {
  return /^0{8}[0-9a-fA-F]{56}$/.test(input);
}

function isTxid(input: string): boolean {
  return /^[0-9a-fA-F]{64}$/.test(input);
}

function isValidBitcoinAddress(input: string): boolean{
  return (
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input) ||
    /^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input) ||
    /^(bc1)[a-zA-HJ-NP-Z0-9]{25,62}$/.test(input)
  );
}

function isBlock(input: string): boolean{return /^[0-9]+$/.test(input)}

function isValidTestetAddress(input: string): boolean{
  return  (
    /^(m|n|2|tb1)[1-9A-HJ-NP-Za-km-z]{25,62}$/.test(input) ||
    /^(tb|TB)[a-zA-HJ-NP-Z0-9]{1,83}$/.test(input)
  );

}

function mainnet(txId: string, network:string):string{
  if(network == 'api'){
    if (isBlockHash(txId) == false && isTxid(txId) == true) return "tx";
    if (isBlockHash(txId) == true && isTxid(txId) == true) return "block";
    if (isValidBitcoinAddress(txId)) return "address";
  }
  return "";
}



function testnet(txId: string, network:string):string{
  if(network == 'testnet/api'){
    if (isBlockHash(txId) == false && isTxid(txId) == true) return "tx";
    if (isBlockHash(txId) == true && isTxid(txId) == true) return "block";
    if (isValidTestetAddress(txId)) return "address";
    if (isBlock(txId)) return "blocks";
  }
  return "";
}

function liquid(txId: string, network:string):string{
  if(network == 'liquid/api'){
    if(txId.length === 64) return "tx";
    //if(txId.length === 65) return "block"; 
    if(txId.length >= 32 || txId.length <= 64) return "address";
    //if (isBlock(txId)) return "blocks";
  } return "";
}

function liquidtestnet(txId: string, network:string):string{
  if(network == 'liquidtestnet/api'){
    if(txId.length === 64) return "tx";
    //if(txId.length === 65) return "block"; 
    if(txId.length >= 32 || txId.length <= 64) return "address";
    //if (isBlock(txId)) return "blocks";
  } return "";
}

export const identifyData = (txId: string, network: string): string => {
  return (
    mainnet(txId, network) ||
    testnet(txId, network) ||
    liquid(txId, network) ||
    liquidtestnet(txId,network)
  );
};

export type DecodedTransaction =  {
  txid: string;
  vin: { prevout: { scriptpubkey_address: string; value: number } }[];
  vout: { scriptpubkey_address: string; value: number }[];
  status: { block_time: number; block_height: number };
  fee: number;
  weight: number;
  id: string;
  height: number;
  timestamp: number;
  tx_count: number;
  size: number;
  difficulty: number;
  address: string;
  chain_stats: {
    funded_txo_count: number;
    funded_txo_sum: number;
    spent_txo_count: number;
    spent_txo_sum: number;
    tx_count: number;
  };
}

export const decodeTransaction = (
  network: string,
  txId: string,
  setDecodedTransaction: React.Dispatch<React.SetStateAction<DecodedTransaction | null>>,
) => {
  const blockstreamURL = `https://blockstream.info/${network}/${identifyData(txId, network)}/${txId}`;

  axios
    .get(blockstreamURL)
    .then((response) => {
      setDecodedTransaction(response.data);
    })
    .catch((error) => {
      console.error("Error decoding transaction:", error.message);
    });
};


export const hashBloque = async (txid: string) => {
  if (isBlock(txid)) {
    const apiUrl = `https://blockstream.info/api/block-height/${txid}`;
    try {
      const response = await axios.get(apiUrl);
      return response.data; // Devuelve el valor obtenido
    } catch (error) {
      console.error("Error getting block data:", error);
      throw error;
    }
  } else {
    throw new Error("Invalid txid for block");
  }
};
