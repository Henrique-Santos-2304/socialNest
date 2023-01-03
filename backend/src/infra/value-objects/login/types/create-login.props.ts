import { LoginEntity } from '@root/infra/entities';

type CreateLoginBuilderProps = {
  setId: () => CreateLoginBuilderProps;
  setUserId: (userId: LoginEntity['user_id']) => CreateLoginBuilderProps;
  setField: (field: LoginEntity['field']) => CreateLoginBuilderProps;
  setValueField: (
    valueField: LoginEntity['value_field'],
  ) => CreateLoginBuilderProps;
  setPassword: (password: LoginEntity['password']) => CreateLoginBuilderProps;
};

export { CreateLoginBuilderProps };
