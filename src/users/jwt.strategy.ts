import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {InjectRepository} from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super({
            secretOrKey: 'SecretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { id } = payload;
        const user: UserEntity = await this.userRepository.findOneBy({ id });

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}