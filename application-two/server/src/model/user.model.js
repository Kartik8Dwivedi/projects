import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferredCityId: { type: Number, required: true },
  thresholds: {
    temperature: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    weatherCondition: { type: String, default: null },
  },
  lastAlert: {
    temperature: {
      min: { type: Date, default: null },
      max: { type: Date, default: null },
    },
    weatherCondition: { type: Date, default: null },
  },
  alerts: [
    {
      type: { type: String },
      triggeredAt: { type: Date },
      notificationSent: { type: Boolean },
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
