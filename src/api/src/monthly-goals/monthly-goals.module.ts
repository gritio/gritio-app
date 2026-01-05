import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MonthlyGoalsService } from './monthly-goals.service';
import { MonthlyGoalsController } from './monthly-goals.controller';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [PrismaModule, GoalsModule],
  providers: [MonthlyGoalsService],
  controllers: [MonthlyGoalsController],
  exports: [MonthlyGoalsService],
})
export class MonthlyGoalsModule {}
