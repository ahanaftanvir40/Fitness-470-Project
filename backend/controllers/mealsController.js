import MealModel from "../models/mealModels.js";

export async function getMeals(req, res) {
    try {
        const meals = await MealModel.find();
        if (!meals) {
            res.status(404).json({ message: "No meals found" });
        }
        const SendMeals = meals;
        res.status(200).json({ SendMeals });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}