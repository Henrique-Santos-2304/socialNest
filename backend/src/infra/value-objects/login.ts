import { CreateLoginDto } from '@dtos/index';
import { LoginEntity } from '@entities/index';

class LoginValueObject {
  private login: LoginEntity;

  constructor() {
    this.login = new LoginEntity();
    this.login.id = crypto.randomUUID().toString();
  }

  async create(loginData: CreateLoginDto): Promise<void> {
    this.login.field = loginData.field;
    this.login.password = loginData.password;
    this.login.user_id = loginData.user_id;
    this.login.value_field = loginData.value_field;
  }

  async get(): Promise<LoginEntity> {
    return this.login;
  }
}

export { LoginValueObject };
