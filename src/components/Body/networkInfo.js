const networkInfo = [
  {
    chainID: 1,
    name: "Ethereum Mainnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
  },
  {
    chainID: 137,
    name: "Polygon",
    api: `https://api.polygonscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`,
  },
  {
    chainID: 56,
    name: "Binance Smart Chain",
    api: `https://api.bscscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_BSCSCAN_API_KEY}`,
  },
  {
    chainID: 42,
    name: "Kovan Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  {
    chainID: 4,
    name: "Rinkeby Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  {
    chainID: 5,
    name: "Goerli Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
];

export default networkInfo;
