/* eslint-disable */
import {Injectable,NotFoundException} from '@nestjs/common';
import {BoardStatus} from './board.status.enum';
import {CreateBoardDto} from './dto/create-board.dto';
import {BoardRepository} from './board.repository';
import {Board} from './board.entity';

@Injectable()
export class BoardsService {
    constructor(
        private boardRepository: BoardRepository,
    ) {}

    // 게시글 전체 조회
    async getAllBoards(): Promise < Board[] > {
        return this.boardRepository.find();
    }

    // 게시글 생성
    createBoard(createBoardDto: CreateBoardDto): Promise < Board > {
        return this.boardRepository.createBoard(createBoardDto);
    }

    //게시글 조회(id)
    async getBoardById(id: number): Promise < Board > {
        const found = await this.boardRepository.findOneById(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // 게시글 삭제
    async deleteBoard(id: number): Promise < void > {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find of id ${id}`);
        }
    }

    // 게시글 수정
    async updateBoardStatus(id: number, status: BoardStatus): Promise < Board > {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}