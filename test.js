
var ethcoin = require('./lib');

var client = new ethcoin.Client({
  host: '127.0.0.1',
  port: 8545,
  user: '',
  pass: ''
});

client.cmd('eth_accounts', function(err, accounts){
  if (err) return console.log(err);
  console.log('Accounts:', accounts);

  client.cmd('eth_getBalance', accounts[0], 'latest', function(err, balance){
    if (err) return console.log(err);
    console.log('Balance:', balance);
  });

});

client.cmd('personal_listAccounts', function(err, accounts){
  if (err) return console.log(err);
  console.log('personal_listAccounts accounts:', accounts);
});

client.cmd('personal_newAccount', 'passwordWallet', function(err, wallet){
  if (err) return console.log(err);
  console.log('New Wallet:', wallet);
});

