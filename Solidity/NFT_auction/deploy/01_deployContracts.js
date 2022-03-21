const { network } = require("hardhat");
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  let nftAuction = await deploy("NFTAuction", {
    from: deployer,
    log: true,
  });
  let erc20 = await deploy("ERC20MockContract", {
    from: deployer,
    log: true,
    args: ["Mock ERC20", "MER"],
  });

  let erc721 = await deploy("ERC721MockContract", {
    from: deployer,
    args: ["New Mocks", "NMK"],
    log: true,
  });

  try {
    await hre.run("verify:verify", {
        address: nftAuction.address,
        constructorArguments: [],
    });
    await hre.run("verify:verify", {
        address: erc20.address,
        constructorArguments: ["Mock ERC20", "MER"],
    });
    await hre.run("verify:verify", {
        address: "0xA7347fb18f42cf02236449A3945f6E423aB84097",
        constructorArguments: ["New Mocks", "NMK"],
    });

  } catch (err) {
      console.log(err)
  }
};
module.exports.tags = ["all", "Auction"];
