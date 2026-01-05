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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto, ToggleDoneDto, TogglePriorityDto, BulkMarkDoneDto } from './dto/todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post()
  async createTodo(@Request() req, @Body() dto: CreateTodoDto) {
    return this.todosService.createTodo(req.user.id, dto);
  }

  @Get()
  async getTodos(@Request() req) {
    return this.todosService.getTodosByUserId(req.user.id);
  }

  @Get(':id')
  async getTodoById(@Request() req, @Param('id') id: string) {
    const todo = await this.todosService.getTodoById(id, req.user.id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  @Put(':id')
  async updateTodo(@Request() req, @Param('id') id: string, @Body() dto: UpdateTodoDto) {
    const todo = await this.todosService.getTodoById(id, req.user.id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return this.todosService.updateTodo(id, req.user.id, dto);
  }

  @Delete(':id')
  async deleteTodo(@Request() req, @Param('id') id: string) {
    const todo = await this.todosService.getTodoById(id, req.user.id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return this.todosService.deleteTodo(id, req.user.id);
  }

  @Put(':id/done')
  async toggleDone(@Request() req, @Param('id') id: string, @Body() dto: ToggleDoneDto) {
    const todo = await this.todosService.getTodoById(id, req.user.id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return this.todosService.toggleDone(id, req.user.id, dto.done);
  }

  @Put(':id/priority')
  async togglePriority(@Request() req, @Param('id') id: string, @Body() dto: TogglePriorityDto) {
    const todo = await this.todosService.getTodoById(id, req.user.id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    return this.todosService.togglePriority(id, req.user.id, dto.priority);
  }

  @Post('bulk/mark-done')
  async bulkMarkDone(@Request() req, @Body() dto: BulkMarkDoneDto) {
    return this.todosService.markMultipleDone(dto.ids, req.user.id);
  }
}
