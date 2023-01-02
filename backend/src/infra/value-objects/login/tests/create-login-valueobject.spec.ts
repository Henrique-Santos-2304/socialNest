import { mock, MockProxy } from 'jest-mock-extended';
import { IUuidService } from '@root/domain';
import { LoginValueObject } from '..';

describe('Image value Object Unit', () => {
  let uuidService: MockProxy<IUuidService>;

  beforeEach(async () => {
    uuidService = mock();
    uuidService.create.mockReturnValue('new_id');
  });

  it('should be uuidService to have been called once time and with values correctly  ', () => {
    const spy = jest.spyOn(uuidService, 'create');
    new LoginValueObject(uuidService);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });
  it('should be login to be created an id and created_at properties when start the instance of value object ', async () => {
    const service = new LoginValueObject(uuidService);
    const login = service.get;
    expect(login.id).toBe('new_id');
  });

  it('Must populate the properties url, title and userId with data sent when calling the create method ', async () => {
    const service = new LoginValueObject(uuidService);
    service.create = {
      field: 'EMAIL',
      value_field: '@value_field',
      password: '1234',
      user_id: 'new_id',
    };
    const login = service.get;
    expect(login).toHaveProperty('field', 'EMAIL');
    expect(login).toHaveProperty('value_field', '@value_field');
    expect(login).toHaveProperty('password', '1234');
    expect(login).toHaveProperty('user_id', 'new_id');
  });

  it('I will hope received the id of class instance when calling the getter id', async () => {
    const service = new LoginValueObject(uuidService);
    const login = service.id;
    expect(login).toBe('new_id');
  });
});