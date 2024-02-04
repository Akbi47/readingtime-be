import { IsOptional, IsString } from 'class-validator';

export class CreateTeamManagementDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  tl: string;
}

// Export the class
export default CreateTeamManagementDto;
