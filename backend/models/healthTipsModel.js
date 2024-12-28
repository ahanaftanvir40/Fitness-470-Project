import mongoose, { Schema } from "mongoose";

const healthTipsSchema = new Schema({
    tips: {
        type: [String],
        required: true
    }
})


const healthtipsModel = mongoose.model("healthtips", healthTipsSchema);
export default healthtipsModel;
