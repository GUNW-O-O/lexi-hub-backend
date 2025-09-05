// src/note/note.controller.ts

import { Body, Controller, Post, UseGuards, Request, Get, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/createNote.dto'; // 다음 단계에서 만들 DTO
import { UpdateNoteDto } from './dto/updateNote.dto';

@Controller('notes')
@UseGuards(AuthGuard('jwt')) // JWT 가드를 사용해 인증된 사용자만 접근 허용
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(req.user.id, createNoteDto);
  }

  @Get()
  async getNotes(@Request() req) {
    // req.user는 JWT 페이로드의 사용자 정보
    // _id 사용
    return this.noteService.getNotesByAuthor(req.user.id);
  }

  @Get('/:id')
  async getNoteByNoteId(@Request() req, @Param('id')noteId: string) {
    return this.noteService.getNoteByNoteId(req.user.id, noteId);
  }

  @Put(':id')
  async updateNote(
    @Request() req,
    @Param('id') noteId: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    // 사용자가 해당 노트의 소유자인지 확인하는 로직이 필요합니다.
    return this.noteService.updateNote(req.user.id, noteId, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteNote(@Request() req:any, @Param('id') noteId: string) {
    await this.noteService.deleteNote(req.user.id, noteId);
  }
}