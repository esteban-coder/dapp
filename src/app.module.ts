// Third Party Dependencies.
import { Module } from '@nestjs/common';

// Local Dependencies.
import { NotificationsModule } from './modules/notifications/notifications.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { TokenModule } from './modules/token/token.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { Configuration } from './config/config.keys';
import { NftModule } from './modules/nft/nft.module';

@Module({
  imports: [
    ConfigModule,
    TokenModule,
    NftModule,
    NotificationsModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    // Set port from config service.
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
