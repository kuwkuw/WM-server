import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { WordsController } from './words.controller';
import { WordsService } from './words.service';

describe('Words Controller', () => {
  let controller: WordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordsController],
      providers: [ {provide: getModelToken('WordLibrary'), useValue: {}}, WordsService]
    }).compile();

    controller = module.get<WordsController>(WordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
