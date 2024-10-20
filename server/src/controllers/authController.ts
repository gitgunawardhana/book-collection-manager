import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const generateToken = (id: string, secret: string, expiresIn: string) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Name, email, username, and password are required",
      data: null,
    });
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Password must contain at least 8 characters, including at least one letter, one number, and one special character.",
      data: null,
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({
      success: true,
      status: 201,
      message: "User registered successfully",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      res.status(409).json({
        success: false,
        status: 409,
        message: `Duplicate field ${duplicateField}`,
        data: null,
      });
      return;
    }

    res.status(500).json({
      success: false,
      status: 500,
      message: `${error.message || "An error occurred"}`,
      data: null,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Username and password are required",
      data: null,
    });
    return;
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid credentials",
        data: null,
      });
      return;
    }

    const { JWT_SECRET } = process.env as { JWT_SECRET: string };

    if (!JWT_SECRET) {
      res.status(500).json({
        success: false,
        status: 500,
        message: "Missing JWT secret",
        data: null,
      });
      return;
    }

    const accessToken = generateToken(user._id as string, JWT_SECRET, "15m");
    const refreshToken = generateToken(user._id as string, JWT_SECRET, "7d");

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: `${error.message || "An error occurred"}`,
      data: null,
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      status: 401,
      message: "Refresh token is required",
      data: null,
    });
    return;
  }

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.status(403).json({
        success: false,
        status: 403,
        message: "Invalid refresh token",
        data: null,
      });
      return;
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET as string, (err: any) => {
      if (err) {
        res.status(403).json({
          success: false,
          status: 403,
          message: "Invalid refresh token",
          data: null,
        });
        return;
      }
      const accessToken = generateToken(
        user._id as string,
        process.env.JWT_SECRET as string,
        "15m"
      );
      res.status(200).json({
        success: true,
        status: 200,
        message: "Access token refreshed successfully",
        data: {
          accessToken,
        },
      });
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "Could not refresh access token",
      data: null,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
     res.status(400).json({
      success: false,
      status: 400,
      message: "Refresh token is required",
      data: null,
    });
    return
  }

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
       res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
        data: null,
      });
      return
    }

    user.refreshToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Logout successful",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message || "An error occurred during logout",
      data: null,
    });
  }
};
