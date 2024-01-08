import * as mongoose from 'mongoose';

export const PrivacyPolicySchema = new mongoose.Schema({
  Id: Number,
  Title: String,
  Text_Field: String,
  Country: String,
});
