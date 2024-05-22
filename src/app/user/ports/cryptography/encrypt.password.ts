export abstract class HashPassword {
  public abstract hash(plainText: string): Promise<string>;
}
