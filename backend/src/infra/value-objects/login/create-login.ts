import { CreateLoginDto } from '@dtos/index';
import { LoginEntity } from '@entities/index';
import { IEncrypterService, IUuidService } from '@root/domain';
import { CreateLoginBuilderProps } from './types/create-login.props';

class LoginValueObject {
  private login: LoginEntity;

  constructor(
    private readonly uuidService: IUuidService,
    private readonly encrypter: IEncrypterService,
  ) {
    this.login = new LoginEntity();
    this.builder.setId();
  }

  private builder: CreateLoginBuilderProps = {
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
      const passwordHash = this.encrypter.create(password);
      this.login.password = passwordHash;
      return this.builder;
    },
  };

  getId(): LoginEntity['id'] {
    return this.login.id;
  }

  create({ user_id, password, field, value_field }: CreateLoginDto) {
    this.builder
      .setUserId(user_id)
      .setField(field)
      .setValueField(value_field)
      .setPassword(password);
  }

  get(): LoginEntity {
    return { ...this.login };
  }
}

export { LoginValueObject };
