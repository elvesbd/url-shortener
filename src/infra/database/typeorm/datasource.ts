import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
config();

const configService = new ConfigService();

export const dataSource = new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: parseInt(configService.getOrThrow('POSTGRES_PORT')),
  database: configService.getOrThrow('POSTGRES_DB'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  entities: [path.join(__dirname, '..', 'typeorm/entities', '*.{ts,js}')],
  migrations: [path.join(__dirname, '..', 'typeorm/migrations', '*.{ts,js}')],
  synchronize: false,
  logging: false,
});
