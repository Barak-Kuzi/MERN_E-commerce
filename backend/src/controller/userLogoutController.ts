import {Request, Response} from 'express';

async function userLogoutController(req: Request, res: Response) {
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