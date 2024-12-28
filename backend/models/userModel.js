import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, default: 0 },
    bmi: { type: Number, default: 0 },
    bmr: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    dietPlan: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

export default User;