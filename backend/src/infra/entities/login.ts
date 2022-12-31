import { UserEntity } from './user';

class LoginEntity {
  id: string;
  user_id: UserEntity['id'];
  field: 'EMAIL' | 'TELEPHONE';
  value_field: string;
  password: string;
}

export { LoginEntity };
