import {Request, Response} from "express";
import {User} from "../models/userModel";

export interface CustomRequest extends Request {
    user?: User;
}

export interface CustomResponse extends Response {
    data?: any;
    message?: string;
    error?: boolean;
    success?: boolean;
    token?: string;
}
