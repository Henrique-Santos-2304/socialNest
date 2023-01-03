import { ImageEntity, LoginEntity } from '@entities/index';

class UserEntity {
  id: string;
  login: LoginEntity;
  email_rescue: string | null;
  profile_img: ImageEntity | null;
  created_at: Date;
  updated_at: Date | null;
}

export { UserEntity };
