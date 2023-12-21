// Third Party Dependencies.
import { Contract, ethers, Wallet } from 'ethers';
import { Injectable } from '@nestjs/common';

// Local Dependencies.
import ERC721_ABI from '../../../contracts/abis/ERC721_ABI.json';
import ERC721Factory_ABI from '../../../contracts/abis/ERC721Factory_ABI.json';
import { WalletService } from '../../wallet/services/wallet.service';
import { ConfigService } from '../../../config/config.service';
import { Blockchain } from '../../../config/config.keys';

@Injectable()
export class NftService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * @todo Refactor this.
   * @task Deploy ERC721 Token.
   * @description This method will deploy an ERC721 Token.
   */
  async deployERC721Token(
    tokenParams: { name: string; symbol: string; baseURI: string },
  ): Promise<string> {
    const { name, symbol, baseURI } = tokenParams;
    //const methodName = 'createNewERC721Token(string,string,string)';
    const methodName = 'createNewERC721Token';
    const contract = this.getERC721TokenFactory();
    try {
      const tx = await contract[methodName](name, symbol, baseURI);
      const response = await tx.wait();
      console.log(`Smart Contract Method "${methodName}" tx:`, tx);
      console.log(`Smart Contract Method "${methodName}" response:`, response);
      const address = response.logs[0].address;
      return address;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @todo Refactor this.
   * @task Get ERC721 Contract.
   * @description This method will return the ERC721 Contract.
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
   * @todo Refactor this.
   * @task Get Owner of ERC721 Token.
   * @description This method will return the owner of an ERC721 Token.
   */
  async getOwner(address: string, tokenId: string): Promise<string> {
    const provider = this.walletService.getProvider();
    const contract = new ethers.Contract(address, ERC721_ABI, provider);
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
   * @todo Refactor this.
   * @task Get Token URI.
   * @description This method will return the URI of an ERC721 Token.
   */
  async getTokenURI(address: string, tokenId: string): Promise<string> {
    const provider = this.walletService.getProvider();
    const contract = new ethers.Contract(address, ERC721_ABI, provider);
    try {
      const uri = await contract.tokenURI(tokenId);
      return uri;
    } catch (error) {
      throw error;
    }
  }

  // async setBaseURI(address: string, newBaseURI: string): Promise<void> {
  //   const wallet = this.walletService.getWallet();
  //   const contract = new ethers.Contract(address, ERC721_ABI, wallet);
  //   const owner = await contract.ownerOf(tokenId);

  //   if (owner !== (await wallet.getAddress())) {
  //     throw new Error('No tienes permiso para establecer el URI del token.');
  //   }

  //   // Llamar a la función del contrato para establecer el URI del token
  //   await contract.setTokenURI(tokenId, tokenURI);
  // }

}