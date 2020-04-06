import { Injectable } from '@nestjs/common';
import { InjectModel, } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { WordsLibraryDto, WordDto } from '../dto';


@Injectable()
export class WordsService {

    @InjectModel('WordLibrary') private wordModel: Model

    async add(newWord: WordDto, userId: string): Promise<any> {
        const wordsLibrary = await this.getUserWordsLibrary(userId);
        if (wordsLibrary) {
            wordsLibrary.words = [ ...wordsLibrary.words, newWord];
            return await wordsLibrary.save();
        } else {
            const createWord = new this.wordModel({ user_id: userId, words: [newWord] });
            return new Promise((resolve, reject) => {
                createWord.save((err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve();
                    }
                });
            });
        }
    }

    async getUserWordsLibrary(userId: string): Promise<any> {
        return await this.wordModel.findOne({ user_id: userId }).exec();
    }

    async getUserWordsLibraryDto(userId: string): Promise<any> {
        return new WordsLibraryDto((await this.getUserWordsLibrary(userId)).toObject());
    }
}
