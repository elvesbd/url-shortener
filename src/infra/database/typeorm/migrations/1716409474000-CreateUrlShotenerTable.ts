import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUrlShotenerTable1716409474000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'short-urls',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'shortUrl',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'originalUrl',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'clicks',
            type: 'int',
            default: 0,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'short-urls',
      new TableIndex({
        name: 'IDX_SHORT_URL',
        columnNames: ['shortUrl'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('short-urls', 'IDX_SHORT_URL');
    await queryRunner.dropTable('short-urls');
  }
}
