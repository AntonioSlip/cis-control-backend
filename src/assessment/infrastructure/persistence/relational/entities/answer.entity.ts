import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Assessment } from './assessment.entity';

@Entity('answer')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment, (assessment) => assessment.answers, {
    onDelete: 'CASCADE',
  })
  assessment: Assessment;

  @Index()
  @Column()
  controlNumber: number;

  @Index()
  @Column({ length: 10 })
  safeguardCode: string;

  @Column({ type: 'int', nullable: true })
  score: number;

  @Column({ default: true })
  applicable: boolean;

  @Column({ name: 'asset_type', length: 100, nullable: true })
  assetType: string;

  @Column({ name: 'security_function', length: 100, nullable: true })
  securityFunction: string;

  @Column({ name: 'ig1', type: 'boolean', nullable: true, default: false })
  ig1: boolean;

  @Column({ name: 'ig2', type: 'boolean', nullable: true, default: false })
  ig2: boolean;

  @Column({ name: 'ig3', type: 'boolean', nullable: true, default: false })
  ig3: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
