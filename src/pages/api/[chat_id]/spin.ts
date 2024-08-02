// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/user";
import connectMongoDB from "@/models/mongo";
import Gift from "@/models/gift";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connectMongoDB();
    const { chat_id } = req.query;

    let user = await User.findOne({ _id: chat_id });
    if (user && user.spins > 0) {
        let gift = new Gift({ chat_id: chat_id, gift: req.body.value, type: req.body.type });
        await gift.save();
        if (gift) await User.updateOne({ _id: chat_id }, { $inc: { spins: -1 } });
    }
    return res.status(200).json({ status: "success" });
}
