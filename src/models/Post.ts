import mongoose, { Schema, models, model } from 'mongoose';

export interface IPost {
  title: string;
  content: string; // HTML
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Post = models.Post || model<IPost>('Post', PostSchema); 