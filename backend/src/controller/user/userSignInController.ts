import bcrypt from "bcryptjs";

import {CustomRequest, CustomResponse} from "../../utils";
import {emailValidation, passwordValidation} from "../../utils/validation.js";
import {createToken} from "../../utils/auth.js";
import userModel from "../../models/userModel.js";

const userSignInController = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const {email, password} = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Email is required"
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password is required"
            });
        }

        if (!emailValidation(email)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid Email"
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User Doesn't Exist"
            });
        }

        if (!passwordValidation(password)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid Password Format"
            });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid Password"
            });
        }

        const authToken = createToken({
            id: user._id,
            email: user.email,
        });

        const tokenOptions = {
            httpOnly: true,
            secure: true
        }

        res.status(200).cookie("token", authToken, tokenOptions).json({
            success: true,
            error: false,
            message: "User signed in successfully",
            data: user,
            token: authToken
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            message: error.message || 'Failed to sign in',
            error: true,
            success: false
        });
    }
}

export default userSignInController;
