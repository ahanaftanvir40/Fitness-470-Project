import healthtipsModel from "../models/healthTipsModel.js";
export async function getTips(req, res) {

    try {
        const tips = await healthtipsModel.find();
        const SendTips = tips[0].tips;
        res.status(200).json({ SendTips });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}