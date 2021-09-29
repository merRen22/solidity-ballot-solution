const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log('Deploying contract with the account: ', deployer.address);

  // Proposals we will send set to the contract
  const proposals = [
    'amazing option 1',
    'super convincing option 2',
    'best option possible',
  ].map((proposal) => hre.ethers.utils.formatBytes32String(proposal));

  const Ballot = await hre.ethers.getContractFactory('Ballot');
  const ballot = await Ballot.deploy(proposals);

  await ballot.deployed();

  console.log('Contract deployed to:', ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
