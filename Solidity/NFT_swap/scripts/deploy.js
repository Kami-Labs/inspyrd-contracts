async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTSwap = await ethers.getContractFactory("NFTSwap");
  const nftSwap = await NFTSwap.deploy();

  //verify: npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
  console.log("nftSwap address:", nftSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
