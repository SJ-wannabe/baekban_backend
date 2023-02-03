import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void> {
        await this.usersService.createUser(dto);
    }
}
