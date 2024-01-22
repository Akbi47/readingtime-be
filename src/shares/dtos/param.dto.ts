import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';

export class IdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

export class IdsDto {
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}
