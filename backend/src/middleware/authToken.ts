import {NextFunction} from 'express';
import jwt from "jsonwebtoken";

import {CustomRequest, CustomResponse} from "../utils";

async function authToken(req: CustomRequest, res: CustomResponse, next: NextFunction) {
    try {
        const token = req.cookies?.token;

        if (!token) return res.status(401).json({
            message: 'Access Denied',
            error: true,
            success: false
        });

        jwt.verify(token, process.env.TOKEN_SECRET_KEY as string, function (err: any, user: any) {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid Token',
                    error: true,
                    success: false
                });
            }

            req.user = user;
            next();
        });

    } catch (error: any) {
        res.status(400).json({
            message: error.message || 'Invalid Token',
            error: true,
            success: false
        });
    }
}

export default authToken;