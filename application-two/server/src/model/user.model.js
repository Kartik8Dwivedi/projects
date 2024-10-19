import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  thresholds: {
    temperature: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    weatherCondition: { type: String, default: null },
  },
  alerts: [
    {
      type: { type: String }, // 'Temperature', 'WeatherCondition'
      triggeredAt: { type: Date },
      notificationSent: { type: Boolean, default: false },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
