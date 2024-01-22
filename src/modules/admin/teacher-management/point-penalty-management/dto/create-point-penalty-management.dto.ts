import { IsOptional, IsString } from 'class-validator';

export class CreatePointPenaltyManagementDto {
  @IsString()
  teacher: string;

  @IsString()
  division: string;

  @IsString()
  items: string;

  @IsOptional()
  texts?: string;
}
