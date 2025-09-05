// src/note/dto/create-note.dto.ts

import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FlashcardItemDto {
  @IsString()
  word: string;

  @IsString()
  meaning: string;
}

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlashcardItemDto)
  flashcards?: FlashcardItemDto[];

  @IsOptional()
  @IsString()
  content?: string;
}