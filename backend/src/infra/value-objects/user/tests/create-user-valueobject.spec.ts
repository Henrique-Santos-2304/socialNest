import { mock, MockProxy } from 'jest-mock-extended';
import { IEncrypterService, IUuidService } from '@root/domain';
import {
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
    encrypterService.create.mockReturnValue('encrypted');
    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 1, 7));
  });

  it('should be uuidService to have been called once time and with values correctly  ', () => {
    const spy = jest.spyOn(uuidService, 'create');
    new CreateUserValueObject(uuidService, encrypterService);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });

  it('Instance of user does not have properties email_rescue, login, profile_image if create not be called ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const user = service.get();

    expect(user).not.toHaveProperty('email_rescue');
    expect(user).not.toHaveProperty('login');
    expect(user).not.toHaveProperty('profile_image');
  });
  it('should be login to be created an id and created_at properties when start the instance of value object ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const user = service.get();

    expect(user).toHaveProperty('id', 'user_id');
    expect(user).toHaveProperty('created_at', new Date(2023, 9, 1, 7));
  });

  it('Must populate the property email_rescue with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    service.create({
      login: { ...createLoginMockObj },
      email_rescue: '@rescue-email',
    });
    const loginVo = service.get();

    expect(loginVo).toHaveProperty('email_rescue', '@rescue-email');
  });

  it('Must populate the properties login: {fi    console.log(loginVo);eld, password, value_field } with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);

    service.create({
      login: { ...createLoginMockObj },
    });

    const user = service.get();

    expect(user.login).toHaveProperty('id');
    expect(user.login).toHaveProperty('password', 'encrypted');
    expect(user.login).toHaveProperty('field', createLoginMockObj.field);
    expect(user.login).toHaveProperty('user_id', user.id);
    expect(user.login).toHaveProperty(
      'value_field',
      createLoginMockObj.value_field,
    );
  });

  it('Must populate the property profile_img with entity imageEntity type and with data sent when calling the create method ', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    service.create({
      login: { ...createLoginMockObj },
      profile_img: { ...createImageMockObj },
    });
    const user = service.get();

    expect(user.profile_img).toHaveProperty('id', 'user_id');
    expect(user.profile_img).toHaveProperty('url', createImageMockObj.url);
    expect(user.profile_img).toHaveProperty('title', createImageMockObj.title);
    expect(user.profile_img).toHaveProperty('user_id', user.id);
    expect(user.profile_img).toHaveProperty(
      'created_at',
      new Date(2023, 9, 1, 7),
    );
  });

  it('I will hope received the id of class instance when calling the getter id', async () => {
    const service = new CreateUserValueObject(uuidService, encrypterService);
    const login = service.getId();

    expect(login).toBe('user_id');
  });
});
