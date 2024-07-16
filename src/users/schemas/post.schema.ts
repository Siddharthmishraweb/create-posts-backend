/* eslint-disable */
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
// import { User } from './user.schema';

// export type PostDocument = Post & Document;

// @Schema()
// export class Post {
//   @Prop({ type: [String] })
//   images: string[];

//   @Prop({ default: 0 })
//   likes: number;

//   @Prop({ type: [{ user: String, comment: String, createdAt: { type: Date, default: Date.now } }] })
//   comments: { user: string, comment: string, createdAt: Date }[];

//   @Prop({ type: String, ref: 'User', required: true })
//   user: User;

//   @Prop({ required: true })
//   content: string;

//   @Prop({ default: Date.now })
//   createdAt: Date;

//   @Prop()
//   updatedAt: Date;
// }

// export const PostSchema = SchemaFactory.createForClass(Post);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: [String] })
  images: string[];

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  likedBy: Types.ObjectId[];

  @Prop({ type: [{ user: { type: Types.ObjectId, ref: 'User' }, comment: String, createdAt: { type: Date, default: Date.now } }] })
  comments: { user: Types.ObjectId, comment: string, createdAt: Date }[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
