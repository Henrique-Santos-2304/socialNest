import { TypeServiceReponse } from '@root/domain';
import { CreateUserDto } from '@root/infra';

interface ICreateUserService {
  create(
    createUser: ICreateUserService.CreateParams,
  ): ICreateUserService.CreateResponse;
}

namespace ICreateUserService {
  export type CreateParams = CreateUserDto;
  export type CreateResponse = Promise<TypeServiceReponse>;
}

export { ICreateUserService };
