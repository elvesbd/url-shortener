import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@app/user/domain';
import { UserRepository } from '@app/user/ports';
import { dataSource } from '../../datasource';
import { TypeORMUserEntity } from '../../entities/user.entity';
import { TypeORMUserMapper } from '../../mappers/user/user.mapper';

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
