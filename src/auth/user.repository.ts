/*eslint-disable */
import {
    DataSource,
    EntityRepository,
    Repository
} from "typeorm";
import {
    User
} from "./user.entity";
import {
    InjectRepository
} from "@nestjs/typeorm";
import {
    AuthCredentialsDto
} from "./dto/auth-credentials.dto";
import {
    ConflictException,
    InternalServerErrorException
} from '@nestjs/common'
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository < User > {
    constructor(@InjectRepository(User) private dataSource: DataSource) {
        super(User, dataSource.manager)
        //super : 부모 클래스의 생성자를호출
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise < void > {
        const {
            username,
            password
        } = authCredentialsDto;

        // 비밀번호 암호화
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            username,
            password: hashedPassword
        });

        try {
            await this.save(user);
        } catch (e) {
            if (e.errno === 1062) {
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}