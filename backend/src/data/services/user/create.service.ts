import { Inject } from '@nestjs/common';
import {
  CreateUserServiceParamsProps,
  CreateUserServiceResponseProps,
  ICreateUserRepository,
  ICreateUserService,
  IEncrypterService,
  IFindUserRepository,
  IUuidService,
} from '@root/domain';
import { CreateUserValueObject } from '@root/infra';

class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(IFindUserRepository)
    private readonly findUserRepository: IFindUserRepository,
    @Inject(ICreateUserRepository)
    private readonly createUserRepository: ICreateUserRepository,
    @Inject(IUuidService)
    private readonly uuidService: IUuidService,
    @Inject(IEncrypterService)
    private readonly encrypterService: IEncrypterService,
  ) {}

  async create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps {
    const userExists = await this.findUserRepository.by_login(
      createUser.login.value_field,
    );

    if (userExists) throw new Error('User Already Exists');

    const userVO = new CreateUserValueObject(
      this.uuidService,
      this.encrypterService,
    );

    userVO.create({ ...createUser });
    const userEntity = userVO.get();
    console.log(userEntity);
    const createdUser = await this.createUserRepository.create(userEntity);
    return createdUser;
  }
}

export { CreateUserService };
