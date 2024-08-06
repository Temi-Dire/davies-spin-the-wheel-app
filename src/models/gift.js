import mongoose, { Schema } from "mongoose";

const giftSchema = new Schema({
  chat_id: String,
  gift: String,
  type: String,
  bot_id: String,
});

const Gift = mongoose.models.Gift || mongoose.model("Gift", giftSchema);

export default Gift;
