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
    params: {
      name: string,
      symbol: string,
      initialSupply: number,
      addzeros: number
    },
  ) : Promise<Object> {
    //call method to deploy the ERC20 token
    const response = await this.tokenService.deployERC20Token(params);
    return {
      "hash" : response.hash,
      "factory": this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      "token" : response.address,
    };
  }

  @Get('list')
  async getERC20Tokens() {
    const tokens = await this.tokenService.getERC20Tokens();
    return { 
      "factory": this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      tokens 
    };
  }

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