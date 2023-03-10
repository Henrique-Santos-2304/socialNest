import { CreateUUidResponseProps, IUuidService } from '@root/domain';
import * as crypto from 'node:crypto';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
class UuidService implements IUuidService {
  constructor(private readonly logger: Logger) {}

  create(): CreateUUidResponseProps {
    try {
      return crypto.randomUUID();
    } catch (error) {
      this.logger.warn('Error in create uuid service');
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}

export { UuidService };
