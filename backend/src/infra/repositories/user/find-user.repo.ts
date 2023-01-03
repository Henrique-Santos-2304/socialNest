import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '@root/infra/entities';
import { PrismaService } from '@root/infra/manager-db';
import {
  AllUserResponseProps,
  FindUserWithoutPasswordResponseProps,
  FindUserWithPasswordResponseProps,
  IFindUserRepository,
} from '@root/domain';

@Injectable()
class FindUserRepository implements IFindUserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async by_id(id: string): FindUserWithoutPasswordResponseProps {
    try {
      const newUser = await this.prisma.user.findFirst({
        where: { id },
        include: {
          login: {
            select: { id: true, field: true, user_id: true, value_field: true },
          },
          profile_img: true,
        },
      });
      return newUser as FindUserWithoutPasswordResponseProps | null;
    } catch (error) {
      this.logger.warn('---Repository---- Error in find user by id');
      this.logger.error(error.message);
      throw new Error('Query Error');
    }
  }

  async by_login(login: string): FindUserWithPasswordResponseProps {
    try {
      const newUser = await this.prisma.user.findFirst({
        where: { login: { value_field: login } },
        include: {
          login: true,
          profile_img: true,
        },
      });
      return newUser as UserEntity | null;
    } catch (error) {
      this.logger.warn('---Repository---- Error in find user by login');
      this.logger.error(error.message);
      throw new Error('Query Error');
    }
  }
  async all(): AllUserResponseProps {
    try {
      const newUser = await this.prisma.user.findMany({
        include: {
          login: true,
          profile_img: true,
        },
      });
      return newUser;
    } catch (error) {
      this.logger.warn('---Repository---- Error find all users');
      this.logger.error(error.message);
      throw new Error('Query Error');
    }
  }
}

export { FindUserRepository };
