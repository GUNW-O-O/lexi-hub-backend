// src/note/note.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    AuthModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}