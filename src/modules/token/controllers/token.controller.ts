// Third Party Dependencies.
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';

// Local Dependencies.
import { TokenService } from '../services/token.service';
import { Blockchain } from 'src/config/config.keys';
import { ConfigService } from 'src/config/config.service';

/**
 * @description Controller for managing ERC20 tokens.
 * @memberof TokenController
 */
@Controller('token')
export class TokenController {

  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {}

  /**
   * @memberof TokenController
   * @description Deploy an ERC20 Token.
   * @param {Object} tokenParams - Token Parameters.
   * @returns {string} - Contract Address.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async deployERC20Token(
    @Body()
    tokenParams: {
      name: string,
      symbol: string,
      initialSupply: number,
      addzeros: number
    },
  ) : Promise<Object> {
    //call method to deploy the ERC20 token
    const response = await this.tokenService.deployERC20Token(tokenParams);
    return {
      "hash" : response.hash,
      "factory": this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      "token" : response.address,
    };
  }

  /**
   * @memberof TokenController
   * @description Get the list of deployed ERC20 tokens.
   * @returns {Object} - Factory Address and ERC20 Tokens.
   */
  @Get('list')
  async getERC20Tokens() {
    const tokens = await this.tokenService.getERC20Tokens();
    return { 
      "factory": this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      tokens 
    };
  }

  /**
   * @memberof TokenController
   * @description Get the balance of an account for a specific ERC20 token.
   * @param {string} token - ERC20 Token Address.
   * @param {string} account - Account Address.
   * @returns {Object} - Token Balance.
   */
  @Get('balance')
  async getBalance(
    @Query('token') token: string,
    @Query('account') account: string,
  ) {
    console.log('token: ' + token + '\n' + 'account: ' + account);
    let balance = await this.tokenService.getBalance(token, account);
    console.log('balance: ' + balance);
    // console.log(typeof balance);
    balance = balance.toString();
    return { balance };
  }

  /**
   * @memberof TokenController
   * @description Mint new tokens for a specific ERC20 token.
   * @param {Object} params - Minting Parameters: token address, to address, amount to transfer, amount of zeros of token.
   * @returns {Object} - Transaction Hash.
   */
  @Post('mint')
  async mint(
    @Body()
    params: {
      token: string,
      to: string,
      amount: number,
      addzeros: number
    },
  ) : Promise<Object> {
    const hash = await this.tokenService.mint(params);
    return { hash };
  }

  /**
   * @memberof TokenController
   * @description Transfer tokens from the ERC20 factory to a specific address.
   * @param {Object} params - Transfer Parameters: token address, to address, amount to transfer, amount of zeros of token..
   * @returns {Object} - Transaction Hash.
   */
  @Post('transferFromFactory')
  async transferFromFactory(
    @Body()
    params: {
      token: string,
      to: string,
      value: number,
      addzeros: number
    },
  ) : Promise<Object> {
    console.log('transfer => \ntoken: ' + params.token + '\n' + 'to: ' + params.to + '\n' + 'value: ' + params.value + '\n' + 'addzeros: ' + params.addzeros);
    const hash = await this.tokenService.transferFromFactory(params);
    return { hash };
  }

  /**
   * @memberof TokenController
   * @description Transfer tokens from one address to another for a specific ERC20 token.
   * @param {Object} params - Transfer Parameters: token address, from address, to address, amount to transfer, amount of zeros of token.
   * @returns {Object} - Transaction Hash.
   */
  @Post('transfer')
  async transfer(
    @Body()
    params: {
      token: string,
      from: string,
      to: string,
      value: number,
      addzeros: number
    },
  ) : Promise<Object> {
    console.log('transfer => \ntoken: ' + params.token + '\n' + 'from: ' + params.from + '\n' + 'to: ' + params.to + '\n' + 'value: ' + params.value + '\n' + 'addzeros: ' + params.addzeros);
    const hash = await this.tokenService.transfer(params);
    return { hash };
  }



}