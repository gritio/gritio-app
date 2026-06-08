import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateGoalLogDto {
  @IsString()
  goalId: string;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsDateString()
  loggedAt?: string;
}

export class UpdateGoalLogDto {
  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsDateString()
  loggedAt?: string;
}
