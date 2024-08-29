import jwt from "jsonwebtoken";
async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token)
            return res.status(401).json({
                message: 'Access Denied',
                error: true,
                success: false
            });
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, user) {
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
    }
    catch (error) {
        res.status(400).json({
            message: error.message || 'Invalid Token',
            error: true,
            success: false
        });
    }
}
export default authToken;
