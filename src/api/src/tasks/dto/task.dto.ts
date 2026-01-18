import { IsString, IsNumber, IsOptional, IsDateString, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  goalId: string;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsString()
  frequency: string;

  @IsNumber()
  target: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsNumber()
  timesPerWeek?: number;

  @IsOptional()
  @IsArray()
  months?: number[]; // Array of month indices (0-11)
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  target?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  timesPerWeek?: number;
}

export class LogCompletionDto {
  @IsDateString()
  date: string;

  @IsNumber()
  value: number;
}
