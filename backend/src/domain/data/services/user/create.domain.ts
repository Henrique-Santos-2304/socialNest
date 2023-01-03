import { TypeServiceReponse } from '@root/domain';
import { CreateUserDto } from '@root/infra';

abstract class CreateUserServiceContract {
  abstract create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps;
}

type CreateUserServiceParamsProps = CreateUserDto;
type CreateUserServiceResponseProps = Promise<TypeServiceReponse>;

export {
  CreateUserServiceContract,
  CreateUserServiceParamsProps,
  CreateUserServiceResponseProps,
};
