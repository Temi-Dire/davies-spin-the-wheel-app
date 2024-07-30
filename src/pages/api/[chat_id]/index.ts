// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import Wheel from "@/models/wheel";
import connectMongoDB from "@/models/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        await connectMongoDB();
        const { chat_id } = req.query;
        let user = await User.findOne({ _id: chat_id });

        if (!user) {
            return res.status(200).json({ _id: chat_id, spins: 0, wheels: await Wheel.find() });
        }
        return res.status(200).json({ _id: chat_id, spins: user.spins, wheels: await Wheel.find() });
    }
}
