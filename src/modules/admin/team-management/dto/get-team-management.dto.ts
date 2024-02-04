// Import the necessary modules
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class GetTeamManagementDto {
  @IsString()
  name: string;

  @IsMongoId()
  @IsOptional()
  user_id: string;
}

export default GetTeamManagementDto;
