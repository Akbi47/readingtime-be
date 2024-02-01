import { IsOptional, IsString } from 'class-validator';

export class CouponDto {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  target: string;

  @IsString()
  @IsOptional()
  cycle: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsString()
  @IsOptional()
  discount_rate: string;

  @IsString()
  @IsOptional()
  nick_name: string;

  @IsString()
  @IsOptional()
  exp_period: string;

  @IsString()
  @IsOptional()
  issue_date: string;

  @IsString()
  @IsOptional()
  mode: string;

  @IsString()
  @IsOptional()
  start_date: string;
}
