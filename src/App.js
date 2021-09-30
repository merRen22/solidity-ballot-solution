import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Ballot from './artifacts/contracts/Ballot.sol/Ballot.json';

const ballotAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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
        gasLimit: 300000,
        gasPrice: ethers.utils.parseUnits('100', 'gwei'),
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
      console.log({ signer });
      const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
      const proposals = await contract.proposals(
        ethers.utils.formatBytes32String(''),
        {
          gasLimit: 21000,
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
