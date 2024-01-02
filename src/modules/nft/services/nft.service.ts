// Third Party Dependencies.
import { Contract, ethers, Wallet } from 'ethers';
import { Injectable } from '@nestjs/common';

// Local Dependencies.
import ERC721_ABI from '../../../contracts/abis/ERC721_ABI.json';
import ERC721Factory_ABI from '../../../contracts/abis/ERC721Factory_ABI.json';
import { WalletService } from '../../wallet/services/wallet.service';
import { ConfigService } from '../../../config/config.service';
import { Blockchain } from '../../../config/config.keys';

/**
 * @description Service for managing ERC721 tokens (NFTs).
 * @memberof NftService
 */
@Injectable()
export class NftService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * @description Deploy an ERC721 Token.
   * @memberof NftService
   * @param {Object} tokenParams - Token Parameters.
   * @returns {Promise<{ "hash": string, "address": string }>} - Transaction Hash and Contract Address.
   */
  async deployERC721Token(
    tokenParams: { name: string; symbol: string; baseURI: string },
  ): Promise<{ "hash": string, "address": string }> {
    const { name, symbol, baseURI } = tokenParams;
    //const methodName = 'createNewERC721Token(string,string,string)';
    const methodName = 'createNewERC721Token';
    const contract = this.getERC721TokenFactory();
    try {
      //const tx = await contract[methodName](name, symbol, baseURI);
      const tx = await contract.createNewERC721Token(name, symbol, baseURI);
      const receipt = await tx.wait();
      console.log(`Smart Contract Method "${methodName}" tx:`, tx);
      console.log(`Smart Contract Method "${methodName}" receipt:`, receipt);
      const address = receipt.logs[0].address;
      const hash = receipt.hash;
      return { "address": address, "hash": hash };
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get the ERC721 Token Factory contract.
   * @memberof NftService
   * @returns {Contract} - ERC721 Token Factory contract instance.
   */
  getERC721TokenFactory(): Contract {
    // Get Wallet to Sign.
    const wallet = this.walletService.getWallet();
    const contract = new ethers.Contract(
      this.configService.get(Blockchain.ERC721_FACTORY_ADDRESS),
      ERC721Factory_ABI,
      wallet,
    );

    return contract;
  }

  /**
   * @description Get the list of deployed ERC721 tokens.
   * @memberof NftService
   * @returns {Promise<Array>} - List of ERC721 Token addresses.
   */
  async getERC721Tokens() {
    const contract = this.getERC721TokenFactory();
    const tokens = await contract.getAllERC721Tokens();
    return tokens;
  }

  /**
   * @description Get the owner of an ERC721 Token.
   * @memberof NftService
   * @param {string} token - ERC721 Token Address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<string>} - Token Owner.
   */
  async getOwner(token: string, tokenId: string): Promise<string> {
    const provider = this.walletService.getProvider();
    const contract = new ethers.Contract(token, ERC721_ABI, provider);
    try {
      // if (!(await contract.ownerOf(tokenId)).call()) {
      //   throw new Error('Token no existente');
      // }
      return await contract.ownerOf(tokenId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Get the URI of an ERC721 Token.
   * @memberof NftService
   * @param {string} token - ERC721 Token Address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<string>} - Token URI.
   */
  async getTokenURI(token: string, tokenId: string): Promise<string> {
    const provider = this.walletService.getProvider();
    const contract = new ethers.Contract(token, ERC721_ABI, provider);
    try {
      return await contract.tokenURI(tokenId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Mint a new NFT using the safeMint method.
   * @memberof NftService
   * @param {string} token - ERC721 Token Address.
   * @param {string} to - Recipient Address.
   * @param {number} tokenId - Token ID.
   * @param {string} uri - Token URI.
   * @returns {Promise<string>} - Transaction Hash.
   */
  async safeMint(token: string, to: string, tokenId: number, uri: string): Promise<string> {
    const contract = this.getERC721TokenFactory();
    const tx = await contract.callSafeMint(token, to, tokenId, uri);
    const receipt = await tx.wait();
    return receipt.hash;
  }

  /**
   * @description Transfer an NFT using the safeTransfer method.
   * @memberof NftService
   * @param {string} token - ERC721 Token Address.
   * @param {string} from - Sender Address.
   * @param {string} to - Recipient Address.
   * @param {number} tokenId - Token ID.
   * @returns {Promise<string>} - Transaction Hash.
   */
  async safeTransfer(token: string, from: string, to: string, tokenId: number): Promise<string> {
    const contract = this.getERC721TokenFactory();
    const tx = await contract.callSafeTransfer(token, from, to, tokenId);
    const receipt = await tx.wait();
    return receipt.hash;
  }

  /**
   * @description Burn an NFT using the burn method.
   * @memberof NftService
   * @param {string} token - ERC721 Token Address.
   * @param {string} from - Owner Address.
   * @param {number} tokenId - Token ID.
   * @returns {Promise<string>} - Transaction Hash.
   */
  async burn(token: string, from: string, tokenId: number): Promise<string> {
    const contract = this.getERC721TokenFactory();
    const tx = await contract.callBurn(token, from, tokenId);
    const receipt = await tx.wait();
    return receipt.hash;
  }

}