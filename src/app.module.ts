import { CustomerServicePCModule } from './modules/admin/settings/web-setting-management/customer-service-pc/customer-service-pc.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { WebSettingsModule } from './modules/admin/settings/web-setting-management/web-settings/web-settings.module';
import { SMTPSecurityModule } from './modules/admin/settings/smtp-security/smtp-security.module';
import { MailSettingsModule } from './modules/admin/settings/web-setting-management/mail-settings/mail-settings.module';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TermsOfUseModule } from './modules/admin/settings/terms-management/terms-of-use/terms-of-use.module';
import { PrivacyPolicyModule } from './modules/admin/settings/terms-management/privacy-policy/privacy-policy.module';
import { CountryModule } from './modules/country/country.module';
import { PaymentAndRefundPolicyModule } from './modules/admin/settings/terms-management/payment-and-refund-policy/payment-and-refund-policy.module';
import { PromotionTermsAndConditionsModule } from './modules/admin/settings/terms-management/promotion-terms-and-conditions/promotion-terms-and-conditions.module';
import { AdminSettingsModule } from './modules/admin/settings/web-setting-management/admin-settings/admin-settings.module';
import { MainMenuPCModule } from './modules/admin/settings/web-setting-management/main-menu-pc/main-menu-pc.module';
import { MainMenuMobileModule } from './modules/admin/settings/web-setting-management/main-menu-mobile/main-menu-mobile.module';
import { CustomerServiceMobileModule } from './modules/admin/settings/web-setting-management/customer-service-mobile/customer-service-mobile.module';
import { MainPageProductPCModule } from './modules/admin/settings/web-setting-management/main-page-product-pc/main-page-product-pc.module';
import { MainPageProductMobileModule } from './modules/admin/settings/web-setting-management/main-page-product-mobile/main-page-product-mobile.module';
import { SMSSettingsModule } from './modules/admin/settings/web-setting-management/sms-settings/sms-settings.module';
import { HolidayManagementModule } from './modules/admin/settings/web-setting-management/holiday-management/holiday-management.module';
import { MenuPermissionManagementModule } from './modules/admin/settings/web-setting-management/menu-permission-management/menu-permission-management.module';
import { RoleManagementModule } from './modules/admin/role-management/role-management.module';
import { RoleModule } from './modules/admin/role/role.module';
import { BookModule } from './modules/admin/content-management/book/book.module';
import { CurriculumModule } from './modules/admin/content-management/curriculum/curriculum.module';
import { RegularProductModule } from './modules/admin/product-management/regular-product/regular-product.module';
import { FreeTrialProductModule } from './modules/admin/product-management/free-trial-product/free-trial-product.module';
import { PaymentManagementModule } from './modules/admin/payment-management/payment-management.module';
import { CouponModule } from './modules/admin/website-management/coupon/coupon.module';
import { BoardSupportModule } from './modules/admin/website-management/board/support/board-support.module';
import { BannerModule } from './modules/admin/website-management/banner/banner.module';
import { BoardNoticeFAQModule } from './modules/admin/website-management/board/notice-faq/board-notice-faq.module';
import { CategoryModule } from './modules/admin/category/category.module';
import { MonthlyModule } from './modules/admin/assignment-management/dashboard/monthly/monthly.module';
import { TodayModule } from './modules/admin/assignment-management/dashboard/today/today.module';
import { ReportTeacherModule } from './modules/admin/reports/teacher/report-teacher.module';
import { ReportUserModule } from './modules/admin/reports/user/report-user.module';
import { AccountUserModule } from './modules/admin/user-management/account-user/account-user.module';
import { AccountTeacherModule } from './modules/admin/teacher-management/account-teacher/account-teacher.module';
import { ClassFeedbackModule } from './modules/admin/teacher-management/class-feedback/class-feedback.module';
import { PointPenaltyManagementModule } from './modules/admin/teacher-management/point-penalty-management/point-penalty-management.module';
import { VacationResignationManagementModule } from './modules/admin/teacher-management/vacation-resignation-management/vacation-resignation-management.module';
import { WorkingHoursModule } from './modules/admin/teacher-management/working-hours/working-hours.module';
import { RegularClassModule } from './modules/admin/class-management/regular-class/regular-class.module';
import { MailModule } from './modules/mail/mail.module';
import { ReadingRoomModule } from './modules/user/reading-room/reading-room.module';
import { CourseRegistrationModule } from './modules/user/course-registration/course-registration.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SpaceModule } from './modules/space-module/space.module';
import { RegularCourseRegistrationModule } from './modules/user/regular-course-registration/regular-course-registration.module';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGOOSE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    WebSettingsModule,
    SMTPSecurityModule,
    MailSettingsModule,
    AccountUserModule,
    AuthenticationModule,
    TermsOfUseModule,
    PrivacyPolicyModule,
    CountryModule,
    PaymentAndRefundPolicyModule,
    PromotionTermsAndConditionsModule,
    AdminSettingsModule,
    MainMenuPCModule,
    MainMenuMobileModule,
    CustomerServicePCModule,
    CustomerServiceMobileModule,
    MainPageProductPCModule,
    MainPageProductMobileModule,
    SMSSettingsModule,
    HolidayManagementModule,
    MenuPermissionManagementModule,
    RoleManagementModule,
    AccountTeacherModule,
    WorkingHoursModule,
    VacationResignationManagementModule,
    ClassFeedbackModule,
    RegularClassModule,
    ReadingRoomModule,
    PointPenaltyManagementModule,
    RoleModule,
    BookModule,
    CurriculumModule,
    RegularProductModule,
    FreeTrialProductModule,
    PaymentManagementModule,
    CouponModule,
    BannerModule,
    BoardSupportModule,
    BoardNoticeFAQModule,
    CategoryModule,
    MonthlyModule,
    TodayModule,
    ReportTeacherModule,
    ReportUserModule,
    MailModule,
    CourseRegistrationModule,
    SpaceModule,
    RegularCourseRegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
