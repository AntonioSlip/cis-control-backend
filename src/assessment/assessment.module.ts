import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './infrastructure/persistence/relational/entities/assessment.entity';
import { Answer } from './infrastructure/persistence/relational/entities/answer.entity';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Answer])],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {
  constructor() {
    console.log('✅ AssessmentModule loaded');
  }
}
