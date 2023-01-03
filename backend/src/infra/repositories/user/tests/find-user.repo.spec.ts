import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IFindUserRepository } from '@root/domain';
import { UserEntity } from '@root/infra/entities';
import { PrismaService } from '@root/infra/manager-db';
import { mock } from 'jest-mock-extended';
import { FindUserRepository } from '../find-user.repo';

describe('Find User Repository Unit Tests', () => {
  let service: IFindUserRepository;
  let loggerMock: Logger;

  const prismaMocked = {
    user: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const user: UserEntity = {
    login: {
      id: 'login',
      field: 'EMAIL',
      value_field: '@email',
      user_id: 'user_id',
      password: 'password',
    },
    id: 'user',
    created_at: new Date(),
    email_rescue: null,
    updated_at: null,
    profile_img: null,
  };

  beforeEach(async () => {
    loggerMock = mock();
    const repoProvider = {
      provide: IFindUserRepository,
      useClass: FindUserRepository,
    };

    const prismaProvider = {
      provide: PrismaService,
      useValue: prismaMocked,
    };

    const loggerProvider = {
      provide: Logger,
      useValue: loggerMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [prismaProvider, repoProvider, loggerProvider],
    }).compile();

    service = module.get(IFindUserRepository);
  });

  it('should expect the service to be defined', () => {
    expect(service).toBeDefined();
    expect(PrismaService).toBeDefined();
  });

  // tests by_id
  it('"---By Id---" repo.find must to have been called once time and with data valids  ', async () => {
    const spy = jest.spyOn(prismaMocked.user, 'findFirst');

    await service.by_id(user.id);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: {
        id: user.id,
      },
      include: {
        login: {
          select: { id: true, field: true, user_id: true, value_field: true },
        },
        profile_img: true,
      },
    });
  });

  it('"---By Id---"  service must to throw Query Error if ocurred an error in repository ', async () => {
    prismaMocked.user.findFirst.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.by_id(user.id);
    await expect(response).rejects.toThrow('Query Error');
  });

  it('"---By Id---"  service should log warning and error messages if repository error occurs', async () => {
    const spyWarn = jest.spyOn(loggerMock, 'warn');
    const spyError = jest.spyOn(loggerMock, 'error');

    prismaMocked.user.findFirst.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.by_id(user.id);
    await expect(response).rejects.toThrow('Query Error');

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toHaveBeenCalledWith(
      '---Repository---- Error in find user by id',
    );

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith(new Error('Query Error').message);
  });

  it('"---By Id---"  service should return null if repository not found user', async () => {
    prismaMocked.user.findFirst.mockResolvedValueOnce(null);
    const response = await service.by_id(user.id);
    expect(response).toEqual(null);
  });

  it('"---By Id---"  service should return null if repository found user', async () => {
    const userData = {
      ...user,
      login: {
        id: user.login.id,
        field: user.login.field,
        value_field: user.login.value_field,
        user_id: user.login.user_id,
      },
    };
    prismaMocked.user.findFirst.mockResolvedValueOnce({ ...userData });
    const response = await service.by_id(user.id);
    expect(response).toEqual({ ...userData });
  });

  // tests by login
  it('"---By Login---" repo.find must to have been called once time and with data valids  ', async () => {
    const spy = jest.spyOn(prismaMocked.user, 'findFirst');

    await service.by_login('login');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      where: {
        login: { value_field: 'login' },
      },
      include: {
        login: true,
        profile_img: true,
      },
    });
  });

  it('---By Login--- service must to throw Query Error if ocurred an error in repository ', async () => {
    prismaMocked.user.findFirst.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.by_login('login');
    await expect(response).rejects.toThrow('Query Error');
  });

  it('"---By Login---"  service should log warning and error messages if repository error occurs', async () => {
    const spyWarn = jest.spyOn(loggerMock, 'warn');
    const spyError = jest.spyOn(loggerMock, 'error');

    prismaMocked.user.findFirst.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.by_login('login');
    await expect(response).rejects.toThrow('Query Error');

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toHaveBeenCalledWith(
      '---Repository---- Error in find user by login',
    );

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith(new Error('Query Error').message);
  });

  it('---By Login--- service should return null if repository not found user', async () => {
    prismaMocked.user.findFirst.mockResolvedValueOnce(null);
    const response = await service.by_login('login');
    expect(response).toEqual(null);
  });

  it('---By Login--- service should return null if repository found user', async () => {
    prismaMocked.user.findFirst.mockResolvedValueOnce({ ...user });
    const response = await service.by_login(user.id);
    expect(response).toEqual({ ...user });
  });

  //  tests all

  it('"---All---" repo.find must to have been called once time and with data valids  ', async () => {
    const spy = jest.spyOn(prismaMocked.user, 'findMany');

    await service.all();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      include: {
        login: true,
        profile_img: true,
      },
    });
  });

  it('"---All---" service must to throw Query Error if ocurred an error in repository ', async () => {
    prismaMocked.user.findMany.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.all();
    await expect(response).rejects.toThrow('Query Error');
  });

  it('"---All---"  service should log warning and error messages if repository error occurs', async () => {
    const spyWarn = jest.spyOn(loggerMock, 'warn');
    const spyError = jest.spyOn(loggerMock, 'error');

    prismaMocked.user.findMany.mockRejectedValueOnce(new Error('Query Error'));

    const response = service.all();
    await expect(response).rejects.toThrow('Query Error');

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toHaveBeenCalledWith(
      '---Repository---- Error find all users',
    );

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith(new Error('Query Error').message);
  });

  it('"---All---" service should return null if repository not found user', async () => {
    prismaMocked.user.findMany.mockResolvedValueOnce([]);
    const response = await service.all();
    expect(response).toHaveLength(0);
  });

  it('"---All---" service should return null if repository found user', async () => {
    prismaMocked.user.findMany.mockResolvedValueOnce([
      { ...user },
      { ...user },
    ]);
    const response = await service.all();
    expect(response).toHaveLength(2);
    expect(response[0]).toEqual({ ...user });
  });
});
