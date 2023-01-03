type CreateHashParamsProps = string;
type CreateHashResponseProps = string;

type CompareHashParamsProps = { hash: string; compare: string };
type CompareHashResponseProps = Promise<boolean>;

abstract class IEncrypterService {
  abstract create(value: CreateHashParamsProps): CreateHashResponseProps;
  abstract compare({
    hash,
    compare,
  }: CompareHashParamsProps): CompareHashResponseProps;
}

export {
  IEncrypterService,
  CompareHashParamsProps,
  CompareHashResponseProps,
  CreateHashParamsProps,
  CreateHashResponseProps,
};
