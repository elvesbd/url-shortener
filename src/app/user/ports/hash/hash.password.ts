export abstract class HasherPassword {
  public abstract hashPassword(plainText: string): Promise<string>;
}
