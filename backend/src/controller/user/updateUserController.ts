import userModel from "../../models/userModel.js";
import {CustomRequest, CustomResponse} from "../../utils";

async function updateUserController(req: CustomRequest, res: CustomResponse) {
    try {

        const sessionUser = req.user?.id;

        const {id, role, name} = req.body;
        console.log(id, role, name)

        const payload = {
            ...( name && { name : name}),
            ...( role && { role : role}),
        }

        const currentUser = await userModel.findById(sessionUser);

        const updatedUser = await userModel.findByIdAndUpdate(id, payload);

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
            success: true,
            error: false
        });

    } catch (error: any) {
        res.json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export default updateUserController;
