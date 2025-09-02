// src/note/note.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/createNote.dto';

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
    console.log('전달받은 noteId:', noteId);
    const note = await this.noteModel.findOne({_id: noteId, author: authorId }).exec();
    if(!note) {
      throw new NotFoundException('해당 노트를 찾을 수 없습니다.');
    }
    return note;
  }
}