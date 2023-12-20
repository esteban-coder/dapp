// Third Party Dependencies.
import { Module } from '@nestjs/common';

// Local Dependencies.
import { ConfigService } from './config.service';

/**
 * @fileOverview Config Module.
 *
 * This module is responsible for providing the Config Service.
 *
 * @module ConfigModule
 */
@Module({
  providers: [
    // Provide the Config Service.
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
