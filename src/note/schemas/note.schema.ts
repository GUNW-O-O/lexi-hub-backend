// src/note/schemas/note.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  // 노트 타입 (예: flashcard, longform)
  @Prop({ required: true })
  type: string;

  // 플래시카드 타입일 때의 데이터
  @Prop({ type: [{ word: String, meaning: String }] })
  flashcards: { word: string; meaning: string }[];

  // 장문 타입일 때의 데이터
  @Prop()
  content: string;

  // 작성자를 User 스키마와 연결
  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);