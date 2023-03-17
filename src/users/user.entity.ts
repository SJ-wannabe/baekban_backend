import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
@Unique(['userid', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty({ description: 'id' })
  id: string;

  @Column()
  @ApiProperty({ description: '로그인 ID' })
  userid: string;

  @Column()
  @ApiProperty({ description: '이름' })
  name: string;

  @Column()
  @ApiProperty({ description: '생년월일' })
  birth: Date;

  @Column()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column()
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column()
  @ApiProperty({ description: '휴대폰번호' })
  phoneNumber: string;

  @CreateDateColumn({ name: 'created_at'})
  @ApiProperty({ description: '생성 시간' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: '생성 시간' })
  updatedAt: Date;
}
