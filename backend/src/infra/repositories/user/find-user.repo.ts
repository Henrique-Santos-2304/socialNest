import { Injectable } from '@nestjs/common';
import {
  AllUserResponseProps,
  FindUserWithoutPasswordResponseProps,
  IFindUserRepository,
} from '@root/domain';
import { UserEntity } from '@root/infra/entities';
import { PrismaService } from '@root/infra/manager-db';

@Injectable()
class FindUserRepository implements IFindUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  newUser: UserEntity = {
    id: 'login',
    created_at: new Date(),
    updated_at: null,
    login: {
      id: 'login',
      field: 'EMAIL',
      value_field: 'email',
      user_id: 'user_id',
      password: 'password',
    },
    profile_img: null,
    email_rescue: 'email',
  };

  async by_id(id: string): Promise<FindUserWithoutPasswordResponseProps> {
    const withoutPassword = {
      ...this.newUser,
      login: {
        id: this.newUser.login.id,
        field: this.newUser.login.field,
        value_field: this.newUser.login.value_field,
        user_id: this.newUser.login.user_id,
      },
    };
    return withoutPassword;
  }

  async by_login(login: string): Promise<UserEntity> {
    return this.newUser;
  }
  async all(): AllUserResponseProps {
    return [{ ...this.newUser }];
  }
}

export { FindUserRepository };
