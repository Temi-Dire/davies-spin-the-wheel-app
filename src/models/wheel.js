import mongoose, { Schema } from "mongoose";

const wheelSchema = new Schema({
  user_id: String,
  wheel: String,
});

const Wheel = mongoose.models.Wheel || mongoose.model("Wheel", wheelSchema);

export default Wheel;
