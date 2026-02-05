import { Controller, Get, Post, Put, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.getUserProfile(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me')
  async updateProfile(@CurrentUser() user: any, @Body() data: any) {
    return this.usersService.updateUserProfile(user.userId, data);
  }

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
