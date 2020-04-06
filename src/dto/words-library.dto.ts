import { Exclude, Type } from 'class-transformer';
import { WordDto } from './word.dto'

export class WordsLibraryDto {
  @Exclude()
  _id: string;
  @Exclude()
  __v: number;

  user_id: string;

  @Type(()=> WordDto)
  words: WordDto[]

  constructor(partial: Partial<WordsLibraryDto>) {
    Object.assign(this, partial);
  }
}