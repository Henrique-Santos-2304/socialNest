import { CreateImageDto, CreateLoginDto, CreateUserDto } from '@dtos/index';
import { ImageValueObject, LoginValueObject } from '@valueobjects/index';
import { UserEntity } from '@entities/index';
import { IUuidService } from '@root/domain';

class UserValueObject {
  private user: UserEntity;

  constructor(private readonly uuidService: IUuidService) {
    this.user = new UserEntity();
    (async () => this.setId())();
  }

  private async setId() {
    this.user.id = await this.uuidService.create();
  }

  get id(): Promise<UserEntity['id']> {
    return (async () => this.user.id)();
  }

  async createLogin(login: CreateLoginDto): Promise<void> {
    const newLogin = new LoginValueObject(this.uuidService);
    newLogin.create = { ...login };
    this.user.login = await newLogin.get;
  }

  async createImage(image: CreateImageDto): Promise<void> {
    const newImage = new ImageValueObject(this.uuidService);
    newImage.create = { ...image };
    this.user.profile_img = await newImage.get;
  }

  set create(user: CreateUserDto) {
    (async () => {
      this.user.email_rescue = user.email_rescue;
      await this.createLogin({ ...user.login, user_id: this.user.id });
      if (user.profile_img) {
        await this.createImage({ ...user.profile_img, user_id: this.user.id });
      }
    })();
  }

  async get(): Promise<UserEntity> {
    return (async () => this.user)();
  }
}
export { UserValueObject };
