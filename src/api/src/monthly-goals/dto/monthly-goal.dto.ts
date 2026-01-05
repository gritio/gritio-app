import { IsString, IsNumber, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMonthlyGoalDto {
  @IsString()
  goalId: string;

  @IsString()
  title: string;

  @IsString()
  month: string;

  @IsDateString()
  monthDate: string;

  @Transform(({ value }) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'target must be a valid number' })
  @IsNotEmpty()
  target: number;

  @IsString()
  unit: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}

export class UpdateMonthlyGoalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  target?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  currentProgress?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}
