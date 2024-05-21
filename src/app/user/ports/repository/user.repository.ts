import { User } from '@app/user/domain/user';

export abstract class UserRepository {
  public abstract findByEmail: (email: string) => Promise<User | null>;
  public abstract register: (user: User) => Promise<void>;
}
