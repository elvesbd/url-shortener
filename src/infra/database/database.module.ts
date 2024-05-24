import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

import { DatabaseService } from './database.service';
import { UserRepository } from '@app/user/ports';
import { dataSource } from './typeorm/datasource';
import { ShortUrlRepository } from '@app/short-url/ports';
import { TypeORMUserRepository } from './typeorm/repositories/user/user.repository';
import { TypeORMShortUrlRepository } from './typeorm/repositories/short-url/short-url-repository';

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
    {
      provide: ShortUrlRepository,
      useClass: TypeORMShortUrlRepository,
    },
  ],
  exports: [UserRepository, ShortUrlRepository],
})
export class DatabaseModule {}
