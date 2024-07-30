import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  _id: String,
  spins: Number
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
