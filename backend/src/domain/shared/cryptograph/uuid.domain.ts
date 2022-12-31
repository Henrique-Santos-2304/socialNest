interface IUuidService {
  create(): IUuidService.createResponse;
}

namespace IUuidService {
  export type createResponse = Promise<string>;
}

export { IUuidService };
