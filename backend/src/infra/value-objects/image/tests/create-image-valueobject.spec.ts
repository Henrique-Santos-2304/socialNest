import { ImageValueObject } from '../image';
import { mock, MockProxy } from 'jest-mock-extended';
import { IUuidService } from '@root/domain';

describe('Image value Object Unit', () => {
  let uuidService: MockProxy<IUuidService>;

  beforeEach(async () => {
    uuidService = mock();
    uuidService.create.mockReturnValue('new_id');
    jest.useFakeTimers().setSystemTime(new Date(2023, 9, 1, 7));
  });

  it('should be uuidService to have been called once time and with values correctly  ', () => {
    const spy = jest.spyOn(uuidService, 'create');
    new ImageValueObject(uuidService);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();
  });
  it('should be image to be created an id and created_at properties when start the instance of value object ', async () => {
    const service = new ImageValueObject(uuidService);
    const image = service.get();
    expect(image).toHaveProperty('id', 'new_id');
    expect(image).toHaveProperty('created_at', new Date(2023, 9, 1, 7));
  });

  it('Must populate the properties url, title and userId with data sent when calling the create method ', async () => {
    const service = new ImageValueObject(uuidService);
    service.create({
      title: 'new_title',
      url: 'new_url',
      user_id: 'id',
    });
    const image = service.get();
    expect(image).toHaveProperty('title', 'new_title');
    expect(image).toHaveProperty('url', 'new_url');
    expect(image).toHaveProperty('user_id', 'id');
  });

  it('I will hope received the id of class instance when calling the getter id', async () => {
    const service = new ImageValueObject(uuidService);
    const image = service.getId();
    expect(image).toBe('new_id');
  });
});
