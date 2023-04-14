/*eslint-disable*/
import {DataSource, EntityRepository, Repository} from 'typeorm';
import { Board } from "./board.entity";
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board.status.enum';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    constructor(@InjectRepository(Board) private dataSource: DataSource){
        super(Board,dataSource.manager)
        //super : 부모 클래스의 생성자를호출
    }
    async createBoard(createBoardDto: CreateBoardDto):Promise<Board>{

        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.save(board)
        return board;
    }
}
