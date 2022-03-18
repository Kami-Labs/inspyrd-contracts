async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFTSale = await ethers.getContractFactory("NFTMarketPlaceSale");
  const nftSale = await NFTSale.deploy();

  //verify: npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
  console.log("nftSale address:", nftSale.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
