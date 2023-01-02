import { Logger, Module } from '@nestjs/common';
import { PrismaService } from './infra/manager-db';
import { UuidService } from './shared';

@Module({
  providers: [PrismaService, UuidService, Logger],
})
export class AppModule {}
