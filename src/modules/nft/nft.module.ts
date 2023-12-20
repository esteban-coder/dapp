// Third Party Dependencies.
import { Module } from '@nestjs/common';

// Local Dependencies.
import { NftController } from './controllers/nft.controller';
import { ConfigModule } from '../../config/config.module';
import { NftService } from './services/nft.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [ConfigModule, WalletModule],
  providers: [NftService],
  controllers: [NftController],
  exports: [NftService],
})
export class NftModule {}
