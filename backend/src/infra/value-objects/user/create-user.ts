import { CreateLoginDto, CreateUserDto } from '@dtos/index';
import { ImageValueObject, LoginValueObject } from '@valueobjects/index';
import { UserEntity } from '@entities/index';
import { IEncrypterService, IUuidService } from '@root/domain';

class CreateUserValueObject {
  private user: UserEntity;

  constructor(
    private readonly uuidService: IUuidService,
    private readonly encrypter: IEncrypterService,
  ) {
    this.user = new UserEntity();
    this.builder.setCreatedAt().setId();
  }

  private builder = {
    setId: () => {
      this.user.id = this.uuidService.create();
      return this.builder;
    },
    setLogin: (login: CreateUserDto['login']) => {
      this.createLogin({ ...login, user_id: this.user.id });
      return this.builder;
    },
    setEmailRescue: (email_rescue: UserEntity['email_rescue']) => {
      this.user.email_rescue = email_rescue;
      return this.builder;
    },
    setProfileImg: (profileImg: CreateUserDto['profile_img']) => {
      this.createImage({ ...profileImg! });
      return this.builder;
    },
    setCreatedAt: () => {
      this.user.created_at = new Date();
      return this.builder;
    },
    setUpdatedAt: () => {
      this.user.updated_at = new Date();
      return this.builder;
    },
  };

  get id(): UserEntity['id'] {
    return this.user.id;
  }

  private createLogin(login: CreateLoginDto): void {
    const newLogin = new LoginValueObject(this.uuidService, this.encrypter);
    newLogin.create = { ...login };
    this.user.login = newLogin.get;
  }

  private createImage(image: CreateUserDto['profile_img']): void {
    const newImage = new ImageValueObject(this.uuidService);
    newImage.create = { ...image!, user_id: this.user.id };
    this.user.profile_img = newImage.get;
  }

  public set create({ email_rescue, login, profile_img }: CreateUserDto) {
    this.builder.setLogin({ ...login });
    profile_img && this.builder.setProfileImg(profile_img);
    email_rescue && this.builder.setEmailRescue(email_rescue);
  }

  get get(): UserEntity {
    return this.user;
  }
}
export { CreateUserValueObject };
