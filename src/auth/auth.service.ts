import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../dto';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, ) { }

  async validateUser(username: string, pass: string): Promise<{userId: string, username: string}> {
    const user = await this.usersService.findOne(username);
    // TODO: add bcrypt, with a salted one-way hash algorithm
    if (user && user.password === pass) {
      const { id, email } = user;
      return {userId: id, username: email};
    }
    return null;
  }

  async createNewAccount(createUserDto: CreateUserDto) {
    const newUser = this.usersService.create(createUserDto);
    return newUser;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}