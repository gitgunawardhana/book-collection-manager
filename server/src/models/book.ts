import mongoose, { Document, Schema, Types } from "mongoose";
import { UserDocument } from "./user";

export interface BookDocument extends Document {
  title: string;
  author: Types.ObjectId | UserDocument;
  genre: string;
  publicationDate: Date;
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    genre: { type: String },
    publicationDate: { type: Date },
  },
  { timestamps: true }
);

export const Book = mongoose.model<BookDocument>("Book", bookSchema);
