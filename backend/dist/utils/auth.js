import jwt from "jsonwebtoken";
export const createToken = (tokenData) => {
    return jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h" });
};
