// src/note/note.controller.ts

import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNote.dto'; // 다음 단계에서 만들 DTO

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(AuthGuard('jwt')) // JWT 가드를 사용해 인증된 사용자만 접근 허용
  @Post()
  async createNote(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(req.user.id, createNoteDto);
  }
}