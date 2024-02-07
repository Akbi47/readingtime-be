import { IsString, IsOptional } from 'class-validator';

export class DashboardMonthlyDto {
  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;
}
