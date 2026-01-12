import { IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsString()
  area: string;

  @IsString()
  unit: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  weightGoal?: {
    startWeight: number;
    currentWeight: number;
    targetWeight: number;
  };

  @IsOptional()
  countGoal?: {
    targetCount: number;
  };

  @IsOptional()
  timeGoal?: {
    targetHours: number;
    targetMinutes?: number;
  };

  @IsOptional()
  autoCreateMonthly?: boolean;

  @IsOptional()
  @IsString()
  distributionStrategy?: 'SPREAD_EVENLY' | 'EQUAL_DISTRIBUTION' | 'FRONT_LOAD' | 'PROGRESSIVE';

  @IsOptional()
  @IsNumber()
  startValue?: number;

  @IsOptional()
  @IsNumber()
  finalTarget?: number;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  weightGoal?: {
    startWeight?: number;
    currentWeight?: number;
    targetWeight?: number;
  };

  @IsOptional()
  countGoal?: {
    targetCount?: number;
    currentCount?: number;
  };

  @IsOptional()
  timeGoal?: {
    targetHours?: number;
    targetMinutes?: number;
    currentHours?: number;
    currentMinutes?: number;
  };
}
