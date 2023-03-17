import {ApiProperty, ApiTags} from "@nestjs/swagger";

@ApiTags("회원가입DTO")
export class CreateUserDto {
    @ApiProperty({ description: '로그인 ID' })
    readonly userid: string;

    @ApiProperty({ description: '비밀번호' })
    readonly password: string;

    @ApiProperty({ description: '이름' })
    readonly name: string;

    @ApiProperty({ description: '생년월일' })
    readonly birth: Date;

    @ApiProperty({ description: '이메일' })
    readonly email: string;

    @ApiProperty({ description: '휴대폰번호' })
    readonly phoneNumber: string;
}