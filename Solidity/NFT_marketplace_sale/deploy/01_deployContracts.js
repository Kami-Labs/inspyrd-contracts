const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let nftSale = await deploy("NFTMarketPlaceSale", {
    from: deployer,
    log: true,
  });
  try {
    await hre.run("verify:verify", {
        address: nftSale.address,
        constructorArguments: [],
    });
   
  } catch (err) {
      console.log(err)
  }
};
module.exports.tags = ["all", "Sale"];
