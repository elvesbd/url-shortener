import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DatabaseService } from './database.service';
import { dataSource } from './typeorm/datasource';
import { TypeORMUserRepository } from './typeorm/repositories/user.repository';
import { UserRepository } from '@app/user/ports/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
      dataSourceFactory: async (
        options?: DataSourceOptions,
      ): Promise<DataSource> => {
        if (!options) {
          throw new Error('No DataSource options were provided!');
        }

        return dataSource.initialize();
      },
    }),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeORMUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
