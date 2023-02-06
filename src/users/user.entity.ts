import { BaseEntity, Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['userid', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userid: string;

  @Column()
  name: string;

  @Column()
  birth: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: number;

  @Column()
  businessRegistrationNumber: number;
}
