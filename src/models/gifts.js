import mongoose, { Schema } from "mongoose";

const giftSchema = new Schema({
  user_id: String,
  gift: String,
});

const Gift = mongoose.models.Gift || mongoose.model("Gift", giftSchema);

export default Gift;
