import { Document } from 'mongoose';

export interface MainMenuMobile extends Document {
  readonly Id: number;
  readonly MainMenu_Mobile_Name: string;
}
