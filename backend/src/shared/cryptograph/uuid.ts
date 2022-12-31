import { IUuidService } from '@root/domain';
import crypto from 'node:crypto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
class UuidService implements IUuidService {
  constructor(private readonly logger: Logger) {}

  create(): IUuidService.createResponse {
    try {
      return crypto.randomUUID().toString();
    } catch (error) {
      this.logger.warn('Error in create uuid service');
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}

export { UuidService };
