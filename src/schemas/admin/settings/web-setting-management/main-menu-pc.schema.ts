import * as mongoose from 'mongoose';

export const MainMenuPCSchema = new mongoose.Schema({
  Id: Number,
  MainMenu_PC_Name: String,
  Display: Boolean,
});
