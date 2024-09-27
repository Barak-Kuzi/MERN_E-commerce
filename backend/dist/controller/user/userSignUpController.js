import bcrypt from 'bcryptjs';
import { emailValidation, passwordValidation } from "../../utils/validation.js";
import { createToken } from "../../utils/auth.js";
import userModel from '../../models/userModel.js';
const userSignUpController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email is required"
            });
        }
        if (!emailValidation(email)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid email"
            });
        }
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User already exists"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password is required"
            });
        }
        if (!passwordValidation(password)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid password format"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            email,
            password: hashedPassword,
            name,
            role: 'GENERAL'
        });
        const user = await newUser.save();
        const authToken = createToken({
            id: user._id,
            email: user.email,
        });
        res.status(201).json({
            success: true,
            error: false,
            message: "User created successfully",
            data: user,
            token: authToken
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Failed to create user'
        });
    }
};
export default userSignUpController;
