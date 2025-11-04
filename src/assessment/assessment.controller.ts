import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { AssessmentService } from './assessment.service';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Get('by-user/:userId')
  async findLatestByUser(@Param('userId') userId: number) {
    return await this.assessmentService.findLatestByUser(userId);
  }

  @Post(':userId')
  async create(
    @Param('userId') userId: number,
    @Body() body: { assessmentType: string; status?: string },
  ) {
    console.log('📩 Dados recebidos no body:', body);
    return this.assessmentService.createAssessment(userId, body.assessmentType, body.status);
  }

  @Post(':assessmentId/answers')
  async addAnswer(@Param('assessmentId') assessmentId: number, @Body() body: any) {
    return this.assessmentService.addAnswer(assessmentId, body);
  }

  @Get(':assessmentId/answers')
  async listAnswers(@Param('assessmentId') assessmentId: number) {
    return this.assessmentService.listAnswers(assessmentId);
  }

  @Get(':assessmentId/scores')
  async getScores(@Param('assessmentId') assessmentId: number) {
    return this.assessmentService.calculateScores(assessmentId);
  }
}
