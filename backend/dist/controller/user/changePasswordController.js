import bcrypt from "bcryptjs";
import UserModel from "../../models/userModel.js";
const changePasswordController = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Unauthorized"
            });
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "User not found"
            });
        }
        const { currentPassword, newPassword } = req.body;
        const passwordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatched) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Current password is incorrect",
            });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).json({
            success: true,
            error: false,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || 'Failed to change password',
        });
    }
};
export default changePasswordController;
