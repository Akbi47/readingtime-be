export class WorkingHoursDto {
  readonly Teacher_Name: string;
  readonly Teacher_Nickname: string;
  readonly Team: string;
  readonly Team_Leader: string;
  readonly Working_Hours: {
    time: Date;
    Mon: boolean;
    Tue: boolean;
    Wed: boolean;
    Thu: boolean;
    Fri: boolean;
    Sat: boolean;
    Sun: boolean;
  }[];
}
