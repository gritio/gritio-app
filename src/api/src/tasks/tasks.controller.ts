import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, LogCompletionDto } from './dto/task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTasks(@Request() req: any) {
    return this.tasksService.getAllTasksByUser(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(@Request() req: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto, req.user.userId);
  }

  @Get('goal/:goalId')
  @UseGuards(JwtAuthGuard)
  async getTasksByGoal(@Param('goalId') goalId: string, @Request() req: any) {
    return this.tasksService.getTasksByGoal(goalId, req.user.userId);
  }

  @Get(':id/history')
  @UseGuards(JwtAuthGuard)
  async getTaskHistory(
    @Param('id') id: string,
    @Request() req: any,
    @Query('days') days?: string,
  ) {
    return this.tasksService.getCompletionHistory(
      id,
      req.user.userId,
      days ? parseInt(days) : 30,
    );
  }

  @Get(':id/completions')
  @UseGuards(JwtAuthGuard)
  async getMonthCompletions(
    @Param('id') id: string,
    @Request() req: any,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.tasksService.getMonthCompletions(
      id,
      parseInt(year),
      parseInt(month),
      req.user.userId,
    );
  }

  @Post(':id/log-completion')
  @UseGuards(JwtAuthGuard)
  async logCompletion(
    @Param('id') id: string,
    @Request() req: any,
    @Body() dto: LogCompletionDto,
  ) {
    return this.tasksService.logTaskCompletion(
      id,
      new Date(dto.date),
      dto.value,
      req.user.userId,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(@Param('id') id: string, @Request() req: any, @Body() dto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, dto, req.user.userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTask(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.getTaskById(id, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.deleteTask(id, req.user.userId);
  }
}
