/*eslint-disable*/
import {Injectable} from '@nestjs/common'
import {InjectRepository} from "@nestjs/typeorm";
import {ExtractJwt,Strategy} from "passport-jwt";
import {UserRepository} from "./user.repository";
import { User } from "./user.entity";
import { PassportStrategy } from "@nestjs/passport";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload):Promise<any>{
        const {username} = payload;
        const user: User = await this.userRepository.findOneBy({username});

        if(!user){
            throw new UnauthorizedException();
        }
        
        return user;
    }
}