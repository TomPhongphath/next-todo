import { NextApiRequest, NextApiResponse } from "next";
import { connectMongo, closeMongo } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectMongo();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = authHeader.split(' ')[1];
        const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

        if (req.method === 'GET') {
            const todos = await Todo.find({ user: userId });
            return res.status(200).json(todos);
        } else if (req.method === 'POST') {
            const { task } = req.body;
            if (!task) {
                return res.status(400).json({ message: 'Task is required' });
            }
            const todo = new Todo({
                user: userId,
                task,
            });
            await todo.save();
            return res.status(201).json(todo);
        } else {
            return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } finally {
        await closeMongo();
    }
}
