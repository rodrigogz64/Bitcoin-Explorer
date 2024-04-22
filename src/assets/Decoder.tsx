import axios from "axios";

function isBlockHash(input: string): boolean {return /^0{8}[0-9a-fA-F]{56}$/.test(input);}
function isBlockHashSignet(input: string): boolean {return /^0{4}[0-9a-fA-F]{60}$/.test(input);}

function isTxid(input: string): boolean { return /^[0-9a-fA-F]{64}$/.test(input);}
function isBlock(input: string): boolean { return /^[0-9]+$/.test(input); }

function isValidBitcoinAddress(input: string): boolean {
  return (
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input) ||
    /^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input) ||
    /^(bc1)[a-zA-HJ-NP-Z0-9]{25,62}$/.test(input)
  );
}

function isValidTestetAddress(input: string): boolean{
  return  (
    /^(m|n|2|tb1)[1-9A-HJ-NP-Za-km-z]{25,83}$/.test(input) ||
    /^(tb|TB)[a-zA-HJ-NP-Z0-9]{25,83}$/.test(input) ||
    /^(tb|bc|bcrt)[0-9A-HJ-NP-Z]{25,83}$/.test(input) ||
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(input) ||
    /^(bc|tb)[a-zA-HJ-NP-Z0-9]{41,71}$/.test(input) ||
    /^[2mn][a-km-zA-HJ-NP-Z1-9]{25,39}$/.test(input)
    
  );
}

function mainnet(txId: string, network:string){
  if(network === 'api'){
    if (isBlockHash(txId) == false && isTxid(txId) == true) return "tx";
    if (isBlockHash(txId) == true && isTxid(txId) == true) return "block";
    if (isValidBitcoinAddress(txId)) return "address";
    if (isBlock(txId)) return "block-height";
  }
}

function testnet(txId: string, network:string):string{
  if(network === 'testnet/api'){
    if (isBlockHash(txId) == false && isTxid(txId) == true) return "tx";
    if (isBlockHash(txId) == true && isTxid(txId) == true) return "block";
    if (isValidTestetAddress(txId)) return "address";
    if (isBlock(txId)) return "block-height";
  }
  return "";
}

function signet(txId: string, network:string):string{
  if(network === 'signet/api'){
    if (isBlockHashSignet(txId) == false && isTxid(txId) == true) return "tx";
    if (isBlockHashSignet(txId) == true && isTxid(txId) == true) return "block";
    if (isValidTestetAddress(txId)) return "address";
    if (isBlock(txId)) return "block-height";
  } return "";
}

interface ChainStats {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
}

interface MempoolStats{ 
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
}

export interface DecodedTransaction {
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
  chain_stats: ChainStats;
  mempool_stats: MempoolStats;
}

export const identifyData = (txId: string, network: string): string => {
  return (
    mainnet(txId, network) ||
    testnet(txId, network) ||
    signet(txId, network)
  );
};

export const decodeTransaction = (
  network: string,
  txId: string,
  setDecodedTransaction: React.Dispatch<React.SetStateAction<DecodedTransaction | null>>
) => {
  const mempool = `https://mempool.space/${network}/${identifyData(txId, network)}/${txId}`;

  axios
    .get(mempool)
    .then((response) => {
      setDecodedTransaction(response.data);
    })
    .catch((error) => {
      console.error("Error decoding transaction:", error.message);
    });
};

export const fetchBlockHash = async (txId: number, network: string) => {
  const apiUrl = `https://mempool.space/${network}/${identifyData(String(txId), network)}/${txId}`;
  
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching block hash:', error);
    throw error;
  }
};
