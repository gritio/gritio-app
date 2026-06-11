import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GoalsModule } from '../goals/goals.module';
import { GoalLogsService } from './goal-logs.service';
import { GoalLogsController } from './goal-logs.controller';

@Module({
  imports: [PrismaModule, GoalsModule],
  providers: [GoalLogsService],
  controllers: [GoalLogsController],
  exports: [GoalLogsService],
})
export class GoalLogsModule {}
