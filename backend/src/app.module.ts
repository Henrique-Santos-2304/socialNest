import { Logger, Module } from '@nestjs/common';
import { IFindUserRepository } from './domain';
import { PrismaService } from './infra/manager-db';
import { FindUserRepository } from './infra/repositories/user/find-user.repo';
import { UuidService } from './shared';

const repoProvider = {
  provide: IFindUserRepository,
  useClass: FindUserRepository,
};

@Module({
  providers: [PrismaService, UuidService, Logger, repoProvider],
})
export class AppModule {}
