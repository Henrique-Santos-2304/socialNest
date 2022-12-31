import { ImageEntity } from '@entities/index';

class CreateImageDto {
  url: ImageEntity['url'];
  title: ImageEntity['title'];
  user_id: ImageEntity['user_id'];
}

export { CreateImageDto };
