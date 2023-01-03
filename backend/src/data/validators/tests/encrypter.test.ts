import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { IEncrypterService } from '@root/domain';
import { EncrypterService } from '../encrypter.service';
import { Logger } from '@nestjs/common';
import { mock } from 'jest-mock-extended';

describe('Encrypter Service ', () => {
  let service: IEncrypterService;
  let loggerMock: Logger;
  const bcryptMocked = bcrypt as jest.Mocked<typeof bcrypt>;

  beforeEach(async () => {
    loggerMock = mock();
    const encrypterProvider = {
      provide: IEncrypterService,
      useClass: EncrypterService,
    };

    const loggerProvider = {
      provide: Logger,
      useValue: loggerMock,
    };
    const module = await Test.createTestingModule({
      providers: [encrypterProvider, loggerProvider],
    }).compile();

    service = module.get<IEncrypterService>(IEncrypterService);
  });

  it('should be define', () => {
    expect(service).toBeDefined();
  });

  it('"---Create---" should expect bcrypt to have been called once and valid data', async () => {
    const spy = jest.spyOn(bcryptMocked, 'hashSync');
    service.create('password');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('password', 10);
  });

  it('"---Create---" should expect service to throw "ENCRYPT ERROR" if bcrypt.hash ocurred an error', async () => {
    jest.spyOn(bcryptMocked, 'hashSync').mockImplementationOnce(() => {
      throw new Error('error');
    });
    expect(() => service.create('password')).toThrow(
      new Error('ENCRYPT ERROR'),
    );
  });

  it('"---Create---" should expect log warning and error message if bcrypt.hash ocurred an error', () => {
    const spyWarn = jest.spyOn(loggerMock, 'warn');
    const spyError = jest.spyOn(loggerMock, 'error');

    jest.spyOn(bcryptMocked, 'hashSync').mockImplementationOnce(() => {
      throw new Error('error');
    });
    expect(() => service.create('password')).toThrow(
      new Error('ENCRYPT ERROR'),
    );

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toHaveBeenCalledWith('ERROR WHEN ENCRYPT PASSWORD');

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith('error');
  });

  it('"---Create---" should expect service return hash encrypted if all ocurred nice ', async () => {
    jest
      .spyOn(bcryptMocked, 'hashSync')
      .mockReturnValueOnce('password_encrypted' as never);
    const response = service.create('password');
    expect(response).toBe('password_encrypted');
  });

  it('"---Compare---" should expect bcrypt to have been called once and valid data', async () => {
    const spy = jest.spyOn(bcryptMocked, 'compare');
    await service.compare({ hash: 'password', compare: 'encrypted' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('encrypted', 'password');
  });

  it('"---Compare---" should expect service to throw "ENCRYPT ERROR" if bcrypt.hash ocurred an error', async () => {
    jest
      .spyOn(bcryptMocked, 'compare')
      .mockRejectedValueOnce(new Error('error') as never);
    const response = service.compare({
      hash: 'password',
      compare: 'encrypted',
    });
    await expect(response).rejects.toThrow(new Error('ENCRYPT ERROR'));
  });

  it('"---Compare---" should expect log warning and error message if bcrypt.hash ocurred an error', async () => {
    jest
      .spyOn(bcryptMocked, 'compare')
      .mockRejectedValueOnce(new Error('error') as never);
    const spyWarn = jest.spyOn(loggerMock, 'warn');
    const spyError = jest.spyOn(loggerMock, 'error');

    const response = service.compare({
      hash: 'password',
      compare: 'encrypted',
    });
    await expect(response).rejects.toThrow(new Error('ENCRYPT ERROR'));

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toHaveBeenCalledWith('ERROR WHEN COMPARE PASSWORD');

    expect(spyError).toHaveBeenCalledTimes(1);
    expect(spyError).toHaveBeenCalledWith('error');
  });

  it('"---Compare---" should expect service return hash encrypted if all ocurred nice ', async () => {
    jest.spyOn(bcryptMocked, 'compare').mockResolvedValueOnce(true as never);
    const response = await service.compare({
      hash: 'password',
      compare: 'encrypted',
    });
    expect(response).toBeTruthy();
  });
});
