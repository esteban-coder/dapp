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
    const token = await this.tokenService.deployERC20Token(params);
    return { 
      "factory": this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      "token" : token 
    };
  }

  @Get('list')
  async getERC20Tokens() {
    const tokens = await this.tokenService.getERC20Tokens();
    return { tokens };
  }

  @Get('balance')
  async balanceOfERC20Token(
    @Query('token') token: string,
    @Query('account') account: string,
  ) {
    console.log('token: ' + token + '\n' + 'account: ' + account);
    let balance = await this.tokenService.balanceOfERC20Token(token, account);
    console.log('balance: ' + balance);
    // console.log(typeof balance);
    balance = balance.toString();
    return { balance };
  }

  @Post('mint')
  async mintERC20Token(
    @Body()
    params: {
      token: string,
      to: string,
      amount: number,
      addzeros: number
    },
  ) : Promise<Object> {
    await this.tokenService.mintERC20Token(params);
    return {};
  }

  @Post('transfer')
  async transferERC20Token(
    @Body()
    params: {
      token: string,
      to: string,
      value: number,
      addzeros: number
    },
  ) : Promise<Object> {
    console.log('transfer => \ntoken: ' + params.token + '\n' + 'to: ' + params.to + '\n' + 'value: ' + params.value + '\n' + 'addzeros: ' + params.addzeros);
    await this.tokenService.transferERC20Token(params);
    return {};
  }

  @Post('transferFromToken')
  public async transferERC20TokenFromToken(
    @Body('token') token: string,
    @Body('to') to: string,
    @Body('value') value: number,
    @Body('addzeros') addzeros: number,
  ) {
    console.log('transferFromToken => \ntoken: ' + token + '\n' + 'to: ' + to + '\n' + 'value: ' + value + '\n' + 'addzeros: ' + addzeros);
    await this.tokenService.transferERC20TokenFromToken(token, to, value, addzeros);
    return {};
  }

  // @Post('transferFromTokenConnect')
  // public async transferERC20TokenFromTokenConnect(
  //   @Body('token') token: string,
  //   @Body('from') from: string,
  //   @Body('to') to: string,
  //   @Body('value') value: number,
  //   @Body('addzeros') addzeros: number,
  // ) {
  //   console.log('transferFromTokenConnect => \ntoken: ' + token + '\n' + 'to: ' + to + '\n' + 'value: ' + value + '\n' + 'addzeros: ' + addzeros);
  //   await this.tokenService.transferERC20TokenFromTokenConnect(token, from, to, value, addzeros);
  //   return {};
  // }

}