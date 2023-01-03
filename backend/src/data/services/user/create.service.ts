import {
  CreateUserServiceParamsProps,
  CreateUserServiceResponseProps,
  ICreateUserRepository,
} from '@root/domain';

class CreateUserService implements ICreateUserRepository {
  async create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps {
    return { status: 'Sucess' };
  }
}

export { CreateUserService };
