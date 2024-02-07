import { Module } from '@nestjs/common';
import { CourseRegistrationService } from './course-registration.service';
import { CourseRegistrationController } from './course-registration.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CourseRegistration,
  CourseRegistrationSchema,
} from './schemas/course-registration.schema';
import { MailModule } from 'src/modules/mail/mail.module';
import { AccountUserModule } from 'src/modules/admin/user-management/account-user/account-user.module';
import { ReadingRoomModule } from '../reading-room/reading-room.module';
import { AuthenticationModule } from 'src/modules/authentication/authentication.module';
import { DateUtil } from 'src/shares/utils/date.util';
import { FreeTrialProductModule } from 'src/modules/admin/product-management/free-trial-product/free-trial-product.module';
import {
  RegularCourseRegistration,
  RegularCourseRegistrationSchema,
} from '../regular-course-registration/schemas/regular-course-registration.schema';
import { RegularProductModule } from 'src/modules/admin/product-management/regular-product/regular-product.module';
import {
  TrialProduct,
  TrialProductSchema,
} from 'src/modules/admin/product-management/free-trial-product/schemas/trial-product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseRegistration.name, schema: CourseRegistrationSchema },
      {
        name: RegularCourseRegistration.name,
        schema: RegularCourseRegistrationSchema,
      },
      {
        name: TrialProduct.name,
        schema: TrialProductSchema,
      },
    ]),
    MailModule,
    AccountUserModule,
    ReadingRoomModule,
    AuthenticationModule,
    FreeTrialProductModule,
    RegularProductModule,
  ],
  providers: [CourseRegistrationService, DateUtil],
  exports: [CourseRegistrationService],
  controllers: [CourseRegistrationController],
})
export class CourseRegistrationModule {}
