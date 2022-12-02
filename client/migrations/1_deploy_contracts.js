const propNFT = artifacts.require("propNFT");
const morter = artifacts.require("morter");
const Auction = artifacts.require("Auction");
module.exports = function(deployer) {
  deployer.deploy(propNFT).then(function(){
     return deployer.deploy(morter,propNFT.address).then(function(){
      return deployer.deploy(Auction);
     });
  });
};