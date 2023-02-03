import { UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { CreateUserDto } from './dto/createUser.dto';

export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { userid, name, password, email, phoneNumber, businessRegistrationNumber } = dto;

    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException(
          '해당 이메일로는 가입할 수 없습니다.',
      );
    }
    const signupVerifyToken = uuid.v1();
    await this.saveUser(userid, password, name, email, phoneNumber, businessRegistrationNumber, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);
  }


  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOneBy({ email });
    return user !== null;
  }

  private async saveUser(
      userid: string,
      password: string,
      name: string,
      email: string,
      phoneNumber: number,
      businessRegistrationNumber: number,
      signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = ulid();
    user.userid = userid;
    user.password = password;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.businessRegistrationNumber = businessRegistrationNumber;
    user.signupVerifyToken = signupVerifyToken;
    await this.usersRepository.save(user);
  }

  // private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
  //   await this.emailService.sendMemberJoinVerification(
  //       email,
  //       signupVerifyToken,
  //   );
  // }
}
