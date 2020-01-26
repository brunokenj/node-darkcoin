# node-ethcoin

node-ethcoin is a simple wrapper for the geth client's JSON-RPC API.

## Install

`npm install node-eth-rpc`

## Examples

### Create client
```js
var client = new ethcoin.Client({
  host: 'localhost',
  port: 8545,
  user: '',
  pass: ''
});
```

### Get all accounts

```js
client.cmd('personal_listAccounts', function(err, accounts){
  if (err) return console.log(err);
  console.log('personal_listAccounts:', accounts);
});
```
### Getting the balance directly using `cmd`

```js
client.cmd('eth_getBalance', 'accountAddress', 'latest', function(err, balance){
  if (err) return console.log(err);
  console.log('Balance:', balance);
});
```

### Batch multiple RPC calls into single HTTP request

```js
var batch = [];
for (var i = 0; i < 10; ++i) {
  batch.push({
    method: 'getnewaddress',
    params: ['myaccount']
  });
}
client.cmd(batch, function(err, address) {
  if (err) return console.log(err);
  console.log('Address:', address);
});
```

## SSL
See [Enabling SSL on original client](https://en.bitcoin.it/wiki/Enabling_SSL_on_original_client_daemon).

If you're using this to connect to darkcoind across a network it is highly
recommended to enable `ssl`, otherwise an attacker may intercept your RPC credentials
resulting in theft of your darkcoins.

When enabling `ssl` by setting the configuration option to `true`, the `sslStrict`
option (verifies the server certificate) will also be enabled by default. It is 
highly recommended to specify the `sslCa` as well, even if your darkcoind has
a certificate signed by an actual CA, to ensure you are connecting
to your own darkcoind.

```js
var client = new darkcoin.Client({
  host: 'localhost',
  port: 15715,
  user: 'username',
  pass: 'password',
  ssl: true,
  sslStrict: true,
  sslCa: fs.readFileSync(__dirname + '/server.cert')
});
```

If your using a self signed certificate generated with something like 

`openssl x509 -req -days 365 -in server.cert -signkey server.key -out server.cert`

then `sslStrict` should be set to `false` because by defult node wont work with 
untrusted certificates. 

## Forked
forked from doomhz/node-darkcoin