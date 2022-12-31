import { LoginEntity, UserEntity } from '@entities/index';

class CreateLoginDto {
  user_id: UserEntity['id'];
  field: LoginEntity['field'];
  value_field: LoginEntity['value_field'];
  password: LoginEntity['password'];
}

export { CreateLoginDto };
