import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/auth.config';

interface User {
    id: string;
    name: string;
    userid: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {}


}