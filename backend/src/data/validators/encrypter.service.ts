import * as bcrypt from 'bcrypt';

import {
  CompareHashParamsProps,
  CompareHashResponseProps,
  CreateHashResponseProps,
  IEncrypterService,
} from '@root/domain';
import { Logger } from '@nestjs/common';

class EncrypterService implements IEncrypterService {
  private readonly salt = 10;

  constructor(private readonly logger: Logger) {}

  async create(value: string): CreateHashResponseProps {
    try {
      const hash = await bcrypt.hash(value, this.salt);
      return hash;
    } catch (err) {
      const error = err as Error;

      this.logger.log('ERROR WHEN ENCRYPT PASSWORD');
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

      this.logger.log('ERROR WHEN COMPARE PASSWORD');
      this.logger.error(error.message);
      throw new Error('ENCRYPT ERROR');
    }
  }
}

export { EncrypterService };