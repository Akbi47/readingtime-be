import { IsMongoId } from 'class-validator';

export class UpdateTeacherRoomDto {
  @IsMongoId()
  teacher_id: string;
}
