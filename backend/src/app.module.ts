import { Logger, Module } from '@nestjs/common';
import { UuidService } from './shared';

@Module({
  providers: [UuidService, Logger],
})
export class AppModule {}
