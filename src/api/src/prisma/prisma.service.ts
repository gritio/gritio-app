import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

let prismaInstance: PrismaClient;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prisma: PrismaClient;

  constructor() {
    if (!prismaInstance) {
      const databaseUrl = process.env.DATABASE_URL;
      
      if (!databaseUrl) {
        throw new Error('DATABASE_URL environment variable is not set');
      }

      console.log('Connecting to database:', databaseUrl.split('@')[1] || 'Unknown');
      
      const pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaPg(pool);
      
      prismaInstance = new PrismaClient({
        adapter,
        log: ['error', 'warn'],
      });
    }
    this.prisma = prismaInstance;
  }

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  get user() {
    return this.prisma.user;
  }

  get lifeGoal() {
    return this.prisma.lifeGoal;
  }

  get goal() {
    return this.prisma.goal;
  }

  get weightGoal() {
    return this.prisma.weightGoal;
  }

  get countGoal() {
    return this.prisma.countGoal;
  }

  get timeGoal() {
    return this.prisma.timeGoal;
  }

  get percentageGoal() {
    return this.prisma.percentageGoal;
  }

  get task() {
    return this.prisma.task;
  }

  get taskCompletion() {
    return this.prisma.taskCompletion;
  }

  get taskMonthAggregation() {
    return this.prisma.taskMonthAggregation;
  }

  get todo() {
    return this.prisma.todo;
  }

  get goalLog() {
    return this.prisma.goalLog;
  }

  async executeRawUnsafe(query: string, ...values: any[]) {
    return this.prisma.$executeRawUnsafe(query, ...values);
  }
}
