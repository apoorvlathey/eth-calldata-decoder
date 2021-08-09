export default [
  {
    name: "Ethereum Mainnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
  },
  {
    name: "Polygon",
    api: `https://api.polygonscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`,
  },
  {
    name: "Binance Smart Chain",
    api: `https://api.bscscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_BSCSCAN_API_KEY}`,
  },
  {
    name: "Kovan Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  {
    name: "Rinkeby Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
  {
    name: "Goerli Testnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
    apikey: process.env.REACT_APP_ETHERSCAN_API_KEY,
  },
];
