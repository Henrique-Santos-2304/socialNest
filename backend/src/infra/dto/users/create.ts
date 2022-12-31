import { UserEntity } from '@entities/index';
import { CreateImageDto, CreateLoginDto } from '@dtos/index';

class CreateUserDto {
  login: Omit<CreateLoginDto, 'user_id'>;
  email_rescue: UserEntity['email_rescue'];
  profile_img?: Omit<CreateImageDto, 'user_id'>;
}

export { CreateUserDto };
