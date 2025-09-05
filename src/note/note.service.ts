// src/note/note.service.ts

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/createNote.dto';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  // 노트 생성
  async createNote(authorId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      author: authorId,
    });
    return createdNote.save();
  }

  // 사용자 아이디로 노트 조회
  async getNotesByAuthor(authorId: string): Promise<Note[]> {
    return this.noteModel.find({ author: authorId }).select('_id title author type').exec();
  }

  // 노트 아이디로 노트 반환
  async getNoteByNoteId(authorId: string, noteId: string): Promise<Note> {
    const note = await this.noteModel.findOne({_id: noteId, author: authorId }).exec();
    if(!note) {
      throw new NotFoundException('해당 노트를 찾을 수 없습니다.');
    }
    return note;
  }

    async updateNote(userId: string, noteId: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    // 1. 해당 노트가 존재하는지 확인
    const note = await this.noteModel.findById(noteId).exec();
    if (!note) {
      throw new NotFoundException('노트를 찾을 수 없습니다.');
    }

    // 2. 요청을 보낸 사용자가 노트의 소유자인지 확인 (인가)
    if (note.author.toString() !== userId) {
      throw new UnauthorizedException('노트를 수정할 권한이 없습니다.');
    }

    // 3. 노트 업데이트
    note.title = updateNoteDto.title ?? note.title;
    note.flashcards = updateNoteDto.flashcards ?? note.flashcards;

    await note.save();
    return note;
  }

  async deleteNote(userId: string, noteId: string): Promise<void> {
    const note = await this.noteModel.findById(noteId).exec();
    if (!note) {
      throw new NotFoundException('노트를 찾을 수 없습니다.');
    }
    if (note.author.toString() !== userId) {
      throw new UnauthorizedException('노트를 삭제할 권한이 없습니다.');
    }
    await note.deleteOne({ _id: noteId });
  }
}