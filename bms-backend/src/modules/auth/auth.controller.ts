import { Request, Response, NextFunction } from "express";
import * as OtpService from "./otp.service";
import * as UserService from "../user/user.service";
import * as TokenService from "./token.service";
import createHttpError from "http-errors";
import { isValidEmail } from "../../utils";

export const sendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    if (!email) {
      const err = new createHttpError.BadRequest("Email is required");
      return next(err);
    }

    if (!isValidEmail(email)) {
      const err = new createHttpError.BadRequest("Invalid email format");
      return next(err);
    }

    // Create OTP
    const otp = OtpService.generateOTP();

    // Hash OTP
    const ttl = 1000 * 60 * 2; //2 mins
    const expires = Date.now() + ttl;
    const data = `${email}.${otp}.${expires}`;
    const hashedOTP = OtpService.hashOTP(data);

    // Send OTP to user email
    try {
      await OtpService.sendOTPtoEmail(email, otp);
    } catch (error) {
      const err = new createHttpError.InternalServerError(
        "Error sending OTP to email",
      );
      next(err);
    }

    // Respond to the client
    res.json({
      hash: `${hashedOTP}.${expires}`,
      email,
      msg: "OTP sent to email successfully ✅",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, otp, hash } = req.body;

  if (!email || !otp || !hash) {
    const err = new createHttpError.BadRequest("All fields are required");
    return next(err);
  }

  //   OTP Verification
  const [hashedOTP, expires] = hash.split(".");
  if (Date.now() > +expires) {
    const err = new createHttpError.Gone("OTP Expired");
    return next(err);
  }

  const data = `${email}.${otp}.${expires}`;
  const isValid = OtpService.verifyOTP(hashedOTP, data);

  if (!isValid) {
    const err = new createHttpError.Unauthorized("Invalid OTP");
    return next(err);
  }
  //   Find or create a new user
  let user;
  try {
    user = await UserService.getUserByEmail(email);
    if (!user) {
      user = await UserService.createUser(email);
    }
  } catch (error) {
    return next(error);
  }

  //   Generate Tokens
  const { accessToken, refreshToken } = TokenService.generateToken({
    _id: user._id,
    email: user.email,
  });

  //   Store refresh token in db
  await TokenService.storeRefreshToken(user._id as string, refreshToken);

  //    Sending token in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60, //1hr
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60, //1hr
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ auth: true, user });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.cookies;
    await TokenService.deleteRefreshToken(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ msg: "Logged out successfullly" }).status(200);
  } catch (error) {
    next(error);
  }
};
