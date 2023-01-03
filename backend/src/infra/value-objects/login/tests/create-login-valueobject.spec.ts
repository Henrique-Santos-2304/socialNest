import { mock, MockProxy } from 'jest-mock-extended';
import { IEncrypterService, IUuidService } from '@root/domain';
import { LoginValueObject } from '..';

describe('Login value Object Unit', () => {
  let uuidService: MockProxy<IUuidService>;
  let encrypter: MockProxy<IEncrypterService>;

  beforeEach(async () => {
    uuidService = mock();
    encrypter = mock();
    uuidService.create.mockReturnValue('new_id');
  });

  it('should be uuidService to have been called once time and with values correctly  ', () => {
    const spy = jest.spyOn(uuidService, 'create');
    new LoginValueObject(uuidService, encrypter);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });
  it('should be login to be created an id and created_at properties when start the instance of value object ', async () => {
    const service = new LoginValueObject(uuidService, encrypter);
    const login = service.get;
    expect(login.id).toBe('new_id');
  });

  it('should be encrypter to have been called once and valid datas', async () => {
    const spy = jest.spyOn(encrypter, 'create');
    const service = new LoginValueObject(uuidService, encrypter);
    service.create = {
      field: 'EMAIL',
      value_field: '@value_field',
      password: '1234',
      user_id: 'new_id',
    };
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('1234');
  });

  it('should expects service to throw "ENCRYPTER ERROR" if ocurred error in encrypter service', async () => {
    jest.spyOn(encrypter, 'create').mockImplementationOnce(() => {
      throw new Error('ENCRYPTER ERROR');
    });
    const service = new LoginValueObject(uuidService, encrypter);
    expect(
      () =>
        (service.create = {
          field: 'EMAIL',
          value_field: '@value_field',
          password: '1234',
          user_id: 'new_id',
        }),
    ).toThrow(new Error('ENCRYPTER ERROR'));
  });

  it('Must populate the properties url, title and userId with data sent when calling the create method ', async () => {
    jest.spyOn(encrypter, 'create').mockReturnValueOnce('encrypted');
    const service = new LoginValueObject(uuidService, encrypter);
    service.create = {
      field: 'EMAIL',
      value_field: '@value_field',
      password: '1234',
      user_id: 'new_id',
    };
    const login = service.get;
    expect(login).toHaveProperty('field', 'EMAIL');
    expect(login).toHaveProperty('value_field', '@value_field');
    expect(login).toHaveProperty('password', 'encrypted');
    expect(login).toHaveProperty('user_id', 'new_id');
  });

  it('I will hope received the id of class instance when calling the getter id', async () => {
    const service = new LoginValueObject(uuidService, encrypter);
    const login = service.id;
    expect(login).toBe('new_id');
  });
});
