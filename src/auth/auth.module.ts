/*eslint-disable */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}), // jwt를 사용하겠단 의미
    JwtModule.register({
      secret:'Secret1234', // 토큰을 만들 때 이용하는 Secret 텍스트(아무거나 입력가능)
      signOptions:{
        expiresIn: 3600 // 정해진 시간 이후에는 토큰이 유효하지 않게 됩니다. (3600 = 60 * 60)은 
                        // 한시간 이후에는 이 토큰이 더 이상 유효하지 않게 됩니다.
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository,JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
