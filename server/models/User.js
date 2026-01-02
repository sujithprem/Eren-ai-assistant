import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);
