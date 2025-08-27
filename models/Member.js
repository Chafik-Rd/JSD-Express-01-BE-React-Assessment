import { Schema, model } from "mongoose";


const MemberSchema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  position: { type: String, required: true },
},{timestamps:true});

export const Member = model("Member", MemberSchema);
