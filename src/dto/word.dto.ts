import { Exclude } from 'class-transformer';

export class WordDto {
  @Exclude()
  _id: any;

  original: string;
  translation: string;
}
