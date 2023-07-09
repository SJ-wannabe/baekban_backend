import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @IsNotEmpty()
    @ApiProperty({description: '시압자등록번호'})
    businessNumber: string;

    @IsNotEmpty()
    @ApiProperty({description: '개업일자'})
    openingDate: number;


    @IsNotEmpty()
    @ApiProperty({description: '대표자성명'})
    ceoName: string;

    @IsNotEmpty()
    @ApiProperty({ description: "대표자성명" })
    business_name: string;
}