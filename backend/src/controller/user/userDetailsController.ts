import userModel from "../../models/userModel.js";
import {CustomRequest, CustomResponse} from "../../utils";

async function userDetailsController(req: CustomRequest, res: CustomResponse) {
    try {
        const reqUser = req.user;
        console.log(reqUser);
        const user2 = await userModel.findOne({email: reqUser?.email});
        console.log(user2);
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


    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            error: true,
            success: false
        });
    }

}

export default userDetailsController;