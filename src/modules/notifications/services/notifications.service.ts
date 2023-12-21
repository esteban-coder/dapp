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
    // const erc721TokenFactory = await this.nftService.getERC721TokenFactory();
    // erc721TokenFactory.on('NewERC721Token', (erc721TokenAddress) => {
    //   console.log('NewERC721Token event received \n address: ', erc721TokenAddress);
    // });
    // const erc20TokenFactory = this.tokenService.getERC20TokenFactory();
    // erc20TokenFactory.on('NewERC20Token', (erc20TokenAddress, index) => {
    //   console.log('NewERC20Token event received \n address: ', erc20TokenAddress, '\n array index: ', index);
    // });
  }
}
