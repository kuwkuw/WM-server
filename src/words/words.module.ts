import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WordLibrarySchema } from '../schemas'
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'WordLibrary', schema: WordLibrarySchema }])
  ],
  controllers: [WordsController],
  providers: [WordsService]
})
export class WordsModule {}
