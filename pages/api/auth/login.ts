import { NextApiRequest,NextApiResponse } from "next";
import {connectMongo,closeMongo } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        await connectMongo();
        const { username, password } = req.body;
  
        if (!username || !password) {
          return res.status(400).json({ message: 'Please provide username and password' });
        }
  
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
  
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
          expiresIn: '1h',
        });
        return res.status(200).json({ token});
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      } finally {
        await closeMongo();
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  }