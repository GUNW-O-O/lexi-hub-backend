import { Controller, Get } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
  @Get()
  getQuizzes(): String[] {
    return ['TypeScript', 'JavaScript', 'React', 'NestJS'];
  }
}
