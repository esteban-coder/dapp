// Third Party Dependencies.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

// Local Dependencies.
import { NftService } from '../services/nft.service';

@Controller('nft')
export class NftController {
  constructor(
    private readonly nftService: NftService
  ) {}

  /**
   * @memberof NftController
   * @description Deploy an ERC721 Token.
   * @param {Object} tokenParams - Token Parameters.
   * @returns {string} - Contract Address.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async deployERC721Token(
    @Body()
    tokenParams: {
      name: string;
      symbol: string;
      baseURI: string;
    },
  ): Promise<Object> {
    //call method to deploy the ERC721 token
    const contractAddress = await this.nftService.deployERC721Token(tokenParams);
    return { "address" : contractAddress };
  }

  @Get('owner')
  async getOwnerOfERC721Token(
    @Query('address') address: string,
    @Query('tokenId') tokenId: string,
  ) {
    const owner = await this.nftService.getOwner(address, tokenId);
    return { owner };
  }

  @Get('token_URI')
  async getUriOfToken(
    @Query('address') address: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenURI = await this.nftService.getTokenURI(address, tokenId);
    return { tokenURI };
  }

  // @Post(':tokenId/set-uri')
  // async setTokenURI(
  //   @Param('tokenId') tokenId: number,
  //   @Body('tokenURI') tokenURI: string,
  // ): Promise<void> {
  //   await this.nftService.setTokenURI(tokenId, tokenURI);
  // }

}