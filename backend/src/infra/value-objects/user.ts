import { CreateImageDto, CreateLoginDto, CreateUserDto } from '@dtos/index';
import { ImageValueObject, LoginValueObject } from '@valueobjects/index';
import { UserEntity } from '@entities/index';

class UserValueObject {
  private user: UserEntity;

  constructor() {
    this.user = new UserEntity();
    this.user.id = crypto.randomUUID().toString();
  }

  async createLogin(login: CreateLoginDto): Promise<void> {
    const newLogin = new LoginValueObject();
    await newLogin.create({ ...login });
    this.user.login = await newLogin.get();
  }

  async createImage(image: CreateImageDto): Promise<void> {
    const newImage = new ImageValueObject();
    await newImage.create({ ...image });
    this.user.profile_img = await newImage.get();
  }

  async create(user: CreateUserDto): Promise<void> {
    this.user.email_rescue = user.email_rescue;
    await this.createLogin({ ...user.login, user_id: this.user.id });
    if (user.profile_img) {
      await this.createImage({ ...user.profile_img, user_id: this.user.id });
    }
  }

  async get(): Promise<UserEntity> {
    return this.user;
  }
}
export { UserValueObject };
