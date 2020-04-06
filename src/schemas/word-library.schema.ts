import * as mongoose from 'mongoose';

export const WordLibrarySchema = new mongoose.Schema({
  user_id: String,
  words: [{ original: String, translation: String }]
});
