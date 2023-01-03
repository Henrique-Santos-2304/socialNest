import { TypeServiceReponse } from '@root/domain';
import { CreateUserDto, UserEntity } from '@root/infra';

type CreateUserParamsProps = CreateUserDto;
type CreateUserResponseProps = Promise<
  { id?: UserEntity['id'] } & TypeServiceReponse
>;

abstract class ICreateUserRepository {
  abstract create(userData: CreateUserParamsProps): CreateUserResponseProps;
}

export {
  ICreateUserRepository,
  CreateUserParamsProps,
  CreateUserResponseProps,
};
