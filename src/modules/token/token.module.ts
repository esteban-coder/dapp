// Third Party Dependencies.
import { Module } from '@nestjs/common';

// Local Dependencies.
import { TokenController } from './controllers/token.controller';
import { ConfigModule } from '../../config/config.module';
import { TokenService } from './services/token.service';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [ConfigModule, WalletModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
