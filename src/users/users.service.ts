import { NotFoundException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { ulid } from 'ulid';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import {JwtService} from "@nestjs/jwt";


export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { userid, password, name, birth, email, phoneNumber, businessRegistrationNumber } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await this.usersRepository.findOneBy({ email });
    if (user !== null) {
      throw new UnprocessableEntityException(
          '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    // const signupVerifyToken = uuid.v1();
    await this.saveUser(userid, hashedPassword, name, birth, email, phoneNumber, businessRegistrationNumber);
  }

  async login(dto: LoginDto): Promise<{accessToken: string}> {
    const { userid, password } = dto;
    const user = await this.usersRepository.findOneBy({ userid });

    if (user && await bcrypt.compare(password, user.password)) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { userid };
      const accessToken = await this.jwtService.sign(payload);

      return {accessToken};
    } else {
      throw new UnauthorizedException('로그인 실패');
    }

  }


  private async saveUser(
      userid: string,
      password: string,
      name: string,
      birth: string,
      email: string,
      phoneNumber: number,
      businessRegistrationNumber: number,
  ) {
    const user = new UserEntity();
    user.id = ulid();
    user.userid = userid;
    user.password = password;
    user.name = name;
    user.birth = birth;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.businessRegistrationNumber = businessRegistrationNumber;
    await this.usersRepository.save(user);
  }
}
