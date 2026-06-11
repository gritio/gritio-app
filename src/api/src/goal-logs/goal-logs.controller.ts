import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GoalLogsService } from './goal-logs.service';
import { CreateGoalLogDto, UpdateGoalLogDto } from './dto/goal-log.dto';

@Controller('goal-logs')
export class GoalLogsController {
  constructor(private service: GoalLogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req: any, @Body() dto: CreateGoalLogDto) {
    return this.service.create(req.user.userId, dto);
  }

  @Get('goal/:goalId')
  @UseGuards(JwtAuthGuard)
  async listByGoal(@Request() req: any, @Param('goalId') goalId: string) {
    return this.service.listByGoal(goalId, req.user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateGoalLogDto,
  ) {
    return this.service.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req: any, @Param('id') id: string) {
    return this.service.delete(id, req.user.userId);
  }
}
