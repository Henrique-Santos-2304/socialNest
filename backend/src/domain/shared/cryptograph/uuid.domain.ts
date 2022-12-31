interface IUuidService {
  create(): IUuidService.createResponse;
}

namespace IUuidService {
  export type createResponse = string;
}

export { IUuidService };
