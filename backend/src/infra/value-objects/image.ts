import { CreateImageDto } from '@dtos/index';
import { ImageEntity } from '@entities/index';
import { IUuidService } from '@root/domain';

class ImageValueObject {
  private image: ImageEntity;

  constructor(private readonly uuidService: IUuidService) {
    this.image = new ImageEntity();
    this.image.created_at = new Date();
    this.setId();
  }

  get id(): Promise<ImageEntity['id']> {
    return (async () => this.image.id)();
  }

  private setId() {
    this.image.id = this.uuidService.create();
  }

  set create(imageData: CreateImageDto) {
    this.image.user_id = imageData.user_id;
    this.image.title = imageData.title;
    this.image.url = imageData.url;
  }

  get get(): Promise<ImageEntity> {
    return (async () => this.image)();
  }
}

export { ImageValueObject };
