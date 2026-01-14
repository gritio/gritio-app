import { Module } from '@nestjs/common';
import { LifeGoalsService } from './life-goals.service';
import { LifeGoalsController } from './life-goals.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LifeGoalsController],
  providers: [LifeGoalsService, PrismaService],
})
export class LifeGoalsModule {}
