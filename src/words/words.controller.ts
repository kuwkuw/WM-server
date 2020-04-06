import { Controller, Get, Post, Request, Body, UseGuards, HttpException, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { WordDto, WordsLibraryDto } from '../dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
  constructor(private wordsService: WordsService) { }


  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getWords(@Request() req): Promise<WordsLibraryDto> {
    return await this.wordsService.getUserWordsLibraryDto(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async ddWord(@Body() newWord: WordDto, @Request() req) {
    try {
      await this.wordsService.add(newWord, req.user.userId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
