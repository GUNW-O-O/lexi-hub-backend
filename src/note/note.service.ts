// src/note/note.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/createNote.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote(authorId: string, createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel({
      ...createNoteDto,
      author: authorId,
    });
    return createdNote.save();
  }
}