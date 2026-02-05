import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      dob: user.dob,
    };
  },
);
