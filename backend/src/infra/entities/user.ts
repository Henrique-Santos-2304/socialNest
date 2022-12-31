import { ImageEntity, LoginEntity } from '@entities/index';

class UserEntity {
  id: string;
  login: LoginEntity;
  email_rescue: string;
  profile_img?: ImageEntity;
  created_at: Date;
  updated_at: Date | null;
}

export { UserEntity };
