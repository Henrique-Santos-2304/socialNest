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
import { CreateUserValueObject, LoginEntity, UserEntity } from '@root/infra';

class CreateUserService implements ICreateUserService {
  private userEntity: UserEntity;

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

  async checkUserAlreadExist(login: LoginEntity['value_field']) {
    const userExists = await this.findUserRepository.by_login(login);

    if (userExists) throw new Error('User Already Exists');
  }

  createUserEntity(createUser: CreateUserServiceParamsProps) {
    const userVO = new CreateUserValueObject(
      this.uuidService,
      this.encrypterService,
    );

    userVO.create({ ...createUser });
    return userVO;
  }

  setPropertyUserData(userVo: CreateUserValueObject) {
    this.userEntity = userVo.get();
  }

  async createUser() {
    return await this.createUserRepository.create(this.userEntity);
  }

  async create(
    createUser: CreateUserServiceParamsProps,
  ): CreateUserServiceResponseProps {
    await this.checkUserAlreadExist(createUser.login.value_field);
    const userVO = this.createUserEntity({ ...createUser });
    this.setPropertyUserData(userVO);

    return this.createUser();
  }
}

export { CreateUserService };
