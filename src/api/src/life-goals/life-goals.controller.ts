import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LifeGoalsService } from './life-goals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('life-goals')
export class LifeGoalsController {
  constructor(private lifeGoalsService: LifeGoalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createLifeGoal(
    @Request() req: any,
    @Body() data: { title: string; description?: string },
  ) {
    return this.lifeGoalsService.createLifeGoal(req.user.userId, data);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getLifeGoals(@Request() req: any) {
    return this.lifeGoalsService.getLifeGoals(req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getLifeGoal(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.lifeGoalsService.getLifeGoal(id, req.user.userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateLifeGoal(
    @Param('id') id: string,
    @Request() req: any,
    @Body() data: { title?: string; description?: string },
  ) {
    return this.lifeGoalsService.updateLifeGoal(id, req.user.userId, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteLifeGoal(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.lifeGoalsService.deleteLifeGoal(id, req.user.userId);
  }
}
