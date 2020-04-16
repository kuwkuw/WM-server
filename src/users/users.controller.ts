import { Controller, Post, Body } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService ) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
