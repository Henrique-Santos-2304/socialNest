import { CreateImageDto } from '@dtos/index';
import { ImageEntity } from '@entities/index';
import { IUuidService } from '@root/domain';

class ImageValueObject {
  private image: ImageEntity;

  constructor(private readonly uuidService: IUuidService) {
    this.image = new ImageEntity();
    this.builder.setId().setDate();
  }

  private builder = {
    setId: () => {
      this.image.id = this.uuidService.create();
      return this.builder;
    },
    setUserId: (user_id: ImageEntity['user_id']) => {
      this.image.user_id = user_id;
      return this.builder;
    },
    setTitle: (title: ImageEntity['title']) => {
      this.image.title = title;
      return this.builder;
    },
    setUrl: (url: ImageEntity['url']) => {
      this.image.url = url;
      return this.builder;
    },
    setDate: () => {
      this.image.created_at = new Date();
      return this.builder;
    },
  };

  get id(): ImageEntity['id'] {
    return this.image.id;
  }

  set create(imageData: CreateImageDto) {
    this.builder
      .setTitle(imageData.title)
      .setUrl(imageData.url)
      .setUserId(imageData.user_id);
  }

  get get(): ImageEntity {
    return this.image;
  }
}

export { ImageValueObject };
