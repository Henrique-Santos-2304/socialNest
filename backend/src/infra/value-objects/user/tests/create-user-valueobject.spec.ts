import { mock, MockProxy } from 'jest-mock-extended';
import { IEncrypterService, IUuidService } from '@root/domain';
import {
  ImageEntity,
  LoginEntity,
  CreateLoginDto,
  CreateImageDto,
  CreateUserValueObject,
} from '@root/infra';

describe('Image value Object Unit', () => {
  let uuidService: MockProxy<IUuidService>;
  let encrypterService: MockProxy<IEncrypterService>;

  const createLoginMockObj: CreateLoginDto = {
    field: 'EMAIL',
    password: 'password',
    value_field: '@email',
    user_id: 'user_id',
  };

  const createImageMockObj: CreateImageDto = {
    title: 'imag_title',
    url: 'url',
    user_id: 'user_id',
  };

  beforeEach(async () => {
    uuidService = mock();
    encrypterService = mock();

    uuidService.create.mockReturnValue('user_id');
  });

  it('should be uuidService to have been called once time and with values correctly  ', () => {
    const spy = jest.spyOn(uuidService, 'create');
    new CreateUserValueObject(uuidService, encrypterService);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('Instance of user does not have properties email_rescue, login, profile_image if create not be called ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const user = service.get;

    expect(user).not.toHaveProperty('email_rescue');
    expect(user).not.toHaveProperty('login');
    expect(user).not.toHaveProperty('profile_image');
  });
  it('should be login to be created an id and created_at properties when start the instance of value object ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const user = service.get;

    expect(user.id).toBe('user_id');
    expect(user.created_at).toBeTruthy();
  });

  it('Must populate the property email_rescue with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    service.create = {
      login: { ...createLoginMockObj },
      email_rescue: '@rescue-email',
    };
    const loginVo = service.get;

    expect(loginVo).toHaveProperty('email_rescue', '@rescue-email');
  });

  it('Must populate the properties login: {fi    console.log(loginVo);eld, password, value_field } with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);

    service.create = {
      login: { ...createLoginMockObj },
    };

    const user = service.get;

    expect(user.login).toBeInstanceOf(LoginEntity);
    expect(user.login).toHaveProperty('id');
    expect(user.login).toHaveProperty('password', createLoginMockObj.password);
    expect(user.login).toHaveProperty('field', createLoginMockObj.field);
    expect(user.login).toHaveProperty('user_id', user.id);
    expect(user.login).toHaveProperty(
      'value_field',
      createLoginMockObj.value_field,
    );
  });

  it('Must populate the property profile_img with entity imageEntity type and with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    service.create = {
      login: { ...createLoginMockObj },
      profile_img: { ...createImageMockObj },
    };
    const user = service.get;

    expect(user.profile_img).toBeInstanceOf(ImageEntity);
    expect(user.profile_img).toHaveProperty('id');
    expect(typeof user.profile_img?.id).toBe('string');
    expect(user.profile_img).toHaveProperty('created_at');
    expect(user.profile_img?.created_at).toBeInstanceOf(Date);
    expect(user.profile_img).toHaveProperty('url', createImageMockObj.url);
    expect(user.profile_img).toHaveProperty('title', createImageMockObj.title);
    expect(user.profile_img).toHaveProperty('user_id', user.id);
  });

  it('I will hope received the id of class instance when calling the getter id', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const login = service.id;

    expect(login).toBe('new_id');
  });
});
