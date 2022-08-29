import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { Status } from 'src/statuses/entities/status.entity';
import { FileEntity } from 'src/files/entities/file.entity';

@Entity({ name: 'banner' })
export class Banner extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title?: string;

  @Column()
  type?: number;

  @Column({ nullable: true })
  link?: string;

  @Column({ default: 1 })
  order?: number;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status | number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
