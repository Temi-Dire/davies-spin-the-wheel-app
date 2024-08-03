// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import connectMongoDB from "@/models/mongo";
import Gift from "@/models/gift";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB();
    const { chat_id, bot_id } = req.query;

    let user = await User.findOne({ chat_id, bot_id });
    if (user && user.spins > 0) {
        let gift = new Gift({ chat_id, gift: req.body.value, type: req.body.type, bot_id });
        await gift.save();
        if (gift) await User.updateOne({ chat_id, bot_id }, { $inc: { spins: -1 } });
    }
    return res.status(200).json({ status: "success" });
}
