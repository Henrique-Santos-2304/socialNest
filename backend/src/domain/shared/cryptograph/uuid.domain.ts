type CreateUUidResponseProps = string;

abstract class IUuidService {
  abstract create(): CreateUUidResponseProps;
}

export { IUuidService, CreateUUidResponseProps };
