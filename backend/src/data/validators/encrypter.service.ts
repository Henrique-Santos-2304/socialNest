import * as bcrypt from 'bcrypt';

import {
  CompareHashParamsProps,
  CompareHashResponseProps,
  CreateHashResponseProps,
  IEncrypterService,
} from '@root/domain';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
class EncrypterService implements IEncrypterService {
  private readonly salt = 10;

  constructor(private readonly logger: Logger) {}

  create(value: string): CreateHashResponseProps {
    try {
      const hash = bcrypt.hashSync(value, this.salt);
      return hash;
    } catch (error) {
      this.logger.warn('ERROR WHEN ENCRYPT PASSWORD');
      this.logger.error(error.message);
      throw new Error('ENCRYPT ERROR');
    }
  }
  async compare({
    hash,
    compare,
  }: CompareHashParamsProps): CompareHashResponseProps {
    try {
      return await bcrypt.compare(compare, hash);
    } catch (err) {
      const error = err as Error;

      this.logger.warn('ERROR WHEN COMPARE PASSWORD');
      this.logger.error(error.message);
      throw new Error('ENCRYPT ERROR');
    }
  }
}

export { EncrypterService };
