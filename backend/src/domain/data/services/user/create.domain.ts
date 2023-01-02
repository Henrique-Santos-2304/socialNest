import { TypeServiceReponse } from '@root/domain';
import { CreateUserDto } from '@root/infra';

abstract class CreateUserServiceContract {
  abstract create(createUser: CreateUserParamsProps): CreateUserResponseProps;
}

type CreateUserParamsProps = CreateUserDto;
type CreateUserResponseProps = Promise<TypeServiceReponse>;

export {
  CreateUserServiceContract,
  CreateUserParamsProps,
  CreateUserResponseProps,
};
