import * as mongoose from 'mongoose';

export const MainMenuMobileSchema = new mongoose.Schema({
  Id: Number,
  MainMenu_Mobile_Name: String,
  Display: Boolean,
});
