<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## SDK documents

```
https://business-testnet.dareplay.io/docs/
```

## Running the app

### Setup ENV

```
cp .env.example .env
```

```
PORT = 3000                     // Port for backend to listen
PRIV_KEYS='abcd123,xyz321'      // Private keys
API_KEY='expKey1,expKey2'       // API keys retrieved from Business console
CHAIN=1                         // Env of protocol, Ex: ChainType.TEST_NET
CHAIN_ID=97                     // Chain id of blockchain, Ex: Chain.BSC_TESTNET
```

### Start the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
