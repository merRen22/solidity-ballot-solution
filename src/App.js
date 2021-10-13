import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json';

const ballotAddress = '0x038920e5C620de46C60c1Fd1e52921f3c25690fd';

function App() {
  let winner = '';

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getChairperson() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
      const theBoss = await contract.chairperson({
        gasLimit: 3000000000,
      });
      console.log(`The chairperson account is => ${theBoss} 🎉`);
    }
  }

  async function getProposals() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();

      const gasPrice = await provider.getGasPrice();

      console.log({ signer });
      const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
      const proposals = await contract.proposals(
        ethers.utils.formatBytes32String(''),
        {
          gasLimit: 300000,
          //gasPrice: gasPrice,
        }
      );
      console.log(`the winning proposal is => ${proposals.length()} 🎉`);
    }
  }

  async function callWinnerName() {
    if (!winner) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
      const winner = await contract.winningProposal();
      console.log(`the winning proposal is => ${winner} 🎉`);
    }
  }

  /*
  async function interactWithBlockchain() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Look up the current block number
    await provider.getBlockNumber();
    // get balance of account
    const balance = await provider.getBalance('ethers.eth');
    // update balance from wei to ether 👇
    console.log(ethers.utils.formatEther(balance));
    // converting ether as string number to wei ( BigNumber)
    console.log(ethers.utils.parseEther('1.0'));

    // notes on how to use ethers 👇

    // send tokens to someone
    const tx = signer.sendTransaction({
      to: 'johny.bravo.eth', // 👈 ens https://app.ens.domains/
      value: ethers.utils.parseEther('1.0'),
    });

    //👀👀👀👀👀
    // lsitening on events happening on a contract
    let someRandomCotract;

    someRandomCotract.on('Transfer', (from, to, amount, event) => {
      console.log(`${from} sent ${formatEther(amount)} to ${to}`);
      // The event object contains the verbatim log data, the
      // EventFragment and functions to fetch the block,
      // transaction and receipt and event functions
    });

    // A filter for when a specific address receives tokens
    myAddress = '0x8ba1f109551bD432803012645Ac136ddd64DBA72';
    filter = daiContract.filters.Transfer(null, myAddress);
    // {
    //   address: 'dai.tokens.ethers.eth',
    //   topics: [
    //     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    //     null,
    //     '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
    //   ]
    // }

    // Receive an event when that filter occurs 👇 :0 great way to get information
    daiContract.on(filter, (from, to, amount, event) => {
      // The to will always be "address"
      console.log(`I got ${formatEther(amount)} from ${from}.`);
    });

    // query infromation about trasnaccions

    // Get the address of the Signer
    myAddress = await signer.getAddress();
    // '0x8ba1f109551bD432803012645Ac136ddd64DBA72'

    // Filter for all token transfers from me
    filterFrom = daiContract.filters.Transfer(myAddress, null);

    // Filter for all token transfers to me
    filterTo = daiContract.filters.Transfer(null, myAddress);

    // List all transfers ever sent to me
    await daiContract.queryFilter(filterTo);

    // List all transfers sent from me a specific block range
    await daiContract.queryFilter(filterFrom, 9843470, 9843480);

    // List all transfers sent in the last 10,000 blocks
    await daiContract.queryFilter(filterFrom, -10000);

    // sign on to anything this is used like a loggin
    signature = await signer.signMessage('Hello World');
  }
*/

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ballot contract</h1>

        <button onClick={getProposals}>Get Proposals</button>

        <button onClick={callWinnerName}>Get the winner</button>

        <button onClick={getChairperson}>Whos in charge ?</button>

        <a
          className="Author"
          href="https://github.com/merRen22"
          target="_blank"
          rel="noopener noreferrer"
        >
          Author here
        </a>
      </header>
    </div>
  );
}

export default App;
