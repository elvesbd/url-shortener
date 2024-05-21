import { User } from '@app/user/domain/user';
import { TypeORMUserEntity } from '../entities/user.entity';

export class TypeORMUserMapper {
  private constructor() {
    throw new Error(
      'TypeORMUserMapper is a static class and should not be instantiated.',
    );
  }

  public static toDomain(persistence: TypeORMUserEntity): User {
    return new User({
      id: persistence.id,
      name: persistence.name,
      email: persistence.email,
      password: persistence.password,
      createdAt: persistence.createdAt,
    });
  }

  public static toPersistence(domain: User): TypeORMUserEntity {
    return {
      id: domain.id.value,
      name: domain.name.value,
      email: domain.email.value,
      password: domain.password.value,
      createdAt: domain.createdAt,
    };
  }
}
