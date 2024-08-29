import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            throw new Error("Invalid password");
        }
        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "8h" });
        const tokenOptions = {
            httpOnly: true,
            secure: true
        };
        res.cookie("token", token, tokenOptions).json({
            message: "User signed in successfully",
            data: token,
            success: true,
            error: false
        });
    }
    catch (error) {
        res.json({
            message: error.message,
            error: true,
            success: false
        });
    }
}
export default userSignInController;
