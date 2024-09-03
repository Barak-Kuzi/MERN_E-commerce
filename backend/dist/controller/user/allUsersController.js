import userModel from "../../models/userModel.js";
async function allUsersController(req, res) {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({
            message: 'All Users',
            error: false,
            success: true,
            data: allUsers
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
export default allUsersController;
