// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true }) // 닉네임 필드 추가
  nickname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);