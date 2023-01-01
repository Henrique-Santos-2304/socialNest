import { CreateLoginDto } from '@dtos/index';
import { LoginEntity } from '@entities/index';
import { IUuidService } from '@root/domain';

class LoginValueObject {
  private login: LoginEntity;

  constructor(private readonly uuidService: IUuidService) {
    this.login = new LoginEntity();
    this.builder.setId();
  }

  private builder = {
    setId: () => {
      this.login.id = this.uuidService.create();
      return this.builder;
    },
    setUserId: (userId: LoginEntity['user_id']) => {
      this.login.user_id = userId;
      return this.builder;
    },
    setField: (field: LoginEntity['field']) => {
      this.login.field = field;
      return this.builder;
    },
    setValueField: (valueField: LoginEntity['value_field']) => {
      this.login.value_field = valueField;
      return this.builder;
    },
    setPassword: (password: LoginEntity['password']) => {
      this.login.password = password;
      return this.builder;
    },
  };

  get id(): LoginEntity['id'] {
    return this.login.id;
  }

  set create({ user_id, password, field, value_field }: CreateLoginDto) {
    this.builder
      .setUserId(user_id)
      .setField(field)
      .setValueField(value_field)
      .setPassword(password);
  }

  get get(): LoginEntity {
    return this.login;
  }
}

export { LoginValueObject };
