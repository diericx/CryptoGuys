var GuyFactory = artifacts.require("GuyFactory");

contract('GuyFactory', function(accounts) {
  it("Initial supply should be 0", function() {
    return GuyFactory.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 0, "Initial supply wasn't 0");
    });
  });

  it("Creating a new random guy", function() {
    var guyFactory;
    return GuyFactory.deployed().then(function(instance) {
      guyFactory = instance;
      return guyFactory.createRandomGuy.call("new-test-guy", accounts[0]);
    }).then(id => {
      assert.equal(id.toNumber(), 0, "Id of new Guy should be 0");
      return guyFactory.balanceOf.call(accounts[0]);
    })
  });

  it("Test getNameForGuy", function() {
    return GuyFactory.deployed().then(function(instance) {
      return instance.getNameForGuy(0);
    }).then(name => {
      assert.equal(name, "new-test-guy", "Name of new random guy should be new-test-guy");
    });
  });

  it("Test supply after generating random guy", function() {
    return GuyFactory.deployed().then(function(instance) {
      return instance.totalSupply.call();
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 1, "Supply should be 1");
    });
  });

  // it("Should be able to access new random guy", function() {
  //   return GuyFactory.deployed().then(function(instance) {
  //     var guy = instance.getGuy.call(0).then(function(guy) {
  //       console.log(guy)
  //       return guy;
  //     });
  //     console.log(guy);
  //     return guy;
  //   }).then(function(balance) {
  //     assert.equal(balance, "", "Supply wasn't 0 after creating a new random");
  //   });
  // });

  // it("Creating a new random should increase balance", function() {
  //   return GuyFactory.deployed().then(function(instance) {
  //     return instance.balanceOf.call(accounts[0]);
  //   }).then(function(balance) {
  //     assert.equal(balance.valueOf(), 1, "Balance wasn't 1 after creating a new random");
  //   });
  // });
  // it("should call a function that depends on a linked library", function() {
  //   var meta;
  //   var metaCoinBalance;
  //   var metaCoinEthBalance;

  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(accounts[0]);
  //   }).then(function(outCoinBalance) {
  //     metaCoinBalance = outCoinBalance.toNumber();
  //     return meta.getBalanceInEth.call(accounts[0]);
  //   }).then(function(outCoinBalanceEth) {
  //     metaCoinEthBalance = outCoinBalanceEth.toNumber();
  //   }).then(function() {
  //     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
  //   });
  // });
  // it("should send coin correctly", function() {
  //   var meta;

  //   // Get initial balances of first and second account.
  //   var account_one = accounts[0];
  //   var account_two = accounts[1];

  //   var account_one_starting_balance;
  //   var account_two_starting_balance;
  //   var account_one_ending_balance;
  //   var account_two_ending_balance;

  //   var amount = 10;

  //   return MetaCoin.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_starting_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_starting_balance = balance.toNumber();
  //     return meta.sendCoin(account_two, amount, {from: account_one});
  //   }).then(function() {
  //     return meta.getBalance.call(account_one);
  //   }).then(function(balance) {
  //     account_one_ending_balance = balance.toNumber();
  //     return meta.getBalance.call(account_two);
  //   }).then(function(balance) {
  //     account_two_ending_balance = balance.toNumber();

  //     assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
  //     assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
  //   });
  // });
});

// factory.totalSupply().then(supp => {console.log(supp.toNumber)})
// factory.getNameForGuy(0).then(name => {console.log(name)})
// factory.balanceOf(0).then(balance => {console.log(balance.toNumber())})