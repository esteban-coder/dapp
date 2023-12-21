// Third Party Dependencies.
import { Contract, ethers, Wallet } from 'ethers';
import { Injectable } from '@nestjs/common';

// Local Dependencies.
import ERC20_ABI from '../../../contracts/abis/ERC20_ABI.json';
import ERC20Factory_ABI from '../../../contracts/abis/ERC20Factory_ABI.json';
import { WalletService } from '../../wallet/services/wallet.service';
import { ConfigService } from '../../../config/config.service';
import { Blockchain } from '../../../config/config.keys';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletService: WalletService,
  ) {}

  async deployERC20Token(
    tokenParams: { name: string; symbol: string; initialSupply: number; decimals: number },
  ): Promise<string> {
    const { name, symbol, initialSupply, decimals } = tokenParams;
    //const methodName = 'createNewERC20Token(string,string,uint256)';
    const methodName = 'createNewERC20Token';
    const contract = this.getERC20TokenFactory();
    try {

      const num = initialSupply * Math.pow(10, decimals);

      const tx = await contract[methodName](name, symbol, BigInt(num));
      const response = await tx.wait();
      console.log(`Smart Contract Method "${methodName}" tx:`, tx);
      console.log(`Smart Contract Method "${methodName}" response:`, response);
      const address = response.logs[0].address;
      return address;
    } catch (error) {
      throw error;
    }
  }

  getERC20TokenFactory(): Contract {
    // Get Wallet to Sign.
    const wallet = this.walletService.getWallet();
    const contract = new ethers.Contract(
      this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      ERC20Factory_ABI,
      wallet,
    );

    return contract;
  }

  async balanceOfERC20Token(
    address: string,
    account: string,
  ): Promise<string> {
    const provider = this.walletService.getProvider();
    //console.log('provider', provider);
    const contract = new ethers.Contract(address, ERC20_ABI, provider);
    const balance = await contract.balanceOf(account);

    console.log('address: ' + address + '\n' + 'account: ' + account + '\n' + 'balance: ' + balance);

    return balance;
  }

  async transferERC20Token(
    address: string,
    to: string,
    value: number,
    decimals: number,
  ): Promise<void> {
    const wallet = this.walletService.getWallet();
    const contract = new ethers.Contract(address, ERC20_ABI, wallet);
    const num = value * Math.pow(10, decimals);
    await contract.transfer(to, BigInt(num));
    console.log('address: ' + address + '\n' + 'to: ' + to + '\n' + 'value: ' + value);

    return;
  }
}
