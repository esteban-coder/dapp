// Third Party Dependencies.
import { Module, OnModuleInit } from '@nestjs/common';

// Local Dependencies.
import { NotificationsService } from './services/notifications.service';
import { ConfigModule } from '../../config/config.module';
import { TokenModule } from '../token/token.module';
import { NftModule } from '../nft/nft.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [ConfigModule, TokenModule, NftModule, WalletModule],
  controllers: [],
  providers: [NotificationsService],
  exports: [],
})
export class NotificationsModule implements OnModuleInit {
  constructor(private readonly notificationsService: NotificationsService) {}
  onModuleInit() {
    this.notificationsService.listenForEvent();
  }
}
