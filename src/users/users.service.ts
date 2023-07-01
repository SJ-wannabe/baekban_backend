import {UnauthorizedException, UnprocessableEntityException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './user.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import {LoginDto} from './dto/login.dto';
import {JwtService} from "@nestjs/jwt";


export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { userid, password, name, birth, email, phoneNumber } = dto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);


    const user = await this.usersRepository.findOneBy({ email });
    if (user !== null) {
      throw new UnprocessableEntityException(
          '해당 이메일로는 가입할 수 없습니다.',
      );
    }

    // const signupVerifyToken = uuid.v1();
    await this.saveUser(userid, hashedPassword, name, birth, email, phoneNumber);
  }

  async login(dto: LoginDto): Promise<string> {
    const { id, password } = dto;
    const user = await this.usersRepository.findOneBy({ id });

    if (user && await bcrypt.compare(password, user.password)) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { id };

      return this.jwtService.sign(payload);
    } else {
      throw new UnauthorizedException('로그인 실패');
    }

  }


  private async saveUser(
      userid: string,
      password: string,
      name: string,
      birth: Date,
      email: string,
      phoneNumber: string,
  ) {
    const user = new UserEntity();
    user.id = userid;
    user.password = password;
    user.name = name;
    user.birth = birth;
    user.email = email;
    user.phoneNumber = phoneNumber;
    await this.usersRepository.save(user);
  }
}
