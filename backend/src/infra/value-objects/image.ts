import { CreateImageDto } from '@dtos/index';
import { ImageEntity } from '@entities/index';

class ImageValueObject {
  private image: ImageEntity;

  constructor() {
    this.image = new ImageEntity();
    this.image.id = crypto.randomUUID().toString();
    this.image.created_at = new Date();
  }

  async create(imageData: CreateImageDto): Promise<void> {
    this.image.user_id = imageData.user_id;
    this.image.title = imageData.title;
    this.image.url = imageData.url;
  }

  async get(): Promise<ImageEntity> {
    return this.image;
  }
}

export { ImageValueObject };
