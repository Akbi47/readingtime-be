import { Expose, plainToClass } from 'class-transformer';

export abstract class BaseDto {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date = null;

  static _plainToClass<T>(this: new () => T, obj: any): T {
    return plainToClass(this, obj, { excludeExtraneousValues: true });
  }
}
