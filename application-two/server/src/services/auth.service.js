import User from "../model/user.model.js";
import CustomError from "../helpers/CustomError.js";
import jwt from "jsonwebtoken";

export async function registerService(email, password, name, preferredCityId) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError("User already exists", 411);
    }
    const newUser = new User({ email, password, name, preferredCityId });
    await newUser.save();
    newUser.password = undefined;
    return newUser;
  } catch (error) {
    console.log("Error in registering user in service layer", error);
    throw error;
  }
}

export async function loginService(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError("Invalid Credentials", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new CustomError("Invalid Credentials", 401);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  } catch (error) {
    console.log("Error in login user in service layer", error);
    throw error;
  }
}
