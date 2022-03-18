async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTMint = await ethers.getContractFactory("NFTMint");
  const nftMint = await NFTMint.deploy("NFTMint", "INT");

  //verify: npx hardhat verify --constructor-args arguments.js --network rinkeby DEPLOYED_CONTRACT_ADDRESS
  console.log("nftMint address:", nftMint.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
