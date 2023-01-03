import { CreateUserDto, UserEntity } from '@root/infra';

abstract class ICreateUserService {
  abstract create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps;
}

type CreateUserServiceParamsProps = CreateUserDto;
type CreateUserServiceResponseProps = Promise<{ id: UserEntity['id'] }>;

export {
  ICreateUserService,
  CreateUserServiceParamsProps,
  CreateUserServiceResponseProps,
};
