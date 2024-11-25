import {Request, Response} from 'express';
import crypto from 'crypto';
import bcrypt from "bcryptjs";

import userModel from "../../models/userModel.js";
import {sendEmail} from "../../utils/sendEmail.js";

export const forgotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'});
        }

        // Generate reset token and Save token and expiration time in the user document
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        const resetUrl = `${req.protocol}://localhost:3000/reset-password/${resetToken}`;
        const message = `Hi ${user.name},\nWe received a request to reset the password for your account on Tech-Market.\nYou can reset your password by clicking the link below:\n${resetUrl}\n\nThis link is valid for the next 10 minutes. If you didn't request this password reset, please ignore this\nemail or contact our support team if you have any concerns.\nThanks,\nTech-Market Team`;

        await sendEmail({
            email: user.email,
            subject: 'Reset Your Password',
            message,
        });

        res.status(200).json({success: true, message: 'Email sent'});
    } catch (error) {
        console.error('Error in forgotPassword:', error);
        res.status(500).json({success: false, message: 'Email could not be sent'});
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    try {
        const user = await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()},
        });

        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid token'});
        }

        user.password = await bcrypt.hash(req.body.password, 12);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({success: true, message: 'Password updated successfully'});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error'});
    }
};