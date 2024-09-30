import userModel from "../../models/userModel.js";
async function userDetailsController(req, res) {
    try {
        const user = await userModel.findById(req.user?.id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }
        res.status(200).json({
            message: 'User details',
            data: user,
            error: false,
            success: true
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }
}
export default userDetailsController;
