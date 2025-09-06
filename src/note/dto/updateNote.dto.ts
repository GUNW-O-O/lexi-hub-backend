// src/note/dto/updateNote.dto.ts

import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FlashcardItemDto } from './createNote.dto';

export class UpdateNoteDto {
  @IsOptional() // 제목은 필수가 아닐 수 있습니다.
  @IsString()
  title?: string;

  @IsOptional() // 플래시카드도 필수가 아닐 수 있습니다.
  @IsArray()
  @ValidateNested({ each: true }) // 배열 내 각 객체에 대한 유효성 검사
  @Type(() => FlashcardItemDto)
  flashcards?: FlashcardItemDto[];

  @IsOptional()
  @IsString()
  content?: string;
}