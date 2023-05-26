import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @IsNotEmpty()
    @ApiProperty({description: '시압자등록번호'})
    businessRegistrationNumber: string;
}