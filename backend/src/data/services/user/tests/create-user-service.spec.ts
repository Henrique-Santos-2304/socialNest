import { Test } from '@nestjs/testing';
import {
  ICreateUserRepository,
  ICreateUserService,
  IFindUserRepository,
  IUuidService,
  IEncrypterService,
} from '@root/domain';
import { CreateUserDto, CreateUserValueObject, UserEntity } from '@root/infra';
import { mock, MockProxy } from 'jest-mock-extended';
import { CreateUserService } from '../create.service';

// jest.mock('@root/infra');

describe('Create User Service', () => {
  let service: ICreateUserService;
  let createUserRepo: MockProxy<ICreateUserRepository>;
  let findUserRepo: MockProxy<IFindUserRepository>;
  let uuidService: MockProxy<IUuidService>;
  let encrypterService: MockProxy<IEncrypterService>;

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
    encrypterService = mock();

    const uuidServiceProvider = {
      provide: IUuidService,
      useValue: uuidService,
    };

    const encrypterServiceProvider = {
      provide: IEncrypterService,
      useValue: encrypterService,
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
      provide: ICreateUserService,
      useClass: CreateUserService,
    };
    const module = await Test.createTestingModule({
      providers: [
        serviceProvider,
        createUserRepoProvider,
        findUserRepoProvider,
        uuidServiceProvider,
        encrypterServiceProvider,
      ],
    }).compile();

    service = module.get<ICreateUserService>(ICreateUserService);
    uuidService.create.mockReturnValue('id_mocked');

    encrypterService.create.mockReturnValue('encrypted');
    createUserRepo.create.mockResolvedValue({ id: 'user' });
    findUserRepo.by_login.mockResolvedValue(null);
    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 1, 7));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(findUserRepo).toBeDefined();
    expect(createUserRepo).toBeDefined();
  });

  it('should expects find user to have been called once and with valid data', async () => {
    const spy = jest.spyOn(findUserRepo, 'by_login');

    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(createuserMocked.login.value_field);
  });

  it('should expects service to throw the error returned of repository ', async () => {
    findUserRepo.by_login.mockRejectedValueOnce(new Error('Query Error'));
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('Query Error'));
  });

  it('should expects service to throw error "User Already Exists" if repository to have found an user with login.value_field equal at received', async () => {
    findUserRepo.by_login.mockResolvedValueOnce(new UserEntity());
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('User Already Exists'));
  });

  it('should expects User Value Object.create to have been called once and with valid data', async () => {
    const spy = jest.spyOn(CreateUserValueObject.prototype, 'create');
    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ ...createuserMocked });
  });

  it('should expects service throw error if ValueObject.create to throw', async () => {
    jest
      .spyOn(CreateUserValueObject.prototype, 'create')
      .mockImplementationOnce(() => {
        throw new Error('error');
      });
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('error'));
  });

  it('should expects User Value Object.id to have been called once and with valid data', async () => {
    const spy = jest.spyOn(CreateUserValueObject.prototype, 'get');
    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should expects error if createUservalueObject return error', async () => {
    jest
      .spyOn(CreateUserValueObject.prototype, 'get')
      .mockImplementationOnce(() => {
        throw new Error('error');
      });
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('error'));
  });

  it('should expects create user repository to have been called once and with valid data ', async () => {
    uuidService.create
      .mockReturnValueOnce('id_user')
      .mockReturnValueOnce('id_login');
    const spy = jest.spyOn(createUserRepo, 'create');
    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...createuserMocked,
      id: 'id_user',
      created_at: new Date(2023, 9, 1, 7),
      login: {
        ...createuserMocked.login,
        password: 'encrypted',
        id: 'id_login',
        user_id: 'id_user',
      },
    });
  });

  it('should expects service to throw "Query Error" if create user repository throws', async () => {
    createUserRepo.create.mockRejectedValueOnce(new Error('Query Error'));
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('Query Error'));
  });

  it('should expects service return user id if  ocurred all fine', async () => {
    const response = await service.create({ ...createuserMocked });

    expect(response).toHaveProperty('id', 'user');
  });
});
