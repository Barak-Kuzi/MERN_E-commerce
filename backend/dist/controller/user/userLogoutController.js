async function userLogoutController(req, res) {
    try {
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            error: false,
            message: "User logged out successfully"
        });
    }
    catch (error) {
        res.json({
            message: error.message || "Something went wrong",
            error: true,
            success: false
        });
    }
}
export default userLogoutController;
