import { Test } from '@nestjs/testing';
import {
  ICreateUserRepository,
  CreateUserServiceContract,
  IFindUserRepository,
  IUuidService,
} from '@root/domain';
import { CreateUserDto, UserEntity } from '@root/infra';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateUserService } from '../create.service';

describe('Create User Service', () => {
  let service: CreateUserServiceContract;
  let createUserRepo: MockProxy<ICreateUserRepository>;
  let findUserRepo: MockProxy<IFindUserRepository>;
  let uuidService: MockProxy<IUuidService>;

  const createuserMocked: CreateUserDto = {
    login: {
      field: 'EMAIL',
      value_field: '@email',
      password: 'password',
    },
  };

  beforeEach(async () => {
    createUserRepo = mock();
    findUserRepo = mock();
    uuidService = mock();

    const uuidServiceProvider = {
      provide: IUuidService,
      useValue: uuidService,
    };

    const findUserRepoProvider = {
      provide: IFindUserRepository,
      useValue: findUserRepo,
    };

    const createUserRepoProvider = {
      provide: ICreateUserRepository,
      useValue: createUserRepo,
    };
    const serviceProvider = {
      provide: CreateUserServiceContract,
      useClass: CreateUserService,
    };
    const module = await Test.createTestingModule({
      providers: [
        serviceProvider,
        createUserRepoProvider,
        findUserRepoProvider,
        uuidServiceProvider,
      ],
    }).compile();

    service = module.get<CreateUserServiceContract>(CreateUserServiceContract);
    uuidService.create.mockReturnValue('id_mocked');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createUserRepo).toBeDefined();
  });

  it('should expects find user to have been called once and with valid data', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_id');

    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('id_mocked');
  });

  it('should expects service to throw the error returned of repository ', async () => {
    findUserRepo.by_id.mockRejectedValueOnce(new Error('Query Error'));
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('Query Error'));
  });

  it('should expects service to throw error "User Already Exists" if repository to have found an user with login.value_field equal at received', async () => {
    findUserRepo.by_id.mockResolvedValueOnce(new UserEntity());
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('User Already Exists'));
  });
});
