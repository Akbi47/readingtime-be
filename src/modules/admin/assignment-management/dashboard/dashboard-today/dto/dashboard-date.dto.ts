import { IsString, IsOptional } from 'class-validator';

export class DashboardDateDto {
  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  day: string;
}
