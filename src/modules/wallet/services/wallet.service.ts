// Third Party Dependencies.
import { Injectable } from '@nestjs/common';
import { ethers, HDNodeWallet, JsonRpcProvider, Wallet } from 'ethers';

// Local Dependencies.
import { ConfigService } from '../../../config/config.service';
import { Blockchain } from '../../../config/config.keys';

@Injectable()
export class WalletService {
  constructor(private readonly configService: ConfigService) {}

  public getWallet(): Wallet {
    const provider: JsonRpcProvider = new ethers.JsonRpcProvider(
      this.configService.get(Blockchain.MUMBAI_TESTNET_URL),
    );
    const wallet: Wallet = new Wallet(
      this.configService.get(Blockchain.WALLET_PRIVATE_KEY),
      provider,
    );
    return wallet;
  }

  public createRandomWallet(): HDNodeWallet {
    const randomWallet = Wallet.createRandom();
    console.log(`New Wallet Address: ${randomWallet.address}`);
    console.log(`Private Key: ${randomWallet.privateKey}`);

    return randomWallet;
  }
}
