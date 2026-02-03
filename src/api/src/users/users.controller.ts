import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/coins')
  async getMyCoins(@CurrentUser() user: any) {
    return this.usersService.getUserCoins(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/coins/add')
  async addCoins(
    @Param('userId') userId: string,
    @Body('amount') amount: number,
    @CurrentUser() user: any,
  ) {
    if (user.userId !== userId) {
      throw new Error('Unauthorized');
    }
    return this.usersService.addCoins(userId, amount);
  }
}
