/*eslint-disable*/

// 커스텀 데코레이터 
import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data,ctx:ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})