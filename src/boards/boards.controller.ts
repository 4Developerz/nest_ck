/* eslint-disable */
import {Body,Controller,Delete,Get,Param,ParseIntPipe,Patch,Post,UsePipes,ValidationPipe,UseGuards} from '@nestjs/common';
import {BoardStatus} from './board.status.enum';
import {BoardsService} from './boards.service';
import {CreateBoardDto} from './dto/create-board.dto';
import {BoardStatusValidationPipe} from './pipes/board-status-validation.pipe';
import {Board} from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}


    // 게시글 전체 조회
    @Get()
    getAllBoard(): Promise < Board[] > {
        return this.boardsService.getAllBoards();
    }

    // 게시글 생성
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user:User): Promise < Board > {
        return this.boardsService.createBoard(createBoardDto,user);
    }

    // 게시글 조회
    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise < Board > {
        return this.boardsService.getBoardById(id);
    }

    // 게시글 삭제
    @Delete('/:id') //ParseIntPipe = 숫자로 잘 들어오는지 체크
    deleteBoard(@Param('id', ParseIntPipe) id): Promise < void > {
        return this.boardsService.deleteBoard(id);
    }

    // 게시글 수정
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
}