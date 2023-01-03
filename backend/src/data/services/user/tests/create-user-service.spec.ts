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
      ],
    }).compile();

    service = module.get<ICreateUserService>(ICreateUserService);
    uuidService.create.mockReturnValue('id_mocked');
    findUserRepo.by_id.mockResolvedValue(null);
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

  it('should expects User Value Object.create to have been called once and with valid data', async () => {
    const obj = new CreateUserValueObject(uuidService, encrypterService);
    const user = obj.get;
    const spy = jest.spyOn(obj, 'create', 'set');
    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      ...createuserMocked,
      id: 'id_mocked',
      created_at: user.created_at,
    });
  });

  it('should expects service throw error if ValueObject.create to throw', async () => {
    const obj = new CreateUserValueObject(uuidService, encrypterService);
    jest.spyOn(obj, 'create', 'set').mockImplementationOnce(() => {
      throw new Error('error');
    });
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('error'));
  });

  it('should expects User Value Object.id to have been called once and with valid data', async () => {
    const obj = new CreateUserValueObject(uuidService, encrypterService);
    jest
      .spyOn(obj, 'create', 'set')
      .mockImplementationOnce(() => new UserEntity());
    const spy = jest.spyOn(obj, 'id', 'get');
    await service.create({ ...createuserMocked });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });
  it('should expects service throw error if ValueObject.get to throw', async () => {
    const obj = new CreateUserValueObject(uuidService, encrypterService);
    jest
      .spyOn(obj, 'create', 'set')
      .mockImplementationOnce(() => new UserEntity());
    jest.spyOn(obj, 'id', 'get').mockImplementationOnce(() => {
      throw new Error('error');
    });
    const response = service.create({ ...createuserMocked });

    await expect(response).rejects.toThrow(new Error('error'));
  });

  it('should expects service return status Sucess and ', async () => {
    const obj = new CreateUserValueObject(uuidService, encrypterService);
    jest
      .spyOn(obj, 'create', 'set')
      .mockImplementationOnce(() => new UserEntity());

    jest.spyOn(obj, 'id', 'get').mockImplementationOnce(() => 'id_sucess');
    const response = await service.create({ ...createuserMocked });

    await expect(response).toBe('id_sucess');
  });
});
