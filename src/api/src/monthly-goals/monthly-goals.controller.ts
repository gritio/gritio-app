import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MonthlyGoalsService } from './monthly-goals.service';
import { CreateMonthlyGoalDto, UpdateMonthlyGoalDto } from './dto/monthly-goal.dto';

@Controller('monthly-goals')
export class MonthlyGoalsController {
  constructor(private monthlyGoalsService: MonthlyGoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createMonthlyGoal(@Request() req: any, @Body() dto: CreateMonthlyGoalDto) {
    return this.monthlyGoalsService.createMonthlyGoal(dto, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMonthlyGoalsByUser(@Request() req: any) {
    return this.monthlyGoalsService.getMonthlyGoalsByUser(req.user.userId);
  }

  @Get('goal/:goalId')
  @UseGuards(JwtAuthGuard)
  async getMonthlyGoalsByGoal(@Param('goalId') goalId: string) {
    return this.monthlyGoalsService.getMonthlyGoalsByGoal(goalId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMonthlyGoal(@Param('id') id: string) {
    return this.monthlyGoalsService.getMonthlyGoalById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateMonthlyGoal(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: UpdateMonthlyGoalDto,
  ) {
    return this.monthlyGoalsService.updateMonthlyGoal(id, dto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMonthlyGoal(@Param('id') id: string, @Request() req: any) {
    return this.monthlyGoalsService.deleteMonthlyGoal(id, req.user.userId);
  }
}
