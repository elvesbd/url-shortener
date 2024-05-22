export abstract class ComparePassword {
  public abstract compare(plainText: string, hash: string): Promise<boolean>;
}
