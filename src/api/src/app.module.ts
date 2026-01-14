import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { MonthlyGoalsModule } from './monthly-goals/monthly-goals.module';
import { TasksModule } from './tasks/tasks.module';
import { TodosModule } from './todos/todos.module';
import { LifeGoalsModule } from './life-goals/life-goals.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    GoalsModule,
    MonthlyGoalsModule,
    TasksModule,
    TodosModule,
    LifeGoalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
