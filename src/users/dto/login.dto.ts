import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ description: '로그인 ID' })
    id: string;

    @ApiProperty({ description: '로그인 PW' })
    password: string;
}