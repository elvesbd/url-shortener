import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { dataSource } from '../datasource';
import { TypeORMUserMapper } from '../mappers/user.mapper';
import { UserRepository } from '@app/user/ports/repository/user.repository';
import { User } from '@app/user/domain/user';
import { TypeORMUserEntity } from '../entities/user.entity';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  private repository: Repository<TypeORMUserEntity>;

  constructor() {
    this.repository = dataSource.getRepository(TypeORMUserEntity);
  }

  public async register(user: User): Promise<void> {
    const newUser = TypeORMUserMapper.toPersistence(user);
    await this.repository.save(newUser);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return TypeORMUserMapper.toDomain(user);
  }
}
