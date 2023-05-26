import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class StoreEntity extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty({ description: "id" })
  id: number;

  @Column()
  @ApiProperty({ description: "상호명" })
  name: string;

  @Column()
  @ApiProperty({ description: "상호명" })
  nickname: string;

  @Column()
  @ApiProperty({ description: "사업자등록번호" })
  businessRegistrationNumber: string;

  @Column()
  @ApiProperty({ description: "영업시간" })
  businessHours: string;

  @Column()
  @ApiProperty({ description: "전화번호" })
  phoneNumber: string;

  @Column()
  @ApiProperty({ description: "주소" })
  address: string;

  @Column()
  @ApiProperty({ description: "가게소개" })
  description: string;

  @CreateDateColumn({ name: 'created_at'})
  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '수정 시간' })
  updatedAt: Date;
}
