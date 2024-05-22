import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('url_shorteners')
@Index('IDX_SHORT_URL', ['shortUrl'], { unique: true })
export class TypeORMUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  shortUrl: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  originalUrl: string;

  @Column('int', {
    nullable: false,
    default: 0,
  })
  accessCount: number;

  @Column('uuid', {
    nullable: true,
  })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
