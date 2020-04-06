import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../dto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  @Post()
  async join(@Body() createUserDto: CreateUserDto) {
    return this.authService.createNewAccount(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}