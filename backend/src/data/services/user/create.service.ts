import {
  CreateUserServiceParamsProps,
  CreateUserServiceResponseProps,
  ICreateUserService,
} from '@root/domain';

class CreateUserService implements ICreateUserService {
  async create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps {
    return { id: 'user' };
  }
}

export { CreateUserService };
