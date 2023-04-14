/*eslint-disable*/ 
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from "src/auth/user.entity"
import { Board } from "src/boards/board.entity"

export const typeORMConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0712',
    database: 'board-app',
    entities: [Board,User],
    synchronize: true 
    // true값을 주면 애플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성.
}
