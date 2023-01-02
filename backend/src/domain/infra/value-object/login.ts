import { CreateLoginDto, LoginEntity } from '@root/infra';

interface ILoginValueObject {
  get get(): LoginEntity;
  set create(createLogin: CreateLoginDto);
  get id(): LoginEntity['id'];
}

export { ILoginValueObject };
