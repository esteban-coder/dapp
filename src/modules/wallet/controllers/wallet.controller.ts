import { Body, Controller, Get, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  createWallet(@Body('token') token: string) {
    if (token) {
      console.log('Auth Token validation here');
    }
    const wallet = this.walletService.createRandomWallet();
    const res = {
      address: wallet.address,
      privateKey: wallet.privateKey,
      seedphrase: wallet.mnemonic.phrase,
    };
    return res;
  }

  @Get()
  public getWallet(): any {
    return this.walletService.getWallet();
  }
}
