const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let nftSwap = await deploy("NFTSwap", {
    from: deployer,
    log: true,
  });
  try {
    await hre.run("verify:verify", {
        address: nftSwap.address,
        constructorArguments: [],
    });
   
  } catch (err) {
      console.log(err)
  }
};
module.exports.tags = ["all", "Swap"];
