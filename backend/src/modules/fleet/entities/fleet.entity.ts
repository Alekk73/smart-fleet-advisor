import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { FleetEnum } from '../../../common/enums/fleet.enum';

@Entity({ name: 'fleet' })
export class Fleet extends BaseEntity {
  @Column({ type: 'varchar' })
  patent: string;

  @Column({ type: 'enum', enum: FleetEnum })
  type: FleetEnum;
}
