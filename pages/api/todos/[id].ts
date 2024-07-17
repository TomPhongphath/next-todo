import { connectMongo, closeMongo } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            await connectMongo();
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token is missing' });
            }

            const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            const { task, completed } = req.body;
            const todo = await Todo.findOneAndUpdate(
                { _id: id, user: userId },
                { task, completed },
                { new: true }
            );

            if (!todo) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            return res.status(200).json(todo);
        } catch (error) {
            console.error('PUT Error:', (error as Error).message);
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        } finally {
            await closeMongo();
        }
    } else if (req.method === 'DELETE') {
        try {
            await connectMongo();
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Authorization token is missing' });
            }

            const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

            const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

            if (!deletedTodo) {
                return res.status(404).json({ message: 'Todo not found' });
            }
            return res.status(204).end();
        } catch (error) {
            console.error('DELETE Error:', (error as Error).message);
            if (error instanceof jwt.JsonWebTokenError) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            return res.status(500).json({ message: 'Internal server error' });
        } finally {
            await closeMongo();
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
