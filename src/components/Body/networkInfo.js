const networkInfo = [
  {
    chainID: 1,
    name: "Ethereum Mainnet",
    api: `https://api.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`,
  },
  {
    chainID: 42161,
    name: "Arbitrum One",
    api: `https://api.arbiscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_ARBISCAN_API_KEY}`,
  },
  {
    chainID: 43114,
    name: "Avalanche",
    api: `https://api.snowtrace.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_SNOWTRACE_API_KEY}`,
  },
  {
    chainID: 56,
    name: "Binance Smart Chain",
    api: `https://api.bscscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_BSCSCAN_API_KEY}`,
  },
  {
    chainID: 250,
    name: "Fantom Opera",
    api: `https://api.ftmscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_FTMSCAN_API_KEY}`,
  },
  {
    chainID: 10,
    name: "Optimism",
    api: `https://api-optimistic.etherscan.io/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_OPTIMISM_API_KEY}`,
  },
  {
    chainID: 137,
    name: "Polygon",
    api: `https://api.polygonscan.com/api?module=contract&action=getabi&apikey=${process.env.REACT_APP_POLYGONSCAN_API_KEY}`,
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
