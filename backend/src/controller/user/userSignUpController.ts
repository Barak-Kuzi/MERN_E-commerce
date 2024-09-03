import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';

import userModel from '../../models/userModel.js';

async function userSignUpController(req: Request, res: Response) {
    try {
        const {email, password, name} = req.body;

        const userChecking = await userModel.findOne({email});
        if (userChecking) {
            throw new Error("User already exists");
        }

        if (!email) {
            throw new Error("Email is required");
        }
        if (!password) {
            throw new Error("Password is required");
        }
        if (!name) {
            throw new Error("Name is required");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error("Error in hashing password");
        }

        const payload = {
            ...req.body,
            password: hashedPassword,
            role: 'GENERAL'
        }

        const userData = new userModel(payload);
        const user = await userData.save();

        res.status(201).json({
            data: user,
            success: true,
            error: false,
            message: "User created successfully"
        });

    } catch (error: any) {
        res.json({
            message: error.message,
            error: true,
            success: false
        });
    }
}

export default userSignUpController;