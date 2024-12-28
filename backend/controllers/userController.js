import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function SignUp(req, res) {
    const { firstName, lastName, username, email, password, gender, age, dietPlan } = req.body;
    console.log("REQ BODY", req.body);

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            firstName,
            lastName,
            gender,
            age,
            dietPlan,
            username,
            email,
            password: hashedPassword,
        });

        // Save user to database
        const savedUser = await newUser.save();




        // Send response
        res.status(201).json({
            message: "User registered successfully",
            user: savedUser,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export async function SignIn(req, res) {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        // Send response
        res.status(200).json({
            message: "User signed in successfully",
            user: user,
            token,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export async function GetUserProfile(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export async function updateUser(req, res) {
    const { height, weight, dietPlan, bmi, bmr } = req.body;
    try {
        const user = await userModel.findById(req.user.id);
        user.height = height;
        user.weight = weight;
        user.dietPlan = dietPlan;
        user.bmi = bmi;
        user.bmr = bmr;
        const savedUser = await user.save();
        res.status(200).json({ message: "User updated", user: savedUser })

    } catch (error) {
        res.status(500).json({ message: "Server error", error, code: 400 });
    }
}