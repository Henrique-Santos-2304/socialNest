import { LoginEntity, UserEntity } from '@root/infra';

// Params
type FindUserByIdParamsProps = UserEntity['id'];
type FindUserByLoginProps = UserEntity['login']['value_field'];

type OmitPasswordOfLogin = Omit<LoginEntity, 'password'>;

// Response
type AllUserResponseProps = Promise<FindUserWithoutPasswordResponseProps[]>;
type FindUserWithPassword = Promise<UserEntity>;
type FindUserWithoutPasswordResponseProps = Promise<
  Omit<UserEntity, 'login'> & OmitPasswordOfLogin
>;

// Abstract Class
abstract class FindUserRepository {
  abstract by_id(
    id: FindUserByIdParamsProps,
  ): FindUserWithoutPasswordResponseProps;
  abstract by_login(login: FindUserByLoginProps): FindUserWithPassword;
  abstract all(): AllUserResponseProps;
}

export {
  FindUserRepository,
  FindUserWithoutPasswordResponseProps,
  AllUserResponseProps,
  FindUserByIdParamsProps,
  FindUserByLoginProps,
};
