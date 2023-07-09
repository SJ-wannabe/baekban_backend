import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../users/user.entity";

@Entity()
export class StoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id" })
  id: number;


  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "user_id"
  })
  @ApiProperty({ description: "user_id" })
  user: UserEntity;

  @Column({
    type: "varchar",
    length: 32
  })
  @ApiProperty({ description: "상호명" })
  name: string;

  @Column({
    type: "varchar",
    length: 32
    // nullable: true
  })
  @ApiProperty({ description: "별칭" })
  nickname: string;

  @Column({
    name: "business_number",
    type: "varchar",
    length: 10
  })
  @ApiProperty({ description: "사업자등록번호" })
  businessNumber: string;

  @Column({
    name: "business_hour",
    type: "varchar",
    length: 255
  })
  @ApiProperty({ description: "영업시간" })
  businessHours: string;

  @Column({
    name: "phone_number",
    type: "varchar",
    length: 12
  })
  @ApiProperty({ description: "전화번호" })
  phoneNumber: number;

  @Column({
    // default: ""
  })
  @ApiProperty({ description: "주소" })
  address: string;

  @Column({
    type: "varchar",
    length: 255
  })
  @ApiProperty({ description: "가게소개" })
  description: string;

  @CreateDateColumn({ name: 'created_at'})
  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '수정 시간' })
  updatedAt: Date;
}
