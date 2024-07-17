import { NextApiRequest,NextApiResponse } from "next";
import {connectMongo,closeMongo } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        await connectMongo();
        const { username, password } = req.body;
  
        if (!username || !password) {
          return res.status(400).json({ message: 'Please provide username and password' });
        }
  
        const userExists = await User.findOne({ username });
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
  
        const user = new User({ username, password });
        await user.save();
        return res.status(201).json({ message: 'User created' });
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      } finally {
        await closeMongo();
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } 