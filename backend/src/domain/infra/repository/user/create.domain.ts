import { CreateUserDto, UserEntity } from '@root/infra';

type CreateUserParamsProps = CreateUserDto;
type CreateUserResponseProps = Promise<{ id: UserEntity['id'] }>;

abstract class ICreateUserRepository {
  abstract create(userData: CreateUserParamsProps): CreateUserResponseProps;
}

export {
  ICreateUserRepository,
  CreateUserParamsProps,
  CreateUserResponseProps,
};
