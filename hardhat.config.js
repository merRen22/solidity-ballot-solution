require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      // ⚠ Error realted to metamask usage 👇 look it in readme. Only necessary when using localhost testnet
      //chainId: 1337,
    },
    // configuration for a test network
    rinkeby: {
      url: process.env.INFURA_NET,
      accounts: [`0x${process.env.WALLET_PRIVATE_KEY}`],
      // what this and what should i put 🤔
      gas: 1000000,
      gasPrice: 8000000000,
    },
  },
};
