// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import Wheel from "@/models/wheel";
import connectMongoDB from "@/models/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await connectMongoDB();
        const { chat_id, bot_id } = req.query;
        let user = await User.findOne({ chat_id, bot_id });
        const wheels = await Wheel.find();
        const spins = user?.spins || 0;
        return res.status(200).json({ chat_id, spins: spins, wheels });
    }
}
