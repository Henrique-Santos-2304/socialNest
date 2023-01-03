import { LoginEntity, UserEntity } from '@root/infra';

// Params
type FindUserByIdParamsProps = UserEntity['id'];
type FindUserByLoginProps = UserEntity['login']['value_field'];

type LoginWithoutPassword = { login: Omit<LoginEntity, 'password'> | null };
type UserWithoutLogin = Omit<UserEntity, 'login'>;

// Response
type AllUserResponseProps = Promise<FindUserWithoutPasswordResponseProps[]>;
type FindUserWithPassword = Promise<UserEntity>;
type FindUserWithoutPasswordResponseProps = UserWithoutLogin &
  LoginWithoutPassword;

// Abstract Class
abstract class IFindUserRepository {
  abstract by_id(
    id: FindUserByIdParamsProps,
  ): Promise<FindUserWithoutPasswordResponseProps | null>;
  abstract by_login(login: FindUserByLoginProps): FindUserWithPassword;
  abstract all(): AllUserResponseProps;
}

export {
  IFindUserRepository,
  FindUserWithoutPasswordResponseProps,
  AllUserResponseProps,
  FindUserByIdParamsProps,
  FindUserByLoginProps,
};
