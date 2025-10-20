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

  @Column({ length: 30, nullable: true })
  maturityLevel: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
