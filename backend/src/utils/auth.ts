import jwt from "jsonwebtoken";

interface TokenData {
    id: Object;
    email: string;
}

export const createToken = (tokenData: TokenData) => {
    return jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY as string, {expiresIn: "1h"});
}