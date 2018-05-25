var GuyFactory = artifacts.require("GuyFactory");

module.exports = function(deployer) {
  deployer.deploy(GuyFactory);
};