import userModel from "../../models/userModel.js";
import {CustomRequest, CustomResponse} from "../../utils";

async function allUsersController(req: CustomRequest, res: CustomResponse) {
    try {
        const allUsers = await userModel.find();

        res.status(200).json({
            message: 'All Users',
            error: false,
            success: true,
            data: allUsers
        });

    } catch (error: any) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export default allUsersController;