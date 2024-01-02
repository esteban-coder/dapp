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

/**
 * @description Controller for managing ERC721 tokens (NFTs).
 * @memberof NftController
 */
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

  /**
   * @description Get the list of deployed ERC721 tokens.
   * @memberof NftController
   * @returns {Promise<Object>} - Factory Address and List of ERC721 Token addresses.
   */
  @Get('list')
  async getERC721Tokens() {
    const tokens = await this.nftService.getERC721Tokens();
    return { 
      "factory": this.configService.get(Blockchain.ERC721_FACTORY_ADDRESS),
      tokens 
    };
  }

  /**
   * @description Get the owner of a specific ERC721 token and tokenId.
   * @memberof NftController
   * @param {string} token - ERC721 Token Address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<Object>} - Token Owner.
   */
  @Get('owner')
  async getOwner(
    @Query('token') token: string,
    @Query('tokenId') tokenId: string,
  ) {
    const owner = await this.nftService.getOwner(token, tokenId);
    return { owner };
  }

  /**
   * @description Get the URI of a specific ERC721 token and tokenId.
   * @memberof NftController
   * @param {string} token - ERC721 Token Address.
   * @param {string} tokenId - Token ID.
   * @returns {Promise<Object>} - Token URI.
   */
  @Get('token_URI')
  async getTokenURI(
    @Query('token') token: string,
    @Query('tokenId') tokenId: string,
  ) {
    const tokenURI = await this.nftService.getTokenURI(token, tokenId);
    return { tokenURI };
  }

  /**
   * @description Mint a new NFT using the safeMint method.
   * @memberof NftController
   * @param {string} token - ERC721 Token Address.
   * @param {string} to - Recipient Address.
   * @param {number} tokenId - Token ID.
   * @param {string} uri - Token URI.
   * @returns {Promise<Object>} - Transaction Hash.
   */
  @Post('mint')
  @HttpCode(HttpStatus.CREATED)
  async safeMint(
    @Body("token") token: string, @Body("to") to: string, @Body("tokenId") tokenId: number, @Body("uri") uri: string
  ): Promise<Object> {
    console.log('safeMint => \ntoken: ' + token + '\n' + 'to: ' + to + '\n' + 'tokenId: ' + tokenId + '\n' + 'uri: ' + uri);
    const hash = await this.nftService.safeMint(token, to, tokenId, uri);
    return { "hash": hash };
  }

  /**
   * @description Transfer an NFT using the safeTransfer method.
   * @memberof NftController
   * @param {string} token - ERC721 Token Address.
   * @param {string} from - Sender Address.
   * @param {string} to - Recipient Address.
   * @param {number} tokenId - Token ID.
   * @returns {Promise<Object>} - Transaction Hash.
   */
  @Post('transfer')
  @HttpCode(HttpStatus.CREATED)
  async safeTransfer(
    @Body("token") token: string, @Body("from") from: string, @Body("to") to: string, @Body("tokenId") tokenId: number
  ): Promise<Object> {
    const hash = await this.nftService.safeTransfer(token, from, to, tokenId);
    return { hash };
  }

  /**
   * @description Burn an NFT using the burn method.
   * @memberof NftController
   * @param {string} token - ERC721 Token Address.
   * @param {string} from - Owner Address.
   * @param {number} tokenId - Token ID.
   * @returns {Promise<Object>} - Transaction Hash.
   */
  @Post('burn')
  @HttpCode(HttpStatus.CREATED)
  async burn(
    @Body("token") token: string, @Body("from") from: string, @Body("tokenId") tokenId: number
  ): Promise<Object> {
    const hash = await this.nftService.burn(token, from,  tokenId);
    return { hash };
  }

}