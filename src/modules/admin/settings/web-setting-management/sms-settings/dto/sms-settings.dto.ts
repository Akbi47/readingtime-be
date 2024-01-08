export class SMSSettingsDto {
  readonly Id: number;
  readonly SMS_API_KEY: string;
  readonly SMS_SECRET: string;
  readonly SMS_Sender_Number: string;
  readonly KakaoTalk_Sender_Id: string;
  readonly Send_Failure_SMS: boolean;
}
