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
import { Blockchain } from 'src/config/config.keys';
import { ConfigService } from 'src/config/config.service';

@Controller('nft')
export class NftController {

  constructor(
    private readonly configService: ConfigService,
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
    const response = await this.nftService.deployERC721Token(tokenParams);
    return {
      "hash" : response.hash,
      "factory": this.configService.get(Blockchain.ERC721_FACTORY_ADDRESS),
      "token" : response.address,
    };
  }

  @Get('list')
  async getERC721Tokens() {
    const tokens = await this.nftService.getERC721Tokens();
    return { 
      "factory": this.configService.get(Blockchain.ERC721_FACTORY_ADDRESS),
      tokens 
    };
  }

  @Get('owner')
  async getOwner(
    @Query('token') token: string,
    @Query('tokenId') tokenId: string,
  ) {
    const owner = await this.nftService.getOwner(token, tokenId);
    return { owner };
  }

  @Get('token_URI')
  async getTokenURI(
    @Query('token') token: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenURI = await this.nftService.getTokenURI(token, tokenId);
    return { tokenURI };
  }

  @Post('mint')
  @HttpCode(HttpStatus.CREATED)
  async safeMint(
    @Body("token") token: string, @Body("to") to: string, @Body("tokenId") tokenId: number, @Body("uri") uri: string
  ): Promise<Object> {
    console.log('safeMint => \ntoken: ' + token + '\n' + 'to: ' + to + '\n' + 'tokenId: ' + tokenId + '\n' + 'uri: ' + uri);
    const hash = await this.nftService.safeMint(token, to, tokenId, uri);
    return { "hash": hash };
  }

  @Post('transfer')
  @HttpCode(HttpStatus.CREATED)
  async safeTransfer(
    @Body("token") token: string, @Body("from") from: string, @Body("to") to: string, @Body("tokenId") tokenId: number
  ): Promise<Object> {
    const hash = await this.nftService.safeTransfer(token, from, to, tokenId);
    return { hash };
  }

  @Post('burn')
  @HttpCode(HttpStatus.CREATED)
  async burn(
    @Body("token") token: string, @Body("from") from: string, @Body("tokenId") tokenId: number
  ): Promise<Object> {
    const hash = await this.nftService.burn(token, from,  tokenId);
    return { hash };
  }

}