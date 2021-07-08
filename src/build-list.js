const { getAddress } = require('@ethersproject/address');
const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const ropsten = require("./tokens/ropsten.json");
const rinkeby = require("./tokens/rinkeby.json");
const goerli = require("./tokens/goerli.json");
const kovan = require("./tokens/kovan.json");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Default Token List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "https://raw.githubusercontent.com/plasmadlt/token-list/master/assets/ppay-logo.png",
    keywords: ["PlasmaFinance", "default", "plasmaswap", "ppay", "xppay"],
    tokens: [...mainnet, ...ropsten, ...goerli, ...kovan, ...rinkeby]
      // Checksummed addresses
      .map(t => {
        t.address = getAddress(t.address);
        return t;
      })
      // Sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
};
