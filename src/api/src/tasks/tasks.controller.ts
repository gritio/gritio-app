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
  async getTasksByGoal(@Param('goalId') goalId: string) {
    return this.tasksService.getTasksByGoal(goalId);
  }

  @Get(':id/history')
  @UseGuards(JwtAuthGuard)
  async getTaskHistory(
    @Param('id') id: string,
    @Query('days') days?: string,
  ) {
    return this.tasksService.getCompletionHistory(id, days ? parseInt(days) : 30);
  }

  @Get(':id/completions')
  @UseGuards(JwtAuthGuard)
  async getMonthCompletions(
    @Param('id') id: string,
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    console.log('getMonthCompletions called with:', { id, year, month });
    return this.tasksService.getMonthCompletions(id, parseInt(year), parseInt(month));
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
  async getTask(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Request() req: any) {
    return this.tasksService.deleteTask(id, req.user.userId);
  }
}
