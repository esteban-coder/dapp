import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('api/wallet')
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

  public getWallet(): any {
    return this.walletService.getWallet();
  }
}
