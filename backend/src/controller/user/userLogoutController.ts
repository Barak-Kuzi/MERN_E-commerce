import {CustomRequest, CustomResponse} from "../../utils";

async function userLogoutController(req: CustomRequest, res: CustomResponse) {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            error: false,
            message: "User logged out successfully"
        });
    } catch (error: any) {
        res.json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}

export default userLogoutController;