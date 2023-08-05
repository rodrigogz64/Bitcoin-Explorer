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
    /^(bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(input)
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
    if (isBlock(txId)) return "blocks";
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

const identifyData = (txId: string, network: string): string => {
  return (
    mainnet(txId, network) ||
    testnet(txId, network) 
  );

};

export const decodeTransaction = (
  network: string,
  txId: string,
  setDecodedTransaction: any
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
