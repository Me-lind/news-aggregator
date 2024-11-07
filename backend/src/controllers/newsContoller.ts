import { Request, Response } from 'express';
import { fetchNewsByTopic } from '../services/newsService';

export const getNewsByTopic = async (req: Request, res: Response) => {
    const { topic } = req.params;
    try {
        const newsData = await fetchNewsByTopic(topic);
        res.status(200).json(newsData);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
}