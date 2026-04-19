import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  lastname: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password_hash: string;
}
