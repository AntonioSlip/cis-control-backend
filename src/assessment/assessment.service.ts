import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './infrastructure/persistence/relational/entities/assessment.entity';
import { Answer } from './infrastructure/persistence/relational/entities/answer.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepo: Repository<Assessment>,
    @InjectRepository(Answer)
    private readonly answerRepo: Repository<Answer>,
  ) {}
  async createAssessment(userId: number, assessmentType: string, status?: string) {
    const assessment = this.assessmentRepo.create({
      user: { id: userId },
      assessmentType,
      status: status ?? 'in_progress',
    });
    return this.assessmentRepo.save(assessment);
  }

  async addAnswer(assessmentId: number, data: Partial<Answer>) {
    const answer = this.answerRepo.create({
      ...data,
      assessment: { id: assessmentId },
    });
    return this.answerRepo.save(answer);
  }

  async listAnswers(assessmentId: number) {
    return this.answerRepo.find({
      where: { assessment: { id: assessmentId } },
      order: { controlNumber: 'ASC' },
    });
  }

  async calculateScores(assessmentId: number) {
    const answers = await this.answerRepo.find({
      where: { assessment: { id: assessmentId } },
    });

    const controls = new Map<number, { total: number; count: number }>();

    for (const ans of answers) {
      if (!ans.applicable || ans.score == null) continue;
      const group = controls.get(ans.controlNumber) || { total: 0, count: 0 };
      group.total += ans.score;
      group.count++;
      controls.set(ans.controlNumber, group);
    }

    const controlScores = Array.from(controls.entries()).map(([control, data]) => ({
      controlNumber: control,
      average: data.count ? data.total / data.count : 0,
    }));

    const orgAvg =
      controlScores.length > 0
        ? controlScores.reduce((sum, c) => sum + c.average, 0) / controlScores.length
        : 0;

    return { controlScores, organizationAverage: orgAvg };
  }
}
