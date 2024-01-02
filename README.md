# Decentralized Token and NFT Factory Plattform

The application serves as a bridge between the traditional Web2 world and the decentralized Web3 blockchain environment. Its primary goal is to enable companies to seamlessly integrate into the Ethereum blockchain, allowing them to tokenize assets or create digital representations of their operations. The application provides a set of RESTful API endpoints accessible from the traditional web, facilitating interaction with smart contracts deployed on the Ethereum blockchain.

### Key Features
#### ERC20 Token Management:

- **Create ERC20 Token:** Companies can create their ERC20 tokens through the application, specifying details such as the token's name, symbol, initial supply, and additional decimal places.
- **Token List:** Retrieve a list of all deployed ERC20 tokens associated with the factory address.
#### Token Operations:

- **Check Token Balance:** Get the balance of a specific ERC20 token for a given Ethereum address.
- **Mint Tokens:** Mint additional tokens to a specified Ethereum address, expanding the token supply.
- **Transfer Tokens:** Facilitate the transfer of tokens between Ethereum addresses.

#### ERC721 Token (NFT) Management:

- **Create ERC721 Token (NFT):** Similar to ERC20, the application allows companies to create ERC721 tokens (NFTs) with unique properties.
- **List Deployed NFTs:** Retrieve a list of all deployed ERC721 tokens (NFTs) associated with the factory address.
#### NFT Operations:

- **Check NFT Owner:** Determine the current owner of a specific ERC721 token (NFT) identified by its token ID.
- **Get Token URI:** Retrieve the Uniform Resource Identifier (URI) associated with a specific ERC721 token (NFT).
- **Safe Mint and Transfer:** Mint new NFTs or safely transfer existing ones between Ethereum addresses.
- **Burn NFT:** Permanently remove an ERC721 token (NFT) from circulation.
### Technologies Used
- **NestJS:** A framework for building scalable and efficient server-side applications in Node.js.
- **Ethereum Smart Contracts:** Solidity-based contracts deployed on the Ethereum blockchain.
- **Solidity:** The programming language used for writing smart contracts.
- **OpenZeppelin Contracts:** A library for secure and community-vetted Ethereum smart contracts.

By providing these functionalities, the application simplifies the process for companies to leverage blockchain technology, enabling them to tokenize assets, manage tokens, and participate in the decentralized finance ecosystem.

## Token Creation

### ERC20 Token Factory

#### Deploy a New ERC20 Token
- **Endpoint:** `POST /token`
- **Request Body:**
  ```json
  {
    "name": "YourTokenName",
    "symbol": "TOKEN",
    "initialSupply": 1000000,
    "addzeros": 18
  }
- **Response**:
  ```json
  {
    "hash": "TransactionHash",
    "factory": "ERC20FactoryAddress",
    "token": "NewERC20TokenAddress"
  }

#### Get List of Deployed ERC20 Tokens
- **Endpoint:` GET /token/list`**
- **Response:**
  ````json
  {
    "factory": "ERC20FactoryAddress",
    "tokens": ["Token1Address", "Token2Address", ...]
  }

#### Check Token Balance
- **Endpoint: `GET /token/balance`**
- **Query Parameters:**
  - token: ERC20 Token Address
  - account: User's Ethereum Address
- **Response:**
  ````json
  {
    "balance": "TokenBalance"
  }

#### Mint ERC20 Tokens
- **Endpoint: `POST /token/mint`**
Request Body:
  ````json
  {
    "token": "TokenAddress",
    "to": "RecipientAddress",
    "amount": 1000,
    "addzeros": 18
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash"
  }
#### Transfer ERC20 Tokens
- **Endpoint: `POST /token/transfer`**
- **Request Body:**
  ````json
  {
    "token": "TokenAddress",
    "from": "SenderAddress",
    "to": "RecipientAddress",
    "value": 500,
    "addzeros": 18
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash"
  }
### ERC721 Token Factory

#### Deploy a New ERC721 Token (NFT)
- **Endpoint: `POST /nft`**
- **Request Body:** 
  ````json
  {
    "name": "YourNFTName",
    "symbol": "NFT",
    "baseURI": "BaseTokenURI"
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash",
    "factory": "ERC721FactoryAddress",
    "token": "NewERC721TokenAddress"
  }
#### Get List of Deployed ERC721 Tokens (NFTs)
- **Endpoint: `GET /nft/list`**
- **Response:**
  ````json
  {
    "factory": "ERC721FactoryAddress",
    "tokens": ["NFT1Address", "NFT2Address", ...]
  }
#### Check NFT Owner
- **Endpoint: `GET /nft/owner`**
- **Query Parameters:**
  - token: ERC721 Token Address
  - tokenId: NFT Token ID
- **Response:**
  ````json
  {
    "owner": "NFTOwnerAddress"
  }
#### Get Token URI for NFT
- **Endpoint: `GET /nft/token_URI`**
- **Query Parameters:**
  - token: ERC721 Token Address
  - tokenId: NFT Token ID
- **Response:**
  ````json
  {
    "tokenURI": "NFTTokenURI"
  }
#### Mint NFT (Safe Mint)
- **Endpoint: `POST /nft/mint`**
- **Request Body:**
  ````json
  {
    "token": "NFTAddress",
    "to": "RecipientAddress",
    "tokenId": 1,
    "uri": "TokenURI"
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash"
  }
#### Transfer NFT (Safe Transfer)
- **Endpoint: `POST /nft/transfer`**
- **Request Body:**
  ````json
  {
    "token": "NFTAddress",
    "from": "SenderAddress",
    "to": "RecipientAddress",
    "tokenId": 1
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash"
  }
#### Burn NFT
- **Endpoint: POST /nft/burn**
- **Request Body:**
  ````json
  {
    "token": "NFTAddress",
    "from": "OwnerAddress",
    "tokenId": 1
  }
- **Response:**
  ````json
  {
    "hash": "TransactionHash"
  }
