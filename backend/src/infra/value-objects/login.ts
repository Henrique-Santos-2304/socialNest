import { CreateLoginDto } from '@dtos/index';
import { LoginEntity } from '@entities/index';
import { IUuidService } from '@root/domain';

class LoginValueObject {
  private login: LoginEntity;

  constructor(private readonly uuidService: IUuidService) {
    this.login = new LoginEntity();
    this.setId();
  }

  private setId() {
    this.login.id = this.uuidService.create();
  }

  get id(): Promise<LoginEntity['id']> {
    return (async () => this.login.id)();
  }

  set create(loginData: CreateLoginDto) {
    (async () => {
      this.login.field = loginData.field;
      this.login.password = loginData.password;
      this.login.user_id = loginData.user_id;
      this.login.value_field = loginData.value_field;
    })();
  }

  get get(): Promise<LoginEntity> {
    return (async () => this.login)();
  }
}

export { LoginValueObject };
