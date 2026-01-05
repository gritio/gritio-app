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
import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createGoal(@Request() req: any, @Body() dto: CreateGoalDto) {
    return this.goalsService.createGoal(req.user.userId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getGoals(@Request() req: any) {
    console.log('getGoals - Full req.user:', JSON.stringify(req.user));
    console.log('getGoals - userId:', req.user.userId);
    return this.goalsService.getGoalsByUser(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getGoal(@Param('id') id: string) {
    return this.goalsService.getGoalById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateGoal(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: UpdateGoalDto,
  ) {
    return this.goalsService.updateGoal(id, req.user.userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteGoal(@Param('id') id: string, @Request() req: any) {
    return this.goalsService.deleteGoal(id, req.user.userId);
  }
}
