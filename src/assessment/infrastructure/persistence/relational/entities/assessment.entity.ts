import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@/users/infrastructure/persistence/relational/entities/user.entity';
import { Answer } from './answer.entity';

@Entity('assessment')
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.assessments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ name: 'assessmentType', length: 10 })
  assessmentType: string;

  @Column({ length: 20, default: 'in_progress' })
  status: string;

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Answer, (answer) => answer.assessment)
  answers: Answer[];
}
