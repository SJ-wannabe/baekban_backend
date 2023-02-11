import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login.dto';
import {ApiBody, ApiCreatedResponse, ApiOperation, ApiTags} from "@nestjs/swagger";


@Controller('users')
@ApiTags('유저 API')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: '회원가입', description: '유저를 생성한다.' })
    @ApiBody({ description:'회원가입DTO', type: CreateUserDto})
    @ApiCreatedResponse({ description: '회원가입 완료'})
    async createUser(@Body() dto: CreateUserDto) {
        await this.usersService.createUser(dto);

        return {
            status: 'success',
            message: 'User created successfully'
        };
    }

    @Post('/login')
    @ApiOperation({ summary: '로그인', description: '' })
    @ApiBody({ description:'로그인DTO', type: LoginDto })
    @ApiCreatedResponse({ description: '로그인 성공.'})
    async login(@Body() dto: LoginDto) {
        const accessToken = await this.usersService.login(dto);

        return {
            status: 'success',
            message: 'Login successful',
            accessToken,
        };
    }
}
