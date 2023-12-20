// Third Party Dependencies.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

// Local Dependencies.
import { NftService } from '../services/nft.service';
import { WalletService } from '../../wallet/services/wallet.service';

@Controller('nft')
export class NftController {
  constructor(
    private readonly nftService: NftService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * @memberof NftController
   * @description Deploy an ERC721 Token.
   * @param {Object} tokenParams - Token Parameters.
   * @returns {string} - Contract Address.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async deployERC721Token(
    @Body()
    tokenParams: {
      type: string;
      name: string;
      symbol: string;
      supply: number;
    },
  ): Promise<string> {
    // Get Wallet to Sign.
    const wallet = this.walletService.getWallet();

    //call method to deploy the ERC20 token
    const contractAddress = await this.nftService.deployERC721Token(
      wallet,
      tokenParams,
    );

    return contractAddress;
  }

  @Get('owner/:tokenId')
  async getOwnerOfERC721Token(@Param('tokenId') tokenId: string) {
    const owner = await this.nftService.ownerOfERC721(tokenId);
    return { owner };
  }

  @Get('token_URI/:tokenId')
  async getUriOfToken(@Param('tokenId') tokenId: string) {
    const tokenURI = await this.nftService.getTokenURI(tokenId);
    return { tokenURI };
  }

  @Post(':tokenId/set-uri')
  async setTokenURI(
    @Param('tokenId') tokenId: number,
    @Body('tokenURI') tokenURI: string,
  ): Promise<void> {
    await this.nftService.setTokenURI(tokenId, tokenURI);
  }

  @Get(':tokenId/owner')
  async getOwnerOfToken(@Param('tokenId') tokenId: number): Promise<string> {
    return this.nftService.getOwnerOfToken(tokenId);
  }
}
