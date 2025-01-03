import mongoose, { Schema } from "mongoose";

const mealSchema = new Schema({
    dietPlanType: { type: String, enum: ['weightLoss', 'weightGain'], required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true },
    recipe: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

const MealModel = mongoose.model('Meal', mealSchema);

export default MealModel;