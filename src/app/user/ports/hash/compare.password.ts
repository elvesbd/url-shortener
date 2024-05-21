export abstract class ComparePassword {
  public abstract comparePassword(
    plainText: string,
    hash: string,
  ): Promise<boolean>;
}
