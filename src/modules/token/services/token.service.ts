// Third Party Dependencies.
import { BaseContract, Contract, ethers, Wallet } from 'ethers';
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
    params: { name: string; symbol: string; initialSupply: number; addzeros: number },
  ): Promise<string> {
    const { name, symbol, addzeros } = params;
    let { initialSupply } = params;
    //const methodName = 'createNewERC20Token(string,string,uint256)';
    const methodName = 'createNewERC20Token';
    const contract = this.getERC20TokenFactory();
    try {
      if (addzeros && addzeros > 0) {
        initialSupply = initialSupply * Math.pow(10, addzeros);
      }
      //const tx = await contract[methodName](name, symbol, BigInt(initialSupply));
      const tx = await contract.createNewERC20Token(name, symbol, BigInt(initialSupply));
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

  async getERC20Tokens() {
    const contract = this.getERC20TokenFactory();
    const tokens = await contract.getAllERC20Tokens();
    return tokens;
  }

  async balanceOfERC20Token(
    token: string,
    account: string,
  ): Promise<string> {
    const provider = this.walletService.getProvider();
    // console.log('provider', provider);
    const contract = new ethers.Contract(token, ERC20_ABI, provider);
    const balance = await contract.balanceOf(account);
    // console.log('token: ' + token + '\n' + 'account: ' + account + '\n' + 'balance: ' + balance);
    return balance;
  }

  async mintERC20Token(
    params: { token: string; to: string; amount: number, addzeros: number },
  ) : Promise<void> {
    const { token, to, addzeros } = params;
    let { amount } = params;
    const contract = this.getERC20TokenFactory();
    if (addzeros && addzeros > 0) {
      amount = amount * Math.pow(10, addzeros);
    }
    const tx = await contract.callERC20TokenMint(token, to, BigInt(amount));
    await tx.wait();
  }

  async transferERC20Token(
    params: { token: string, to: string, value: number, addzeros: number },
  ): Promise<void> {
    const { token, to, addzeros } = params;
    let { value } = params;
    const contract = this.getERC20TokenFactory();
    //console.log(addzeros);
    if (addzeros && addzeros > 0) {
      value = value * Math.pow(10, addzeros);
    }
    const tx = await contract.callERC20TokenTransfer(token, to, BigInt(value));
    await tx.wait();
  }

  async transferERC20TokenFromToken(
    token: string,
    to: string,
    value: number,
    addzeros: number
  ): Promise<void> {
    const wallet = this.walletService.getWallet();
    const contract = new ethers.Contract(token, ERC20_ABI, wallet);
    //console.log(addzeros);
    if (addzeros && addzeros > 0) {
      value = value * Math.pow(10, addzeros);
    }
    const tx = await contract.transfer(to, BigInt(value));
    await tx.wait();
  }

  // async transferERC20TokenFromTokenConnect(
  //   token: string,
  //   from: string,
  //   to: string,
  //   value: number,
  //   addzeros: number
  // ): Promise<void> {
  //   const wallet = this.walletService.getWallet();
  //   var contract = new ethers.Contract(token, ERC20_ABI, wallet);
  //   if (addzeros && addzeros > 0) {
  //     value = value * Math.pow(10, addzeros);
  //   }
  //   // ERROR: Property 'transfer' does not exist on type 'BaseContract'.ts(2339)
  //   // https://ethereum.stackexchange.com/questions/153195/property-proposer-role-does-not-exist-on-type-basecontract
  //   // const tx = await contract.connect(wallet).transfer(to, BigInt(value));
  //   const tx = await contract.connect(wallet).getFunction("transfer")(to, BigInt(value));
  //   await tx.wait();
  // }
}