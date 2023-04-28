/*eslint-disable */
import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { BoardStatus } from './board.status.enum';
import { User } from 'src/auth/user.entity';
 
@Entity() // Board 클래스가 엔티티라는 것을 알려줌
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // id열이 Board엔터티의 기본키 열임을 나타냄.
    id:number;

    @Column() // Board 엔터티의 title 및 description과 같은 다른 열을 나타냄.
    title:string;

    @Column()
    description:string;

    @Column()
    status: BoardStatus

    @ManyToOne(type => User, user => user.boards, {eager:false} )
    user: User;
}