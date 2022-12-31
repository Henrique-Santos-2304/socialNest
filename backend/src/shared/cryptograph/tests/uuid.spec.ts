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
    uuidMocked.randomUUID.mockResolvedValue('new_id' as never);
  });

  it('should be crypto to have been callend without params', async () => {
    const spy = jest.spyOn(uuidMocked, 'randomUUID');
    await service.create();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('should be service return id correctly', async () => {
    const response = await service.create();
    expect(response).toBe('new_id');
  });

  it('should be service throw custom error if crypto response as error', async () => {
    uuidMocked.randomUUID.mockImplementationOnce(() => {
      throw new Error('error');
    });
    const response = service.create();
    await expect(response).rejects.toThrow(new InternalServerErrorException());
  });
});
