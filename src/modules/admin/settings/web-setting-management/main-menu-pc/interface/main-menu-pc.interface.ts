import { Document } from 'mongoose';

export interface MainMenuPC extends Document {
  readonly Id: number;
  readonly MainMenu_PC_Name: string;
}
