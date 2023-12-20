// Third Party Dependencies.
import { Contract, ethers, Wallet } from 'ethers';
import { Injectable } from '@nestjs/common';

// Local Dependencies.
import ERC20_ABI from '../../../contracts/abis/ERC20_ABI.json';
import FactoryERC20_ABI from '../../../contracts/abis/FactoryERC20_ABI.json';
import { ConfigService } from '../../../config/config.service';
import { Blockchain } from '../../../config/config.keys';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  async deployERC20Token(
    wallet: Wallet,
    tokenParams: { name: string; symbol: string; initialSupply: number; decimals: number },
  ): Promise<string> {
    const { name, symbol, initialSupply, decimals } = tokenParams;
    //const methodName = 'CreateNewERC20Token(string,string,uint256)';
    const methodName = 'CreateNewERC20Token';

    const contract = new ethers.Contract(
      this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      FactoryERC20_ABI,
      wallet,
    );
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

  getFactoryERC20Contract(wallet: Wallet): Contract {
    const contract = new ethers.Contract(
      this.configService.get(Blockchain.ERC20_FACTORY_ADDRESS),
      FactoryERC20_ABI,
      wallet,
    );

    return contract;
  }

  async balanceOfERC20Token(
    wallet: Wallet,
    address: string,
    account: string,
  ): Promise<string> {
    //console.log('wallet', wallet);
    const contract = new ethers.Contract(address, ERC20_ABI, wallet);
    const balance = await contract.balanceOf(account);

    console.log('address: ' + address + '\n' + 'account: ' + account + '\n' + 'balance: ' + balance);

    return balance;
  }

  async transferERC20Token(
    wallet: Wallet,
    address: string,
    to: string,
    value: number,
    decimals: number,
  ): Promise<void> {
    //console.log('wallet: ', wallet);
    const contract = new ethers.Contract(address, ERC20_ABI, wallet);
    const num = value * Math.pow(10, decimals);
    await contract.transfer(to, BigInt(num));
    console.log('address: ' + address + '\n' + 'to: ' + to + '\n' + 'value: ' + value);

    return;
  }
}