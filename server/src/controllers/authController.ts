import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const generateToken = (id: string, secret: string, expiresIn: string) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

export const register = async (
  req: Request,
  res: Response
) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400).json({
      message: "Name, email, username, and password are required",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid credentials" });
      return
    }

    const { JWT_SECRET } = process.env as { JWT_SECRET: string };
    
    const accessToken = generateToken(user._id as string, JWT_SECRET, '1m');
    const refreshToken = generateToken(user._id as string, JWT_SECRET, '7d');

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ name: user.name, email: user.email, username: user.username, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({ message: "Refresh token is required" });
    return;
  }

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET as string, (err: any) => {
      if (err) {
        res.status(403).json({ message: "Invalid refresh token" });
        return;
      }
      const accessToken = generateToken(user._id as string, process.env.JWT_SECRET as string, '60m');
      res.status(200).json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: 'Could not refresh access token' });
  }
};
