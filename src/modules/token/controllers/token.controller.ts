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

@Controller('token')
export class TokenController {
  constructor(
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
      name: string;
      symbol: string;
      initialSupply: number;
      decimals: number
    },
  ) : Promise<Object> {
    //call method to deploy the ERC20 token
    const contractAddress = await this.tokenService.deployERC20Token(tokenParams);
    return { "address" : contractAddress };
  }

  @Post('transfer')
  public async transferERC20Token(
    @Body('address') address: string,
    @Body('to') to: string,
    @Body('value') value: number,
    @Body('decimals') decimals: number,
  ) {
    console.log('address: ' + address + '\n' + 'to: ' + to + '\n' + 'value: ' + value + '\n' + 'decimals: ' + decimals);
    await this.tokenService.transferERC20Token(address, to, value, decimals);
    return {};
  }

  @Get('balance')
  async balanceOfERC20Token(
    @Query('address') address: string,
    @Query('account') account: string,
  ) {
    console.log('address: ' + address + '\n' + 'account: ' + account);
    let balance = await this.tokenService.balanceOfERC20Token(address, account);
    console.log('balance: ' + balance);
    console.log(typeof balance);
    balance = balance.toString();
    return { balance };
  }
}
