// quiz-works/src/quiz.controller.ts

import { Controller, Get, Param } from '@nestjs/common'; // @Param을 가져옵니다.

@Controller('quiz')
export class QuizController {
  private readonly quizData = [ // 퀴즈 데이터를 미리 정의합니다.
    { id: '0', title: 'TypeScript', content: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.' },
    { id: '1', title: 'JavaScript', content: 'JavaScript is the world\'s most popular programming language. It is the language of the web.' },
    { id: '2', title: 'React', content: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.' },
    { id: '3', title: 'NestJS', content: 'NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.' },
  ];

  @Get()
  getQuizzes(): { id: string; title: string; }[] {
    return this.quizData.map(({ id, title }) => ({ id, title }));
  }

  @Get(':id') // URL에서 id를 매개변수로 받는 API를 추가합니다.
  getQuizById(@Param('id') id: string) {
    const quiz = this.quizData.find(q => q.id === id);
    if (!quiz) {
      // 퀴즈가 없을 경우 404 Not Found 에러를 던질 수 있습니다.
      // throw new NotFoundException(`Quiz with ID ${id} not found`);
      return null;
    }
    return quiz;
  }
}