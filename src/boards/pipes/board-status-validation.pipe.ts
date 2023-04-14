/* eslint-disable */
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import { BoardStatus } from "../board.status.enum";

export class BoardStatusValidationPipe implements PipeTransform{

    // readonly : 접두사, 클래스 외부에서 접근은 가능, 변경은 불가능하기에 읽기전용으로 타입설정
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any) {
        value = value.toUpperCase(); // 상태옵션이 다 대분자라서 어떤 문자가 들어와도 대문자로 바꿔 상태를 비교

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`)
        }
        
        return value;
    }

    private isStatusValid(status: any){
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}