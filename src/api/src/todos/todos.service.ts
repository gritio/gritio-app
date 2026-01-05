import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { Todo } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async createTodo(userId: string, dto: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        dueDate: new Date(dto.dueDate),
        priority: dto.priority || false,
        done: false,
      },
    });
  }

  async getTodosByUserId(userId: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: { dueDate: 'asc' },
    });
  }

  async getTodoById(id: string, userId: string): Promise<Todo | null> {
    return this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async updateTodo(id: string, userId: string, dto: UpdateTodoDto): Promise<Todo> {
    return this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        priority: dto.priority,
        done: dto.done,
      },
    });
  }

  async deleteTodo(id: string, userId: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }

  async toggleDone(id: string, userId: string, done: boolean): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: { done },
    });
  }

  async togglePriority(id: string, userId: string, priority: boolean): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data: { priority },
    });
  }

  async markMultipleDone(ids: string[], userId: string): Promise<{ count: number }> {
    return this.prisma.todo.updateMany({
      where: {
        id: { in: ids },
        userId,
      },
      data: { done: true },
    });
  }
}
