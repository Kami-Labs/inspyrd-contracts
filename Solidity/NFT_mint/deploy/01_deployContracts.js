const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let nftMint = await deploy("NFTMint", {
    from: deployer,
    log: true,
  });
  try {
    await hre.run("verify:verify", {
        address: nftMint.address,
        constructorArguments: [],
    });
   
  } catch (err) {
      console.log(err)
  }
};
module.exports.tags = ["all", "Auction"];
