// Third Party Dependencies.
import { Injectable } from '@nestjs/common';

// Local Dependencies.
import { WalletService } from '../../wallet/services/wallet.service';
import { TokenService } from '../../token/services/token.service';
import { NftService } from '../../nft/services/nft.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly nftService: NftService,
    private readonly tokenService: TokenService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * @memberof NotificationsService
   * @description Listen for contract events.
   * @returns {Promise<void>}
   */
  async listenForEvent() {
    // console.log(':::Listening for contract events:::');
    // const contractERC721 = await this.nftService.getERC721Contract(
    //   this.walletService.getWallet(),
    // );
    // contractERC721.on('NewContract', (contractAddress) => {
    //   console.log('Event received:', contractAddress);
    // });
    // const contractERC20 = this.tokenService.getFactoryERC20Contract(
    //   this.walletService.getWallet(),
    // );
    // contractERC20.on('NewERC20TokenContract', (erc20TokenAddress, index) => {
    //   console.log('Event received:', erc20TokenAddress);
    //   console.log('Array index:', index);
    // });
  }
}
