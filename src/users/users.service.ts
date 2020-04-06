import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/createUser.dto';

export type User = { email: string, password: string, id: string };

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectModel('User') private userModel: Model
  ) { }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: username }).exec();
  }

  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }
}