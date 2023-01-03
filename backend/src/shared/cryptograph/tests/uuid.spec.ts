import { InternalServerErrorException, Logger } from '@nestjs/common';
import { IUuidService } from '@root/domain';
import { UuidService } from '../uuid';
import * as crypto from 'node:crypto';
import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('node:crypto');
describe('Uuid Service Unit', () => {
  let service: IUuidService;
  let loggerMock: Logger;
  const uuidMocked = crypto as jest.Mocked<typeof crypto>;

  beforeEach(async () => {
    loggerMock = mock();

    const logProvider = {
      provide: Logger,
      useValue: loggerMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UuidService, logProvider],
    }).compile();

    service = module.get<IUuidService>(UuidService);
    uuidMocked.randomUUID.mockReturnValue('new_id' as never);
  });

  it('should be crypto to have been callend without params', async () => {
    const spy = jest.spyOn(uuidMocked, 'randomUUID');
    await service.create();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be service return id correctly', async () => {
    const response = service.create();
    expect(response).toBe('new_id');
  });

  it('should be service log error ', async () => {
    uuidMocked.randomUUID.mockImplementationOnce(() => {
      throw new Error('error');
    });

    expect(() => service.create()).toThrow(new InternalServerErrorException());
    expect(loggerMock.warn).toHaveBeenCalledTimes(1);
    expect(loggerMock.warn).toHaveBeenCalledWith(
      'Error in create uuid service',
    );

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith('error');
  });
});
