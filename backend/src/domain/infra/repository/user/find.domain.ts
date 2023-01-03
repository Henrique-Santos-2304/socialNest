import { LoginEntity, UserEntity } from '@root/infra';

// Params
type FindUserByIdParamsProps = UserEntity['id'];
type FindUserByLoginProps = UserEntity['login']['value_field'];

type LoginWithoutPassword = { login: Omit<LoginEntity, 'password'> | null };
type UserWithoutLogin = Omit<UserEntity, 'login'>;
type JoinUserWithoutLogin = UserWithoutLogin & LoginWithoutPassword;

// Response
type AllUserResponseProps = Promise<JoinUserWithoutLogin[]>;
type FindUserWithPasswordResponseProps = Promise<UserEntity | null>;
type FindUserWithoutPasswordResponseProps =
  Promise<JoinUserWithoutLogin | null>;

// Abstract Class
abstract class IFindUserRepository {
  abstract by_id(
    id: FindUserByIdParamsProps,
  ): FindUserWithoutPasswordResponseProps;
  abstract by_login(
    login: FindUserByLoginProps,
  ): FindUserWithPasswordResponseProps;
  abstract all(): AllUserResponseProps;
}

export {
  IFindUserRepository,
  FindUserWithoutPasswordResponseProps,
  AllUserResponseProps,
  FindUserByIdParamsProps,
  FindUserByLoginProps,
  FindUserWithPasswordResponseProps,
};
