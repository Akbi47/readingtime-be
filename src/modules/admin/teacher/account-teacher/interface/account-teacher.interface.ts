import { Document } from 'mongoose';

export interface AccountTeacher extends Document {
  readonly Teacher_Name: string;
  readonly Nick_Name: string;
  readonly Email: string;
  readonly Password: string;
  readonly Gender: boolean;
  readonly Birth: Date;
  readonly Country: string;
  readonly Time_Zone: string;
  readonly Contract_Type: string;
  readonly Contract: string;
  readonly Start_Date: string;
  readonly Resignation_Day: Date;
  readonly Career: string;
  readonly Description_Career: string;
  readonly Certificate: string[];
  readonly Resume: string;
  readonly Image: string;
  readonly Working_Hours: string;
  readonly Team_Name: string;
  readonly Status: string[];
  readonly Level: string[];
  readonly Special_Feature: string[];
  readonly Self_Introduction: string;
  readonly Recommended_Student: string[];
  readonly Recommended_Level: string[];
  readonly Character: string[];
  readonly Lession_Style: string[];
  readonly Video: string;
  readonly Student_Review: string[];
  readonly Comment: string[];
}
